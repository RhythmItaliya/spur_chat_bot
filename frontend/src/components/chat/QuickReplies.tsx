import { Button } from "@/components/ui/button";
import { Package, RefreshCw, Clock, CreditCard } from "lucide-react";

interface QuickRepliesProps {
  onSelect: (message: string) => void;
  disabled?: boolean;
}

const quickReplies = [
  {
    icon: Package,
    label: "Shipping",
    message: "What are your shipping options and delivery times?",
  },
  {
    icon: RefreshCw,
    label: "Returns",
    message: "What is your return policy?",
  },
  {
    icon: Clock,
    label: "Support Hours",
    message: "What are your customer support hours?",
  },
  {
    icon: CreditCard,
    label: "Payment",
    message: "What payment methods do you accept?",
  },
];

export function QuickReplies({ onSelect, disabled }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-border/50 bg-muted/30">
      <span className="text-xs text-muted-foreground w-full mb-1">
        Quick questions:
      </span>
      {quickReplies.map((reply) => (
        <Button
          key={reply.label}
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => onSelect(reply.message)}
          className="h-8 px-3 rounded-full text-xs font-medium border-border/50 bg-background hover:bg-secondary hover:border-primary/30 transition-all duration-200"
        >
          <reply.icon className="w-3.5 h-3.5 mr-1.5 text-primary" />
          {reply.label}
        </Button>
      ))}
    </div>
  );
}
