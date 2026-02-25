import { useEffect, useRef, useState } from "react";
import type { QuizState } from "./QuestionnaireScreen";

interface Props {
  quizState: QuizState;
  onBack: () => void;
  onUnderstood: () => void;
}

/* ─── Risk model (mirrors HTML blueprint logic) ─── */

const CITY_MULTIPLIERS: Record<string, number> = {
  Mumbai: 1.35, Delhi: 1.3, Bengaluru: 1.25, Hyderabad: 1.2, Chennai: 1.2,
  Pune: 1.1, Kolkata: 1.1, Ahmedabad: 1.0,
};

interface HospRisk { cost: number; cls: "lo" | "mid" | "hi"; label: string; reason: string }

function hospRisk(age: number): HospRisk {
  if (age < 5)  return { cost: 1.5,  cls: "lo",  label: "₹1.5L/yr", reason: "Paediatric"   };
  if (age < 18) return { cost: 0.8,  cls: "lo",  label: "₹0.8L/yr", reason: "Child"        };
  if (age < 30) return { cost: 1.2,  cls: "lo",  label: "₹1.2L/yr", reason: "Young adult"  };
  if (age < 40) return { cost: 2.0,  cls: "mid", label: "₹2L/yr",   reason: "Adult"        };
  if (age < 50) return { cost: 3.5,  cls: "mid", label: "₹3.5L/yr", reason: "Middle-aged"  };
  if (age < 60) return { cost: 5.5,  cls: "mid", label: "₹5.5L/yr", reason: "Late career"  };
  if (age < 70) return { cost: 8.5,  cls: "hi",  label: "₹8.5L/yr", reason: "Senior"       };
  return              { cost: 12,   cls: "hi",  label: "₹12L/yr",  reason: "Elderly"      };
}

function fmt(v: number): string {
  if (v <= 0) return "—";
  if (v >= 100) return `₹${(v / 100).toFixed(1)} Cr`;
  return `₹${Math.round(v)}L`;
}

/* ─── Score ring component ─── */

function ScoreRing({ score, color }: { score: number; color: string }) {
  const C = 251.3;
  const [dash, setDash] = useState(0);
  const [display, setDisplay] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const target = (score / 100) * C;
    const start = performance.now() + 300;
    const duration = 1300;
    const frame = (now: number) => {
      const elapsed = Math.max(0, now - start);
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDash(eased * target);
      setDisplay(Math.round(eased * score));
      if (p < 1) rafRef.current = requestAnimationFrame(frame);
    };
    rafRef.current = requestAnimationFrame(frame);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [score]);

  return (
    <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0 }}>
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="#f2f2f7" strokeWidth="10" />
        <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={`${dash} ${C}`} strokeDashoffset={C / 4}
          style={{ transition: "none" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 26, fontWeight: 900, lineHeight: 1, letterSpacing: -1, color }}>{display}</div>
        <div style={{ fontSize: 9, fontWeight: 600, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.05em" }}>/ 100</div>
      </div>
    </div>
  );
}

/* ─── Cover gauge (linear track) ─── */

