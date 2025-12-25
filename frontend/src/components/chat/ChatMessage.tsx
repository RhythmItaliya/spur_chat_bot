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
        <div className={cn("flex gap-2 p-2", isUser ? "flex-row-reverse" : "")}>
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>

            <div
                className={cn(
                    "p-2 rounded max-w-[80%]",
                    isUser ? "bg-blue-600 text-white" : "bg-gray-100",
                )}
            >
                {isUser ? (
                    <p className="text-sm">{text}</p>
                ) : (
                    <div className="text-sm prose prose-sm max-w-none">
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
