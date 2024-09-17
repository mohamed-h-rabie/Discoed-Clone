import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  align?: "center" | "start" | "end";
  side?: "left" | "right" | "top" | "bottom";
}
export default function ActionTooltip({
  label,
  children,
  align,
  side = "top",
}: ActionTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent align={align} side={side}>
          <p className="font-semibold text-sm capitalize">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
