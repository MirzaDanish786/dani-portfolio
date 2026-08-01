"use client";

import {
  Linkedin,
  Github,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

interface SocialLink {
  name: string;
  displayName: string;
  subText: string;
  icon: LucideIcon;
  url: string;
  isPrimary?: boolean;
}

const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    displayName: "Let's Connect",
    subText: "linkedin.com/in/mirza-danish-baig-08a067333",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/mirza-danish-baig-08a067333/",
    isPrimary: true,
  },
  {
    name: "GitHub",
    displayName: "GitHub",
    subText: "@MirzaDanish786",
    icon: Github,
    url: "https://github.com/MirzaDanish786",
    isPrimary:true
  },
];

export default function SocialLinks() {
  const primary = socialLinks.filter((l) => l.isPrimary);
  const secondaries = socialLinks.filter((l) => !l.isPrimary);

  return (
    <div className="w-full">
      <h4 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
        <span className="inline-block w-8 h-1 rounded-full bg-gradient-to-r from-phthalo-400 to-phthalo-700" />
        Connect With Me
      </h4>

      <div className="flex flex-col gap-3">
        {primary.map((link, i) => (
          <PrimaryLink key={link.name} link={link} index={i} />
        ))}

        {secondaries.length > 0 && (
          <div
            className={`grid gap-3 ${
              secondaries.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
            }`}
          >
            {secondaries.map((link, i) => (
              <SecondaryLink key={link.name} link={link} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function PrimaryLink({ link, index = 0 }: { link: SocialLink; index?: number }) {
  const Icon = link.icon;
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${link.name} profile`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative flex items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-phthalo-500/60 transition-colors duration-300 overflow-hidden"
    >
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-phthalo-500/10 via-phthalo-600/10 to-phthalo-800/10 transition-opacity duration-500" />

      <span className="relative flex items-center gap-4 min-w-0">
        <span className="relative flex shrink-0 items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-phthalo-500/20 to-phthalo-700/20 border border-phthalo-700/40 transition-transform duration-300 group-hover:scale-105">
          <span className="absolute inset-0 rounded-lg bg-phthalo-500/20 blur-md opacity-50 group-hover:opacity-90 transition-opacity duration-500" />
          <Icon className="relative w-6 h-6 shrink-0 text-phthalo-300 group-hover:text-phthalo-200 transition-colors duration-300" />
        </span>
        <span className="flex flex-col min-w-0">
          <span className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors leading-tight">
            {link.displayName}
          </span>
          <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors truncate">
            {link.subText}
          </span>
        </span>
      </span>

      {/* Hover affordance: desktop only — on touch it never reveals, and the
          transparent label would still steal width from the icon. */}
      <span className="relative ml-auto hidden shrink-0 items-center gap-1.5 text-xs uppercase tracking-wider text-phthalo-400/0 group-hover:text-phthalo-300 transition-all duration-300 sm:flex">
        Visit
        <ExternalLink className="w-4 h-4 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </span>

      <ExternalLink className="relative ml-auto h-4 w-4 shrink-0 text-zinc-600 sm:hidden" />

      {/* Shimmer sweep on hover */}
      <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <span className="absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-200%] group-hover:translate-x-[400%] transition-transform duration-1000 ease-out" />
      </span>
    </motion.a>
  );
}

function SecondaryLink({ link, index }: { link: SocialLink; index: number }) {
  const Icon = link.icon;
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${link.name} profile`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
      className="group relative flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-phthalo-500/50 transition-colors duration-300 overflow-hidden"
    >
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-phthalo-500/10 to-phthalo-700/10 transition-opacity duration-500" />

      <span className="relative flex shrink-0 items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-phthalo-500/15 to-phthalo-700/15 border border-phthalo-700/40 transition-transform duration-300 group-hover:scale-105">
        <Icon className="w-5 h-5 shrink-0 text-phthalo-300 group-hover:text-phthalo-200 transition-colors" />
      </span>

      <span className="relative flex flex-col min-w-0">
        <span className="text-sm font-semibold text-zinc-100 group-hover:text-white transition-colors leading-tight">
          {link.displayName}
        </span>
        <span className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors truncate">
          {link.subText}
        </span>
      </span>

      <ExternalLink className="relative ml-auto w-4 h-4 text-zinc-600 group-hover:text-phthalo-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
    </motion.a>
  );
}
