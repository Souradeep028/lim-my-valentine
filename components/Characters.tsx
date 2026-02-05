"use client";

export function BoyWalking({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 80 112" fill="none">
      {/* Hair */}
      <ellipse cx="40" cy="16" rx="14" ry="14" fill="#4A3728" />
      {/* Head */}
      <circle cx="40" cy="20" r="12" fill="#FDBCB4" />
      {/* Eyes */}
      <circle cx="36" cy="18" r="1.5" fill="#333" />
      <circle cx="44" cy="18" r="1.5" fill="#333" />
      {/* Smile */}
      <path d="M36 24 Q40 28 44 24" stroke="#333" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="33" cy="23" rx="3" ry="1.5" fill="#F9A8D4" opacity="0.5" />
      <ellipse cx="47" cy="23" rx="3" ry="1.5" fill="#F9A8D4" opacity="0.5" />
      {/* Body - shirt */}
      <path d="M28 34 L28 60 L52 60 L52 34 Q40 30 28 34Z" fill="#4A90D9" />
      {/* Collar */}
      <path d="M35 34 L40 40 L45 34" stroke="white" strokeWidth="1" fill="none" />
      {/* Arms */}
      <path d="M28 38 L18 52" stroke="#FDBCB4" strokeWidth="5" strokeLinecap="round" />
      {/* Right arm holding up (for rose) */}
      <path d="M52 38 L62 30" stroke="#FDBCB4" strokeWidth="5" strokeLinecap="round" />
      {/* Hand */}
      <circle cx="62" cy="28" r="3" fill="#FDBCB4" />
      {/* Pants */}
      <path d="M28 60 L28 85 L38 85 L38 60Z" fill="#2C3E50" />
      <path d="M42 60 L42 85 L52 85 L52 60Z" fill="#2C3E50" />
      {/* Shoes */}
      <ellipse cx="33" cy="87" rx="7" ry="4" fill="#333" />
      <ellipse cx="47" cy="87" rx="7" ry="4" fill="#333" />
    </svg>
  );
}

export function BoyKneeling({ size = 80 }: { size?: number }) {
  return (
    <svg width={size * 1.2} height={size * 1.1} viewBox="0 0 96 88" fill="none">
      {/* Hair */}
      <ellipse cx="30" cy="12" rx="14" ry="14" fill="#4A3728" />
      {/* Head */}
      <circle cx="30" cy="16" r="12" fill="#FDBCB4" />
      {/* Eyes */}
      <circle cx="26" cy="14" r="1.5" fill="#333" />
      <circle cx="34" cy="14" r="1.5" fill="#333" />
      {/* Loving eyes - little hearts */}
      <path d="M25 13 Q26 11.5 27 13 Q26 14.5 25 13Z" fill="#EC4899" opacity="0.6" />
      <path d="M33 13 Q34 11.5 35 13 Q34 14.5 33 13Z" fill="#EC4899" opacity="0.6" />
      {/* Big smile */}
      <path d="M25 20 Q30 26 35 20" stroke="#333" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="23" cy="19" rx="3" ry="1.5" fill="#F9A8D4" opacity="0.6" />
      <ellipse cx="37" cy="19" rx="3" ry="1.5" fill="#F9A8D4" opacity="0.6" />
      {/* Body - shirt (leaning forward) */}
      <path d="M20 30 L18 55 L42 55 L44 30 Q32 26 20 30Z" fill="#4A90D9" />
      {/* Left arm on ground */}
      <path d="M20 36 L12 50" stroke="#FDBCB4" strokeWidth="5" strokeLinecap="round" />
      {/* Right arm extended with rose */}
      <path d="M44 34 L68 28" stroke="#FDBCB4" strokeWidth="5" strokeLinecap="round" />
      <circle cx="69" cy="27" r="3" fill="#FDBCB4" />
      {/* Rose in hand */}
      <line x1="70" y1="27" x2="82" y2="20" stroke="#2D8B46" strokeWidth="2" />
      {/* Rose bloom */}
      <circle cx="84" cy="17" r="6" fill="#EC4899" />
      <circle cx="81" cy="15" r="4" fill="#F9A8D4" />
      <circle cx="86" cy="14" r="3.5" fill="#DB2777" />
      {/* Rose leaf */}
      <ellipse cx="77" cy="22" rx="4" ry="2" fill="#2D8B46" transform="rotate(-20 77 22)" />
      {/* Kneeling leg */}
      <path d="M20 55 L20 72 L35 72 L42 55Z" fill="#2C3E50" />
      {/* Back leg folded */}
      <path d="M35 72 L45 72 L46 60 L42 55Z" fill="#2C3E50" />
      {/* Knee shoe */}
      <ellipse cx="28" cy="74" rx="7" ry="4" fill="#333" />
    </svg>
  );
}

