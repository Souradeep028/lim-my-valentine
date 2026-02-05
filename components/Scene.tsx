"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface SceneProps {
  children: ReactNode;
  sceneKey: string;
}

export default function Scene({ children, sceneKey }: SceneProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center relative z-10"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
