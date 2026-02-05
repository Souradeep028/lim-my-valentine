"use client";

import { useEffect, useState } from "react";

interface Petal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

export default function FloatingPetals() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const emojis = ["🌸", "🌹", "💮", "🏵️", "🌺"];
    const generated: Petal[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 14 + Math.random() * 18,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setPetals(generated);
  }, []);

  return (
    <>
      {petals.map((p) => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </>
  );
}
