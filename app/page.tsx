import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Briefcase,
  Code2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Target,
  TrendingUp,
  Twitter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/project-card";
import { SkillBadge } from "@/components/skill-badge";
import { Timeline } from "@/components/timeline";
import { ContactForm } from "@/components/contact-form";
import { CreativeHero } from "@/components/creative-hero";
import { FloatingNav } from "@/components/floating-nav";
import { MouseFollower } from "@/components/mouse-follower";
import { SmoothHashScroll } from "@/components/smooth-hash-scroll";
import { ScrollProgress } from "@/components/scroll-progress";
import { SectionHeading } from "@/components/section-heading";
import { GlassmorphicCard } from "@/components/glassmorphic-card";
import { Marquee } from "@/components/magicui/marquee";
import { CertificatesSection } from "@/components/certificates-section";
import SocialLinks from "@/components/SocailLinks";
import { AnimatedNumber } from "@/components/animated-number";
import { Ambient } from "@/components/ambient";
import { RevealGroup, RevealItem } from "@/components/reveal";

export default function Portfolio() {
  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white">
      <MouseFollower />
      <SmoothHashScroll />
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-24">
        <Ambient intensity="hero" />

        <div className="container relative z-10 px-4 sm:px-6">
          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-8">
            {/* 1. Name first */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="block">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-300 via-phthalo-500 to-phthalo-700">
                Mirza Muhammad Danish Baig
              </span>
            </h1>

            {/* 2. Profile image */}
            <div className="flex justify-center">
              <CreativeHero />
            </div>

            {/* 3. Role badge — split into separate chips on mobile. As one
                pill the full string wrapped to two cramped lines inside a
                rounded-full container, which reads as broken. */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["Full Stack Engineer", "MERN", "Cloud & API"].map((label) => (
                <span
                  key={label}
                  className="relative rounded-full border border-white/15 bg-white/[0.07] px-3 py-1.5 text-[11px] font-medium leading-none text-zinc-200 backdrop-blur-sm"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* 4. Description */}
            <p className="text-lg text-zinc-400 max-w-[600px]">
              I design and develop full-stack web applications, integrating
              modern frontend experiences with robust backend systems, cloud
              deployment, and third-party APIs to solve real-world problems.
            </p>

            {/* 5. Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center">
              <Link href="#projects">
                <Button className="relative overflow-hidden group bg-gradient-to-r from-phthalo-600 to-phthalo-800 border-0 text-white">
                  <span className="relative z-10 flex items-center">
                    View Projects{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-phthalo-700 to-phthalo-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-500 bg-transparent"
                >
                  Contact Me
                </Button>
              </Link>
            </div>

            {/* 6. Social icons */}
            <div className="flex gap-4 justify-center">
              <Link
                href="https://github.com/MirzaDanish786"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link
                href="https://www.linkedin.com/in/mirza-danish-baig-08a067333/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <a href="mailto:baigmirzadanish3@gmail.com">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </a>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <div className="inline-block">
                <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                  <span className="relative z-10">
                    Full Stack Engineer | MERN | Cloud & API Integrations
                  </span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-phthalo-500/20 to-phthalo-700/20 animate-pulse"></span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="block">Hi, I'm</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
                  Mirza Danish
                </span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-[600px]">
                I design and develop full-stack web applications, integrating
                modern frontend experiences with robust backend systems, cloud
                deployment, and third-party APIs to solve real-world problems.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="#projects">
                  <Button className="relative overflow-hidden group bg-gradient-to-r from-phthalo-600 to-phthalo-800 border-0 text-white">
                    <span className="relative z-10 flex items-center">
                      View Projects{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-phthalo-700 to-phthalo-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button
                    variant="outline"
                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-500 bg-transparent"
                  >
                    Contact Me
                  </Button>
                </Link>
              </div>
              <div className="flex gap-4 pt-4">
                <Link
                  href="https://github.com/MirzaDanish786"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/mirza-danish-baig-08a067333/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <a href="mailto:baigmirzadanish3@gmail.com">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <CreativeHero />
            </div>
          </div>
        </div>

        {/* Scroll hint: the rule travels down, fades out, re-enters from the
            top. Kept to lg+ — the stacked mobile hero has no spare room at the
            bottom for it. */}
        <div className="absolute bottom-9 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] tracking-[0.12em] text-zinc-500 lg:flex">
          <span>SCROLL</span>
          {/* Three rules of differing length on offset delays — they read as
              one falling motion with depth, rather than a single repeating
              tick. Heights and delays are deliberately not multiples of each
              other, so the group never resynchronises into a visible pattern. */}
          <span className="flex h-10 items-start justify-center gap-[5px]">
            <span className="h-5 w-px animate-scroll-move bg-gradient-to-b from-phthalo-400/60 to-transparent [animation-delay:-1.6s]" />
            <span className="h-9 w-px animate-scroll-move bg-gradient-to-b from-phthalo-400 to-transparent" />
            <span className="h-3 w-px animate-scroll-move bg-gradient-to-b from-phthalo-400/45 to-transparent [animation-delay:-0.8s]" />
          </span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 md:py-28">
        <Ambient variant={0} />

        <div className="container relative z-10">
          <SectionHeading
            title="About Me"
            subtitle="My background and journey"
          />

          {/* Stat tiles */}
          <RevealGroup className="grid grid-cols-2 lg:grid-cols-3 max-md:grid-cols-1 gap-4 mt-16">
            {[
              { value: "20+", label: "Projects Shipped", Icon: Briefcase },
              // { value: "10+", label: "ML Models Deployed", Icon: Brain },
              {
                value: "BS in Computer Science",
                label: "Undergraduate BSCS",
                Icon: GraduationCap,
              },
              { value: "3", label: "Core Domains", Icon: Target },
            ].map(({ value, label, Icon }) => (
              <RevealItem key={label} className="group relative">
                <div className="relative h-full overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 backdrop-blur-sm transition-colors duration-200 ease-out group-hover:border-phthalo-500/40 group-hover:bg-white/[0.04]">
                  {/* Corner light — cheaper than a blurred pseudo-element and
                      reads as the card catching the section's ambient glow. */}
                  <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-phthalo-500/20 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Icon className="mb-3 h-5 w-5 text-phthalo-400" />
                  <div className="text-2xl font-bold text-white md:text-3xl">
                    <AnimatedNumber value={value} />
                  </div>
                  <div className="mt-1.5 text-xs text-zinc-400 md:text-sm">
                    {label}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          {/* Main 2-col area: code card + identity */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-8">
            {/* TypeScript class "whoami" card */}
            <div className="lg:col-span-3">
              <div className="relative h-full">
                <div className="absolute -inset-1 bg-gradient-to-br from-phthalo-500/20 via-phthalo-600/10 to-phthalo-800/20 rounded-xl blur-md opacity-60" />
                <div className="relative h-full rounded-xl bg-zinc-950/90 backdrop-blur-sm border border-zinc-800 overflow-hidden">
                  <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-zinc-800">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-phthalo-500/80" />
                    <span className="ml-3 text-xs text-zinc-500 font-mono">
                      ~/about/danish.ts
                    </span>
                  </div>
                  <pre className="p-5 md:p-6 text-[13px] md:text-sm font-mono leading-relaxed overflow-x-auto custom-scrollbar-phthalo">
                    <code>
                      <span className="text-phthalo-400">class</span>{" "}
                      <span className="text-phthalo-300 font-semibold">
                        MirzaDanish
                      </span>{" "}
                      <span className="text-zinc-300">{"{"}</span>
                      {"\n"}
                      <span className="text-zinc-600">
                        {" "}
                        // Full Stack Engineer • DevOps • Real-time Features
                      </span>
                      {"\n\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-phthalo-400">readonly</span>{" "}
                      <span className="text-phthalo-500">name</span>
                      <span className="text-zinc-300">: </span>
                      <span className="text-cyan-300">string</span>
                      <span className="text-zinc-300"> = </span>
                      <span className="text-amber-200">
                        "Mirza Muhammad Danish Baig"
                      </span>
                      <span className="text-zinc-300">;</span>
                      {"\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-phthalo-400">readonly</span>{" "}
                      <span className="text-phthalo-500">basedIn</span>
                      <span className="text-zinc-300">: </span>
                      <span className="text-cyan-300">string</span>
                      <span className="text-zinc-300"> = </span>
                      <span className="text-amber-200">
                        "Rahim Yar Khan, Pakistan"
                      </span>
                      <span className="text-zinc-300">;</span>
                      {"\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-phthalo-400">readonly</span>{" "}
                      <span className="text-phthalo-500">education</span>
                      <span className="text-zinc-300">: </span>
                      <span className="text-cyan-300">string</span>
                      <span className="text-zinc-300"> = </span>
                      <span className="text-amber-200">
                        "Bachelor in Computer Science"
                      </span>
                      <span className="text-zinc-300">;</span>
                      {"\n\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-phthalo-400">readonly</span>{" "}
                      <span className="text-phthalo-500">stack</span>
                      <span className="text-zinc-300">: </span>
                      <span className="text-cyan-300">string</span>
                      <span className="text-zinc-300">[] = [</span>
                      {"\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-amber-200">"TypeScript"</span>
                      <span className="text-zinc-300">, </span>
                      <span className="text-amber-200">"React"</span>
                      <span className="text-zinc-300">, </span>
                      <span className="text-amber-200">"Node.js"</span>
                      <span className="text-zinc-300">, </span>
                      <span className="text-amber-200">"NestJS"</span>
                      <span className="text-zinc-300">,</span>
                      {"\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-amber-200">"PostgreSQL"</span>
                      <span className="text-zinc-300">, </span>
                      <span className="text-amber-200">"MongoDB"</span>
                      <span className="text-zinc-300">, </span>
                      <span className="text-amber-200">"MySQL"</span>
                      <span className="text-zinc-300">,</span>
                      <span className="text-amber-200">"Redis"</span>
                      <span className="text-zinc-300">,</span>
                      {"\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-amber-200">"Docker"</span>
                      <span className="text-zinc-300">, </span>
                      <span className="text-amber-200">"WebSockets"</span>
                      <span className="text-zinc-300">, </span>
                      <span className="text-amber-200">"Python"</span>
                      <span className="text-zinc-300">, </span>
                      <span className="text-amber-200">"Pandas"</span>
                      <span className="text-zinc-300">,</span>
                      {"\n"}
                      <span className="text-zinc-300"> ];</span>
                      {"\n\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-phthalo-300">mission</span>
                      <span className="text-zinc-300">(): </span>
                      <span className="text-cyan-300">string</span>
                      <span className="text-zinc-300"> {"{"}</span>
                      {"\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-phthalo-400">return</span>{" "}
                      <span className="text-zinc-300">(</span>
                      {"\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-amber-200">
                        "Build scalable systems with modern, "
                      </span>
                      <span className="text-zinc-300"> +</span>
                      {"\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-amber-200">
                        "technologies, integrating real-world systems "
                      </span>
                      <span className="text-zinc-300"> +</span>
                      {"\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-amber-200">
                        "to deliver practical and impactful solutions."
                      </span>
                      {"\n"}
                      <span className="text-zinc-300"> );</span>
                      {"\n"}
                      <span className="text-zinc-300"> {"}"}</span>
                      {"\n\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-phthalo-400">get</span>{" "}
                      <span className="text-phthalo-300">status</span>
                      <span className="text-zinc-300">(): </span>
                      <span className="text-cyan-300">string</span>
                      <span className="text-zinc-300"> {"{"}</span>
                      {"\n"}
                      <span className="text-zinc-300"> </span>
                      <span className="text-phthalo-400">return</span>{" "}
                      <span className="text-amber-200">
                        "Open to opportunities"
                      </span>
                      <span className="text-zinc-300">;</span>
                      {"\n"}
                      <span className="text-zinc-300"> {"}"}</span>
                      {"\n"}
                      <span className="text-zinc-300">{"}"}</span>
                      <span className="inline-block w-1.5 h-4 bg-phthalo-400 ml-1 align-middle animate-pulse" />
                    </code>
                  </pre>
                </div>
              </div>
            </div>

            {/* Identity sidebar */}
            <div className="lg:col-span-2">
              <GlassmorphicCard>
                <div className="space-y-6">
                  <div>
                    <div className="text-xs uppercase tracking-[0.2em] text-phthalo-400 mb-2 flex items-center gap-2">
                      <Sparkles className="h-3 w-3" /> Profile
                    </div>
                    <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-phthalo-300 via-phthalo-500 to-phthalo-700">
                      Full Stack Engineer
                    </h3>
                    <p className="text-zinc-400 mt-3 text-sm leading-relaxed">
                      I develop scalable web applications with a focus on
                      performance, system design, and third-party API
                      integrations, combining intuitive frontend experiences
                      with reliable backend architecture.
                    </p>
                  </div>

                  <div className="space-y-3 pt-5 border-t border-zinc-800">
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-phthalo-400 shrink-0" />
                      <span className="text-zinc-300">
                        Rahim Yar Khan, Pakistan
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <GraduationCap className="h-4 w-4 text-phthalo-400 shrink-0" />
                      <span className="text-zinc-300">
                        Undergraduate in BS Computer Science
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail className="h-4 w-4 text-phthalo-400 shrink-0" />
                      <span className="text-zinc-300 break-all">
                        baigmirzadanish3@gmail.com
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="relative flex h-2.5 w-2.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-phthalo-600 opacity-75 animate-ping" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-phthalo-600" />
                      </span>
                      <span className="text-zinc-100 font-medium">
                        Open to opportunities
                      </span>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-zinc-800">
                    <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">
                      Focus Areas
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "System Design",
                        "Backend Architecture",
                        "Real-Time Systems",
                        "API Design & Integration",
                        "Cloud Deployment",
                        "CI/CD & DevOps Practices",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-full bg-phthalo-900/30 border border-phthalo-700/40 text-phthalo-200 hover:bg-phthalo-800/40 hover:border-phthalo-500/60 transition"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a
                    href="/dani-resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group inline-flex items-center justify-center w-full gap-2 bg-gradient-to-r from-phthalo-600 to-phthalo-800 hover:from-phthalo-500 hover:to-phthalo-700 text-white px-4 py-2.5 rounded-md font-medium transition-all overflow-hidden"
                  >
                    <span className="relative z-10">View Resume</span>
                    <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </GlassmorphicCard>
            </div>
          </div>

          {/* Expertise pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              {
                Icon: TrendingUp,
                title: "Full Stack Engineer",
                body: "End-to-end web applications using MERN and Next.js — delivering scalable systems from frontend interfaces to backend architecture.",
              },
              {
                Icon: Brain,
                title: "API Integrations",
                body: "Building connected systems through third-party APIs like Slack, Google Calendar, and Stripe — enabling automation, real-time updates, and secure payment workflows.",
              },
              {
                Icon: Code2,
                title: "Cloud & DevOps",
                body: "Deploying and managing applications with AWS, Docker, and CI/CD pipelines — focused on performance, reliability, and continuous delivery.",
              },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-phthalo-500/20 to-phthalo-700/20 rounded-xl blur opacity-30 group-hover:opacity-80 transition duration-300" />
                <div className="relative h-full bg-zinc-900/70 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 group-hover:border-phthalo-700/60 group-hover:-translate-y-1 transition-all duration-300">
                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-phthalo-500/20 to-phthalo-700/20 border border-phthalo-700/40 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-phthalo-300" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {title}
                  </h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 md:py-28">
        <Ambient variant={1} />

        <div className="container relative z-10">
          <SectionHeading
            title="My Skills"
            subtitle="Technologies I work with"
          />

          {/* Desktop: Two horizontal rows */}
          <div className="hidden md:block mt-16">
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
              <Marquee pauseOnHover className="[--duration:40s]">
                <SkillBadge name="TypeScript" />
                <SkillBadge name="Python" />
                <SkillBadge name="TailwindCSS" />
                <SkillBadge name="React.js" />
                <SkillBadge name="Next.js" />
                <SkillBadge name="Node.js" />
                <SkillBadge name="NestJS" />
                <SkillBadge name="Express.js" />
                <SkillBadge name="NestJS" />
                <SkillBadge name="NGINX" />
                <SkillBadge name="MonoRepo" />
                <SkillBadge name="TurboRepo" />
                <SkillBadge name="Tenstack-Router" />
                <SkillBadge name="Tenstack-Query" />
                <SkillBadge name="Prisma" />
                <SkillBadge name="Drizzle" />
                <SkillBadge name="TypeORM" />
                <SkillBadge name="PostgreSQL" />
                <SkillBadge name="Pandas" />
                <SkillBadge name="MySQL" />
                <SkillBadge name="MongoDB" />
                <SkillBadge name="Redis" />
                <SkillBadge name="Docker" />
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:40s]">
                <SkillBadge name="Axios" />
                <SkillBadge name="WebSockets" />
                <SkillBadge name="Swagger" />
                <SkillBadge name="AWS" />
                <SkillBadge name="Supabase" />
                <SkillBadge name="Stripe" />
                <SkillBadge name="Git" />
                <SkillBadge name="MJML" />
                <SkillBadge name="Swiper.js" />
                <SkillBadge name="Splide.js" />
                <SkillBadge name="CI/CD" />
                <SkillBadge name="Husky" />
                <SkillBadge name="Postman" />
                <SkillBadge name="Beekeeper Studio" />
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-zinc-900 to-transparent"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-zinc-900 to-transparent"></div>
            </div>
          </div>

          {/* Mobile: Two vertical columns */}
          <div className="md:hidden mt-16">
            <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
              <Marquee pauseOnHover vertical className="[--duration:40s]">
                <SkillBadge name="TypeScript" />
                <SkillBadge name="Python" />
                <SkillBadge name="TailwindCSS" />
                <SkillBadge name="React.js" />
                <SkillBadge name="Next.js" />
                <SkillBadge name="Node.js" />
                <SkillBadge name="NestJS" />
                <SkillBadge name="Express.js" />
                <SkillBadge name="NestJS" />
                <SkillBadge name="Tenstack-Router" />
                <SkillBadge name="Tenstack-Query" />
                <SkillBadge name="Prisma" />
                <SkillBadge name="Drizzle" />
                <SkillBadge name="TypeORM" />
                <SkillBadge name="PostgreSQL" />
                <SkillBadge name="Pandas" />
                <SkillBadge name="MySQL" />
                <SkillBadge name="MongoDB" />
                <SkillBadge name="Redis" />
                <SkillBadge name="Docker" />
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                vertical
                className="[--duration:40s]"
              >
                <SkillBadge name="WebSockets" />
                <SkillBadge name="Axios" />
                <SkillBadge name="Swagger" />
                <SkillBadge name="AWS" />
                <SkillBadge name="Supabase" />
                <SkillBadge name="Stripe" />
                <SkillBadge name="Git" />
                <SkillBadge name="MJML" />
                <SkillBadge name="Swiper.js" />
                <SkillBadge name="Splide.js" />
                <SkillBadge name="CI/CD" />
                <SkillBadge name="Husky" />
                <SkillBadge name="Postman" />
                <SkillBadge name="Beekeeper Studio" />
              </Marquee>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-zinc-900 to-transparent"></div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-zinc-900 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 md:py-28">
        <Ambient variant={2} />

        <div className="container relative z-10">
          <SectionHeading
            title="Featured Projects"
            subtitle="Some of my recent work"
          />

          <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

            <ProjectCard
              title="OlloHR — Enterprise HR Management Platform"
              description="Full-stack multi-tenant HR SaaS handling employees, leave, timesheets, performance reviews, documents, and real-time chat. Joined as a contributing engineer to ship performance, integrations, and access-control improvements across a production system."
              tags={[
                "React",
                "TypeScript",
                "Express.js",
                "PostgreSQL",
                "Drizzle ORM",
                "TanStack Query",
                "WebSockets",
                "Google Cloud Storage",
                "Slack API",
                "Microsoft Graph",
                "RBAC",
              ]}
              isConfidential
              confidentialNote="Built for a private client under NDA. Source code, screenshots, and the live deployment can't be shared publicly."
              details={{
                role: "Full Stack Engineer",
                duration: "Ongoing contributions across multiple sprint cycles",
                status: "In production — multi-tenant enterprise HR platform",
                overview: [
                  "OlloHR is a production-grade HR management platform that consolidates the full employee lifecycle — onboarding, leave, timesheets, documents, training, equipment, performance reviews, and real-time team chat — into a single multi-tenant workspace.",
                  "I contributed across the stack: profiling and optimizing core flows, fixing a critical N+1 query bottleneck, building paginated list endpoints, integrating Slack / Outlook / Google Drive, and reworking the dual-role access-control logic that gates every privileged action in the app.",
                ],
                highlights: [
                  "Optimized end-to-end performance across the busiest HR flows — dashboard, employee directory, timesheets, and leave — measurably reducing API latency and frontend render times.",
                  "Diagnosed and eliminated an N+1 query issue in the employee/leave listing path that was firing one extra query per row; replaced with batched joins and selective Drizzle relations, cutting DB round-trips dramatically.",
                  "Introduced server-side pagination across the heaviest list endpoints (employees, timesheets, leave requests, notifications) with TanStack Query keepPreviousData for smooth page transitions.",
                  "Integrated Slack — bidirectional event sync, channel notifications for approvals, and slash-command driven actions for common HR tasks.",
                  "Integrated Microsoft Outlook (Graph API) for calendar sync of leave, 1-to-1s, and training events, plus email notification fallbacks.",
                  "Integrated Google Drive for document/contract uploads with OAuth-scoped per-user access and metadata sync into the documents module.",
                  "Reworked the dual role/permission logic combining legacy org roles (admin/manager/member) with employee-level flags (isDirector / hrAccess / isLineManager) into a single, scope-aware authorization layer used by both server middleware and a typed React hook.",
                  "Maintained a fully type-safe codebase end-to-end with TypeScript, Drizzle schema inference, and Zod input validation.",
                ],
                architecture: [
                  {
                    title: "Frontend",
                    body: "React + TypeScript with Wouter routing and TanStack Query for server state. Radix UI primitives styled with Tailwind. Optimistic updates for chat and approval flows; paginated tables for all heavy lists.",
                  },
                  {
                    title: "Backend",
                    body: "Express.js + TypeScript with a clean IStorage interface that abstracts all database access. Domain-grouped routes for employees, leave, timesheets, documents, training, equipment, reviews, and chat.",
                  },
                  {
                    title: "Database",
                    body: "PostgreSQL (Neon serverless) accessed via Drizzle ORM. Shared schema in shared/schema.ts drives both server types and Zod validators. Cascade deletes maintain referential integrity across employee-linked tables.",
                  },
                  {
                    title: "Real-time",
                    body: "WebSocket server on /ws with session-authenticated connections. Per-user socket map for direct delivery, with offline notification fan-out into the in-app notification center.",
                  },
                  {
                    title: "Integrations",
                    body: "Slack (Bolt + webhooks), Microsoft Graph (Outlook calendar + mail), and Google Drive (OAuth + Drive v3) wired through dedicated service modules with token storage and refresh handling.",
                  },
                  {
                    title: "File Storage",
                    body: "Google Cloud Storage with split public/private buckets — public objects for avatars, private objects for contracts, certificates, and disciplinary documents served via access-controlled API routes.",
                  },
                  {
                    title: "Auth & RBAC",
                    body: "Replit Auth (OAuth) with PostgreSQL-backed sessions. Authorization combines org-level roles and employee-level flags through a canManageEmployee() resolver on the server and a useManagerAccess() hook on the client.",
                  },
                ],
                techStack: [
                  {
                    category: "Frontend",
                    items: [
                      "React 18",
                      "TypeScript",
                      "Wouter",
                      "TanStack Query",
                      "Radix UI / shadcn",
                      "TailwindCSS",
                    ],
                  },
                  {
                    category: "Backend",
                    items: [
                      "Express.js",
                      "TypeScript",
                      "Drizzle ORM",
                      "Zod",
                      "Passport.js",
                    ],
                  },
                  {
                    category: "Database",
                    items: ["PostgreSQL (Neon serverless)", "Drizzle Kit"],
                  },
                  {
                    category: "Real-time",
                    items: [
                      "WebSockets (ws)",
                      "Session-authenticated channels",
                    ],
                  },
                  {
                    category: "Integrations",
                    items: [
                      "Slack API",
                      "Microsoft Graph (Outlook)",
                      "Google Drive API",
                      "Google Cloud Storage",
                    ],
                  },
                  {
                    category: "Auth",
                    items: [
                      "Replit Auth (OAuth)",
                      "Dual-layer RBAC",
                      "Session management",
                    ],
                  },
                  {
                    category: "Tooling",
                    items: [
                      "Git",
                      "ESLint",
                      "Prettier",
                      "TypeScript strict mode",
                      "Vite",
                    ],
                  },
                ],
                challenges: [
                  {
                    problem:
                      "N+1 query bottleneck on employee and leave listings — each row was triggering follow-up queries for manager, approver, and department lookups, causing list endpoints to slow noticeably as tenants grew.",
                    solution:
                      "Profiled the slow paths, identified the per-row lookups, and rewrote the storage layer to use Drizzle relational queries / joined selects so each list resolves in a small, fixed number of round-trips. Latency on the affected endpoints dropped substantially.",
                  },
                  {
                    problem:
                      "Heavy list pages were loading entire tables into memory and rendering everything at once, slowing both the API and the UI as data volume grew.",
                    solution:
                      "Added cursor/offset pagination at the storage and route layer for employees, timesheets, leave, and notifications, exposed page/limit query params, and migrated the React tables to TanStack Query with keepPreviousData and proper query-key scoping for clean cache invalidation.",
                  },
                  {
                    problem:
                      "Overall app performance — cold dashboard loads, redundant requests on tab switches, and large bundle payloads were hurting perceived speed.",
                    solution:
                      "Tuned TanStack Query caching/staleTime, deduplicated overlapping requests, batched dashboard analytics into a single endpoint where it made sense, and trimmed unnecessary re-renders. The dashboard and employee directory feel materially snappier under load.",
                  },
                  {
                    problem:
                      "Access-control logic was split across two systems — legacy org roles and newer employee-level flags (isDirector / hrAccess / isLineManager) — leading to inconsistent gating where some routes checked one system and missed the other.",
                    solution:
                      "Centralized authorization into a canManageEmployee() server middleware and a matching useManagerAccess() React hook that evaluate both systems together, including line-manager scope (own team only). Audited every privileged route and UI action to use the unified gate, eliminating drift between server and client checks.",
                  },
                  {
                    problem:
                      "Bringing Slack, Outlook, and Google Drive into the platform without leaking credentials across tenants or duplicating boilerplate.",
                    solution:
                      "Built a per-tenant integration layer with isolated OAuth token storage and refresh, dedicated service modules per provider, and a thin event bus so domain events (leave approved, document uploaded, 1-to-1 scheduled) fan out to whichever integrations the tenant has connected.",
                  },
                  {
                    problem:
                      "Confidence that the access-control rework didn't regress any existing flow across the dual-role matrix.",
                    solution:
                      "Walked the full route surface — admin, manager, line manager, HR-access, director, and member — against every privileged action, and aligned client-side visibility checks with the server gate so users never see a button that the API will reject.",
                  },
                ],
              }}
            />

            <ProjectCard
              title="Demand Planner — Multi-Channel Inventory & Forecasting Platform"
              description="SaaS platform for e-commerce sellers to forecast demand, manage stock across warehouses, and automate purchase orders by syncing live sales and inventory from Shopify, eBay, and ShipStation. Replaces spreadsheet-driven planning with seasonality-aware forecasts, vendor-aware POs, and SKU-level replenishment alerts."
              tags={[
                "React",
                "TypeScript",
                "Vite",
                "Express",
                "Node.js",
                "PostgreSQL",
                "Drizzle ORM",
                "Shopify API",
                "eBay API",
                "ShipStation API",
                "Stripe Billing",
                "TanStack Query",
                "Tailwind CSS",
              ]}
              isConfidential
              confidentialNote="Built for a private client under NDA. Source, screenshots, and the live deployment can't be shared publicly."
              details={{
                role: "Full Stack Engineer — Integrations & Platform",
                duration: "Multi-month engagement, ongoing iteration",
                status:
                  "In production — serving paying subscribers on tiered Stripe plans",
                overview: [
                  "Demand Planner is a multi-tenant SaaS that pulls live product, inventory, and order data from a seller's connected sales channels (Shopify, eBay, ShipStation) and turns it into actionable replenishment intelligence — seasonality-aware forecasts, warehouse-aware on-order tracking, vendor-grouped purchase orders, and SKU-level urgency indicators.",
                  "I owned the third-party integration layer end-to-end (OAuth, webhook ingestion, SKU/sales sync, reconciliation), led a large-scale refactor of a monolithic routes file into a modular controller/route/service architecture, and shipped forecasting, billing, and purchase-order workflow improvements alongside the core integration work.",
                ],
                highlights: [
                  "Shopify integration — full OAuth install flow, product/variant/inventory sync, order webhook ingestion, and live sales-data backfill mapped to internal SKU records",
                  "eBay & ShipStation integrations — connector services for catalog, sales, and fulfillment data with per-tenant credential storage and encrypted tokens",
                  "Seasonality-aware forecasting — calculation engine that handles months with zero sales, switches methods cleanly, and surfaces historical vs. projected demand",
                  "Purchase-order workflow — auto-grouping by vendor, vendor-filtered product search, status KPI cards, pagination, and standardized PO numbering",
                  "Warehouse-aware inventory — per-warehouse on-order quantities, incoming-orders breakdown, and color-coded replenishment urgency",
                  "Stripe billing — tiered subscription plans (Essentials and above), enforced SKU limits, free-trial banner, and a billing/usage dashboard",
                  "Multi-tenant auth — Passport-based local auth, session storage, and per-tenant data isolation across all integrations",
                ],
                architecture: [
                  {
                    title: "Frontend",
                    body: "React + TypeScript + Vite, Wouter for routing, TanStack Query for server state, Radix UI + Tailwind for the design system, React Hook Form + Zod for validated forms",
                  },
                  {
                    title: "Backend",
                    body: "Express 5 on Node.js with a modular controller / route / service split — every domain (sales, forecast, purchase-order, shopify, connection, warehouse, etc.) is its own slice",
                  },
                  {
                    title: "Database",
                    body: "PostgreSQL via Drizzle ORM with shared Zod schemas (drizzle-zod) so the same types validate API requests and DB writes",
                  },
                  {
                    title: "Integrations",
                    body: "Dedicated service classes per channel (ShopifyService, OAuth handler, webhook handler) with encrypted credential storage and tenant-scoped fetch logic",
                  },
                  {
                    title: "Billing",
                    body: "Stripe subscriptions with plan-based SKU limits enforced at the API layer",
                  },
                  {
                    title: "Infra",
                    body: "Supabase Postgres in production, environment-driven config, deploy-time npm ci pipeline",
                  },
                ],
                challenges: [
                  {
                    problem:
                      "Monolithic routes file — a single routes.ts had grown into thousands of lines mixing routing, validation, business logic, and DB calls, making any change risky and reviews painful.",
                    solution:
                      "Refactored the entire HTTP layer into a controller / route / service architecture — 14 domain modules (sales, forecast, purchase-order, shopify, warehouse, connection, sku, vendor, team, user, csv, channel, dashboard, product-group), each with its own routes file mounted under /api. Kept a routes.ts.bak alongside during migration so behavior could be diff-checked endpoint-by-endpoint.",
                  },
                  {
                    problem:
                      "Shopify OAuth on a tunneled dev URL — re-installing the app or rotating the ngrok URL left stale registrations that silently broke the install flow.",
                    solution:
                      "Built an idempotent registration path that reconciles the stored callback URL against the current host on every install, replacing stale entries instead of failing. Eliminated a recurring class of 'works on my machine' bugs during client demos.",
                  },
                  {
                    problem:
                      "Forecast calibration with sparse data — months with zero sales were poisoning seasonality calculations, producing wildly off projections for slow movers.",
                    solution:
                      "Reworked the seasonality method to handle zero-sales months explicitly, ensured forecasts always recompute from the currently selected method, and aligned the historical display with the calculated values so users could trust what they saw against what the planner used.",
                  },
                  {
                    problem:
                      "Warehouse-aware inventory math — on-order and pending quantities were aggregated globally, so a multi-warehouse seller saw misleading stock projections.",
                    solution:
                      "Made on-order calculations warehouse-aware end-to-end — pending order quantities, incoming-orders display, and stock cost (only confirmed POs counted) all became per-warehouse. Added bulk inventory assignment with vendor details so onboarding new warehouses didn't require manual SKU reassignment.",
                  },
                  {
                    problem:
                      "Purchase-order creation didn't match how buyers actually order — items from multiple vendors were lumped into a single PO, forcing manual splitting.",
                    solution:
                      "Auto-grouped line items by vendor and generated one PO per vendor at creation time, added vendor-filtered product search, KPI-card status filters, pagination, and a standardized compact PO numbering format. Cut PO creation friction dramatically for clients with many vendors.",
                  },
                  {
                    problem:
                      "Subscription enforcement vs. UX — clients were hitting plan limits silently and only finding out when imports failed.",
                    solution:
                      "Wired SKU limits into the billing tier definitions, surfaced usage and trial state on the billing page, and added a brand-colored progress bar + free-trial banner so users see headroom before they hit a wall.",
                  },
                ],
              }}
            />

            <ProjectCard
              title="Vault Enterprise E-Commerce Engine"
              description="A production-grade, type-safe e-commerce backend engineered with a layered service architecture, strict input validation, and automated quality gates — designed to scale and stay maintainable in a real engineering team."
              tags={[
                "TypeScript",
                "Supabase",
                "Prisma",
                "Husky",
                "Zod",
                "Prettier",
              ]}
              image="/vault.webp"
              repoUrl="https://github.com/MirzaDanish786/vault-backend"
              isDemoShow={false}
              details={{
                role: "Backend Engineer",
                status: "In active development",
                overview: [
                  "Vault is an enterprise-oriented e-commerce backend built with a strong emphasis on correctness, type-safety, and long-term maintainability. The codebase is organized around a layered service architecture (controllers → services → repositories) so business rules, persistence, and transport concerns are cleanly separated and independently testable.",
                  "Every public boundary — from HTTP request bodies to environment configuration — is validated through Zod schemas, which means invalid data is rejected at the edge with clear, structured errors instead of surfacing as cryptic runtime exceptions deeper in the stack.",
                ],
                highlights: [
                  "Layered service architecture cleanly separating routing, business logic, and data access — each layer is replaceable without touching the others.",
                  "End-to-end type safety: Zod-validated request DTOs flow into Prisma-typed queries, eliminating most classes of runtime data bugs.",
                  "Domain-aware error handling with a centralized exception layer that maps internal errors to consistent, machine-readable HTTP responses.",
                  "Automated git hooks (Husky + lint-staged) enforcing formatting, linting, and type-checks before any commit reaches the repository.",
                  "Prisma schema modeling for products, variants, inventory, orders, and users — designed for relational integrity and indexed query paths.",
                  "Deterministic Prettier + ESLint configuration to keep the codebase consistent across contributors and IDEs.",
                ],
                architecture: [
                  {
                    title: "Service & Repository Layers",
                    body: "Controllers handle only transport (HTTP parsing, status codes). Services own business rules and orchestration. Repositories isolate Prisma so the persistence layer can evolve (or be mocked in tests) without rippling into business logic.",
                  },
                  {
                    title: "Validation as a First-Class Concern",
                    body: "Zod schemas are co-located with each route and reused for both runtime validation and TypeScript type inference, ensuring the static type system and the runtime contract never drift apart.",
                  },
                  {
                    title: "Operational Quality Gates",
                    body: "Husky pre-commit and pre-push hooks run lint-staged, Prettier, ESLint, and tsc against changed files — catching issues before they reach review.",
                  },
                ],
                techStack: [
                  {
                    category: "Language & Runtime",
                    items: ["TypeScript", "Node.js"],
                  },
                  {
                    category: "Data Layer",
                    items: ["Supabase (Postgres)", "Prisma ORM"],
                  },
                  {
                    category: "Validation & Errors",
                    items: ["Zod", "Custom exception layer"],
                  },
                  {
                    category: "Tooling & DX",
                    items: ["Husky", "lint-staged", "ESLint", "Prettier"],
                  },
                ],
                challenges: [
                  {
                    problem:
                      "Keeping runtime request validation perfectly in sync with TypeScript types as the API surface grows.",
                    solution:
                      "Adopted Zod as the single source of truth — schemas double as runtime validators and as the source for inferred TypeScript types, so a schema change propagates to types automatically.",
                  },
                  {
                    problem:
                      "Preventing inconsistent error shapes leaking from different layers (Prisma errors, validation errors, business errors).",
                    solution:
                      "Built a centralized error-handling middleware that classifies thrown errors and serializes them into a uniform JSON envelope with appropriate status codes, making the API predictable for downstream clients.",
                  },
                ],
              }}
            />
            <ProjectCard
              title="Kicks E-Commerce Frontend"
              description="A responsive, component-driven e-commerce storefront with paginated product browsing, interactive sliders, and a polished, performance-conscious UI."
              tags={["React.js", "TailwindCSS", "Swiper"]}
              image="/kicks-ecommerce.webp"
              repoUrl="https://github.com/MirzaDanish786/Ecommerce-frontend-ReactJS"
              demoUrl="https://kicks-e-commerce-frontend.vercel.app/"
              details={{
                role: "Frontend Developer",
                status: "Live",
                overview:
                  "Kicks is a responsive e-commerce frontend focused on a premium browsing experience: clean information hierarchy, smooth product navigation, and fast first paint. The UI is built with reusable, prop-driven components so feature work compounds rather than duplicating styles.",
                highlights: [
                  "Pixel-clean responsive layout from mobile (320px) up to wide desktops, built entirely on Tailwind utilities for consistency.",
                  "Component-driven product browsing with reusable cards, filters, and pagination — easy to extend with new categories.",
                  "Interactive product sliders powered by Swiper, with touch gestures, lazy-loaded images, and snap-to-card scrolling.",
                  "Optimized asset loading and minimal client state to keep the storefront snappy on slow networks.",
                ],
                techStack: [
                  { category: "Framework", items: ["React.js", "Vite"] },
                  { category: "Styling", items: ["Tailwind CSS"] },
                  { category: "Interactivity", items: ["Swiper.js"] },
                  { category: "Deployment", items: ["Vercel"] },
                ],
              }}
            />

            <ProjectCard
              title="Jadoo Travel"
              description="A high-performance travel landing page focused on motion design, narrative scroll, and a premium brand feel — built with React and Framer Motion."
              tags={["React.js", "TailwindCSS", "FramerMotion", "Splide.js"]}
              image="/travel-site.webp"
              repoUrl="https://github.com/MirzaDanish786/travel-webapp"
              demoUrl="https://travel-webapp-chi.vercel.app/"
              details={{
                role: "Frontend Developer",
                status: "Live",
                overview:
                  "Jadoo Travel is a marketing landing page that uses motion as a storytelling tool. Each section eases in as it enters the viewport, guiding the visitor through the brand without feeling busy. The architecture is intentionally lightweight so the animation budget goes to user-facing polish, not framework overhead.",
                highlights: [
                  "Scroll-triggered animations using Framer Motion's viewport detection — smooth on desktop, gracefully reduced on low-power devices.",
                  "Component-based section layout (hero, services, destinations, testimonials, CTA) so each block can be reordered or A/B-tested independently.",
                  "Splide-powered destination carousel with accessible keyboard navigation and lazy-loaded imagery.",
                  "Tailwind design tokens centralize spacing, typography, and color so the whole site can be re-themed in minutes.",
                ],
                techStack: [
                  { category: "Framework", items: ["React.js", "Vite"] },
                  { category: "Styling", items: ["Tailwind CSS"] },
                  {
                    category: "Motion & Carousel",
                    items: ["Framer Motion", "Splide.js"],
                  },
                  { category: "Deployment", items: ["Vercel"] },
                ],
              }}
            />
            <ProjectCard
              title="Solana Network UI"
              description="A high-fidelity dashboard translating Solana network metrics into a real-time, animation-rich data experience built from scratch with vanilla web fundamentals."
              tags={["HTML 5", "CSS 3", "JavaScript", "DOM"]}
              image="/solana.webp"
              repoUrl="https://github.com/MirzaDanish786/Intern_Task-3-Solana-Project-"
              demoUrl="https://intern-task-3-solana-project.vercel.app/"
              details={{
                role: "Frontend Developer (Internship Task)",
                status: "Live",
                overview:
                  "Solana Network UI is a metrics visualization built without any UI framework — pure HTML, CSS, and vanilla JavaScript driving the DOM. The goal was to demonstrate that a polished, performant interface is achievable with web fundamentals when the architecture is intentional.",
                highlights: [
                  "Viewport-aware counters that animate large network numbers (TPS, validators, block height) only when they enter view, saving CPU on offscreen elements.",
                  "State-driven tab system implemented with vanilla JS — no framework overhead, no re-render churn.",
                  "Hand-built CSS architecture with custom properties for theming and a clean cascade — no utility framework dependency.",
                  "Cross-browser tested layout with focus on smooth scroll, reduced motion fallbacks, and accessible keyboard navigation.",
                ],
                techStack: [
                  {
                    category: "Languages",
                    items: ["HTML5", "CSS3", "JavaScript (ES6+)"],
                  },
                  { category: "APIs", items: ["DOM", "IntersectionObserver"] },
                  { category: "Deployment", items: ["Vercel"] },
                ],
              }}
            />
          </RevealGroup>
        </div>
      </section>

      {/* Knowledge Brain Section */}
      {/* <section className="relative py-20 md:py-28">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <KnowledgeBrain />
        </div>
      </section> */}

      {/* Experience Section */}
      <section id="experience" className="relative py-20 md:py-28">
        <Ambient variant={3} />

        <div className="container relative z-10">
          <SectionHeading
            title="Work Experience"
            subtitle="My professional journey"
          />

          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <CertificatesSection />

      {/* Contact Section */}
      <section id="contact" className="relative py-20 md:py-28">
        <Ambient variant={4} />

        <div className="container relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's work together" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <a
                href="mailto:baigmirzadanish3@gmail.com"
                className="group flex items-center gap-4 mb-6 p-3 -mx-3 rounded-lg hover:bg-zinc-800/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-phthalo-900/40 transition-colors">
                  <Mail className="h-5 w-5 text-phthalo-400" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm text-zinc-500">Email</div>
                  <div className="font-medium truncate group-hover:text-phthalo-200 transition-colors">
                    baigmirzadanish3@gmail.com
                  </div>
                </div>
              </a>

              <SocialLinks />

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <h4 className="text-lg font-medium mb-4">Current Status</h4>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-phthalo-500 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-phthalo-600"></span>
                  </span>
                  <span>
                    Open to opportunities in Full Stack Engineering, Backend
                    Architecture, and Cloud / DevOps roles!
                  </span>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link href="/" className="font-bold text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-300 via-phthalo-500 to-phthalo-700">
                Danish
              </span>
              <span className="text-white">Dev</span>
            </Link>
            <p className="text-sm text-zinc-500 mt-2">
              © {new Date().getFullYear()} Mirza Muhammad Danish Baig. All
              rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="https://github.com/MirzaDanish786"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link
              href="https://www.linkedin.com/in/mirza-danish-baig-08a067333/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <a href="mailto:baigmirzadanish3@gmail.com">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
