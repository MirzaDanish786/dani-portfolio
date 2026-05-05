"use client";

import { useEffect, useRef } from "react";

export function MouseFollower() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    if (!wrapper || !img) return;

    let isPressed = false;

    const applyVisual = () => {
      const scale = isPressed ? 0.88 : 1;
      img.style.transform = `translate(-2px, -2px) scale(${scale})`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      wrapper.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      wrapper.style.opacity = "1";
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
