"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BoyWalking, BoyKneeling, Girl, HeartItem, RoseItem, SparkleItem } from "./Characters";
import ArcadeButton from "./ArcadeButton";

interface ProposalSceneProps {
  onYes: () => void;
}

interface FlyingItem {
  id: number;
  x: number;
  lane: number;
  type: "heart" | "rose" | "sparkle";
  color?: string;
  collected: boolean;
  missed: boolean;
}

const LANE_Y = [0, 50, 100];
const GAME_SPEED = 2.5;
const SPAWN_INTERVAL = 900;
const ITEM_COLLECT_DIST = 50;
const WIN_SCORE = 12;
const BOY_LEFT = 60;

const COLORS = ["#EC4899", "#F9A8D4", "#DB2777", "#F472B6", "#B76E79"];
const LANE_LABELS = ["🌱 Ground", "🌸 Mid", "☁️ High"];
const LANE_COLORS: ("rose" | "pink" | "gold")[] = ["rose", "pink", "gold"];

export default function ProposalScene({ onYes }: ProposalSceneProps) {
  const [boyLane, setBoyLane] = useState(0);
  const [items, setItems] = useState<FlyingItem[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [phase, setPhase] = useState<"game" | "win" | "kneel" | "ask">("game");
  const [popups, setPopups] = useState<{ id: number; text: string; color: string }[]>([]);

  const itemIdRef = useRef(0);
  const gameLoopRef = useRef<number | null>(null);
  const spawnTimerRef = useRef<NodeJS.Timeout | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageWidth = useRef(350);
  const boyLaneRef = useRef(boyLane);

  // Keep ref in sync for game loop closure
  useEffect(() => {
    boyLaneRef.current = boyLane;
  }, [boyLane]);

  const switchLane = useCallback(
    (lane: number) => {
      if (phase !== "game") return;
      setBoyLane(lane);
    },
    [phase]
  );

  // Spawn items
  useEffect(() => {
    if (phase !== "game") return;

    const spawn = () => {
      const types: FlyingItem["type"][] = ["heart", "heart", "heart", "rose", "sparkle"];
      const type = types[Math.floor(Math.random() * types.length)];
      const lane = Math.floor(Math.random() * 3);

      setItems((prev) => [
        ...prev,
        {
          id: itemIdRef.current++,
          x: stageWidth.current + 40,
          lane,
          type,
          color: type === "heart" ? COLORS[Math.floor(Math.random() * COLORS.length)] : undefined,
          collected: false,
          missed: false,
        },
      ]);
    };

    spawn();
    spawnTimerRef.current = setInterval(spawn, SPAWN_INTERVAL);
    return () => {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    };
  }, [phase]);

  // Game loop
  useEffect(() => {
    if (phase !== "game") return;

    if (stageRef.current) {
      stageWidth.current = stageRef.current.offsetWidth;
    }

    let animId: number;
    const loop = () => {
      setItems((prev) =>
        prev
          .map((item) => {
            if (item.collected || item.missed) return item;
            const newX = item.x - GAME_SPEED;

            if (
              Math.abs(newX - BOY_LEFT) < ITEM_COLLECT_DIST &&
              item.lane === boyLaneRef.current
            ) {
              setScore((s) => {
                const newScore = s + 1;
                if (newScore >= WIN_SCORE) {
                  setTimeout(() => setPhase("win"), 300);
                }
                return newScore;
              });
              setCombo((c) => {
                const nc = c + 1;
                setBestCombo((b) => Math.max(b, nc));
                return nc;
              });

              const texts = ["Nice!", "Lovely!", "Sweet!", "Amazing!", "Beautiful!"];
              const popId = Date.now() + item.id;
              setPopups((p) => [
                ...p,
                { id: popId, text: texts[Math.floor(Math.random() * texts.length)], color: item.color || "#EC4899" },
              ]);
              setTimeout(() => setPopups((p) => p.filter((pp) => pp.id !== popId)), 700);

              return { ...item, x: newX, collected: true };
            }

            if (newX < -40) {
              setCombo(0);
              return { ...item, x: newX, missed: true };
            }

            return { ...item, x: newX };
          })
          .filter((item) => !(item.missed && item.x < -100) && !item.collected)
      );

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    gameLoopRef.current = animId;

    return () => cancelAnimationFrame(animId);
  }, [phase]);

  // Win → kneel → ask
  useEffect(() => {
    if (phase === "win") {
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      setTimeout(() => setPhase("kneel"), 600);
      setTimeout(() => setPhase("ask"), 2400);
    }
  }, [phase]);

  const handleYesClick = useCallback(
    (e?: React.MouseEvent | React.TouchEvent) => {
      e?.stopPropagation();
      e?.preventDefault();
      onYes();
    },
    [onYes]
  );

  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center px-4 text-center relative z-10 select-none overflow-hidden"
      style={{ touchAction: "manipulation" }}
    >
      {/* === HUD === */}
      <AnimatePresence>
        {phase === "game" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mb-3 w-full max-w-md"
          >
            <p className="text-base font-bold mb-2 uppercase tracking-wider" style={{ color: "#EC4899" }}>
              Catch {WIN_SCORE} items to reach Lim!
            </p>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <HeartItem size={20} />
                <span className="text-lg font-bold" style={{ color: "#EC4899" }}>
                  {score} / {WIN_SCORE}
                </span>
              </div>
              {combo > 1 && (
                <motion.div
                  key={combo}
                  initial={{ scale: 1.5, rotate: -5 }}
                  animate={{ scale: 1, rotate: 0 }}
                >
                  <span
                    className="text-sm font-black px-3 py-1 rounded-xl"
                    style={{
                      background: "linear-gradient(135deg, #FDE68A, #D4AF37)",
                      color: "#7C2D12",
                      boxShadow: "0 2px 0 0 #A68B2A",
                    }}
                  >
                    {combo}x COMBO!
                  </span>
                </motion.div>
              )}
            </div>

            <div className="w-full h-4 rounded-xl overflow-hidden" style={{ border: "2px solid #EC4899", backgroundColor: "#FFF5F5" }}>
              <motion.div
                className="h-full rounded-lg"
                style={{ background: "linear-gradient(90deg, #F9A8D4, #EC4899, #DB2777)" }}
                animate={{ width: `${Math.min((score / WIN_SCORE) * 100, 100)}%` }}
                transition={{ type: "spring", stiffness: 200 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Popups === */}
      <AnimatePresence>
        {popups.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1, y: 0 }}
            animate={{ opacity: 0, y: -70, scale: 1.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute text-xl font-black z-30 pointer-events-none uppercase"
            style={{ top: "30%", color: p.color }}
          >
            {p.text}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ===== GAME STAGE ===== */}
      <div
        ref={stageRef}
        className="relative w-full max-w-md rounded-2xl overflow-hidden mb-4"
        style={{
          height: "220px",
          background: "linear-gradient(180deg, #FFF5F5 0%, #FCE4EC 60%, #F8BBD0 100%)",
          border: "3px solid #EC4899",
          boxShadow: "0 4px 0 0 #BE185D, 0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        {/* Lane lines */}
        {[0, 1, 2].map((lane) => (
          <div
            key={lane}
            className="absolute left-0 right-0"
            style={{
              bottom: `${30 + LANE_Y[lane]}px`,
              height: "1px",
              background: boyLane === lane
                ? "linear-gradient(90deg, transparent, #EC4899, transparent)"
                : "linear-gradient(90deg, transparent, #E8C4C8, transparent)",
              opacity: boyLane === lane ? 0.6 : 0.2,
              transition: "all 0.15s",
            }}
          />
        ))}

        {/* Ground */}
        <div
          className="absolute bottom-0 left-0 right-0 h-7"
          style={{ background: "linear-gradient(0deg, #E8C4C8, transparent)" }}
        />

        {/* Scrolling ground dots */}
        <motion.div
          className="absolute bottom-3 flex gap-6"
          animate={{ x: [0, -24] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full opacity-30" style={{ backgroundColor: "#B76E79" }} />
          ))}
        </motion.div>

        {/* Flying items */}
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="absolute pointer-events-none"
            style={{
              left: `${item.x}px`,
              bottom: `${30 + LANE_Y[item.lane]}px`,
              transform: "translateY(50%)",
            }}
            animate={item.collected ? { scale: 2, opacity: 0 } : {}}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              {item.type === "heart" && <HeartItem size={28} color={item.color} />}
              {item.type === "rose" && <RoseItem size={30} />}
              {item.type === "sparkle" && <SparkleItem size={26} />}
            </motion.div>
          </motion.div>
        ))}

        {/* Boy character */}
        <motion.div
          className="absolute"
          style={{ left: `${BOY_LEFT}px` }}
          animate={{ bottom: `${26 + LANE_Y[boyLane]}px` }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <AnimatePresence mode="wait">
            {(phase === "game" || phase === "win") && (
              <motion.div key="walking" exit={{ opacity: 0 }}>
                <motion.div
                  animate={{ rotate: [-2, 2, -2] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  <BoyWalking size={40} />
                </motion.div>
              </motion.div>
            )}
            {(phase === "kneel" || phase === "ask") && (
              <motion.div
                key="kneeling"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
              >
                <BoyKneeling size={45} />
                {phase === "ask" && (
                  <div className="absolute -top-3 left-10 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0], y: -30 }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      >
                        <HeartItem size={12} color={COLORS[i]} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Lim appears when game ends */}
        <AnimatePresence>
          {(phase === "kneel" || phase === "ask") && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="absolute bottom-5 flex flex-col items-center"
              style={{ left: `${BOY_LEFT + 80}px` }}
            >
              <Girl size={45} />
              <span className="text-[10px] font-bold mt-0.5" style={{ color: "#EC4899" }}>
                Lim
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Win flash */}
        <AnimatePresence>
          {phase === "win" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
              style={{ backgroundColor: "#F9A8D4" }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ===== ARCADE LANE BUTTONS ===== */}
      <AnimatePresence>
        {phase === "game" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex gap-3 mb-4"
          >
            {LANE_LABELS.map((label, i) => (
              <ArcadeButton
                key={i}
                color={LANE_COLORS[i]}
                size="sm"
                active={boyLane === i}
                onClick={() => switchLane(i)}
              >
                {label}
              </ArcadeButton>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Proposal ===== */}
      <AnimatePresence>
        {phase === "ask" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {bestCombo >= 5 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm mb-1 font-bold"
                style={{ color: "#D4AF37" }}
              >
                Best combo: {bestCombo}x! ✨
              </motion.p>
            )}

            <motion.h1
              className="text-4xl md:text-6xl mb-2 gentle-glow"
              style={{ fontFamily: "'Great Vibes', cursive", color: "#EC4899" }}
            >
              Lim...
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-3xl md:text-5xl mb-8 gentle-glow"
              style={{ fontFamily: "'Great Vibes', cursive", color: "#B76E79" }}
            >
              Will you be my Valentine?
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", bounce: 0.5 }}
            >
              <ArcadeButton color="pink" size="lg" glow onClick={handleYesClick}>
                Yes! 💖
              </ArcadeButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
