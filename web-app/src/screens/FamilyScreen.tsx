import { useEffect, useState } from "react";
import FloatingCategoryNav, { useNavScrollVisibility, type Category } from "../components/FloatingCategoryNav";

interface Props {
  onBack: () => void;
  onCalculateRisk?: () => void;
  onCategoryChange?: (cat: Category) => void;
  riskScore?: number;
}

export default function FamilyScreen({ onCalculateRisk, onCategoryChange }: Props) {
  const { scrollRef, visible } = useNavScrollVisibility();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 600);
    return () => clearTimeout(t);
  }, []);

  const avgRot  = animated ? "rotate(40deg)"  : "rotate(-90deg)";
  const youRot  = animated ? "rotate(10deg)"  : "rotate(-90deg)";

  return (
    <div className="relative flex flex-col h-full" style={{ backgroundColor: "#000" }}>
      <style>{`
        @keyframes famPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: .3; transform: scale(.6); }
        }
      `}</style>

      <div ref={scrollRef} className="overflow-y-auto no-scrollbar flex-1" style={{ paddingBottom: 100 }}>

        {/* ─── Name header ─── */}
        <div style={{ padding: "20px 22px 0" }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>
            Rahul <span style={{ color: "#636366" }}>.</span>
          </div>
        </div>

        {/* ─── ABHA pill ─── */}
        <div style={{ display: "flex", alignItems: "center", width: "fit-content", background: "#1c1c1e", borderRadius: 10, overflow: "hidden", margin: "10px 22px 0" }}>
          <div style={{ background: "#1e3a5f", color: "#4a9eff", fontSize: 12, fontWeight: 700, padding: "6px 10px", letterSpacing: "0.05em" }}>ABHA</div>
          <div style={{ color: "#fff", fontSize: 13, padding: "6px 12px 6px 8px" }}>Tap to link your ID →</div>
        </div>

        {/* ─── Avatars ─── */}
        <div style={{ display: "flex", gap: 10, padding: "16px 22px 0", alignItems: "center" }}>
          {[{ init: "J.", active: true }, { init: "VD", active: false }, { init: "SR", active: false }].map(a => (
            <div key={a.init} style={{
              width: 46, height: 46, borderRadius: "50%", background: "#2c2c2e", display: "flex",
              alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff",
              flexShrink: 0, boxShadow: a.active ? "0 0 0 2px #000, 0 0 0 3.5px #4ade80" : "none",
            }}>{a.init}</div>
          ))}
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: "transparent", border: "1.5px solid #3a3a3c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#888" }}>+</div>
        </div>

        {/* ─── Hook card ─── */}
        <div style={{ padding: "14px 16px 0" }}>
          <div onClick={onCalculateRisk} style={{ borderRadius: 20, background: "#1c1c1e", cursor: "pointer", overflow: "hidden" }}>

            <div style={{ padding: "18px 18px 0" }}>
              {/* eyebrow */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: 600 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "famPulse 2s infinite" }} />
                  Family Risk Check
                </div>
                <div style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.4)", fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>Free · 2 min</div>
              </div>

              {/* dual-needle gauge */}
              <div style={{ position: "relative", width: 190, margin: "0 auto 4px" }}>
                <svg viewBox="0 0 220 130" style={{ width: "100%", display: "block" }}>
                  <path d="M 22 112 A 88 88 0 0 1 198 112" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="12" strokeLinecap="round" />
                  <path d="M 22 112 A 88 88 0 0 1 75 33"  fill="none" stroke="rgba(74,222,128,0.25)"  strokeWidth="12" strokeLinecap="round" />
                  <path d="M 75 33 A 88 88 0 0 1 145 33"  fill="none" stroke="rgba(245,158,11,0.25)"  strokeWidth="12" strokeLinecap="round" />
                  <path d="M 145 33 A 88 88 0 0 1 198 112" fill="none" stroke="rgba(239,68,68,0.25)"  strokeWidth="12" strokeLinecap="round" />
                  {/* avg needle */}
                  <g style={{ transformOrigin: "110px 112px", transform: avgRot, transition: "transform 1.4s cubic-bezier(0.4,0,0.2,1)" }}>
                    <line x1="110" y1="112" x2="110" y2="42" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="110" cy="112" r="3.5" fill="rgba(255,255,255,0.3)" />
                  </g>
                  {/* yours needle */}
                  <g style={{ transformOrigin: "110px 112px", transform: youRot, transition: "transform 1.2s cubic-bezier(0.4,0,0.2,1) 0.2s" }}>
                    <line x1="110" y1="112" x2="110" y2="36" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="110" cy="112" r="5" fill="#fff" />
                    <circle cx="110" cy="112" r="10" fill="rgba(255,255,255,0.08)" />
                  </g>
                  <text x="44" y="22" fill="rgba(255,255,255,0.25)" fontSize="7.5" fontWeight="600" fontFamily="Inter,sans-serif" textAnchor="middle">Avg</text>
                  <text x="176" y="22" fill="rgba(255,255,255,0.5)" fontSize="7.5" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">You</text>
                </svg>
              </div>

              {/* gauge labels */}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px" }}>
                {["Safe", "At Risk", "Exposed"].map(l => (
                  <span key={l} style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontWeight: 500 }}>{l}</span>
                ))}
              </div>

              {/* amounts row */}
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "14px 0 18px", borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: 10 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Avg Indian family</div>
                  <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1, color: "rgba(255,255,255,0.5)" }}>₹1.5 Cr</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 3 }}>uninsured exposure</div>
                </div>
                <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.08)", alignSelf: "center" }} />
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>Your family</div>
                  <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1, color: "#fff" }}>?</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>find out in 2 min</div>
                </div>
              </div>
            </div>

            {/* bottom: headline + cta */}
            <div style={{ padding: "0 18px 18px", background: "#1c1c1e", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 2 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: "rgba(255,255,255,0.55)", lineHeight: 1.4, paddingTop: 14, marginBottom: 12 }}>
                Most families are sitting on a<br />
                <span style={{ color: "#fff", fontWeight: 800 }}>financial risk they can't see.</span>
              </div>
              <button style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
                background: "#7c5cf6", color: "#fff", fontSize: 15, fontWeight: 800, letterSpacing: -0.1,
                padding: "15px 18px", borderRadius: 14, border: "none", cursor: "pointer",
                boxShadow: "0 4px 16px rgba(124,92,246,0.4)", fontFamily: "inherit",
              }}>
                <span>Find out yours — free, 2 min</span>
                <span style={{ fontSize: 20, color: "rgba(255,255,255,0.7)" }}>›</span>
              </button>
            </div>

          </div>
        </div>

        {/* ─── White body ─── */}
        <div style={{ background: "#f2f2f7", borderRadius: "20px 20px 0 0", marginTop: 20, padding: "22px 16px 32px" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#000", letterSpacing: -0.3, marginBottom: 14 }}>Your health coverages</div>

          {/* coverage card */}
          <div style={{ background: "#fff", borderRadius: 18, padding: 16, marginBottom: 12, border: "1px solid #e5e5ea", borderLeft: "3px solid #7c5cf6" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#000" }}>Hospitalisation up to ₹5 L</div>
              <div style={{ fontSize: 13, color: "#0d9488", fontWeight: 600 }}>Till 29 Nov 26 →</div>
            </div>
            <div style={{ fontSize: 13, color: "#8e8e93", marginBottom: 14 }}>with Acko Health Plan</div>
            <div style={{ height: 1, background: "#f2f2f7", marginBottom: 12 }} />
            <button style={{ width: "100%", padding: 13, background: "transparent", border: "1.5px solid #d1d1d6", borderRadius: 12, fontSize: 15, fontWeight: 600, color: "#000", cursor: "pointer", fontFamily: "inherit" }}>
              Raise a claim
            </button>
          </div>

          {/* life card */}
          <div style={{ background: "#f2f2f7", borderRadius: 18, padding: 18, border: "1px solid #e5e5ea", position: "relative", overflow: "hidden", marginBottom: 12 }}>
            <div style={{ position: "absolute", top: 0, right: 0, background: "#ede9fe", color: "#7c5cf6", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderBottomLeftRadius: 12 }}>Life insurance</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#000", paddingRight: 90, marginBottom: 6 }}>Continue where you left off</div>
            <div style={{ fontSize: 13, color: "#3c3c43", marginBottom: 14, lineHeight: 1.4 }}>
              Get your custom life plan at just <strong>₹9,799/month</strong>
            </div>
            <button style={{ background: "#000", color: "#fff", fontSize: 14, fontWeight: 700, padding: "11px 20px", borderRadius: 12, border: "none", cursor: "pointer", fontFamily: "inherit" }}>Proceed</button>
          </div>

          <div style={{ fontSize: 20, fontWeight: 800, color: "#000", letterSpacing: -0.3, marginBottom: 14, marginTop: 20 }}>Your care centre</div>
          <div style={{ background: "#fff", borderRadius: 18, padding: 16, border: "1px solid #e5e5ea" }}>
            <div style={{ fontSize: 14, color: "#8e8e93" }}>No active care plans</div>
          </div>
        </div>

      </div>

      <FloatingCategoryNav active="family" visible={visible} onTabChange={(tab) => onCategoryChange?.(tab)} />
    </div>
  );
}
