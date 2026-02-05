"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ArcadeButtonProps {
  children: ReactNode;
  onClick?: (e: React.MouseEvent | React.TouchEvent) => void;
  color?: "pink" | "rose" | "gold" | "white";
  size?: "sm" | "md" | "lg";
  active?: boolean;
  glow?: boolean;
  className?: string;
}

const colorMap = {
  pink: {
    bg: "#EC4899",
    shadow: "#BE185D",
    highlight: "#F9A8D4",
    text: "white",
  },
  rose: {
    bg: "#B76E79",
    shadow: "#8B4553",
    highlight: "#E8C4C8",
    text: "white",
  },
  gold: {
    bg: "#D4AF37",
    shadow: "#A68B2A",
    highlight: "#F0D878",
    text: "white",
  },
  white: {
    bg: "#FFF5F5",
    shadow: "#E8C4C8",
    highlight: "#FFFFFF",
    text: "#EC4899",
  },
};

const sizeMap = {
  sm: { px: "px-4", py: "py-2", text: "text-sm", round: "rounded-xl" },
  md: { px: "px-8", py: "py-3", text: "text-base", round: "rounded-2xl" },
  lg: { px: "px-10", py: "py-4", text: "text-xl", round: "rounded-2xl" },
};

export default function ArcadeButton({
  children,
  onClick,
  color = "pink",
  size = "md",
  active = false,
  glow = false,
  className = "",
}: ArcadeButtonProps) {
  const c = colorMap[color];
  const s = sizeMap[size];

  return (
    <motion.button
      whileTap={{ y: 4, boxShadow: `0 0px 0 0 ${c.shadow}` }}
      onClick={onClick}
      onTouchEnd={(e) => { e.preventDefault(); onClick?.(e); }}
      className={`
        relative font-extrabold uppercase tracking-wider cursor-pointer select-none
        ${s.px} ${s.py} ${s.text} ${s.round}
        ${glow ? "pulse-glow" : ""}
        ${className}
      `}
      style={{
        background: `linear-gradient(180deg, ${c.highlight} 0%, ${c.bg} 40%, ${c.bg} 100%)`,
        color: c.text,
        boxShadow: `0 6px 0 0 ${c.shadow}, 0 8px 15px rgba(0,0,0,0.15)`,
        border: `2px solid ${c.highlight}`,
        transform: active ? "translateY(3px)" : "translateY(0)",
        textShadow: c.text === "white" ? "0 1px 2px rgba(0,0,0,0.2)" : "none",
        transition: "transform 0.05s",
      }}
    >
      {/* Inner highlight shine */}
      <span
        className="absolute top-0 left-[10%] right-[10%] h-[40%] rounded-b-full pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 100%)`,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
