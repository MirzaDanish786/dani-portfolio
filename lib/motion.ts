import type { Variants } from "framer-motion";

/**
 * Shared motion tokens.
 *
 * Every animation on the site pulls its easing and duration from here so the
 * whole page moves with one personality instead of a different ad-hoc timing
 * per component. If a value isn't in this file, it shouldn't be in a
 * `transition` prop.
 */

/** Decelerating curve — things arrive quickly, then settle. Our default. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Symmetric curve for things that move both ways (hover, toggles). */
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DURATION = {
  /** Hover feedback, colour shifts. */
  fast: 0.18,
  /** The workhorse: entrances, lifts, most state changes. */
  base: 0.28,
  /** Large elements travelling a longer distance. */
  slow: 0.42,
} as const;

/** Gap between staggered siblings. Enough to read as a cascade, not a queue. */
export const STAGGER = 0.05;

/**
 * Reveal slightly before the element is fully on screen, so content is settled
 * by the time the reader's eye lands on it. `once` prevents the distracting
 * re-animation when scrolling back up.
 */
export const VIEWPORT = { once: true, margin: "-10% 0px -8% 0px" } as const;

/** The default entrance: a short rise out of transparency. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

/** For cards and tiles — adds a touch of scale so they read as objects. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
};

/** Parent that cascades its children. Pair with `fadeUp` / `riseIn` items. */
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: 0.06 },
  },
};