function CoverGauge({ title, subtitle, pct, have, need, gap }: {
  title: string; subtitle: string; pct: number;
  have: string; need: string; gap: string | null;
}) {
  const [markerLeft, setMarkerLeft] = useState(2);
  useEffect(() => { const t = setTimeout(() => setMarkerLeft(Math.max(2, Math.min(92, pct))), 300); return () => clearTimeout(t); }, [pct]);
  const isGap = gap !== null && gap !== "—";
  return (
    <div style={{ background: "#fff", borderRadius: 20, margin: "0 14px 10px", padding: "18px 18px 20px", border: "1px solid #e5e5ea" }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#000", marginBottom: 3 }}>{title}</div>
      <div style={{ fontSize: 12, color: "#8e8e93", marginBottom: 16, lineHeight: 1.5 }}>{subtitle}</div>
      <div style={{ position: "relative", marginBottom: 10 }}>
        <div style={{ height: 10, borderRadius: 20, background: "linear-gradient(to right,#34d399 0%,#f59e0b 55%,#ef4444 85%)", position: "relative" }}>
          <div style={{ position: "absolute", top: "50%", left: `${markerLeft}%`, transform: "translate(-50%,-50%)", width: 20, height: 20, borderRadius: "50%", background: "#fff", border: "3px solid #000", boxShadow: "0 2px 6px rgba(0,0,0,0.2)", transition: "left 1s cubic-bezier(0.4,0,0.2,1)" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#8e8e93", fontWeight: 500, marginTop: 6 }}>
          <span>Underinsured</span><span>Adequate</span><span>Well covered</span>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 14, paddingTop: 14, borderTop: "1px solid #e5e5ea" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>You have</div>
          <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.3, color: have === "None" ? "#dc2626" : isGap ? "#d97706" : "#059669" }}>{have}</div>
          <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>current cover</div>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: isGap ? "#fef2f2" : "#ecfdf5", color: isGap ? "#dc2626" : "#059669" }}>
          {isGap ? `Gap: ${gap}` : "✓ Sufficient"}
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 3 }}>You need</div>
          <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.3, color: "#000" }}>{need}</div>
          <div style={{ fontSize: 10, color: "#8e8e93", marginTop: 2 }}>recommended</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Collapsible rcard ─── */

function RCard({ icon, iconBg, title, subtitle, children }: {
  icon: string; iconBg: string; title: string; subtitle: string; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "#fff", borderRadius: 20, margin: "0 14px 10px", border: "1px solid #e5e5ea", overflow: "hidden" }}>
      <div onClick={() => setOpen(v => !v)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", cursor: "pointer" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{icon}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#000" }}>{title}</div>
            <div style={{ fontSize: 12, color: "#8e8e93", marginTop: 1 }}>{subtitle}</div>
          </div>
        </div>
        <div style={{ fontSize: 18, color: "#8e8e93", transition: "transform 0.25s", transform: open ? "rotate(180deg)" : "none" }}>⌄</div>
      </div>
      {open && <div style={{ borderTop: "1px solid #e5e5ea" }}>{children}</div>}
    </div>
  );
}

/* ─── Repercussion card ─── */

function RepercCard({ iconBg, icon, title, children }: { iconBg: string; icon: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 16, border: "1px solid #e5e5ea", display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#000", marginBottom: 5 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 7, fontSize: 12, color: "#3c3c43", lineHeight: 1.5 }}>
      <span style={{ flex: 1 }}>{children}</span>
    </div>
  );
}

function Tag({ bg, color, children }: { bg: string; color: string; children: React.ReactNode }) {
  return <span style={{ display: "inline-block", marginTop: 8, fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: bg, color }}>{children}</span>;
}

/* ─── Rec card ─── */

function RecCard({ num, title, children }: { num: number; title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 16, border: "1px solid #e5e5ea", display: "flex", gap: 14, alignItems: "flex-start" }}>
      <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#7c5cf6", color: "#fff", fontSize: 13, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{num}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#000", marginBottom: 4 }}>{title}</div>
        {children}
      </div>
    </div>
  );
}

/* ─── Section label ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: "#8e8e93", textTransform: "uppercase", letterSpacing: "0.08em", padding: "18px 20px 8px" }}>{children}</div>;
}

/* ─── Main screen ─── */

