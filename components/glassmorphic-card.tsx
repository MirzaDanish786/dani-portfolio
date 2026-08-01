"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { Surface } from "@/components/surface";
import { DURATION, EASE_OUT, VIEWPORT, riseIn } from "@/lib/motion";

interface GlassmorphicCardProps {
  children: ReactNode;
}

// Variants are not branched on useReducedMotion — that hook disagrees between
// the server and client render and breaks hydration. See components/reveal.tsx.
export function GlassmorphicCard({ children }: GlassmorphicCardProps) {
  return (
    <motion.div
      className="group h-full"
      variants={riseIn}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      whileHover={{ y: -4 }}
      transition={{ duration: DURATION.fast, ease: EASE_OUT }}
    >
      <Surface variant="base" interactive glow className="h-full">
        {children}
      </Surface>
    </motion.div>
  );
}
