"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartItem, BoyKneeling, Girl } from "./Characters";

interface ConfettiPiece {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const COLORS = ["#EC4899", "#F9A8D4", "#DB2777", "#F472B6", "#D4AF37", "#B76E79"];

export default function Celebration() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const pieces: ConfettiPiece[] = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 16 + Math.random() * 20,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setConfetti(pieces);
  }, []);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center relative z-10">
      {/* SVG heart confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-heart"
          style={{
            left: `${c.left}%`,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <HeartItem size={c.size} color={c.color} />
        </div>
      ))}

      {/* Characters together */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        className="mb-6 flex items-end gap-2"
      >
        <BoyKneeling size={55} />
        <Girl size={55} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-5xl md:text-7xl mb-6 gentle-glow"
        style={{ fontFamily: "'Great Vibes', cursive", color: "#EC4899" }}
      >
        I Love You, Lim
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-xl md:text-2xl max-w-md leading-relaxed"
        style={{ color: "#B76E79" }}
      >
        You just made me the happiest person in the world. Happy Valentine&apos;s Day, my love.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-8 flex gap-3 items-center"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
          >
            <HeartItem size={24} color={COLORS[i % COLORS.length]} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