export default function ScoreAnalysisScreen({ quizState: S, onBack, onUnderstood }: Props) {
  const C = 251.3;
  const cityMult  = CITY_MULTIPLIERS[S.city] || 1.0;
  const condMult  = 1 + S.conditions.filter(c => c !== "none").length * 0.3;
  const memberRisks = S.members.map(m => ({ ...m, ...hospRisk(m.age) }));
  const totalHosp  = memberRisks.reduce((acc, m) => acc + m.cost, 0) * cityMult * condMult;
  const healthHave = S.hasHealthIns ? S.healthCoverL : 0;
  const healthNeed = Math.max(Math.ceil(totalHosp / 5) * 5, 10);
  const healthGap  = Math.max(0, healthNeed - healthHave);
  const annualInc  = S.incomeL * 12;
  const depCount   = S.dependents.length;
  const lifeNeed   = Math.ceil((annualInc * 12 * (0.5 + depCount * 0.2) + S.debtL) / 10) * 10;
  const lifeHave   = S.hasLifeIns ? S.lifeCoverL : 0;
  const lifeGap    = Math.max(0, lifeNeed - lifeHave);
  const ciRisk     = S.conditions.some(c => ["cancer", "heart"].includes(c)) ? totalHosp * 0.5 : totalHosp * 0.25;
  const totalRisk  = healthGap + lifeGap + ciRisk;
  const score      = Math.min(97, Math.round((totalRisk / 300) * 100));

  const healthPct  = healthHave === 0 ? 2 : Math.min(92, Math.round((healthHave / Math.max(healthNeed, healthHave + 1)) * 100));
  const lifePct    = lifeHave === 0 ? 2 : Math.min(92, Math.round((lifeHave / Math.max(lifeNeed, lifeHave + 1)) * 100));
  const medianBill = Math.max(3, Math.round(totalHosp * 0.35));
  const monthsIncome = Math.round((lifeNeed - lifeHave) / Math.max(S.incomeL, 0.1));
  const recHealth  = Math.max(10, healthNeed);
  const recLife    = lifeNeed;
  const moHealth   = Math.max(500, Math.round(recHealth * 50 / 100) * 100);
  const moLife     = Math.max(200, Math.round(annualInc * 1.2 / 12 / 100) * 100);
  const incomeStr  = S.incomeL < 1 ? `₹${Math.round(S.incomeL * 100)}K` : `₹${S.incomeL.toFixed(1)}L`;

  let riskColor: string, riskBg: string, riskLabel: string, riskEmoji: string;
  if (score >= 65)      { riskColor = "#dc2626"; riskBg = "#fef2f2"; riskLabel = "High Risk";     riskEmoji = "⚠️"; }
  else if (score >= 40) { riskColor = "#d97706"; riskBg = "#fffbeb"; riskLabel = "Moderate Risk"; riskEmoji = "⚡"; }
  else                  { riskColor = "#059669"; riskBg = "#ecfdf5"; riskLabel = "Low Risk";      riskEmoji = "✅"; }

  const clsColor: Record<string, string> = { lo: "#059669", mid: "#d97706", hi: "#dc2626" };

  return (
    <div className="relative flex flex-col h-full" style={{ backgroundColor: "#f2f2f7" }}>
      <style>{`
        @keyframes resultFadeIn { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
        .result-fade { animation: resultFadeIn 0.4s ease forwards; }
      `}</style>

      {/* ─── Sticky header ─── */}
      <div style={{ background: "#fff", paddingBottom: 16, borderBottom: "1px solid #e5e5ea", flexShrink: 0 }}>
        <div style={{ padding: "16px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, fontWeight: 600, color: "#000" }}>
          <span>11:38</span><span style={{ color: "#8e8e93" }}>5G ▂▃▄</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: "10px 20px 0", gap: 10 }}>
          <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: "50%", border: "1.5px solid #e5e5ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, cursor: "pointer", color: "#000", background: "#fff", fontFamily: "inherit" }}>‹</button>
          <div style={{ fontSize: 15, fontWeight: 600, color: "#000" }}>Your Risk Report</div>
          <button style={{ marginLeft: "auto", background: "#f2f2f7", borderRadius: 20, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: "#000", cursor: "pointer", border: "none", fontFamily: "inherit" }}>Share 📤</button>
        </div>
      </div>

      {/* ─── Scrollable body ─── */}
      <div className="flex-1 overflow-y-auto no-scrollbar result-fade" style={{ paddingBottom: 40 }}>

        {/* Score hero */}
        <div style={{ background: "#fff", padding: "24px 20px 20px", marginBottom: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", padding: "5px 12px", borderRadius: 20, marginBottom: 16, background: riskBg, color: riskColor }}>
            {riskEmoji} {riskLabel}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 18 }}>
            <ScoreRing score={score} color={riskColor} />
            <div style={{ fontSize: 22, fontWeight: 800, color: "#000", letterSpacing: -0.4, lineHeight: 1.2, flex: 1 }}>
              <span style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#8e8e93" }}>Your family carries</span>
              <span style={{ display: "block", color: riskColor, fontSize: 24 }}>{fmt(totalRisk)}</span>
              <span>in financial risk</span>
            </div>
          </div>
          <div style={{ fontSize: 14, color: "#3c3c43", lineHeight: 1.65, paddingTop: 16, borderTop: "1px solid #e5e5ea" }}>
            Given your family of <strong>{S.members.length} member{S.members.length !== 1 ? "s" : ""}</strong>
            {S.city ? <> in <strong>{S.city}</strong></> : ""}, a {incomeStr}/mo household income
            {S.debtL > 0 ? <>, <strong>{fmt(S.debtL)}</strong> in outstanding loans</> : ""}, and{" "}
            <strong>{depCount} financial dependent{depCount !== 1 ? "s" : ""}</strong> — your uninsured exposure is{" "}
            <strong style={{ color: riskColor }}>{fmt(totalRisk)}</strong>.
            {healthGap > 0 ? <> You are underinsured on health by <strong>{fmt(healthGap)}</strong>.</> : " Your health cover looks adequate."}
            {lifeGap > 0 ? <> Your life cover has a <strong>{fmt(lifeGap)} gap</strong>.</> : lifeHave > 0 ? " Your life cover is sufficient." : " You have no life insurance currently."}
          </div>
        </div>

        {/* Risk breakdown */}
        <SectionLabel>Your risk breakdown</SectionLabel>
        <RCard icon="👨‍👩‍👧" iconBg="#f5f0ff" title="Family hospitalisation risk" subtitle={`Est. annual exposure · ${fmt(totalHosp)}/yr`}>
          {memberRisks.map(m => (
            <div key={m.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 16px", borderBottom: "1px solid #f5f5f7" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{m.init}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: "#8e8e93" }}>Age {m.age} · {m.reason}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: clsColor[m.cls] }}>{m.label}</div>
                <div style={{ fontSize: 11, color: "#8e8e93", marginTop: 1 }}>{m.cls === "hi" ? "High risk" : m.cls === "mid" ? "Moderate" : "Lower risk"}</div>
              </div>
            </div>
          ))}
          <div style={{ padding: "12px 16px", background: "#f8f8fa", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 12, color: "#8e8e93" }}>Total annual exposure</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#000" }}>{fmt(totalHosp)}/yr</div>
          </div>
        </RCard>

        <CoverGauge
          title="🏥 Health insurance coverage"
          subtitle={`For your family of ${S.members.length}${S.city ? ` in ${S.city}` : ""}, the recommended sum insured is ${fmt(healthNeed)}.`}
          pct={healthPct}
          have={healthHave === 0 ? "None" : fmt(healthHave)}
          need={fmt(healthNeed)}
          gap={healthGap > 0 ? fmt(healthGap) : null}
        />

        <CoverGauge
          title="🛡️ Life insurance coverage"
          subtitle={`With ${depCount} dependent${depCount !== 1 ? "s" : ""} and ${fmt(S.debtL)} in loans, you need a term cover of ${fmt(lifeNeed)}.`}
          pct={lifePct}
          have={lifeHave === 0 ? "None" : fmt(lifeHave)}
          need={fmt(lifeNeed)}
          gap={lifeGap > 0 ? fmt(lifeGap) : null}
        />

        {/* What this means */}
        <SectionLabel>What this risk means for your family</SectionLabel>
        <div style={{ margin: "0 14px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
          <RepercCard iconBg="#fef2f2" icon="🏥" title="If someone is hospitalised">
            <div style={{ fontSize: 13, color: "#3c3c43", lineHeight: 1.6, marginBottom: 8 }}>
              A major hospitalisation{S.city ? ` in ${S.city}` : ""} has a median bill around <strong>{fmt(medianBill)}</strong>. Here's what that means:
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
              <Bullet>📋 Your current cover: <strong>{healthHave > 0 ? fmt(healthHave) : "None"}</strong></Bullet>
              <Bullet>🧾 Likely out-of-pocket: <strong style={{ color: "#dc2626" }}>{fmt(Math.max(0, medianBill - healthHave))}</strong></Bullet>
              {S.savingsL > 0 && <Bullet>💰 Your savings buffer: <strong>{fmt(S.savingsL)}</strong>{medianBill > healthHave + S.savingsL ? " — not enough to cover the gap" : ""}</Bullet>}
              <Bullet>⚠️ Any second event that year would be <strong>entirely out-of-pocket</strong></Bullet>
            </div>
            <Tag bg="#fef2f2" color="#dc2626">Health exposure · {fmt(healthGap > 0 ? healthGap : 0)} gap</Tag>
          </RepercCard>

          {depCount > 0 && (
            <RepercCard iconBg="#fffbeb" icon="🛡️" title="If you were no longer earning">
              <div style={{ fontSize: 13, color: "#3c3c43", lineHeight: 1.6, marginBottom: 8 }}>
                Your family depends on <strong>{incomeStr}/month</strong>. Without that income:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
                {S.debtL > 0 && <Bullet>🏦 Outstanding loans of <strong>{fmt(S.debtL)}</strong> still need to be repaid</Bullet>}
                {S.dependents.includes("children") && <Bullet>🎓 Children's education would need funding from savings</Bullet>}
                {S.dependents.includes("parents") && <Bullet>👴 Parents' care and living expenses would fall on others</Bullet>}
                <Bullet>⏳ Financial runway without cover: roughly <strong>{Math.min(monthsIncome, 36)} months</strong></Bullet>
              </div>
              <Tag bg="#fffbeb" color="#d97706">Life exposure · {fmt(lifeGap)} gap</Tag>
            </RepercCard>
          )}

          {S.conditions.some(c => ["cancer", "heart", "kidney", "diabetes"].includes(c)) && (
            <RepercCard iconBg="#f5f0ff" icon="🧬" title="Pre-existing conditions raise the stakes">
              <div style={{ fontSize: 13, color: "#3c3c43", lineHeight: 1.6, marginBottom: 8 }}>
                Conditions like <strong>{S.conditions.filter(c => c !== "none").join(", ")}</strong> compound risk in three ways:
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
                <Bullet>📈 Higher hospitalisation <strong>probability</strong> — 2–4× more likely per year</Bullet>
                <Bullet>💊 Higher severity — treatments cost <strong>₹3–20L per episode</strong></Bullet>
                <Bullet>⏱️ Policy sub-limits leave you exposed <strong>when you need it most</strong></Bullet>
              </div>
              <Tag bg="#f5f0ff" color="#7c5cf6">Elevated health risk</Tag>
            </RepercCard>
          )}
        </div>

        {/* Recommendations */}
        <SectionLabel>Your personalised recommendations</SectionLabel>
        <div style={{ margin: "0 14px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
          {healthGap > 0 ? (
            <RecCard num={1} title={`Get a family floater cover of ${fmt(recHealth)}`}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
                <Bullet>📉 Current gap: <strong style={{ color: "#dc2626" }}>{fmt(healthGap)}</strong> underinsured</Bullet>
                <Bullet>👨‍👩‍👧 Covers all <strong>{S.members.length} members</strong> under one floater policy</Bullet>
                <Bullet>🚫 No sub-limits on room rent or ICU charges</Bullet>
              </div>
              <button style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#7c5cf6", color: "#fff", border: "none", fontSize: 12, fontWeight: 700, padding: "7px 14px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}>
                Explore health plans →
              </button>
            </RecCard>
          ) : (
            <RecCard num={1} title="Your health cover looks adequate — review annually">
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Bullet>📊 Medical inflation in India runs at <strong>~14%/year</strong></Bullet>
                <Bullet>🔄 Reassess your sum insured at each renewal</Bullet>
              </div>
            </RecCard>
          )}

          {lifeGap > 0 ? (
            <RecCard num={2} title={`Get a term life cover of ${fmt(recLife)}`}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 10 }}>
                <Bullet>🎯 Target sum assured: <strong style={{ color: "#7c5cf6" }}>{fmt(recLife)}</strong></Bullet>
                <Bullet>💸 Estimated premium: ~₹{moLife.toLocaleString("en-IN")}/month</Bullet>
                <Bullet>🏦 Covers your <strong>{fmt(S.debtL)}</strong> in loans + income replacement</Bullet>
                <Bullet>🧬 Add a critical illness rider — pays lump sum on diagnosis</Bullet>
              </div>
              <button style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "#7c5cf6", color: "#fff", border: "none", fontSize: 12, fontWeight: 700, padding: "7px 14px", borderRadius: 10, cursor: "pointer", fontFamily: "inherit" }}>
                Explore term plans →
              </button>
            </RecCard>
          ) : (
            <RecCard num={2} title="Your life cover is sufficient — consider a CI rider">
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <Bullet>🧬 A critical illness rider pays out on <strong>cancer or cardiac diagnosis</strong></Bullet>
                <Bullet>💰 Replaces income during treatment — not just at death</Bullet>
              </div>
            </RecCard>
          )}

          <RecCard num={3} title={`Keep ${fmt(Math.max(5, Math.round(totalHosp * 0.4 / 5) * 5))} in a liquid emergency fund`}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <Bullet>⚡ Must be accessible <strong>within 24 hours</strong> — not locked in an FD</Bullet>
              <Bullet>🏥 Covers co-pays, pre-admission, and non-covered expenses</Bullet>
              {S.savingsL > 0
                ? <Bullet>{S.savingsL >= totalHosp * 0.4 ? "✅" : "⚠️"} You have {fmt(S.savingsL)} accessible — {S.savingsL >= totalHosp * 0.4 ? <strong>that's a healthy buffer</strong> : <strong>may not be enough</strong>} for a major event</Bullet>
                : <Bullet>🔴 <strong>No accessible savings</strong> — this is the most urgent action</Bullet>
              }
            </div>
          </RecCard>
        </div>

        {/* ACKO products */}
        <SectionLabel>Explore ACKO</SectionLabel>
        <div style={{ margin: "0 14px 10px", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: 16, border: "1px solid #e5e5ea", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "#ecfdf5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🏥</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#000" }}>ACKO Health Insurance</div>
              <div style={{ fontSize: 12, color: "#8e8e93", marginTop: 2 }}>From ₹{moHealth.toLocaleString("en-IN")}/mo · Up to {fmt(recHealth)} cover</div>
            </div>
            <button style={{ background: "#7c5cf6", color: "#fff", border: "none", fontSize: 13, fontWeight: 700, padding: "10px 16px", borderRadius: 12, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Explore</button>
          </div>
          <div style={{ background: "#fff", borderRadius: 16, padding: 16, border: "1px solid #e5e5ea", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "#fef2f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🛡️</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#000" }}>ACKO Term Life</div>
              <div style={{ fontSize: 12, color: "#8e8e93", marginTop: 2 }}>From ₹{moLife.toLocaleString("en-IN")}/mo · Up to {fmt(recLife)} cover</div>
            </div>
            <button style={{ background: "#7c5cf6", color: "#fff", border: "none", fontSize: 13, fontWeight: 700, padding: "10px 16px", borderRadius: 12, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Explore</button>
          </div>
        </div>

        {/* USP card */}
        <div style={{ background: "#000", borderRadius: 20, margin: "0 14px 10px", padding: 20 }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 4, letterSpacing: -0.2 }}>Why ACKO?</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 18 }}>Direct-to-consumer. No agents. No middlemen.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "💸", title: "No agent commissions", sub: "Benefits passed on directly as lower premiums for you" },
              { icon: "📱", title: "Fully digital", sub: "No paperwork — buy, manage, and claim entirely on the app." },
              { icon: "🏥", title: "100% hospital bill coverage", sub: "No waiting period for healthy families. Zero surprise deductions." },
              { icon: "🔄", title: "Flexible term life", sub: "Adjust your protection as life changes without starting over." },
            ].map(u => (
              <div key={u.title} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0, marginTop: 1 }}>{u.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{u.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{u.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: "24px 20px 40px", textAlign: "center" }}>
          <button onClick={onUnderstood} style={{
            width: "100%", padding: "17px", background: "#000", color: "#fff",
            fontSize: 16, fontWeight: 800, letterSpacing: -0.2, border: "none",
            borderRadius: 16, cursor: "pointer", fontFamily: "inherit",
          }}>
            I understood →
          </button>
        </div>

      </div>
    </div>
  );
}
