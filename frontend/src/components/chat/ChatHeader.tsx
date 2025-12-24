import { Bot, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatHeaderProps {
  onNewChat?: () => void;
}

export function ChatHeader({ onNewChat }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="relative">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
        </div>

        {/* Title */}
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-display font-semibold text-foreground">
              Rhyri Support
            </h1>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <p className="text-xs text-muted-foreground">
            AI-powered • Usually replies instantly
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {onNewChat && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNewChat}
                className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary"
              >
                <RotateCcw className="h-4 w-4" />
                <span className="sr-only">New conversation</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Start new conversation</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
