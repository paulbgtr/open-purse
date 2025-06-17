import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-none border-2 border-b-[3px] border-r-[3px] px-2 py-0.5 text-xs font-pixel-sm w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:shadow-[2px_2px_0px_0px_theme(colors.ring)] aria-invalid:border-destructive aria-invalid:shadow-[2px_2px_0px_0px_theme(colors.destructive)] transition-all duration-150 overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-primary/40 bg-primary text-primary-foreground shadow-[1px_1px_0px_0px_theme(colors.primary)] [a&]:hover:bg-primary/90 [a&]:hover:shadow-[2px_2px_0px_0px_theme(colors.primary)]",
        secondary:
          "border-secondary/40 bg-secondary text-secondary-foreground shadow-[1px_1px_0px_0px_theme(colors.secondary)] [a&]:hover:bg-secondary/90 [a&]:hover:shadow-[2px_2px_0px_0px_theme(colors.secondary)]",
        destructive:
          "border-red-700 bg-destructive text-white shadow-[1px_1px_0px_0px_theme(colors.red.700)] [a&]:hover:bg-destructive/90 [a&]:hover:shadow-[2px_2px_0px_0px_theme(colors.red.700)] focus-visible:shadow-[2px_2px_0px_0px_theme(colors.destructive)] dark:bg-destructive/60",
        outline:
          "text-foreground border-foreground/20 shadow-[1px_1px_0px_0px_theme(colors.foreground/0.2)] [a&]:hover:bg-accent [a&]:hover:text-accent-foreground [a&]:hover:border-accent [a&]:hover:shadow-[2px_2px_0px_0px_theme(colors.accent)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
