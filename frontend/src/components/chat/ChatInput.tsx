import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  disabled = false,
  placeholder = "Type your message...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = message.trim();
    if (trimmed && !disabled) {
      onSend(trimmed);
      setMessage("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const isValid = message.trim().length > 0;

  return (
    <div className="relative flex items-end gap-2 p-4 border-t border-border bg-card/80 backdrop-blur-sm">
      <Textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "min-h-[44px] max-h-[120px] resize-none pr-12",
          "rounded-xl border-border/50 bg-background",
          "focus:ring-2 focus:ring-primary/20 focus:border-primary",
          "placeholder:text-muted-foreground/60",
          "transition-all duration-200",
        )}
        rows={1}
      />
      <Button
        onClick={handleSubmit}
        disabled={disabled || !isValid}
        size="icon"
        className={cn(
          "absolute right-6 bottom-6 h-9 w-9 rounded-lg",
          "gradient-primary text-primary-foreground",
          "hover:opacity-90 transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "shadow-md hover:shadow-lg",
        )}
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  );
}
