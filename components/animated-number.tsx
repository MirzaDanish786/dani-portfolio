"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedNumberProps {
  /** The original display string. If it begins with digits, those digits animate from 0 to the target value; any non-digit suffix (e.g. "+") is preserved. Non-numeric strings render unchanged. */
  value: string;
  /** Duration of the count-up in milliseconds. */
  duration?: number;
  className?: string;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function AnimatedNumber({
  value,
  duration = 1500,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState<string>(
    target === null ? value : `0${suffix}`
  );

  useEffect(() => {
    if (target === null || !isInView) return;

    const start = performance.now();
    let raf = 0;

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      const current = Math.round(target * eased);
      setDisplay(`${current}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {target === null ? value : display}
    </span>
  );
}
