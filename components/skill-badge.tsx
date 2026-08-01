interface SkillBadgeProps {
  name: string;
}

/**
 * A single technology chip.
 *
 * These render inside a <Marquee>, so there is deliberately no scroll-reveal
 * animation here — the element is cloned and translated continuously, which
 * makes viewport-triggered motion both meaningless and expensive. Hover is the
 * only state change.
 *
 * The old version showed a "level" percentage bar. Self-assessed proficiency
 * numbers carry no information a reader can act on and invite scepticism, so
 * the chip now just names the technology.
 */
export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    // Tighter padding and type below `sm`: two vertical marquee columns have
    // to fit a ~360px viewport, and the widest labels were being clipped by
    // the container's overflow.
    <div className="group mx-1 my-1.5 flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.03] py-2 pl-2.5 pr-3 backdrop-blur-sm transition-colors duration-200 ease-out hover:border-phthalo-500/40 hover:bg-white/[0.06] sm:mx-1.5 sm:gap-2.5 sm:py-2.5 sm:pl-3 sm:pr-4">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-phthalo-500/70 transition-colors duration-200 group-hover:bg-phthalo-400" />
      <span className="whitespace-nowrap text-[13px] font-medium text-zinc-300 transition-colors duration-200 group-hover:text-white sm:text-sm">
        {name}
      </span>
    </div>
  );
}
