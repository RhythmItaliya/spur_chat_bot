import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 max-w-[85%] mr-auto animate-fade-in">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary">
        <Bot className="w-4 h-4" />
      </div>

      {/* Typing bubble */}
      <div className="relative px-4 py-3 rounded-2xl rounded-bl-md bg-chat-ai border border-border/50">
        <div className="flex gap-1.5 items-center h-5">
          <span
            className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-typing"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-typing"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-typing"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      </div>
    </div>
  );
}
