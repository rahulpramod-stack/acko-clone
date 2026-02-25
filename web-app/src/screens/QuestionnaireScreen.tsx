import { useState } from "react";

/* ─── Exported types ─── */

export interface QuizMember {
  name: string;
  role: string;
  age: number;
  color: string;
  init: string;
}

export interface QuizState {
  family: { me: boolean; spouse: boolean; children: boolean; parents: boolean };
  childrenCount: number;
  parentsCount: number;
  dependents: string[];
  members: QuizMember[];
  conditions: string[];
  incomeL: number;
  debtL: number;
  savingsL: number;
  hasHealthIns: boolean;
  healthCoverL: number;
  hasLifeIns: boolean;
  lifeCoverL: number;
  city: string;
}

interface Props {
  onBack: () => void;
  onComplete: (state: QuizState) => void;
}

const MEMBER_COLORS = ["#7c5cf6", "#3b82f6", "#ec4899", "#f59e0b", "#10b981", "#ef4444"];

const CITIES = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Chennai",
  "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Surat",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal",
  "Patna", "Vadodara", "Coimbatore", "Visakhapatnam", "Gurgaon",
  "Noida", "Chandigarh", "Kochi", "Mysuru", "Bhubaneswar",
];

function formatL(l: number): string {
  if (l <= 0) return "None";
  if (l >= 100) return `₹${(l / 100).toFixed(1)} Cr`;
  return `₹${l % 1 === 0 ? l : l.toFixed(1)}L`;
}

/* ─── Shared UI pieces ─── */

