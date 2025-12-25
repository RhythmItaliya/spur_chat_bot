import { cn } from "lib/utils";
import { Sparkles, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
    sender: "user" | "ai";
    text: string;
    timestamp?: string;
    isNew?: boolean;
    isCached?: boolean;
}

export function ChatMessage({
    sender,
    text,
    timestamp,
    isNew = false,
    isCached,
}: ChatMessageProps) {
    const isUser = sender === "user";

    return (
        <div className={cn("flex gap-1.5 md:gap-2", isUser ? "flex-row-reverse" : "")}>
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                {isUser ? (
                    <User className="w-3 h-3 md:w-4 md:h-4" />
                ) : (
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                )}
            </div>

            <div
                className={cn(
                    "p-2 md:p-3 rounded max-w-[85%] md:max-w-[80%] overflow-x-auto",
                    isUser ? "bg-blue-600 text-white" : "bg-gray-100",
                )}
            >
                {isUser ? (
                    <p className="text-xs md:text-sm">{text}</p>
                ) : (
                    <div className="text-xs md:text-sm prose prose-sm max-w-none">
                        <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                )}
                {timestamp && (
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] opacity-70">{timestamp}</span>
                        {!isUser && isCached && (
                            <span className="text-[10px] bg-green-100 text-green-800 px-1 rounded">
                                Cached
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
