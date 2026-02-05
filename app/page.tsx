"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import FloatingPetals from "@/components/FloatingPetals";
import ArcadeButton from "@/components/ArcadeButton";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center relative">
      <FloatingPetals />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 text-6xl"
        >
          🌹
        </motion.div>

        <h1
          className="text-5xl md:text-7xl mb-4 gentle-glow"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#EC4899" }}
        >
          A Story Written
        </h1>
        <h2
          className="text-4xl md:text-6xl mb-12 gentle-glow"
          style={{ fontFamily: "'Great Vibes', cursive", color: "#B76E79" }}
        >
          For You, Lim
        </h2>

        <ArcadeButton color="pink" size="lg" glow onClick={() => router.push("/story")}>
          Begin 💕
        </ArcadeButton>
      </motion.div>
    </div>
  );
}
