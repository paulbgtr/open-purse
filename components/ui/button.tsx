import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-pixel-sm transition-all duration-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring border-2 border-b-4 border-r-4 active:border-b-2 active:border-r-2 active:translate-x-[2px] active:translate-y-[2px] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:border-b-[5px] hover:border-r-[5px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-primary/40 hover:bg-primary/95 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.4)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] dark:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] dark:hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,0.7)] dark:active:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.6)]",
        destructive:
          "bg-destructive text-white border-red-700 hover:bg-destructive/95 focus-visible:outline-destructive shadow-[4px_4px_0px_0px_theme(colors.red.700)] hover:shadow-[5px_5px_0px_0px_theme(colors.red.700)] active:shadow-[2px_2px_0px_0px_theme(colors.red.700)]",
        outline:
          "bg-background border-foreground/20 hover:bg-accent hover:text-accent-foreground hover:border-foreground/40 shadow-[4px_4px_0px_0px_theme(colors.foreground/0.2)] hover:shadow-[5px_5px_0px_0px_theme(colors.foreground/0.3)] active:shadow-[2px_2px_0px_0px_theme(colors.foreground/0.2)]",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary/40 hover:bg-secondary/90 shadow-[4px_4px_0px_0px_theme(colors.secondary/0.6)] hover:shadow-[5px_5px_0px_0px_theme(colors.secondary/0.7)] active:shadow-[2px_2px_0px_0px_theme(colors.secondary/0.6)]",
        ghost:
          "border-transparent hover:bg-accent hover:text-accent-foreground hover:border-accent/30 hover:shadow-[3px_3px_0px_0px_theme(colors.accent)] active:shadow-[1px_1px_0px_0px_theme(colors.accent)]",
        link: "text-primary underline-offset-4 hover:underline border-transparent hover:text-primary/90 font-bold tracking-wide",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 px-4 has-[>svg]:px-3",
        lg: "h-12 px-8 has-[>svg]:px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
