"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: [
            // 8-bit pixelated styling
            "font-pixel-sm",
            "border-2 border-primary",
            "rounded-none",
            "shadow-[4px_4px_0px_0px_theme(colors.primary)]",
            "bg-gradient-to-r from-card to-popover",
            "text-card-foreground",
            // Pixelated pattern overlay
            "relative",
            "before:absolute before:inset-0",
            "before:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)]",
            "before:bg-[length:3px_3px]",
            "before:pointer-events-none",
          ].join(" "),
          success: [
            "border-secondary",
            "shadow-[4px_4px_0px_0px_theme(colors.secondary)]",
            "bg-gradient-to-r from-secondary/20 to-secondary/10",
            "text-secondary-foreground",
          ].join(" "),
          error: [
            "border-destructive",
            "shadow-[4px_4px_0px_0px_theme(colors.destructive)]",
            "bg-gradient-to-r from-destructive/20 to-destructive/10",
            "text-destructive",
          ].join(" "),
          warning: [
            "border-ring",
            "shadow-[4px_4px_0px_0px_theme(colors.ring)]",
            "bg-gradient-to-r from-ring/20 to-ring/10",
            "text-foreground",
          ].join(" "),
          info: [
            "border-accent",
            "shadow-[4px_4px_0px_0px_theme(colors.accent)]",
            "bg-gradient-to-r from-accent/20 to-accent/10",
            "text-accent-foreground",
          ].join(" "),
          title:
            "font-pixel-sm text-foreground drop-shadow-[1px_1px_0px_theme(colors.background)]",
          description: "font-pixel-sm text-muted-foreground text-xs",
          closeButton: [
            "border-2 border-muted",
            "rounded-none",
            "bg-muted",
            "text-muted-foreground",
            "hover:bg-primary hover:text-primary-foreground",
            "hover:border-primary",
            "transition-colors duration-150",
            "shadow-[2px_2px_0px_0px_theme(colors.muted)]",
            "hover:shadow-[2px_2px_0px_0px_theme(colors.primary)]",
          ].join(" "),
        },
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--secondary)",
          "--success-text": "var(--secondary-foreground)",
          "--error-bg": "var(--destructive)",
          "--error-text": "var(--destructive-foreground)",
          "--warning-bg": "var(--ring)",
          "--warning-text": "var(--foreground)",
          "--info-bg": "var(--accent)",
          "--info-text": "var(--accent-foreground)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
