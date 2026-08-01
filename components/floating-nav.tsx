"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useMobile } from "@/hooks/use-mobile";
import { smoothScrollToId } from "@/components/smooth-hash-scroll";

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const isMobile = useMobile();

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Certificates", href: "#certificates" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/MirzaDanish786",
      icon: Github,
      external: true,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/mirza-danish-baig-08a067333/",
      icon: Linkedin,
      external: true,
    },
    {
      name: "Email",
      href: "mailto:baigmirzadanish3@gmail.com",
      icon: Mail,
      external: false,
    },
  ];

  // Lock body scroll while the mobile menu is open, compensating for the
  // scrollbar width so the page doesn't shift underneath the overlay.
  useEffect(() => {
    if (!isOpen) return;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const ids = navItems
      .map((i) => i.href.slice(1))
      .filter((id) => document.getElementById(id));
    if (ids.length === 0) return;

    const visibleRatios = new Map<string, number>();

    const recomputeActive = () => {
      let bestId: string | null = null;
      let bestRatio = 0;
      visibleRatios.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });
      setActiveId(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleRatios.set(entry.target.id, entry.intersectionRatio);
        });
        recomputeActive();
      },
      {
        // Account for floating navbar height at the top
        rootMargin: "-96px 0px -40% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.slice(1);
      if (smoothScrollToId(id)) {
        setActiveId(id);
        if (history.replaceState) {
          history.replaceState(null, "", href);
        }
      }
    }
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Brand pill — top left */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative px-5 py-3 rounded-full bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 shadow-lg">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-phthalo-500/20 to-phthalo-700/20 rounded-full blur opacity-50"></div>

          <Link
            href="/"
            className="relative flex items-center gap-2 font-bold text-lg"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-phthalo-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-phthalo-500"></span>
            </span>
            <span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-300 via-phthalo-500 to-phthalo-600">
                Danish
              </span>
              <span className="text-white">Dev</span>
            </span>
          </Link>
        </div>
      </motion.div>

      <motion.div
        className="fixed top-6 right-6 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div
          className={`relative rounded-full bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 shadow-lg ${
            isMobile ? "p-1.5" : "px-4 py-3"
          }`}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-phthalo-500/20 to-phthalo-700/20 rounded-full blur opacity-50"></div>

          {isMobile ? (
            <div className="relative flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="relative z-50 text-zinc-400 hover:text-white hover:bg-zinc-700/50"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          ) : (
            <div className="relative flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeId === item.href.slice(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative px-3 py-1 text-sm font-medium transition-colors ${
                      isActive ? "text-white" : "text-zinc-400 hover:text-white"
                    }`}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                    <span
                      className={`pointer-events-none absolute left-3 right-3 bottom-0 h-[2px] origin-left bg-gradient-to-r from-phthalo-300 via-phthalo-500 to-phthalo-700 rounded-full transition-transform duration-300 ease-out ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </a>
                );
              })}

              <a
                href="/dani-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group relative ml-3 inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-gradient-to-r from-phthalo-600 to-phthalo-800 px-4 py-1.5 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-phthalo-700/25"
              >
                <Download className="relative z-10 h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                <span className="relative z-10">Resume</span>
                <span className="absolute inset-0 bg-gradient-to-r from-phthalo-500 to-phthalo-700 opacity-0 transition-opacity group-hover:opacity-100"></span>
              </a>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 overflow-hidden bg-zinc-950/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Ambient glow, echoing the hero */}
            <div className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-phthalo-600/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-phthalo-800/20 blur-3xl" />

            <nav className="relative flex h-full flex-col justify-center px-8 pb-10 pt-24">
              {navItems.map((item, i) => {
                const isActive = activeId === item.href.slice(1);
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`group relative flex items-center gap-4 border-b border-zinc-800/60 py-4 transition-colors ${
                      isActive ? "text-white" : "text-zinc-400"
                    }`}
                    onClick={(e) => handleNavClick(e, item.href)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.08, duration: 0.3 }}
                  >
                    <span
                      className={`font-mono text-xs tabular-nums transition-colors ${
                        isActive ? "text-phthalo-400" : "text-zinc-600"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-2xl font-semibold tracking-tight">
                      {item.name}
                    </span>
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-phthalo-500 shadow-[0_0_10px_2px] shadow-phthalo-500/50" />
                    )}
                  </motion.a>
                );
              })}

              <motion.div
                className="mt-8 space-y-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * navItems.length + 0.12, duration: 0.3 }}
              >
                <a
                  href="/dani-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-phthalo-600 to-phthalo-800 px-6 py-3.5 text-base font-medium text-white shadow-lg shadow-phthalo-900/40"
                  onClick={() => setIsOpen(false)}
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>

                <div className="flex items-center justify-center gap-3">
                  {socialLinks.map(({ name, href, icon: Icon, external }) => (
                    <a
                      key={name}
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-colors hover:border-phthalo-700 hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                      <span className="sr-only">{name}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
