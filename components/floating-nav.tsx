"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

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
      <motion.div
        className="fixed top-6 right-6 -translate-x-1/2 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative px-4 py-3 rounded-full bg-zinc-800/80 backdrop-blur-md border border-zinc-700/50 shadow-lg">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-phthalo-500/20 to-phthalo-700/20 rounded-full blur opacity-50"></div>

          {isMobile ? (
            <div className="relative flex items-center justify-between">
              <Link href="/" className="font-bold text-lg">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-300 via-phthalo-500 to-phthalo-600">
                  Danish
                </span>
                <span className="text-white">Dev</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:text-white hover:bg-zinc-700/50"
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
              <Link href="/" className="font-bold text-lg mr-4">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-300 via-phthalo-500 to-phthalo-600">
                  Danish
                </span>
                <span className="text-white">Dev</span>
              </Link>
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
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile menu */}
      {isMobile && (
        <motion.div
          className={`fixed inset-0 z-40 bg-black/90 backdrop-blur-md ${isOpen ? "block" : "hidden"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            {navItems.map((item) => {
              const isActive = activeId === item.href.slice(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className="group relative px-8 py-4 text-2xl font-medium text-white transition-colors"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.name}
                  <span
                    className={`pointer-events-none absolute left-8 right-8 bottom-2 h-[2px] origin-left bg-gradient-to-r from-phthalo-300 via-phthalo-500 to-phthalo-700 rounded-full transition-transform duration-300 ease-out ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </div>
        </motion.div>
      )}
    </>
  );
}
