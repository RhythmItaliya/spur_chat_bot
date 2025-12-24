import { useState, useRef, useEffect, useCallback } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { QuickReplies } from "./QuickReplies";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { chatAPI } from "@/api";

const STORAGE_KEY = "rhyri_session_id";

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Load session from storage and fetch history
  useEffect(() => {
    const loadSession = async () => {
      const storedSessionId = localStorage.getItem(STORAGE_KEY);

      if (storedSessionId) {
        try {
          // For now, just load from localStorage - backend integration can be added later
          const storedMessages = localStorage.getItem(
            `messages_${storedSessionId}`,
          );
          if (storedMessages) {
            setSessionId(storedSessionId);
            setMessages(JSON.parse(storedMessages));
          }
        } catch (error) {}
      }

      setIsInitializing(false);
    };

    loadSession();
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const sendMessage = async (text: string) => {
    // Validate input
    if (!text.trim()) {
      toast({
        title: "Empty message",
        description: "Please enter a message to send.",
        variant: "destructive",
      });
      return;
    }

    // Add user message optimistically
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      timestamp: formatTime(new Date()),
      isNew: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call the real API
      const response = await chatAPI.sendMessage({
        message: text.trim(),
        sessionId: sessionId || undefined,
      });

      // Update session ID if new
      if (response.sessionId && response.sessionId !== sessionId) {
        setSessionId(response.sessionId);
        localStorage.setItem(STORAGE_KEY, response.sessionId);
      }

      // Add AI response
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: "ai",
        text: response.reply,
        timestamp: formatTime(new Date()),
        isNew: true,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      // Add error message as AI response
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        sender: "ai",
        text:
          error instanceof Error
            ? error.message
            : "I apologize, but I'm having trouble responding right now. Please try again in a moment.",
        timestamp: formatTime(new Date()),
        isNew: true,
      };

      setMessages((prev) => [...prev, errorMessage]);

      toast({
        title: "Connection issue",
        description: "There was a problem connecting to our support agent.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewChat = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSessionId(null);
    setMessages([]);
    toast({
      title: "New conversation",
      description: "Started a fresh conversation.",
    });
  };

  const showQuickReplies = messages.length === 0 && !isLoading;

  return (
    <div
      className={cn(
        "flex flex-col h-full w-full max-w-2xl mx-auto",
        "bg-card rounded-2xl shadow-chat overflow-hidden",
        "border border-border/50",
      )}
    >
      {/* Header */}
      <ChatHeader onNewChat={messages.length > 0 ? handleNewChat : undefined} />

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto chat-scroll p-4 space-y-4 min-h-0">
        {isInitializing ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-4 shadow-lg">
              <svg
                className="w-8 h-8 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h2 className="font-display font-semibold text-lg mb-2">
              Welcome to Rhyri Support!
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm">
              Hi there! I'm Rhyri, your AI support assistant. I can help you
              with shipping, returns, payments, and more. How can I assist you
              today?
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              sender={message.sender}
              text={message.text}
              timestamp={message.timestamp}
              isNew={message.isNew}
            />
          ))
        )}

        {/* Typing indicator */}
        {isLoading && <TypingIndicator />}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies */}
      {showQuickReplies && (
        <QuickReplies onSelect={sendMessage} disabled={isLoading} />
      )}

      {/* Input */}
      <ChatInput
        onSend={sendMessage}
        disabled={isLoading || isInitializing}
        placeholder={isLoading ? "Rhyri is typing..." : "Type your message..."}
      />
    </div>
  );
}
