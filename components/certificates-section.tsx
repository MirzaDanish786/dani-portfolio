"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  ExternalLink,
  Calendar,
  Maximize2,
  X,
} from "lucide-react";



import { SectionHeading } from "@/components/section-heading";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  description?: string;
  skills?: string[];
  image?: string;
  credentialUrl?: string;
}

// Edit this list with your real certificates.
const certificates: Certificate[] = [
  {
    title: "MERN Stack Developer",
    issuer: "VirtueNetz",
    date: "Jan 2025 - Jun 2025",
    description:
      "Completed a MERN Stack Developer internship at VirtueNetz, working on real-world projects.",
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "MongoDB",
    ],
    image: "/virtue-netz-certificate.webp",
    credentialUrl: "#",
  },
  {
    title: "Data Analyst",
    issuer: "Google - Coursera",
    date: "Dec 15, 2025",
    description:
      "Completed Google’s “Data, Data Everywhere” course on Coursera, gaining hands-on experience in data cleaning, analysis, and working with Python and Pandas.",
    skills: ["Python", "Pandas", "Data", "SQL"],
    image: "/google-data-analytics-certificate.webp",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/3PZXA03IAP6Y",
  },
];

export function CertificatesSection() {
  return (
    <section id="certificates" className="py-32 relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      </div>

      <div className="container relative z-10">
        <SectionHeading
          title="Certifications"
          subtitle="Verified credentials & coursework"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {certificates.map((cert, idx) => (
            <CertificateCard key={cert.title + idx} cert={cert} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificateCard({
  cert,
  index,
}: {
  cert: Certificate;
  index: number;
}) {
  const { title, issuer, date, description, skills, image, credentialUrl } =
    cert;
  const hasLink = credentialUrl && credentialUrl !== "#";
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true, margin: "-50px" }}
        className="group relative h-full"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-phthalo-500/20 to-phthalo-700/20 rounded-xl blur opacity-25 group-hover:opacity-90 transition duration-500" />

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View ${title} certificate in full size`}
          className="relative h-full w-full text-left rounded-xl bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 group-hover:border-phthalo-700/60 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-phthalo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          {/* Visual header */}
          <div className="relative h-40 bg-gradient-to-br from-zinc-900 via-phthalo-950/40 to-zinc-900 border-b border-zinc-800 overflow-hidden">
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-phthalo-500 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-phthalo-700 rounded-full blur-3xl" />
            </div>

            {image ? (
              <img
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                className="relative w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="relative h-full flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-phthalo-500/20 blur-2xl" />
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-phthalo-500/30 to-phthalo-800/30 border border-phthalo-500/50 flex items-center justify-center">
                    <Award className="h-9 w-9 text-phthalo-300" />
                  </div>
                </div>
              </div>
            )}

            {/* "Click to enlarge" hover hint */}
            <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/40 transition-colors duration-300 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-sm border border-phthalo-500/40 text-xs text-phthalo-200 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                <Maximize2 className="h-3.5 w-3.5" />
                Click to view full
              </div>
            </div>

            {/* Verified badge */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-950/80 backdrop-blur-sm border border-phthalo-700/50">
              <BadgeCheck className="h-3.5 w-3.5 text-phthalo-300" />
              <span className="text-[10px] uppercase tracking-wider text-phthalo-200 font-medium">
                Verified
              </span>
            </div>
          </div>

          <div className="p-6 flex-grow flex flex-col">
            <h3 className="text-lg font-bold leading-snug mb-1.5">{title}</h3>
            <div className="text-sm text-phthalo-300 font-medium mb-2">
              {issuer}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-4">
              <Calendar className="h-3.5 w-3.5" />
              <span>{date}</span>
            </div>

            {description && (
              <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                {description}
              </p>
            )}

            {skills && skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-[11px] rounded bg-phthalo-900/30 border border-phthalo-700/40 text-phthalo-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between gap-3">
              {hasLink ? (
                <Link
                  href={credentialUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-phthalo-300 hover:text-phthalo-200 transition-colors"
                >
                  View Credential
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm text-zinc-500">
                  Credential link coming soon
                </span>
              )}

              <span className="inline-flex items-center gap-1 text-xs text-zinc-500 group-hover:text-phthalo-300 transition-colors">
                <Maximize2 className="h-3.5 w-3.5" />
                View
              </span>
            </div>
          </div>
        </button>
      </motion.div>

      {/* Full-certificate viewer modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[86vh] overflow-y-auto bg-zinc-950/95 backdrop-blur-xl border-zinc-800 p-0 custom-scrollbar-phthalo [&>button]:hidden">
          <DialogTitle className="sr-only">{title}</DialogTitle>

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

          {/* Image area */}
          <div className="relative bg-zinc-950 flex items-center justify-center p-3 sm:p-5 md:p-6 border-b border-zinc-800">
            {image ? (
              <img
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-[55vh] sm:max-h-[65vh] md:max-h-[70vh] w-auto h-auto object-contain rounded-md shadow-2xl shadow-phthalo-900/40"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-48 sm:h-64">
                <div className="relative">
                  <div className="absolute inset-0 bg-phthalo-500/20 blur-3xl" />
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-phthalo-500/30 to-phthalo-800/30 border border-phthalo-500/50 flex items-center justify-center">
                    <Award className="h-10 w-10 sm:h-14 sm:w-14 text-phthalo-300" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-4 sm:p-6 md:p-8">
            <div className="flex items-start justify-between gap-3 sm:gap-4 flex-wrap">
              <div className="min-w-0 flex-1">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-phthalo-300 via-phthalo-500 to-phthalo-700 leading-tight">
                  {title}
                </h3>
                <div className="mt-2 text-sm sm:text-base text-phthalo-300 font-medium">
                  {issuer}
                </div>
                <div className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-zinc-500">
                  <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{date}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-zinc-900 border border-phthalo-700/50 shrink-0">
                <BadgeCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-phthalo-300" />
                <span className="text-[10px] sm:text-xs uppercase tracking-wider text-phthalo-200 font-medium">
                  Verified
                </span>
              </div>
            </div>

            {description && (
              <p className="mt-4 sm:mt-5 text-sm sm:text-base text-zinc-300 leading-relaxed">
                {description}
              </p>
            )}

            {skills && skills.length > 0 && (
              <div className="mt-4 sm:mt-5">
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-zinc-500 mb-2 sm:mb-2.5">
                  Skills Validated
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-2.5 py-0.5 sm:py-1 text-[11px] sm:text-xs rounded bg-phthalo-900/30 border border-phthalo-700/40 text-phthalo-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {hasLink && (
              <div className="mt-6 sm:mt-7 pt-5 sm:pt-6 border-t border-zinc-800">
                <Link
                  href={credentialUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-700 hover:to-phthalo-900 text-white text-sm font-medium transition-colors"
                >
                  Verify Credential
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            )}

          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
