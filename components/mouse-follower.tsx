"use client";

import { useEffect, useRef } from "react";

const POINTER_SELECTOR =
  'a, button, [role="button"], [role="link"], [role="menuitem"], input[type="button"], input[type="submit"], input[type="checkbox"], input[type="radio"], select, label, summary, [data-cursor="pointer"], .cursor-pointer';

export function MouseFollower() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    let isPointer = false;
    let isPressed = false;

    const applyVisual = () => {
      const offsetX = isPointer ? -9 : -2;
      const offsetY = -2;
      const scale = isPressed ? 0.88 : 1;
      img.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
      img.style.width = isPointer ? "26px" : "24px";
      img.src = isPointer ? "/cursor-pointer.png" : "/normal-cursor.png";
    };

    applyVisual();

    const handleMouseMove = (e: MouseEvent) => {
      wrapper.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      wrapper.style.opacity = "1";
      const target = e.target as HTMLElement | null;
      const next = Boolean(target?.closest(POINTER_SELECTOR));
      if (next !== isPointer) {
        isPointer = next;
        applyVisual();
      }
    };

    const handleMouseLeave = () => {
      wrapper.style.opacity = "0";
    };
    const handleMouseEnter = () => {
      wrapper.style.opacity = "1";
    };
    const handleMouseDown = () => {
      if (!isPressed) {
        isPressed = true;
        applyVisual();
      }
    };
    const handleMouseUp = () => {
      if (isPressed) {
        isPressed = false;
        applyVisual();
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        willChange: "transform",
        transition: "opacity 150ms ease",
      }}
    >
      <img
        ref={imgRef}
        src="/normal-cursor.png"
        alt=""
        draggable={false}
        className="select-none"
        style={{
          width: "24px",
          height: "auto",
          display: "block",
          transform: "translate(-2px, -2px)",
          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.45))",
        }}
      />
    </div>
  );
}
