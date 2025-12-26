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
                    <p className="text-xs md:text-sm whitespace-pre-wrap break-words">{text}</p>
                ) : (
                    <div className="text-xs md:text-sm max-w-none">
                        <ReactMarkdown
                            components={{
                                code({ node, inline, className, children, ...props }: any) {
                                    return inline ? (
                                        <code
                                            className="bg-gray-200 text-red-600 px-1 py-0.5 rounded text-xs font-mono"
                                            {...props}
                                        >
                                            {children}
                                        </code>
                                    ) : (
                                        <pre className="bg-gray-800 text-gray-100 p-2 md:p-3 rounded my-2 overflow-x-auto">
                                            <code className="text-xs font-mono" {...props}>
                                                {children}
                                            </code>
                                        </pre>
                                    );
                                },
                                p({ children }) {
                                    return (
                                        <p className="mb-2 last:mb-0 whitespace-pre-wrap break-words">
                                            {children}
                                        </p>
                                    );
                                },
                                ul({ children }) {
                                    return (
                                        <ul className="list-disc ml-4 mb-2 space-y-1">
                                            {children}
                                        </ul>
                                    );
                                },
                                ol({ children }) {
                                    return (
                                        <ol className="list-decimal ml-4 mb-2 space-y-1">
                                            {children}
                                        </ol>
                                    );
                                },
                                li({ children, ...props }) {
                                    const hasNestedList =
                                        Array.isArray(children) &&
                                        children.some(
                                            (child: any) =>
                                                child?.type === "ul" || child?.type === "ol",
                                        );

                                    return (
                                        <li
                                            className={cn(
                                                hasNestedList ? "list-none -ml-4" : "ml-0",
                                            )}
                                            {...props}
                                        >
                                            {children}
                                        </li>
                                    );
                                },
                                h1({ children }) {
                                    return (
                                        <h1 className="text-base md:text-lg font-bold mb-2">
                                            {children}
                                        </h1>
                                    );
                                },
                                h2({ children }) {
                                    return (
                                        <h2 className="text-sm md:text-base font-bold mb-2">
                                            {children}
                                        </h2>
                                    );
                                },
                                h3({ children }) {
                                    return (
                                        <h3 className="text-xs md:text-sm font-bold mb-1">
                                            {children}
                                        </h3>
                                    );
                                },
                                strong({ children }) {
                                    return <strong className="font-semibold">{children}</strong>;
                                },
                                a({ href, children }) {
                                    return (
                                        <a
                                            href={href}
                                            className="text-blue-600 underline hover:text-blue-800"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {children}
                                        </a>
                                    );
                                },
                            }}
                        >
                            {text}
                        </ReactMarkdown>
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
