import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-[2px_2px_0px_0px_theme(colors.ring)] focus-visible:translate-x-[-1px] focus-visible:translate-y-[-1px] aria-invalid:border-destructive aria-invalid:shadow-[2px_2px_0px_0px_theme(colors.destructive)] dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-none border-2 border-b-[3px] border-r-[3px] bg-transparent px-3 py-2 text-base shadow-[1px_1px_0px_0px_theme(colors.border)] transition-all duration-150 outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