export function Girl({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 80 112" fill="none">
      {/* Hair */}
      <ellipse cx="40" cy="18" rx="18" ry="18" fill="#2C1810" />
      {/* Hair flowing */}
      <path d="M22 18 Q18 40 24 55" stroke="#2C1810" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M58 18 Q62 40 56 55" stroke="#2C1810" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* Head */}
      <circle cx="40" cy="22" r="12" fill="#FDBCB4" />
      {/* Eyes */}
      <ellipse cx="36" cy="20" rx="1.8" ry="2" fill="#333" />
      <ellipse cx="44" cy="20" rx="1.8" ry="2" fill="#333" />
      {/* Eyelashes */}
      <path d="M33 18 L35 19" stroke="#333" strokeWidth="0.8" />
      <path d="M45 19 L47 18" stroke="#333" strokeWidth="0.8" />
      {/* Sweet smile */}
      <path d="M36 26 Q40 30 44 26" stroke="#EC4899" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Blush */}
      <ellipse cx="33" cy="25" rx="3" ry="1.5" fill="#F9A8D4" opacity="0.6" />
      <ellipse cx="47" cy="25" rx="3" ry="1.5" fill="#F9A8D4" opacity="0.6" />
      {/* Hair bow */}
      <path d="M48 10 L54 6 L52 12 L58 10 L52 14Z" fill="#EC4899" />
      {/* Dress */}
      <path d="M26 36 L22 75 L58 75 L54 36 Q40 32 26 36Z" fill="#EC4899" />
      {/* Dress details */}
      <path d="M32 36 L40 50 L48 36" stroke="#F9A8D4" strokeWidth="1" fill="none" />
      {/* Dress skirt flare */}
      <path d="M22 75 L18 90 L62 90 L58 75Z" fill="#F9A8D4" />
      {/* Belt/sash */}
      <rect x="26" y="50" width="28" height="3" rx="1.5" fill="#B76E79" />
      {/* Arms */}
      <path d="M26 40 L16 54" stroke="#FDBCB4" strokeWidth="5" strokeLinecap="round" />
      <path d="M54 40 L64 54" stroke="#FDBCB4" strokeWidth="5" strokeLinecap="round" />
      {/* Legs */}
      <line x1="34" y1="90" x2="34" y2="104" stroke="#FDBCB4" strokeWidth="5" />
      <line x1="46" y1="90" x2="46" y2="104" stroke="#FDBCB4" strokeWidth="5" />
      {/* Shoes */}
      <ellipse cx="34" cy="106" rx="6" ry="3" fill="#EC4899" />
      <ellipse cx="46" cy="106" rx="6" ry="3" fill="#EC4899" />
    </svg>
  );
}

export function RoseItem({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <line x1="15" y1="16" x2="15" y2="28" stroke="#2D8B46" strokeWidth="2" />
      <ellipse cx="10" cy="22" rx="4" ry="2" fill="#2D8B46" transform="rotate(-30 10 22)" />
      <circle cx="15" cy="11" r="7" fill="#EC4899" />
      <circle cx="12" cy="9" r="5" fill="#F9A8D4" />
      <circle cx="18" cy="9" r="4" fill="#DB2777" />
      <circle cx="15" cy="7" r="3" fill="#F472B6" />
    </svg>
  );
}

export function HeartItem({ size = 28, color = "#EC4899" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path
        d="M14 24 C14 24 3 17 3 9 C3 5 6 2 10 2 C12.5 2 14 4 14 4 C14 4 15.5 2 18 2 C22 2 25 5 25 9 C25 17 14 24 14 24Z"
        fill={color}
      />
      <path
        d="M10 7 Q12 5 14 8"
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkleItem({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10Z" fill="#D4AF37" />
    </svg>
  );
}
