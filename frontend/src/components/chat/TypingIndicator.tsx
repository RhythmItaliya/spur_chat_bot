import { Sparkles } from "lucide-react";

export function TypingIndicator() {
    return (
        <div className="flex gap-1.5 md:gap-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            </div>
            <div className="p-2 md:p-3 rounded bg-gray-100">
                <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-400 animate-pulse" />
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-400 animate-pulse delay-75" />
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gray-400 animate-pulse delay-150" />
                </div>
            </div>
        </div>
    );
}
