"use client";

import { useEffect, useRef } from "react";

/**
 * Golden dust motes suspended over the ambient orbs, which drift away from the
 * pointer as it approaches.
 *
 * Implementation notes:
 *
 *  - Each mote is two nested elements. The outer one carries the pointer-repel
 *    transform, the inner one carries the CSS float animation. They cannot
 *    share an element: a running CSS animation owns `transform`, so an inline
 *    transform on the same node is simply ignored.
 *
 *  - Repel is written straight to the DOM inside a rAF loop, never through
 *    React state. A setState per mousemove would re-render this subtree
 *    dozens of times a second for a purely decorative effect.
 *
 *  - Placement is clustered on the orb coordinates in <Ambient>, not scattered.
 *    A gold dot is only visible where the glow sits behind it, so motes far
 *    from an orb are invisible noise in the DOM. Because the orbs drift, motes
 *    move in and out of visibility on their own.
 *
 *  - Positions are constants, never Math.random() — random values differ
 *    between the server and client render and break hydration.
 */

interface Mote {
  top: string;
  left: string;
  /** px — above roughly 7px it stops reading as a particle. */
  size: number;
  className: string;
  delay: number;
  duration: number;
  glow?: boolean;
  hideOnMobile?: boolean;
}

// Clustered around the hero orbs: (6%,10%), (92%,26%), (34%,88%).
const HERO: Mote[] = [
  { top: "14%", left: "9%", size: 6, className: "bg-phthalo-500", delay: 0, duration: 17, glow: true },
  { top: "8%", left: "14%", size: 4, className: "bg-phthalo-600", delay: -4, duration: 21 },
  { top: "19%", left: "4%", size: 5, className: "bg-phthalo-400/80", delay: -9, duration: 19, glow: true },
  { top: "29%", left: "87%", size: 6, className: "bg-phthalo-500", delay: -2, duration: 20, glow: true, hideOnMobile: true },
  { top: "35%", left: "92%", size: 4, className: "bg-phthalo-600", delay: -12, duration: 16, hideOnMobile: true },
  { top: "23%", left: "94%", size: 5, className: "bg-phthalo-400/80", delay: -6, duration: 23, glow: true, hideOnMobile: true },
  { top: "84%", left: "37%", size: 6, className: "bg-phthalo-500", delay: -7, duration: 18, glow: true, hideOnMobile: true },
  { top: "90%", left: "44%", size: 4, className: "bg-phthalo-600", delay: -15, duration: 22, hideOnMobile: true },
  { top: "78%", left: "31%", size: 5, className: "bg-phthalo-400/75", delay: -11, duration: 20, glow: true, hideOnMobile: true },
];

// Clustered around the section orbs: (14%,18%), (86%,84%), (45%,70%).
const SECTION: Mote[] = [
  { top: "22%", left: "17%", size: 5, className: "bg-phthalo-500/90", delay: 0, duration: 19, glow: true },
  { top: "15%", left: "11%", size: 4, className: "bg-phthalo-600", delay: -8, duration: 23 },
  { top: "27%", left: "9%", size: 4, className: "bg-phthalo-400/70", delay: -14, duration: 17, hideOnMobile: true },
  { top: "80%", left: "83%", size: 5, className: "bg-phthalo-500/90", delay: -5, duration: 21, glow: true, hideOnMobile: true },
  { top: "73%", left: "89%", size: 4, className: "bg-phthalo-400/70", delay: -11, duration: 18, hideOnMobile: true },
  { top: "66%", left: "48%", size: 4, className: "bg-phthalo-600", delay: -3, duration: 22, hideOnMobile: true },
];

/** Pointer distance (px) at which a mote starts reacting. */
const REPEL_RADIUS = 130;
/** Maximum displacement (px) at zero distance. */
const REPEL_STRENGTH = 46;
/** Per-frame easing toward the target, for weight rather than snapping. */
const SMOOTHING = 0.12;

interface LightMotesProps {
  intensity?: "hero" | "section";
}

export function LightMotes({ intensity = "section" }: LightMotesProps) {
  const motes = intensity === "hero" ? HERO : SECTION;
  const shellRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Touch devices have no hovering pointer, so skip the whole loop rather
    // than run rAF forever for an effect that can never trigger.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pointer = { x: -9999, y: -9999 };
    const current = motes.map(() => ({ x: 0, y: 0 }));
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    // Centres in viewport space, refreshed only when the page actually moves
    // rather than every frame. Measuring inside the animation loop would force
    // a synchronous layout per mote per frame — the classic read/write thrash.
    let centres: { x: number; y: number }[] = [];
    let needsMeasure = true;

    const measure = () => {
      centres = shellRefs.current.map((el) => {
        if (!el) return { x: -9999, y: -9999 };
        const r = el.getBoundingClientRect();
        // Subtract the current offset so we store the *resting* centre; the
        // element may already be displaced when we measure.
        const i = shellRefs.current.indexOf(el);
        return {
          x: r.left + r.width / 2 - (current[i]?.x ?? 0),
          y: r.top + r.height / 2 - (current[i]?.y ?? 0),
        };
      });
      needsMeasure = false;
    };

    const invalidate = () => {
      needsMeasure = true;
    };

    const tick = () => {
      if (needsMeasure) measure();

      // Pure maths and style writes below — no layout reads, so the browser
      // never has to flush layout mid-loop.
      for (let i = 0; i < shellRefs.current.length; i++) {
        const el = shellRefs.current[i];
        const centre = centres[i];
        if (!el || !centre) continue;

        const dx = centre.x - pointer.x;
        const dy = centre.y - pointer.y;
        const dist = Math.hypot(dx, dy);

        let targetX = 0;
        let targetY = 0;
        if (dist < REPEL_RADIUS && dist > 0.001) {
          // Falls off toward the edge of the radius so there is no hard border.
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
          targetX = (dx / dist) * force;
          targetY = (dy / dist) * force;
        }

        const c = current[i];
        c.x += (targetX - c.x) * SMOOTHING;
        c.y += (targetY - c.y) * SMOOTHING;

        // Skip the write when the mote is effectively at rest, so an idle
        // pointer costs nothing beyond the loop itself.
        if (Math.abs(c.x) < 0.05 && Math.abs(c.y) < 0.05) {
          if (el.style.transform) el.style.transform = "";
          continue;
        }

        el.style.transform = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(
          2
        )}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", invalidate, { passive: true });
    window.addEventListener("resize", invalidate, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", invalidate);
      window.removeEventListener("resize", invalidate);
      cancelAnimationFrame(frame);
    };
  }, [motes]);

  return (
    <>
      {motes.map((m, i) => (
        <span
          key={i}
          aria-hidden
          ref={(el) => {
            shellRefs.current[i] = el;
          }}
          className={`absolute will-change-transform ${
            m.hideOnMobile ? "hidden sm:block" : ""
          }`}
          style={{
            top: m.top,
            left: m.left,
            width: `${m.size}px`,
            height: `${m.size}px`,
            // No CSS transition here — the rAF loop already eases toward the
            // target. Doing both would compound into visible lag.
          }}
        >
          <span
            className={`block h-full w-full rounded-full animate-float ${m.className}`}
            style={{
              animationDelay: `${m.delay}s`,
              animationDuration: `${m.duration}s`,
              boxShadow: m.glow
                ? `0 0 ${m.size * 2}px ${m.size / 2}px rgba(214, 143, 47, 0.35)`
                : undefined,
            }}
          />
        </span>
      ))}
    </>
  );
}
