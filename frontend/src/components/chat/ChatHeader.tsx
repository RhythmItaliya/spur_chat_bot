import { Sparkles, RotateCcw } from "lucide-react";
import { Button } from "components/ui/button";

interface ChatHeaderProps {
    onNewChat?: () => void;
}

export function ChatHeader({ onNewChat }: ChatHeaderProps) {
    return (
        <div className="flex justify-between p-3 md:p-4 border-b">
            <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 md:w-6 md:h-6" />
                <div>
                    <h1 className="text-sm md:text-base font-bold">Rhyri Support</h1>
                    <p className="text-[10px] md:text-xs text-gray-500">AI Assistant</p>
                </div>
            </div>
            {onNewChat && (
                <Button variant="ghost" size="sm" onClick={onNewChat}>
                    <RotateCcw className="w-4 h-4" />
                </Button>
            )}
        </div>
    );
}
