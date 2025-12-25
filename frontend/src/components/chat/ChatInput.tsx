import { useState, useRef, useEffect } from "react";
import { Button } from "components/ui/button";
import { Textarea } from "components/ui/textarea";
import { ArrowUp } from "lucide-react";

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
        <div className="flex items-end gap-1.5 md:gap-2 p-2 md:p-3 border-t">
            <Textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                className="min-h-[36px] md:min-h-[40px] text-sm resize-none border rounded p-2 flex-1"
                rows={1}
            />
            <Button
                onClick={handleSubmit}
                disabled={disabled || !isValid}
                size="icon"
                className="h-8 w-8 md:h-10 md:w-10 flex-shrink-0"
            >
                <ArrowUp className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span className="sr-only">Send</span>
            </Button>
        </div>
    );
}
