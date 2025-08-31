import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function MagicDivider({ className }: { className?: string }) {
  return (
    <div className={cn("relative my-6 flex items-center", className)}>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <Sparkles className="mx-3 h-4 w-4 text-primary/70" />
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}
