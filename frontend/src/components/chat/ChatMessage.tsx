import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  sender: "user" | "ai";
  text: string;
  timestamp?: string;
  isNew?: boolean;
}

export function ChatMessage({
  sender,
  text,
  timestamp,
  isNew = false,
}: ChatMessageProps) {
  const isUser = sender === "user";

  return (
    <div
      className={cn(
        "flex gap-3 max-w-[85%]",
        isUser ? "ml-auto flex-row-reverse" : "mr-auto",
        isNew && "animate-slide-up",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser
            ? "bg-chat-user text-chat-user-foreground"
            : "bg-primary/10 text-primary",
        )}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message bubble */}
      <div
        className={cn(
          "relative px-4 py-3 rounded-2xl",
          isUser
            ? "bg-chat-user text-chat-user-foreground rounded-br-md"
            : "bg-chat-ai text-chat-ai-foreground rounded-bl-md border border-border/50",
        )}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {text}
          </p>
        ) : (
          <div className="text-sm leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        )}
        {timestamp && (
          <span
            className={cn(
              "text-[10px] mt-1 block",
              isUser ? "text-chat-user-foreground/70" : "text-muted-foreground",
            )}
          >
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
