import { useEffect, useState } from "react";

interface Props {
  onDone: () => void;
}

export default function AnalysingScreen({ onDone }: Props) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setFadeIn(true));
    const timer = setTimeout(onDone, 3200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="relative flex flex-col h-full items-center justify-center"
      style={{
        backgroundColor: "#ffffff",
        opacity: fadeIn ? 1 : 0,
        transition: "opacity 0.5s ease",
      }}
    >
      {/* Hero BG — reused pattern */}
      <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: 216 }}>
        <div className="absolute inset-0" style={{ backgroundColor: "#f8fdff" }} />
        <div
          className="absolute"
          style={{
            width: 180,
            height: 230,
            left: -54,
            top: -31,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(83,46,212,0.08) 0%, transparent 70%)",
            transform: "rotate(-85deg)",
          }}
        />
        <div
          className="absolute"
          style={{
            width: 196,
            height: 168,
            right: -70,
            top: -41,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(83,46,212,0.06) 0%, transparent 70%)",
            transform: "rotate(19deg)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full"
          style={{
            height: 64,
            background: "linear-gradient(to bottom, rgba(255,255,255,0), #ffffff)",
          }}
        />
      </div>

      {/* Content — vertically centered, pushed slightly below midpoint */}
      <div
        className="relative flex flex-col items-center text-center"
        style={{ marginTop: 86, padding: "0 20px", maxWidth: 335 }}
      >
        {/* Magnifying glass icon with pulse animation */}
        <div
          style={{
            width: 64,
            height: 64,
            marginBottom: 24,
            animation: "analysingPulse 2s ease-in-out infinite",
          }}
        >
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.08))" }}
          >
            <circle cx="28" cy="28" r="18" fill="#e8e8e8" />
            <circle cx="28" cy="28" r="18" stroke="#d0d0d0" strokeWidth="3" fill="none" />
            <circle cx="28" cy="28" r="12" fill="#f5f5f5" />
            <line
              x1="41"
              y1="41"
              x2="56"
              y2="56"
              stroke="#c0c0c0"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="41"
              y1="41"
              x2="56"
              y2="56"
              stroke="#d4d4d4"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p
          className="font-semibold"
          style={{
            fontSize: 28,
            lineHeight: "36px",
            letterSpacing: "-0.1px",
            color: "#121212",
          }}
        >
          Analysing your family's financial risk score...
        </p>

        <p
          style={{
            fontSize: 16,
            lineHeight: "24px",
            color: "#757575",
            marginTop: 8,
          }}
        >
          Checking hospitalisation risk by age, income protection gaps, and cover
          details.
        </p>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes analysingPulse {
          0%, 100% { transform: scale(1) rotate(-15deg); opacity: 0.85; }
          50%      { transform: scale(1.12) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
