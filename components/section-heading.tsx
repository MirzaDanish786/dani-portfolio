"use client";

import { motion } from "framer-motion";

import { DURATION, EASE_OUT, VIEWPORT, staggerParent } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  /** `left` gives sections a different rhythm than the default centred one. */
  align?: "center" | "left";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";

  // Not branched on useReducedMotion — see components/reveal.tsx for why.
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.slow, ease: EASE_OUT },
    },
  };

  return (
    <motion.div
      className={cn("flex flex-col gap-4", centered && "items-center text-center")}
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {/* Eyebrow: mono + rule, rather than another pill. The pill treatment is
          reserved for the hero badge so it keeps its emphasis. */}
      <motion.div
        variants={item}
        className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-phthalo-300/80"
      >
        <span className="h-px w-6 bg-gradient-to-r from-transparent to-phthalo-500" />
        {subtitle}
        {centered && (
          <span className="h-px w-6 bg-gradient-to-l from-transparent to-phthalo-500" />
        )}
      </motion.div>

      <motion.h2
        variants={item}
        className="text-4xl font-bold leading-[1.1] text-white md:text-5xl"
      >
        {title}
      </motion.h2>

      <motion.div
        variants={{
          hidden: { scaleX: 0 },
          visible: {
            scaleX: 1,
            transition: { duration: DURATION.slow, ease: EASE_OUT },
          },
        }}
        className={cn(
          "relative h-px w-24 origin-left overflow-hidden bg-gradient-to-r from-phthalo-400 via-phthalo-600 to-transparent",
          centered && "origin-center"
        )}
      >
        {/* A bright point travels the rule left to right. Applied here rather
            than to the eyebrow's flanking dashes — those are only 24px wide,
            too short for travel to register as anything but a flicker. */}
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-6 animate-rule-sweep bg-gradient-to-r from-transparent via-phthalo-100 to-transparent"
        />
      </motion.div>
    </motion.div>
  );
}
