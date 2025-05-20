
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicatorClassName?: string;
    showValue?: boolean;
    size?: "sm" | "md" | "lg";
  }
>(({ className, value, indicatorClassName, showValue = false, size = "md", ...props }, ref) => {
  const sizeClasses = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6"
  };

  return (
    <div className="flex items-center gap-2">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          `relative w-full overflow-hidden rounded-full bg-secondary ${sizeClasses[size]}`,
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all", 
            indicatorClassName || "bg-gradient-to-r from-cyber-purple to-cyber-purple2"
          )}
          style={{ 
            transform: `translateX(-${100 - (value || 0)}%)`,
            transition: "transform 1s cubic-bezier(0.65, 0, 0.35, 1)"
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn(
            "text-xs font-medium text-cyber-light/90 mix-blend-difference",
            size === "sm" ? "hidden" : "",
            !showValue && "hidden"
          )}>
            {value}%
          </span>
        </div>
      </ProgressPrimitive.Root>
      {showValue && size !== "sm" && (
        <span className="text-xs font-medium text-cyber-light/70 w-8">
          {value}%
        </span>
      )}
    </div>
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
