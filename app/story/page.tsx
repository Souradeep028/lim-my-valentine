"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingPetals from "@/components/FloatingPetals";
import Celebration from "@/components/Celebration";
import ProposalScene from "@/components/ProposalScene";
import ArcadeButton from "@/components/ArcadeButton";

const scenes = [
  {
    id: "scene1",
    emoji: "💫",
    title: "The day we first met...",
    text: "Something in the universe shifted. I didn't know it then, but my life was about to change forever.",
    extraEmoji: ["💕"],
  },
  {
    id: "scene2",
    emoji: "🌸",
    title: "Every moment with you...",
    text: "Became a memory I never wanted to forget. Your laugh, your smile, the way you light up every room.",
    extraEmoji: ["🌷", "🌺", "🌹"],
  },
  {
    id: "scene3",
    emoji: "🌹",
    title: "You make my world beautiful...",
    text: "Like flowers blooming in spring, you brought color and warmth into my life when I needed it most.",
    flower: true,
  },
  {
    id: "scene4",
    emoji: "✨",
    title: "I can't imagine life without you...",
    text: "Every day with you feels like a gift. You are my favorite person, my best friend, my everything.",
    glow: true,
  },
];

export default function StoryPage() {
  const [currentScene, setCurrentScene] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const isProposal = currentScene === scenes.length;

  const handleNext = () => {
    setCurrentScene((prev) => prev + 1);
  };

  const handleYes = () => {
    setShowCelebration(true);
  };

  if (showCelebration) {
    return (
      <div className="relative min-h-dvh">
        <FloatingPetals />
        <Celebration />
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh">
      <FloatingPetals />

      <AnimatePresence mode="wait">
        {!isProposal ? (
          <motion.div
            key={scenes[currentScene].id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex min-h-dvh flex-col items-center justify-center px-6 text-center relative z-10"
          >
            {/* Scene Emoji */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
              className={`mb-6 text-6xl ${scenes[currentScene].flower ? "grow-flower" : ""}`}
            >
              {scenes[currentScene].emoji}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`text-3xl md:text-5xl mb-6 ${scenes[currentScene].glow ? "gentle-glow" : ""}`}
              style={{ fontFamily: "'Great Vibes', cursive", color: "#EC4899" }}
            >
              {scenes[currentScene].title}
            </motion.h1>

            {/* Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-lg md:text-xl max-w-md leading-relaxed mb-10"
              style={{ color: "#B76E79" }}
            >
              {scenes[currentScene].text}
            </motion.p>

            {/* Extra floating emojis */}
            {scenes[currentScene].extraEmoji && (
              <div className="flex gap-3 mb-8">
                {scenes[currentScene].extraEmoji!.map((e, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
                    transition={{ delay: 1 + i * 0.2, duration: 2, repeat: Infinity }}
                    className="text-3xl"
                  >
                    {e}
                  </motion.span>
                ))}
              </div>
            )}

            {/* Next button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <ArcadeButton color="white" size="md" onClick={handleNext}>
                Continue 💗
              </ArcadeButton>
            </motion.div>
          </motion.div>
        ) : (
          /* Proposal Scene - animated walk + kneel */
          <motion.div
            key="proposal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ProposalScene onYes={handleYes} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