function QHeader({ step, total, label, onBack }: { step: number; total: number; label: string; onBack: () => void }) {
  const pct = (step / total) * 100;
  return (
    <div style={{ background: "#fff", paddingBottom: 20 }}>
      <div style={{ padding: "16px 22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, fontWeight: 600, color: "#000" }}>
        <span>11:38</span><span style={{ color: "#8e8e93" }}>{step} of {total}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", padding: "8px 20px 0", gap: 12 }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #e5e5ea", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, cursor: "pointer", color: "#000", background: "#fff", fontFamily: "inherit" }}>‹</button>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#000" }}>Risk Check</div>
      </div>
      <div style={{ padding: "14px 22px 0" }}>
        <div style={{ height: 4, background: "#f2f2f7", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ height: "100%", background: "linear-gradient(90deg,#7c5cf6,#a78bfa)", borderRadius: 10, width: `${pct}%`, transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
        </div>
        <div style={{ fontSize: 12, color: "#8e8e93", marginTop: 6, fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );
}

function StickyCTA({ label, disabled, onClick, showSkip, onSkip }: { label: string; disabled?: boolean; onClick: () => void; showSkip?: boolean; onSkip?: () => void }) {
  return (
    <div style={{ position: "sticky", bottom: 0, background: "linear-gradient(to top, #f2f2f7 70%, transparent)", padding: "16px 22px 32px" }}>
      <button onClick={onClick} disabled={disabled} style={{
        width: "100%", padding: 17, background: disabled ? "#d1d1d6" : "#7c5cf6", color: disabled ? "#8e8e93" : "#fff",
        fontSize: 16, fontWeight: 800, letterSpacing: -0.2, border: "none", borderRadius: 16, cursor: disabled ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "opacity 0.15s",
      }}>{label}</button>
      {showSkip && (
        <button onClick={onSkip} style={{ width: "100%", padding: 10, background: "transparent", color: "#8e8e93", fontSize: 14, fontWeight: 500, border: "none", cursor: "pointer", fontFamily: "inherit", marginTop: 8 }}>
          Skip for now
        </button>
      )}
    </div>
  );
}

function WhyBox({ text }: { text: string }) {
  return (
    <div style={{ background: "#f8f8fa", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 10, alignItems: "flex-start", marginTop: 16 }}>
      <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>💡</div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#000", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.04em" }}>Why we ask</div>
        <div style={{ fontSize: 13, color: "#8e8e93", lineHeight: 1.5 }}>{text}</div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */

export default function QuestionnaireScreen({ onBack, onComplete }: Props) {
  const [step, setStep] = useState(1);

  /* Q1 – family members */
  const [famSpouse,   setFamSpouse]   = useState(false);
  const [famChildren, setFamChildren] = useState(false);
  const [famParents,  setFamParents]  = useState(false);
  const [childCount,  setChildCount]  = useState(1);
  const [parentCount, setParentCount] = useState(2);

  /* Q2 – dependents */
  const [dependents, setDependents] = useState<string[]>([]);

  /* Q3 – ages (stored as [age, ...]) indexed by member key */
  const [memberAges, setMemberAges] = useState<Record<string, number>>({
    me: 34, spouse: 31, "child-0": 8, "child-1": 8, "child-2": 8,
    "parent-0": 62, "parent-1": 62, "parent-2": 62, "parent-3": 62,
  });

  /* Q4 – health conditions */
  const [conditions, setConditions] = useState<string[]>([]);

  /* Q5 – income */
  const [incomeSlider, setIncomeSlider] = useState(12);

  /* Q6 – debt */
  const [debtSlider, setDebtSlider] = useState(30);

  /* Q7 – savings */
  const [savingsSlider, setSavingsSlider] = useState(10);

  /* Q8 – health insurance */
  const [hasHealthIns,    setHasHealthIns]    = useState(true);
  const [healthCoverSlider, setHealthCoverSlider] = useState(5);

  /* Q9 – life insurance */
  const [hasLifeIns,    setHasLifeIns]    = useState(false);
  const [lifeCoverSlider, setLifeCoverSlider] = useState(50);

  /* Q10 – city */
  const [city, setCity] = useState("");
  const [cityInput, setCityInput] = useState("");

  /* ─── Derived values ─── */

  function getMemberList(): QuizMember[] {
    const list: QuizMember[] = [];
    list.push({ name: "You", role: "Primary earner", age: memberAges["me"] ?? 34, color: MEMBER_COLORS[0], init: "Me" });
    if (famSpouse)   list.push({ name: "Spouse", role: "Spouse", age: memberAges["spouse"] ?? 31, color: MEMBER_COLORS[1], init: "SP" });
    for (let i = 0; i < childCount && famChildren; i++) {
      list.push({ name: `Child ${i + 1}`, role: "Child", age: memberAges[`child-${i}`] ?? 8, color: MEMBER_COLORS[4], init: `C${i + 1}` });
    }
    for (let i = 0; i < parentCount && famParents; i++) {
      list.push({ name: `Parent ${i + 1}`, role: "Parent", age: memberAges[`parent-${i}`] ?? 62, color: MEMBER_COLORS[2], init: `P${i + 1}` });
    }
    return list;
  }

  function incomeL(): number {
    const v = incomeSlider;
    return v <= 10 ? v * 0.1 : v / 10;
  }

  function debtL(): number {
    if (debtSlider === 0) return 0;
    return debtSlider <= 50 ? debtSlider : 50 + (debtSlider - 50) * 3;
  }

  function savingsL(): number {
    if (savingsSlider === 0) return 0;
    const v = savingsSlider;
    return Math.round((v <= 50 ? v * 0.5 : 25 + (v - 50) * 1.5) * 2) / 2;
  }

  function healthCoverL(): number {
    const v = healthCoverSlider;
    return v <= 20 ? v : 20 + (v - 20) * 4;
  }

  function formatIncome(): string {
    const l = incomeL();
    return l < 1 ? `₹${Math.round(l * 100)}K` : `₹${l.toFixed(1)}L`;
  }

  /* ─── Navigation ─── */

  function handleBack() {
    if (step === 1) onBack();
    else setStep(s => s - 1);
  }

  function advance() { setStep(s => s + 1); }

  function handleComplete() {
    const members = getMemberList();
    onComplete({
      family: { me: true, spouse: famSpouse, children: famChildren, parents: famParents },
      childrenCount: childCount,
      parentsCount: parentCount,
      dependents,
      members,
      conditions,
      incomeL: incomeL(),
      debtL: debtL(),
      savingsL: savingsL(),
      hasHealthIns,
      healthCoverL: hasHealthIns ? healthCoverL() : 0,
      hasLifeIns,
      lifeCoverL: hasLifeIns ? lifeCoverSlider : 0,
      city,
    });
  }

  /* ─── Counter widget ─── */
  function Counter({ value, min, max, onChange }: { value: number; min: number; max: number; onChange: (v: number) => void }) {
    return (
      <div style={{ display: "flex", alignItems: "center", background: "#f2f2f7", borderRadius: 10, overflow: "hidden" }}>
        <button onClick={() => onChange(Math.max(min, value - 1))} style={{ width: 34, height: 34, background: "transparent", border: "none", fontSize: 20, color: "#000", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>−</button>
        <div style={{ width: 32, textAlign: "center", fontSize: 16, fontWeight: 700, color: "#000" }}>{value}</div>
        <button onClick={() => onChange(Math.min(max, value + 1))} style={{ width: 34, height: 34, background: "transparent", border: "none", fontSize: 20, color: "#000", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>+</button>
      </div>
    );
  }

  /* ─── Steps ─── */

  /* Q1 — Who's in your family */
  if (step === 1) {
    const blocks = [
      { id: "me",       icon: "🧑",    label: "Me",         selected: true,       disabled: true,    onToggle: () => {} },
      { id: "spouse",   icon: "💑",    label: "Spouse",     selected: famSpouse,   disabled: false,   onToggle: () => setFamSpouse(v => !v) },
      { id: "children", icon: "👶",    label: "Children",   selected: famChildren, disabled: false,   onToggle: () => setFamChildren(v => !v) },
      { id: "parents",  icon: "👴👵",  label: "Parents",    selected: famParents,  disabled: false,   onToggle: () => setFamParents(v => !v) },
    ];
    return (
      <div className="flex flex-col h-full" style={{ background: "#f2f2f7" }}>
        <QHeader step={1} total={10} label="Who's in your family?" onBack={handleBack} />
        <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "22px 22px 0" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#000", letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 8 }}>Who's in your family?</div>
          <div style={{ fontSize: 14, color: "#8e8e93", lineHeight: 1.55, marginBottom: 22 }}>Select everyone you'd want financially protected.</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 8 }}>
            {blocks.map(b => (
              <div key={b.id} onClick={b.disabled ? undefined : b.onToggle} style={{
                background: b.selected ? "#ede9fe" : "#fff",
                border: `2px solid ${b.selected ? "#7c5cf6" : "#e5e5ea"}`,
                borderRadius: 16, padding: "16px 14px", cursor: b.disabled ? "default" : "pointer",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                position: "relative", opacity: b.disabled ? 0.8 : 1, transition: "all 0.2s",
              }}>
                {b.selected && <div style={{ position: "absolute", top: 8, right: 8, width: 18, height: 18, borderRadius: "50%", background: "#7c5cf6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff" }}>✓</div>}
                <div style={{ fontSize: 28, lineHeight: 1 }}>{b.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: b.selected ? "#7c5cf6" : "#000", textAlign: "center" }}>{b.label}</div>
              </div>
            ))}
          </div>
          {famChildren && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderRadius: 14, border: "1.5px solid #e5e5ea", padding: "10px 14px", marginTop: -2 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>👶 Number of children</div>
              <Counter value={childCount} min={1} max={6} onChange={setChildCount} />
            </div>
          )}
          {famParents && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", borderRadius: 14, border: "1.5px solid #e5e5ea", padding: "10px 14px", marginTop: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#000" }}>👴 Number of parents</div>
              <Counter value={parentCount} min={1} max={4} onChange={setParentCount} />
            </div>
          )}
          <WhyBox text="Each member adds to your total hospitalisation exposure. More members = more risk surface." />
          <div style={{ height: 120 }} />
        </div>
        <StickyCTA label="Continue →" onClick={advance} />
      </div>
    );
  }

  /* Q2 — Who depends on your income */
  if (step === 2) {
    const items: { type: string; icon: string; name: string; sub: string }[] = [];
    if (famSpouse)   items.push({ type: "spouse",   icon: "💑", name: "Spouse / Partner",         sub: "No independent income" });
    if (famChildren) items.push({ type: "children", icon: "👶", name: `Children (${childCount})`, sub: "Still studying / under 25" });
    if (famParents)  items.push({ type: "parents",  icon: "👴", name: `Parents (${parentCount})`, sub: "Financially reliant on you" });

    function toggleDep(type: string) {
      setDependents(prev => prev.includes(type) ? prev.filter(d => d !== type) : [...prev, type]);
    }

    return (
      <div className="flex flex-col h-full" style={{ background: "#f2f2f7" }}>
        <QHeader step={2} total={10} label="Financial dependents" onBack={handleBack} />
        <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "22px 22px 0" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#000", letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 8 }}>Who depends on your income?</div>
          <div style={{ fontSize: 14, color: "#8e8e93", lineHeight: 1.55, marginBottom: 22 }}>Select members who'd face hardship if your income stopped tomorrow.</div>
          {items.length === 0 ? (
            <div style={{ padding: 20, textAlign: "center", color: "#8e8e93", fontSize: 14 }}>No other family members selected.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {items.map(it => {
                const sel = dependents.includes(it.type);
                return (
                  <div key={it.type} onClick={() => toggleDep(it.type)} style={{
                    background: sel ? "#ede9fe" : "#fff", border: `2px solid ${sel ? "#7c5cf6" : "#e5e5ea"}`,
                    borderRadius: 14, padding: "14px 16px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: 22, flexShrink: 0 }}>{it.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: sel ? "#7c5cf6" : "#000" }}>{it.name}</div>
                      <div style={{ fontSize: 12, color: "#8e8e93", marginTop: 1 }}>{it.sub}</div>
                    </div>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${sel ? "#7c5cf6" : "#e5e5ea"}`, background: sel ? "#7c5cf6" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", transition: "all 0.2s" }}>
                      {sel ? "✓" : ""}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <WhyBox text="Dependents determine your life insurance need. More dependents = higher cover requirement." />
          <div style={{ height: 120 }} />
        </div>
        <StickyCTA label="Continue →" onClick={advance} />
      </div>
    );
  }

  /* Q3 — Ages */
  if (step === 3) {
    const members = getMemberList();
    function adjAge(key: string, d: number) {
      setMemberAges(prev => ({ ...prev, [key]: Math.max(0, Math.min(99, (prev[key] ?? 30) + d)) }));
    }
    const memberKeys = ["me", ...Array.from({ length: childCount }, (_, i) => `child-${i}`).filter(() => famChildren), ...Array.from({ length: parentCount }, (_, i) => `parent-${i}`).filter(() => famParents)];
    if (famSpouse) memberKeys.splice(1, 0, "spouse");

    return (
      <div className="flex flex-col h-full" style={{ background: "#f2f2f7" }}>
        <QHeader step={3} total={10} label="Member ages" onBack={handleBack} />
        <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "22px 22px 0" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#000", letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 8 }}>How old are your family members?</div>
          <div style={{ fontSize: 14, color: "#8e8e93", lineHeight: 1.55, marginBottom: 22 }}>Age is the single biggest driver of hospitalisation cost.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {members.map((m, idx) => {
              const key = memberKeys[idx] ?? `m-${idx}`;
              return (
                <div key={key} style={{ background: "#fff", borderRadius: 16, border: "1.5px solid #e5e5ea", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{m.init}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#000" }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: "#8e8e93" }}>{m.role}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", background: "#f2f2f7", borderRadius: 12, overflow: "hidden" }}>
                    <button onClick={() => adjAge(key, -1)} style={{ width: 38, height: 38, background: "transparent", border: "none", fontSize: 20, color: "#000", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>−</button>
                    <div style={{ width: 42, textAlign: "center", fontSize: 17, fontWeight: 700, color: "#000" }}>{memberAges[key] ?? 30}</div>
                    <button onClick={() => adjAge(key, 1)} style={{ width: 38, height: 38, background: "transparent", border: "none", fontSize: 20, color: "#000", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>+</button>
                  </div>
                </div>
              );
            })}
          </div>
          <WhyBox text="A 65-year-old parent costs ~8× more to hospitalise than a 30-year-old. Ages shape your entire risk profile." />
          <div style={{ height: 120 }} />
        </div>
        <StickyCTA label="Continue →" onClick={advance} />
      </div>
    );
  }

  /* Q4 — Health conditions */
  if (step === 4) {
    const chips = [
      { id: "diabetes",    icon: "🩸",    label: "Diabetes" },
      { id: "heart",       icon: "❤️",    label: "Heart disease / hypertension" },
      { id: "cancer",      icon: "🔬",    label: "Cancer history" },
      { id: "kidney",      icon: "🫁",    label: "Kidney / liver disease" },
      { id: "ortho",       icon: "🦴",    label: "Orthopaedic / joint issues" },
      { id: "respiratory", icon: "😮‍💨",  label: "Asthma / respiratory" },
      { id: "mental",      icon: "🧠",    label: "Mental health condition" },
    ];
    function toggleChip(id: string) {
      setConditions(prev => {
        const cleaned = prev.filter(c => c !== "none");
        return cleaned.includes(id) ? cleaned.filter(c => c !== id) : [...cleaned, id];
      });
    }
    function toggleNone() {
      setConditions(["none"]);
    }
    const hasNone = conditions.includes("none");

    return (
      <div className="flex flex-col h-full" style={{ background: "#f2f2f7" }}>
        <QHeader step={4} total={10} label="Health conditions" onBack={handleBack} />
        <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "22px 22px 0" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#000", letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 8 }}>Any significant health conditions?</div>
          <div style={{ fontSize: 14, color: "#8e8e93", lineHeight: 1.55, marginBottom: 22 }}>Select all that apply across any member.</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {chips.map(c => {
              const sel = conditions.includes(c.id);
              return (
                <div key={c.id} onClick={() => toggleChip(c.id)} style={{
                  background: sel ? "#fef2f2" : "#fff", border: `2px solid ${sel ? "#ef4444" : "#e5e5ea"}`,
                  borderRadius: 14, padding: "13px 16px", cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: sel ? "#dc2626" : "#000", flex: 1 }}>{c.label}</div>
                  <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${sel ? "#ef4444" : "#e5e5ea"}`, background: sel ? "#ef4444" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", transition: "all 0.2s" }}>
                    {sel ? "✓" : ""}
                  </div>
                </div>
              );
            })}
            <div onClick={toggleNone} style={{
              background: hasNone ? "#ecfdf5" : "#f2f2f7", borderRadius: 14,
              padding: "13px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
              border: `2px solid ${hasNone ? "#0d9488" : "transparent"}`, marginTop: 4, transition: "all 0.2s",
            }}>
              <div style={{ fontSize: 20 }}>✅</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: hasNone ? "#0d9488" : "#8e8e93" }}>None — everyone's in good health</div>
            </div>
          </div>
          <WhyBox text="Chronic conditions increase hospitalisation likelihood by 2–4×, raising your family's expected annual medical cost." />
          <div style={{ height: 120 }} />
        </div>
        <StickyCTA label="Continue →" onClick={advance} disabled={conditions.length === 0} />
      </div>
    );
  }

  /* Q5 — Monthly income */
  if (step === 5) {
    return (
      <div className="flex flex-col h-full" style={{ background: "#f2f2f7" }}>
        <QHeader step={5} total={10} label="Household income" onBack={handleBack} />
        <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "22px 22px 0" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#000", letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 8 }}>Total household monthly income?</div>
          <div style={{ fontSize: 14, color: "#8e8e93", lineHeight: 1.55, marginBottom: 22 }}>Combined income of all earning members.</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#000", letterSpacing: -1.5, lineHeight: 1, marginBottom: 6 }}>{formatIncome()}</div>
          <div style={{ fontSize: 13, color: "#8e8e93", marginBottom: 18 }}>per month</div>
          <div style={{ marginBottom: 8 }}>
            <input type="range" min={1} max={60} value={incomeSlider} onChange={e => setIncomeSlider(Number(e.target.value))}
              style={{ width: "100%" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#8e8e93", fontWeight: 500, marginTop: 6 }}>
              <span>₹10K</span><span>₹6L+</span>
            </div>
          </div>
          <WhyBox text="Your income determines what your family would need to maintain their lifestyle. Life cover = ~10–15× annual income." />
          <div style={{ height: 120 }} />
        </div>
        <StickyCTA label="Continue →" onClick={advance} />
      </div>
    );
  }

  /* Q6 — Total debt */
  if (step === 6) {
    const dl = debtL();
    const display = dl === 0 ? "None" : formatL(dl);
    return (
      <div className="flex flex-col h-full" style={{ background: "#f2f2f7" }}>
        <QHeader step={6} total={10} label="Debts & EMIs" onBack={handleBack} />
        <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "22px 22px 0" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#000", letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 8 }}>Total outstanding loans & EMIs?</div>
          <div style={{ fontSize: 14, color: "#8e8e93", lineHeight: 1.55, marginBottom: 22 }}>Include home loan, car loan, personal loans.</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#000", letterSpacing: -1.5, lineHeight: 1, marginBottom: 6 }}>{display}</div>
          <div style={{ fontSize: 13, color: "#8e8e93", marginBottom: 18 }}>outstanding principal</div>
          <div style={{ marginBottom: 8 }}>
            <input type="range" min={0} max={100} value={debtSlider} onChange={e => setDebtSlider(Number(e.target.value))} style={{ width: "100%" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#8e8e93", fontWeight: 500, marginTop: 6 }}>
              <span>None</span><span>₹2Cr+</span>
            </div>
          </div>
          <WhyBox text="Outstanding debt passes to your family if something happens to you. Life cover must be enough to clear debts AND replace income." />
          <div style={{ height: 120 }} />
        </div>
        <StickyCTA label="Continue →" onClick={advance} />
      </div>
    );
  }

  /* Q7 — Liquid savings */
  if (step === 7) {
    const sl = savingsL();
    const display = sl === 0 ? "None" : formatL(sl);
    return (
      <div className="flex flex-col h-full" style={{ background: "#f2f2f7" }}>
        <QHeader step={7} total={10} label="Emergency savings" onBack={handleBack} />
        <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "22px 22px 0" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#000", letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 8 }}>How much can you deploy in a medical emergency?</div>
          <div style={{ fontSize: 14, color: "#8e8e93", lineHeight: 1.55, marginBottom: 22 }}>Liquid savings accessible within a week.</div>
          <div style={{ fontSize: 38, fontWeight: 900, color: "#000", letterSpacing: -1.5, lineHeight: 1, marginBottom: 6 }}>{display}</div>
          <div style={{ fontSize: 13, color: "#8e8e93", marginBottom: 18 }}>accessible within 1 week</div>
          <div style={{ marginBottom: 8 }}>
            <input type="range" min={0} max={80} value={savingsSlider} onChange={e => setSavingsSlider(Number(e.target.value))} style={{ width: "100%" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#8e8e93", fontWeight: 500, marginTop: 6 }}>
              <span>None</span><span>₹1Cr+</span>
            </div>
          </div>
          <WhyBox text="Your savings act as a buffer. If savings can cover a hospitalisation, your insurance gap is smaller. If not, it's a real risk." />
          <div style={{ height: 120 }} />
        </div>
        <StickyCTA label="Continue →" onClick={advance} />
      </div>
    );
  }

  /* Q8 — Health insurance */
  if (step === 8) {
    const coverDisplay = formatL(healthCoverL());
    return (
      <div className="flex flex-col h-full" style={{ background: "#f2f2f7" }}>
        <QHeader step={8} total={10} label="Health insurance" onBack={handleBack} />
        <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "22px 22px 0" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#000", letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 8 }}>Do you have health insurance?</div>
          <div style={{ fontSize: 14, color: "#8e8e93", lineHeight: 1.55, marginBottom: 22 }}>Include personal policy, employer group cover, or government schemes.</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {[{ val: true, label: "Yes, I do" }, { val: false, label: "No" }].map(opt => (
              <button key={String(opt.val)} onClick={() => setHasHealthIns(opt.val)} style={{
                flex: 1, padding: 12, borderRadius: 12, border: `2px solid ${hasHealthIns === opt.val ? "#7c5cf6" : "#e5e5ea"}`,
                background: hasHealthIns === opt.val ? "#ede9fe" : "#fff",
                fontSize: 14, fontWeight: 600, color: hasHealthIns === opt.val ? "#7c5cf6" : "#8e8e93",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              }}>{opt.label}</button>
            ))}
          </div>
          {hasHealthIns && (
            <div>
              <div style={{ marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#000" }}>Total coverage amount</div>
              <div style={{ fontSize: 38, fontWeight: 900, color: "#000", letterSpacing: -1.5, lineHeight: 1, marginBottom: 6 }}>{coverDisplay}</div>
              <div style={{ fontSize: 13, color: "#8e8e93", marginBottom: 18 }}>sum insured</div>
              <input type="range" min={1} max={40} value={healthCoverSlider} onChange={e => setHealthCoverSlider(Number(e.target.value))} style={{ width: "100%" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#8e8e93", fontWeight: 500, marginTop: 6 }}>
                <span>₹1L</span><span>₹1Cr+</span>
              </div>
            </div>
          )}
          <WhyBox text="Most families are underinsured. A single surgery can cost ₹4–10L — your cover needs to keep pace with actual costs." />
          <div style={{ height: 120 }} />
        </div>
        <StickyCTA label="Continue →" onClick={advance} />
      </div>
    );
  }

  /* Q9 — Life insurance */
  if (step === 9) {
    const coverDisplay = formatL(lifeCoverSlider);
    return (
      <div className="flex flex-col h-full" style={{ background: "#f2f2f7" }}>
        <QHeader step={9} total={10} label="Life insurance" onBack={handleBack} />
        <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "22px 22px 0" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#000", letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 8 }}>Do you have life insurance?</div>
          <div style={{ fontSize: 14, color: "#8e8e93", lineHeight: 1.55, marginBottom: 22 }}>Term plan, LIC policy, or any policy that pays your family if you pass away.</div>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {[{ val: true, label: "Yes, I do" }, { val: false, label: "No" }].map(opt => (
              <button key={String(opt.val)} onClick={() => setHasLifeIns(opt.val)} style={{
                flex: 1, padding: 12, borderRadius: 12, border: `2px solid ${hasLifeIns === opt.val ? "#7c5cf6" : "#e5e5ea"}`,
                background: hasLifeIns === opt.val ? "#ede9fe" : "#fff",
                fontSize: 14, fontWeight: 600, color: hasLifeIns === opt.val ? "#7c5cf6" : "#8e8e93",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
              }}>{opt.label}</button>
            ))}
          </div>
          {hasLifeIns && (
            <div>
              <div style={{ marginBottom: 6, fontSize: 13, fontWeight: 600, color: "#000" }}>Sum assured</div>
              <div style={{ fontSize: 38, fontWeight: 900, color: "#000", letterSpacing: -1.5, lineHeight: 1, marginBottom: 6 }}>{coverDisplay}</div>
              <div style={{ fontSize: 13, color: "#8e8e93", marginBottom: 18 }}>death benefit</div>
              <input type="range" min={5} max={200} value={lifeCoverSlider} onChange={e => setLifeCoverSlider(Number(e.target.value))} style={{ width: "100%" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#8e8e93", fontWeight: 500, marginTop: 6 }}>
                <span>₹5L</span><span>₹2Cr+</span>
              </div>
            </div>
          )}
          <WhyBox text="65% of Indian families have zero life cover. If you earn, your family's financial security depends entirely on you staying alive." />
          <div style={{ height: 120 }} />
        </div>
        <StickyCTA label="Continue →" onClick={advance} />
      </div>
    );
  }

  /* Q10 — City */
  const filteredCities = cityInput.trim().length >= 1
    ? CITIES.filter(c => c.toLowerCase().startsWith(cityInput.toLowerCase())).slice(0, 8)
    : CITIES.slice(0, 8);

  return (
    <div className="flex flex-col h-full" style={{ background: "#f2f2f7" }}>
      <QHeader step={10} total={10} label="Almost there!" onBack={handleBack} />
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ padding: "22px 22px 0" }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#000", letterSpacing: -0.4, lineHeight: 1.2, marginBottom: 8 }}>Where does your family live?</div>
        <div style={{ fontSize: 14, color: "#8e8e93", lineHeight: 1.55, marginBottom: 22 }}>Hospital costs vary significantly by city. Metro hospitals charge 2–3× more than tier-2 cities.</div>
        <div style={{ position: "relative", marginBottom: 12 }}>
          <input
            type="text"
            placeholder="City or PIN code"
            value={cityInput}
            onChange={e => { setCityInput(e.target.value); setCity(e.target.value); }}
            style={{
              width: "100%", padding: "16px 18px", fontSize: 17, fontWeight: 600,
              background: "#fff", border: `2px solid ${city ? "#7c5cf6" : "#e5e5ea"}`, borderRadius: 16,
              outline: "none", fontFamily: "inherit", color: "#000", boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
          />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {filteredCities.map(c => (
            <div key={c} onClick={() => { setCity(c); setCityInput(c); }} style={{
              padding: "7px 14px", background: city === c ? "#ede9fe" : "#fff",
              border: `1.5px solid ${city === c ? "#7c5cf6" : "#e5e5ea"}`,
              borderRadius: 20, fontSize: 13, fontWeight: 500, color: city === c ? "#7c5cf6" : "#000", cursor: "pointer", transition: "all 0.2s",
            }}>{c}</div>
          ))}
        </div>
        <WhyBox text="A knee replacement in Mumbai costs ₹3.5L; the same in Nagpur costs ₹1.8L. Location calibrates your risk numbers to real local costs." />
        <div style={{ marginTop: 16, background: "#fff", borderRadius: 14, border: "1px solid #e5e5ea", padding: "12px 16px", display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ fontSize: 18 }}>🔒</div>
          <div style={{ fontSize: 13, color: "#8e8e93", lineHeight: 1.5 }}>Your data is only used to calculate your risk score. Never stored or shared.</div>
        </div>
        <div style={{ height: 120 }} />
      </div>
      <StickyCTA label="Calculate my risk →" disabled={city.trim().length < 2} onClick={handleComplete} />
    </div>
  );
}
