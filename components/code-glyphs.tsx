import { cn } from "@/lib/utils";

/**
 * Drifting code fragments used as background texture.
 *
 * Design constraints, so this reads as atmosphere rather than clutter:
 *  - Positions are hand-placed constants, never Math.random(). Random values
 *    differ between server and client render and would blow up hydration.
 *  - Opacity tops out around 0.20 — enough that you register the words exist,
 *    low enough that they never compete with body copy. Past roughly 0.25 they
 *    start pulling the eye away from real text.
 *  - Size and opacity co-vary to fake depth: small + dim reads as far away.
 *  - Most are hidden below `sm`. On a phone there is no empty space to fill,
 *    and every glyph is another element to paint.
 *  - Each section gets a different set, so scrolling doesn't feel like the
 *    same wallpaper repeating.
 */

interface Glyph {
  text: string;
  /** Percentage positions, kept off the centre column where text lives. */
  top: string;
  left: string;
  className: string;
  /** Seconds — varied so nothing visibly pulses in unison. */
  delay: number;
  duration: number;
  hideOnMobile?: boolean;
}

const HERO: Glyph[] = [
  { text: "const", top: "14%", left: "6%", className: "text-2xl text-phthalo-400/[0.20]", delay: 0, duration: 13 },
  { text: "=>", top: "72%", left: "11%", className: "text-3xl text-phthalo-300/[0.17]", delay: -3, duration: 16 },
  { text: "</>", top: "30%", left: "88%", className: "text-2xl text-phthalo-400/[0.20]", delay: -6, duration: 14, hideOnMobile: true },
  { text: "async", top: "84%", left: "78%", className: "text-xl text-zinc-400/[0.14]", delay: -9, duration: 15, hideOnMobile: true },
  { text: "{ }", top: "52%", left: "94%", className: "text-xl text-phthalo-300/[0.16]", delay: -2, duration: 12, hideOnMobile: true },
  { text: "await", top: "8%", left: "68%", className: "text-lg text-zinc-400/[0.12]", delay: -11, duration: 17, hideOnMobile: true },
  { text: "[]", top: "62%", left: "3%", className: "text-lg text-zinc-400/[0.12]", delay: -5, duration: 14, hideOnMobile: true },
  { text: "type", top: "44%", left: "74%", className: "text-lg text-phthalo-400/[0.13]", delay: -14, duration: 18, hideOnMobile: true },
];

/** One set per section, cycled by `variant`. */
const SECTION_SETS: Glyph[][] = [
  // About
  [
    { text: "interface", top: "18%", left: "4%", className: "text-xl text-phthalo-400/[0.18]", delay: 0, duration: 15 },
    { text: "?.", top: "74%", left: "91%", className: "text-2xl text-phthalo-300/[0.16]", delay: -6, duration: 13, hideOnMobile: true },
    { text: "return", top: "48%", left: "95%", className: "text-lg text-zinc-400/[0.13]", delay: -3, duration: 16, hideOnMobile: true },
    { text: "extends", top: "62%", left: "7%", className: "text-lg text-zinc-400/[0.12]", delay: -11, duration: 19, hideOnMobile: true },
    { text: "readonly", top: "32%", left: "86%", className: "text-base text-phthalo-400/[0.12]", delay: -8, duration: 17, hideOnMobile: true },
  ],
  // Skills
  [
    { text: "npm run", top: "12%", left: "88%", className: "text-lg text-phthalo-400/[0.18]", delay: -4, duration: 14 },
    { text: "&&", top: "68%", left: "5%", className: "text-3xl text-phthalo-300/[0.16]", delay: -8, duration: 17, hideOnMobile: true },
    { text: "<T>", top: "36%", left: "2%", className: "text-xl text-zinc-400/[0.13]", delay: -1, duration: 12, hideOnMobile: true },
    { text: "import", top: "82%", left: "80%", className: "text-lg text-zinc-400/[0.12]", delay: -13, duration: 18, hideOnMobile: true },
    { text: "pnpm", top: "26%", left: "10%", className: "text-base text-phthalo-400/[0.12]", delay: -6, duration: 20, hideOnMobile: true },
  ],
  // Projects
  [
    { text: "docker", top: "20%", left: "93%", className: "text-lg text-phthalo-400/[0.17]", delay: -5, duration: 15 },
    { text: "200 OK", top: "80%", left: "7%", className: "text-base text-phthalo-300/[0.18]", delay: -10, duration: 13, hideOnMobile: true },
    { text: "( )", top: "44%", left: "96%", className: "text-2xl text-zinc-400/[0.13]", delay: -2, duration: 16, hideOnMobile: true },
    { text: "deploy", top: "60%", left: "3%", className: "text-lg text-zinc-400/[0.12]", delay: -9, duration: 19, hideOnMobile: true },
    { text: "build", top: "10%", left: "12%", className: "text-base text-phthalo-400/[0.12]", delay: -15, duration: 17, hideOnMobile: true },
  ],
  // Experience
  [
    { text: "git push", top: "16%", left: "3%", className: "text-lg text-phthalo-400/[0.18]", delay: -7, duration: 14 },
    { text: "SELECT *", top: "76%", left: "84%", className: "text-base text-zinc-400/[0.13]", delay: -3, duration: 17, hideOnMobile: true },
    { text: "=>", top: "40%", left: "94%", className: "text-2xl text-phthalo-300/[0.16]", delay: -12, duration: 12, hideOnMobile: true },
    { text: "commit", top: "58%", left: "8%", className: "text-lg text-zinc-400/[0.12]", delay: -5, duration: 20, hideOnMobile: true },
    { text: "main", top: "30%", left: "89%", className: "text-base text-phthalo-400/[0.12]", delay: -16, duration: 18, hideOnMobile: true },
  ],
  // Contact
  [
    { text: "useEffect", top: "22%", left: "89%", className: "text-lg text-phthalo-400/[0.17]", delay: -6, duration: 16 },
    { text: "null", top: "70%", left: "4%", className: "text-xl text-zinc-400/[0.13]", delay: -2, duration: 13, hideOnMobile: true },
    { text: "{ }", top: "50%", left: "97%", className: "text-2xl text-phthalo-300/[0.16]", delay: -9, duration: 15, hideOnMobile: true },
    { text: "await", top: "34%", left: "6%", className: "text-lg text-zinc-400/[0.12]", delay: -14, duration: 19, hideOnMobile: true },
    { text: "resolve", top: "84%", left: "78%", className: "text-base text-phthalo-400/[0.12]", delay: -4, duration: 17, hideOnMobile: true },
  ],
];

interface CodeGlyphsProps {
  /** `hero` uses the denser set; otherwise pick a per-section variant. */
  intensity?: "hero" | "section";
  variant?: number;
}

export function CodeGlyphs({ intensity = "section", variant = 0 }: CodeGlyphsProps) {
  const glyphs =
    intensity === "hero"
      ? HERO
      : SECTION_SETS[variant % SECTION_SETS.length];

  return (
    <>
      {glyphs.map((g, i) => (
        <span
          key={`${g.text}-${i}`}
          aria-hidden
          className={cn(
            "absolute select-none font-mono font-medium animate-float",
            g.className,
            g.hideOnMobile && "hidden sm:block"
          )}
          style={{
            top: g.top,
            left: g.left,
            animationDelay: `${g.delay}s`,
            animationDuration: `${g.duration}s`,
          }}
        >
          {g.text}
        </span>
      ))}
    </>
  );
}
