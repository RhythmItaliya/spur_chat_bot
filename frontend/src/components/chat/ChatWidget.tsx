import { useRef, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { QuickReplies } from "./QuickReplies";
import { useChat } from "hooks/useChat";

export function ChatWidget() {
    const { messages, sendMessage, isLoading, isInitializing, handleNewChat } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, scrollToBottom]);

    const showQuickReplies = messages.length === 0 && !isLoading;

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <ChatHeader onNewChat={messages.length > 0 ? handleNewChat : undefined} />

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto chat-scroll p-2 md:p-4 space-y-2 md:space-y-4 min-h-0">
                {isInitializing ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                        <h2 className="font-semibold text-base md:text-lg mb-2">
                            Welcome to Rhyri Support!
                        </h2>
                        <p className="text-muted-foreground text-xs md:text-sm">
                            Hi there! I'm Rhyri, your AI support assistant.
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
                            isCached={message.isCached}
                        />
                    ))
                )}

                {/* Typing indicator */}
                {isLoading && <TypingIndicator />}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {showQuickReplies && <QuickReplies onSelect={sendMessage} disabled={isLoading} />}

            {/* Input */}
            <ChatInput
                onSend={sendMessage}
                disabled={isLoading || isInitializing}
                placeholder={isLoading ? "Rhyri is typing..." : "Type your message..."}
            />
        </div>
    );
}
