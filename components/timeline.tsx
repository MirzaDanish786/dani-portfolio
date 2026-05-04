"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
  {
    title: "Full Stack Developer",
    company: "MercurySols",
    period: "Nov 2025 - Present",
    description:
      "Developing and maintaining full-stack web applications using the MERN stack, focusing on scalable backend APIs and responsive frontend interfaces. Integrated third-party services such as Stripe, Slack, and Google Calendar to enable real-world functionality including payments, notifications, and scheduling. Implemented CI/CD pipelines and containerized applications using Docker to streamline deployment workflows. Collaborated on building production-ready features with a focus on performance, clean architecture, and maintainability.",
  },
  {
    title: "Junior MERN Stack Developer",
    company: "VirtueNetz",
    period: "Jan 2025 - Oct 2025",
    description:
      "Built and optimized web applications using React, Node.js, and Express, contributing to both frontend UI and backend API development. Developed reusable components and implemented features like pagination, filtering, and dynamic data rendering. Worked with REST APIs and handled integration of third-party services to enhance application functionality. Gained hands-on experience in debugging, performance optimization, and writing maintainable code in a real-world development environment.",
  },
];

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-12 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <motion.div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-phthalo-500/50">
              <div className="absolute -inset-1 bg-gradient-to-r from-phthalo-500/10 to-phthalo-700/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

              <div className="relative">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div className="text-zinc-400 mb-4">
                  {experience.company} | {experience.period}
                </div>
                <p className="text-zinc-300">{experience.description}</p>
              </div>
            </div>
          </motion.div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div
                className="relative z-10 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                {/* Outer pulsating halo */}
                <span className="absolute inline-flex h-10 w-10 rounded-full bg-phthalo-500/40 blur-md animate-ping" />
                {/* Mid soft glow */}
                <span className="absolute inline-flex h-7 w-7 rounded-full bg-phthalo-500/30 blur-sm animate-pulse" />
                {/* Solid dot with conic shimmer ring */}
                <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-phthalo-500 to-phthalo-800 shadow-[0_0_18px_rgba(138,79,1,0.7)] ring-2 ring-phthalo-300/30">
                  <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
                </span>
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
