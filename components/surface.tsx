import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * The single card recipe for the site.
 *
 * Before this existed the same glass treatment was hand-written in
 * glassmorphic-card, skill-badge, SocailLinks and inline in page.tsx, each
 * drifting slightly. Any new panel should use a variant here rather than
 * re-deriving the background/border/blur combination.
 */
const surface = cva(
  "relative rounded-2xl border transition-[border-color,background-color,box-shadow] duration-200 ease-out",
  {
    variants: {
      variant: {
        /** Standard panel — most cards and tiles. */
        base: "border-white/[0.07] bg-white/[0.02] backdrop-blur-sm",
        /** Slightly brighter; for the one element that should lead a group. */
        raised:
          "border-white/10 bg-white/[0.04] backdrop-blur-md shadow-xl shadow-black/20",
        /** Flat, no blur — for dense grids where blur cost isn't worth it. */
        quiet: "border-white/[0.06] bg-zinc-900/40",
      },
      interactive: {
        true: "hover:border-phthalo-500/40 hover:bg-white/[0.04]",
        false: "",
      },
      padded: {
        true: "p-6",
        false: "",
      },
    },
    defaultVariants: {
      variant: "base",
      interactive: false,
      padded: true,
    },
  }
);

interface SurfaceProps extends VariantProps<typeof surface> {
  children: ReactNode;
  className?: string;
  /**
   * Adds a soft amber bloom behind the card that strengthens on hover.
   * Requires `group` on this element or an ancestor.
   */
  glow?: boolean;
}

export function Surface({
  children,
  className,
  variant,
  interactive,
  padded,
  glow = false,
}: SurfaceProps) {
  return (
    <div
      className={cn(surface({ variant, interactive, padded }), className)}
    >
      {glow && (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-px -z-10 rounded-2xl bg-gradient-to-br from-phthalo-500/20 via-transparent to-phthalo-700/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      {children}
    </div>
  );
}

export { surface as surfaceVariants };
