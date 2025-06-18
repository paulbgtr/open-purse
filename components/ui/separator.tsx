"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        // 8-bit pixelated separator styling
        "bg-gradient-to-r from-primary via-secondary to-accent shrink-0",
        "data-[orientation=horizontal]:h-[3px] data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-[3px]",
        // Pixelated border effect
        "border-t-2 border-b-2 border-primary/20",
        "data-[orientation=vertical]:border-l-2 data-[orientation=vertical]:border-r-2 data-[orientation=vertical]:border-t-0 data-[orientation=vertical]:border-b-0",
        // Shadow for depth
        "shadow-[0_2px_0px_0px_theme(colors.border)]",
        "data-[orientation=vertical]:shadow-[2px_0_0px_0px_theme(colors.border)]",
        className,
      )}
      {...props}
    />
  );
}

export { Separator };
