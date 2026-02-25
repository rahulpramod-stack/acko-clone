import { useEffect } from "react";

interface Props {
  onDone: () => void;
}

export default function AnalysingScreen({ onDone }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className="flex flex-col items-center justify-center h-full"
      style={{ backgroundColor: "#000" }}
    >
      <style>{`
        @keyframes calcFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes calcDot {
          0%,80%,100%{ background:#2c2c2e; transform:scale(1); }
          40%{ background:#7c5cf6; transform:scale(1.3); }
        }
      `}</style>

      <div style={{ textAlign: "center", padding: "0 40px" }}>
        <div style={{ fontSize: 56, marginBottom: 24, animation: "calcFloat 2s ease-in-out infinite" }}>🔍</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: -0.4, marginBottom: 10, lineHeight: 1.25 }}>
          Analysing your<br />family's exposure…
        </div>
        <div style={{ fontSize: 15, color: "#636366", lineHeight: 1.55 }}>
          Checking hospitalisation risk by age,<br />income protection gaps, and cover deficits.
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 28, justifyContent: "center" }}>
          {[0, 0.2, 0.4].map((delay, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#2c2c2e", animation: `calcDot 1.4s ease-in-out ${delay}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
