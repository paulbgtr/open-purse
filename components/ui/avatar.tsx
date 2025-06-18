"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden",
        // 8-bit pixelated square styling
        "rounded-none border-2 border-primary bg-gradient-to-br from-secondary to-accent",
        "shadow-[2px_2px_0px_0px_theme(colors.primary)] hover:shadow-[4px_4px_0px_0px_theme(colors.primary)]",
        "transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px]",
        // Pixelated edge effect
        "before:absolute before:inset-0 before:border-2 before:border-muted before:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full",
        // 8-bit pixelated image styling
        "image-rendering: pixelated; image-rendering: -moz-crisp-edges; image-rendering: crisp-edges;",
        "filter: contrast(1.2) saturate(1.3)",
        className,
      )}
      style={{
        imageRendering: "pixelated",
        ...props.style,
      }}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "flex size-full items-center justify-center",
        // 8-bit retro styling for fallback
        "bg-gradient-to-br from-primary to-destructive",
        "font-pixel text-primary-foreground font-bold",
        "text-shadow-[1px_1px_0px_theme(colors.background)]",
        // Pixelated pattern overlay
        "relative before:absolute before:inset-0",
        "before:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)]",
        "before:bg-size-[4px_4px]",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
