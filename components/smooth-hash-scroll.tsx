"use client";

import { useEffect } from "react";

const SCROLL_OFFSET = 96; // matches scroll-padding-top: 6rem in globals.css
const SCROLL_DURATION = 800; // ms

let activeRaf: number | null = null;

const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function cancelActiveScroll() {
  if (activeRaf !== null) {
    cancelAnimationFrame(activeRaf);
    activeRaf = null;
  }
}

function rafScrollTo(targetY: number) {
  cancelActiveScroll();

  const startY = window.scrollY || window.pageYOffset;
  const distance = targetY - startY;
  if (Math.abs(distance) < 1) return;

  const startTime = performance.now();

  const interrupt = () => cancelActiveScroll();
  window.addEventListener("wheel", interrupt, { passive: true, once: true });
  window.addEventListener("touchstart", interrupt, { passive: true, once: true });
  window.addEventListener("keydown", interrupt, { once: true });

  const step = (now: number) => {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / SCROLL_DURATION);
    const eased = ease(t);
    window.scrollTo(0, startY + distance * eased);
    if (t < 1) {
      activeRaf = requestAnimationFrame(step);
    } else {
      activeRaf = null;
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", interrupt);
    }
  };

  activeRaf = requestAnimationFrame(step);
}

function smoothScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
  rafScrollTo(top);
  return true;
}

function smoothScrollToTop() {
  rafScrollTo(0);
}

/**
 * Intercepts clicks on same-page hash anchors AND home-link clicks while on
 * the home page, and smooth-scrolls reliably with rAF easing. Listens in the
 * capture phase so it runs before Next.js Link's preventDefault().
 */
export function SmoothHashScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Let modifier-clicks (open in new tab, etc.) and non-left clicks behave normally.
      if (
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;

      // Skip explicit opt-outs and external targets.
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Same-page hash link
      if (href.startsWith("#") && href.length >= 2) {
        const id = href.slice(1);
        if (!document.getElementById(id)) return;
        e.preventDefault();
        smoothScrollToId(id);
        if (history.replaceState) {
          history.replaceState(null, "", href);
        }
        return;
      }

      // Home link while already on home → smooth scroll to top
      if (href === "/" && window.location.pathname === "/") {
        e.preventDefault();
        e.stopPropagation();
        smoothScrollToTop();
        if (history.replaceState) {
          history.replaceState(null, "", "/");
        }
      }
    };

    // Capture phase — run BEFORE Next.js Link's React-delegated click handler.
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}

export { smoothScrollToId, smoothScrollToTop };
