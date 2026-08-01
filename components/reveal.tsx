"use client";

import { motion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";

import { fadeUp, riseIn, staggerParent, VIEWPORT } from "@/lib/motion";

/*
 * Note on reduced motion: do NOT branch these variants on useReducedMotion().
 * The hook has no matchMedia on the server, so it returns false there and true
 * on a client that has the setting enabled — Framer then inlines different
 * initial styles in each render and hydration fails. Reduced motion is handled
 * in CSS (see globals.css), which is evaluated identically in both passes.
 */

type Preset = "fade" | "rise";

const PRESETS: Record<Preset, Variants> = {
  fade: fadeUp,
  rise: riseIn,
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** `rise` adds a slight scale — use it for cards and tiles. */
  preset?: Preset;
  /** Seconds to wait before starting. Use sparingly; prefer RevealGroup. */
  delay?: number;
  as?: ElementType;
}

/**
 * Animates its children in when scrolled into view.
 *
 * Use standalone for a single element. For a grid or list, wrap the container
 * in `<RevealGroup>` and each child in `<RevealItem>` so they cascade from one
 * timeline rather than each running an independent observer.
 */
export function Reveal({
  children,
  className,
  preset = "fade",
  delay = 0,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      className={className}
      variants={PRESETS[preset]}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Container for a cascade. Children wrapped in `<RevealItem>` animate in
 * sequence, one stagger step apart, when the group enters the viewport.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
}: RevealGroupProps) {
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </MotionTag>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  preset?: Preset;
  as?: ElementType;
}

/** A single participant in a `<RevealGroup>` cascade. */
export function RevealItem({
  children,
  className,
  preset = "rise",
  as = "div",
}: RevealItemProps) {
  const MotionTag = motion[as as "div"];

  return (
    <MotionTag className={className} variants={PRESETS[preset]}>
      {children}
    </MotionTag>
  );
}
