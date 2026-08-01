import { CodeGlyphs } from "@/components/code-glyphs";
import { LightMotes } from "@/components/light-motes";
import { cn } from "@/lib/utils";

/**
 * Ambient lighting behind a section — the drifting amber/brown orbs.
 *
 * The original version used `mix-blend-multiply`, which *darkens* its backdrop.
 * On a near-black page that subtracted light instead of adding it, so the warm
 * tone barely survived. These use normal blending with a warm phthalo fill, so
 * the brown actually reaches the page, and every section gets movement rather
 * than only the hero.
 *
 * Rendered at -z-10 with pointer-events disabled, so it never affects layout
 * or hit-testing.
 */

interface AmbientProps {
  /** `hero` is larger and brighter; `section` is a quieter wash. */
  intensity?: "hero" | "section";
  /** Selects which set of background code glyphs this section shows. */
  variant?: number;
  className?: string;
}

export function Ambient({
  intensity = "section",
  variant = 0,
  className,
}: AmbientProps) {
  const isHero = intensity === "hero";

  return (
    // z-0, NOT -z-10. `section` is only `position: relative` with no z-index,
    // so it establishes no stacking context — a negative z-index here escapes
    // the section and hides behind the page wrapper's gradient. Section content
    // sits at z-10, so z-0 layers correctly beneath it.
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "absolute rounded-full bg-phthalo-600 blur-3xl animate-drift",
          isHero
            ? "left-[6%] top-[10%] h-80 w-80 opacity-40"
            : "left-[14%] top-[18%] h-72 w-72 opacity-25"
        )}
      />
      <div
        className={cn(
          "absolute rounded-full bg-phthalo-500 blur-3xl animate-drift [animation-delay:-6s]",
          isHero
            ? "right-[8%] top-[26%] h-80 w-80 opacity-35"
            : "bottom-[16%] right-[14%] h-72 w-72 opacity-20"
        )}
      />
      <div
        className={cn(
          "absolute rounded-full bg-phthalo-700 blur-3xl animate-drift [animation-delay:-12s]",
          isHero
            ? "bottom-[12%] left-[34%] h-80 w-80 opacity-40"
            : "bottom-[30%] left-[45%] h-64 w-64 opacity-20"
        )}
      />

      {/* Motes render after the orbs so they sit over the glow, which is the
          only place a dark-gold particle is visible at all. */}
      <LightMotes intensity={intensity} />

      <CodeGlyphs intensity={intensity} variant={variant} />

      {/* Fine dot grid — texture, not pattern. Stops the large flat areas
          between sections from reading as empty. */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(255 255 255 / 0.2) 1px, transparent 0)",
          backgroundSize: "38px 38px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 75%)",
        }}
      />
    </div>
  );
}
