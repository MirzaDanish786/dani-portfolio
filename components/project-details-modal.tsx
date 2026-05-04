"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  CheckCircle2,
  Layers,
  Lightbulb,
  Target,
  Calendar,
  UserCircle2,
  Activity,
  X,
  Lock,
  ShieldCheck,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ProjectDetails {
  /** One paragraph or several. */
  overview?: string | string[];
  /** Bulleted achievement / feature list. */
  highlights?: string[];
  /** Architecture & approach — paragraph or labeled sub-sections. */
  architecture?: string | { title: string; body: string }[];
  /** Tech stack grouped by category. */
  techStack?: { category: string; items: string[] }[];
  /** Engineering challenges and how they were solved. */
  challenges?: string | { problem: string; solution: string }[];
  /** Additional screenshots / diagrams. */
  gallery?: string[];
  duration?: string;
  role?: string;
  status?: string;
}

interface ProjectDetailsModalProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  isConfidential?: boolean;
  confidentialNote?: string;
  details: ProjectDetails;
}

function asParagraphs(value: string | string[]) {
  return Array.isArray(value) ? value : [value];
}

export function ProjectDetailsModal({
  trigger,
  title,
  description,
  tags,
  image,
  demoUrl,
  repoUrl,
  isConfidential = false,
  confidentialNote,
  details,
}: ProjectDetailsModalProps) {
  const {
    overview,
    highlights,
    architecture,
    techStack,
    challenges,
    gallery,
    duration,
    role,
    status,
  } = details;

  const metaItems: { Icon: typeof Calendar; label: string; value: string }[] =
    [];
  if (role) metaItems.push({ Icon: UserCircle2, label: "Role", value: role });
  if (duration)
    metaItems.push({ Icon: Calendar, label: "Duration", value: duration });
  if (status)
    metaItems.push({ Icon: Activity, label: "Status", value: status });

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[70vh] sm:max-h-[85vh] overflow-y-auto bg-zinc-950/95 backdrop-blur-xl border-zinc-800 p-0 custom-scrollbar-phthalo [&>button]:hidden">
        {/* Glassy Close button — top right */}
        <DialogClose asChild>
          <button
            type="button"
            aria-label="Close"
            className="group absolute top-3 right-3 sm:top-4 sm:right-4 z-50 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-phthalo-500/60 text-zinc-100 hover:text-white shadow-lg shadow-black/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-phthalo-500/60"
          >
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:rotate-90 duration-300" />
            Close
          </button>
        </DialogClose>

        {/* Banner */}
        <div className="relative h-40 sm:h-56 md:h-72 overflow-hidden rounded-t-lg">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent z-10" />
          {isConfidential ? (
            <div className="relative w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <div className="absolute -top-16 -left-16 w-72 h-72 bg-phthalo-700/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-phthalo-500/20 rounded-full blur-3xl" />

              <div className="absolute right-0 top-6 sm:top-8 rotate-45 translate-x-12 sm:translate-x-16 bg-phthalo-600/90 text-[10px] sm:text-xs font-bold tracking-[0.3em] text-white px-16 sm:px-20 py-1 sm:py-1.5 shadow-lg shadow-phthalo-900/50 uppercase">
                NDA
              </div>

              <div className="relative z-10 flex flex-col items-center text-center px-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-phthalo-500/20 to-phthalo-700/20 border border-phthalo-500/40 flex items-center justify-center mb-3 sm:mb-4 shadow-lg shadow-phthalo-900/30">
                  <Lock className="h-7 w-7 sm:h-9 sm:w-9 text-phthalo-300" />
                </div>
                <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-phthalo-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  Confidential Client Project
                </div>
              </div>
            </div>
          ) : (
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="px-4 sm:px-6 md:px-8 pb-8 -mt-10 sm:-mt-14 md:-mt-16 relative z-20">
          <DialogHeader className="text-left space-y-2 sm:space-y-3">
            <DialogTitle className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-phthalo-300 via-phthalo-500 to-phthalo-700 leading-tight pr-24 sm:pr-28">
              {title}
            </DialogTitle>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              {description}
            </p>
          </DialogHeader>

          {/* Meta strip */}
          {metaItems.length > 0 && (
            <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
              {metaItems.map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-zinc-900/70 border border-zinc-800 text-[11px] sm:text-xs"
                >
                  <Icon className="h-3.5 w-3.5 text-phthalo-400 shrink-0" />
                  <span className="text-zinc-500">{label}:</span>
                  <span className="text-zinc-200 font-medium">{value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tags */}
          <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-phthalo-900/30 border border-phthalo-700/40 text-phthalo-200 hover:bg-phthalo-800/40 text-[11px] sm:text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Quick actions */}
          {isConfidential ? (
            <div className="mt-5 sm:mt-6 flex items-start gap-3 rounded-lg border border-phthalo-700/40 bg-phthalo-900/20 p-3 sm:p-4">
              <ShieldCheck className="h-5 w-5 text-phthalo-300 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                <span className="text-phthalo-200 font-semibold">
                  Private engagement under NDA.
                </span>{" "}
                {confidentialNote ||
                  "Source code, screenshots, and the live deployment cannot be publicly shared. The case study below outlines the architecture, decisions, and outcomes — happy to walk through specifics on request."}
              </div>
            </div>
          ) : (
            (demoUrl || repoUrl) && (
              <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-3">
                {demoUrl && (
                  <Button
                    size="sm"
                    className="w-full sm:w-auto bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-700 hover:to-phthalo-900 border-0"
                    asChild
                  >
                    <Link
                      href={demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                {repoUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-500"
                    asChild
                  >
                    <Link
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Source
                    </Link>
                  </Button>
                )}
              </div>
            )
          )}

          {/* Overview */}
          {overview && (
            <Section title="Overview" Icon={Lightbulb}>
              <div className="space-y-3">
                {asParagraphs(overview).map((p, i) => (
                  <p key={i} className="text-zinc-300 leading-relaxed text-sm">
                    {p}
                  </p>
                ))}
              </div>
            </Section>
          )}

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <Section title="Key Highlights" Icon={CheckCircle2}>
              <ul className="space-y-2.5">
                {highlights.map((h, i) => (
                  <li key={i} className="flex gap-3 text-sm text-zinc-300">
                    <CheckCircle2 className="h-4 w-4 text-phthalo-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Architecture */}
          {architecture && (
            <Section title="Architecture & Approach" Icon={Layers}>
              {typeof architecture === "string" ? (
                <p className="text-zinc-300 leading-relaxed text-sm">
                  {architecture}
                </p>
              ) : (
                <div className="space-y-4">
                  {architecture.map((block, i) => (
                    <div key={i}>
                      <h5 className="text-sm font-semibold text-phthalo-300 mb-1.5">
                        {block.title}
                      </h5>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {block.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* Tech Stack */}
          {techStack && techStack.length > 0 && (
            <Section title="Tech Stack" Icon={Layers}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {techStack.map((group) => (
                  <div
                    key={group.category}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 sm:p-4"
                  >
                    <div className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-phthalo-400 mb-2 sm:mb-2.5">
                      {group.category}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 text-[11px] sm:text-xs rounded bg-zinc-800/80 border border-zinc-700/60 text-zinc-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Challenges */}
          {challenges && (
            <Section title="Challenges & Solutions" Icon={Target}>
              {typeof challenges === "string" ? (
                <p className="text-zinc-300 leading-relaxed text-sm">
                  {challenges}
                </p>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {challenges.map((c, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-zinc-800 bg-zinc-900/40 p-3 sm:p-4"
                    >
                      <div className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-red-400/80 mb-1.5">
                        Problem
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed mb-3">
                        {c.problem}
                      </p>
                      <div className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-phthalo-400 mb-1.5">
                        Solution
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {c.solution}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Section>
          )}

          {/* Gallery */}
          {gallery && gallery.length > 0 && (
            <Section title="Gallery">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {gallery.map((src, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-lg border border-zinc-800"
                  >
                    <img
                      src={src}
                      alt={`${title} screenshot ${i + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </Section>
          )}

        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section({
  title,
  Icon,
  children,
}: {
  title: string;
  Icon?: typeof Calendar;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-zinc-800/70">
      <h4 className="flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-zinc-300 mb-3 sm:mb-4">
        {Icon && <Icon className="h-4 w-4 text-phthalo-400" />}
        {title}
      </h4>
      {children}
    </section>
  );
}
