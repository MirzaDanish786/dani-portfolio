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
    <div className="group mx-1.5 my-1.5 flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.03] py-2.5 pl-3 pr-4 backdrop-blur-sm transition-colors duration-200 ease-out hover:border-phthalo-500/40 hover:bg-white/[0.06]">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-phthalo-500/70 transition-colors duration-200 group-hover:bg-phthalo-400" />
      <span className="whitespace-nowrap text-sm font-medium text-zinc-300 transition-colors duration-200 group-hover:text-white">
        {name}
      </span>
    </div>
  );
}
