"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Ban, Eye, Lock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ProjectDetailsModal,
  type ProjectDetails,
} from "@/components/project-details-modal";
import { riseIn } from "@/lib/motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  demoUrl?: string;
  repoUrl?: string;
  studioUrl?: string;
  studioName?: string;
  isDemoShow?: boolean;
  isConfidential?: boolean;
  confidentialNote?: string;
  details?: ProjectDetails;
}

export function ProjectCard({
  title,
  description,
  tags,
  image,
  demoUrl,
  repoUrl,
  studioUrl,
  studioName,
  isDemoShow = true,
  isConfidential = false,
  confidentialNote,
  details,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const justClosedRef = useRef(false);

  const canOpenDetails = Boolean(details);

  const openDetails = () => {
    if (canOpenDetails && !modalOpen && !justClosedRef.current) {
      setModalOpen(true);
    }
  };

  const handleOpenChange = (next: boolean) => {
    setModalOpen(next);
    if (!next) {
      justClosedRef.current = true;
      window.setTimeout(() => {
        justClosedRef.current = false;
      }, 250);
    }
  };

  const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation();

  return (
    // No initial/whileInView here: the card inherits `hidden`/`visible` from
    // the enclosing <RevealGroup>, so the grid cascades on one timeline rather
    // than every card running its own observer and popping independently.
    <motion.div variants={riseIn} className="group h-full">
      <div
        className={`relative h-full overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 transition-all duration-300 group-hover:border-phthalo-500/50 ${
          canOpenDetails ? "cursor-pointer" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openDetails}
        onKeyDown={(e) => {
          if (canOpenDetails && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            openDetails();
          }
        }}
        role={canOpenDetails ? "button" : undefined}
        tabIndex={canOpenDetails ? 0 : undefined}
        aria-label={canOpenDetails ? `Open case study for ${title}` : undefined}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-phthalo-500/10 to-phthalo-700/10 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        <div className="relative h-full flex flex-col">
          <div className="relative overflow-hidden h-56">
            {isConfidential ? (
              <div className="relative w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black flex items-center justify-center overflow-hidden">
                {/* Decorative grid */}
                <div
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                {/* Glows */}
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-phthalo-700/30 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-phthalo-500/20 rounded-full blur-3xl" />

                {/* Diagonal NDA stripe */}
                <div className="absolute -right-12 top-5 rotate-45 bg-phthalo-600/90 text-[10px] font-bold tracking-[0.25em] text-white px-12 py-1 shadow-lg shadow-phthalo-900/50 uppercase">
                  NDA
                </div>

                <div className="relative z-10 flex flex-col items-center text-center px-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-phthalo-500/20 to-phthalo-700/20 border border-phthalo-500/40 flex items-center justify-center mb-3 shadow-lg shadow-phthalo-900/30">
                    <Lock className="h-6 w-6 text-phthalo-300" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-phthalo-400 font-semibold mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3" />
                    Confidential Client Project
                  </div>
                  <p className="text-sm text-zinc-300 max-w-[260px] leading-relaxed">
                    {confidentialNote ||
                      "Screenshots are private under NDA. Tap to view the full case study."}
                  </p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-b from-phthalo-500/10 to-phthalo-700/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-phthalo-500/20 to-phthalo-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                  src={image || "/placeholder.svg"}
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? "scale-105" : "scale-100"}`}
                />
              </>
            )}
          </div>

          <div className="p-6 flex-grow flex flex-col">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="text-zinc-400 mb-4">{description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-zinc-700/50 hover:bg-zinc-700 text-zinc-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                {details && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalOpen(true);
                      }}
                      className="group/btn relative w-full mb-4 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium border border-phthalo-700/50 bg-phthalo-900/20 text-phthalo-100 hover:bg-phthalo-800/40 hover:border-phthalo-500/70 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                      View Full Case Study
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                    <ProjectDetailsModal
                      open={modalOpen}
                      onOpenChange={handleOpenChange}
                      title={title}
                      description={description}
                      tags={tags}
                      image={image}
                      demoUrl={demoUrl}
                      repoUrl={repoUrl}
                      isConfidential={isConfidential}
                      confidentialNote={confidentialNote}
                      details={details}
                    />
                  </>
                )}
              </div>
            </div>

            <div
              className="flex justify-between items-center gap-3 mt-auto pt-4 border-t border-zinc-700/50"
              onClick={stopPropagation}
            >
              {isConfidential ? (
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Lock className="h-3.5 w-3.5 text-phthalo-400" />
                  <span>Source private (NDA)</span>
                </div>
              ) : repoUrl ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                  asChild
                >
                  <Link
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </Link>
                </Button>
              ) : studioUrl ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                  asChild
                >
                  <Link
                    href={studioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ArrowUpRight className="mr-2 h-4 w-4" />
                    {studioName || "Studio"}
                  </Link>
                </Button>
              ) : (
                <div />
              )}

              <div className={`${(!isDemoShow || isConfidential) && "hidden"}`}>
                {demoUrl && isDemoShow ? (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-700 hover:to-phthalo-900 border-0 text-white"
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
                ) : (
                  <Button
                    type="button"
                    size="sm"
                    aria-disabled="true"
                    title="Live demo not available yet"
                    onClick={() =>
                      toast.info("Live demo not available yet", {
                        description: `${title} doesn't have a public live demo at the moment.`,
                      })
                    }
                    className="bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 cursor-not-allowed"
                  >
                    <Ban className="mr-2 h-4 w-4" />
                    Live Demo Unavailable
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* <div className="absolute top-3 right-3 z-20">
            <div
              className={`w-3 h-3 rounded-full ${isHovered ? "bg-green-500" : "bg-zinc-500"} transition-colors duration-300`}
            ></div>
          </div> */}
        </div>
      </div>
    </motion.div>
  );
}
