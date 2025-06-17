import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-none border-2 border-b-[3px] border-r-[3px] bg-transparent px-3 py-1 text-base shadow-[1px_1px_0px_0px_theme(colors.border)] transition-all duration-150 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:shadow-[2px_2px_0px_0px_theme(colors.ring)] focus-visible:translate-x-[-1px] focus-visible:translate-y-[-1px]",
        "aria-invalid:border-destructive aria-invalid:shadow-[2px_2px_0px_0px_theme(colors.destructive)]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
