import FloatingCategoryNav, { useNavScrollVisibility, type Category } from "../components/FloatingCategoryNav";

const imgFamilyAvatar = "./assets/figma/family-avatar.svg";
const imgBackIcon     = "./assets/icons/chevron-left.svg";

function ArrowBtnDark() {
  return (
    <div className="overflow-hidden shrink-0" style={{ width: 20, height: 20 }}>
      <img src="./assets/icons/arrow-right-dark.svg" alt="" className="w-full h-full" />
    </div>
  );
}

function HealthcareRow({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div
      className="flex items-center justify-between p-3 rounded-xl w-full"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div className="flex flex-col gap-1">
        <p className="font-medium text-[#121212]" style={{ fontSize: 14, lineHeight: "20px" }}>
          {title}
        </p>
        <p style={{ fontSize: 12, lineHeight: "18px", color: "#7a787d" }}>
          {subtitle}
        </p>
      </div>
      <ArrowBtnDark />
    </div>
  );
}

const FAMILY_MEMBERS = [
  { initials: "SS", active: true },
  { initials: "SC", active: false },
  { initials: "NA", active: false },
  { initials: "VA", active: false },
];

interface Props {
  onBack: () => void;
  onCalculateRisk?: () => void;
  onCategoryChange?: (cat: Category) => void;
  riskScore?: number;
}

export default function FamilyScreen({ onBack, onCalculateRisk, onCategoryChange, riskScore }: Props) {
  const { scrollRef, visible } = useNavScrollVisibility();
  const hasScore = riskScore !== undefined;

  return (
    <div className="relative flex flex-col h-full" style={{ backgroundColor: "#19191a" }}>
      <div ref={scrollRef} className="overflow-y-auto no-scrollbar flex-1" style={{ paddingBottom: 100 }}>

        {/* ── Dark hero section ───────────────────────────────────────── */}
        <div style={{ backgroundColor: "#19191a" }}>

          {/* Back nav */}
          <div className="flex items-center px-5 py-3">
            <button onClick={onBack} className="flex items-center justify-center -ml-0.5">
              <div className="relative" style={{ width: 24, height: 24 }}>
                <img
                  alt="Back"
                  className="absolute inset-0 w-full h-full object-contain"
                  src={imgBackIcon}
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
            </button>
          </div>

          {/* Family avatar + title */}
          <div className="flex flex-col gap-4 items-center px-4 pb-6 pt-4">
            <div className="flex flex-col gap-3 items-center">
              <div className="relative" style={{ width: 80, height: 80 }}>
                <img alt="" className="absolute inset-0 w-full h-full" src={imgFamilyAvatar} />
              </div>
              <p className="text-white font-semibold text-center" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: "-0.1px" }}>
                Amit's family
              </p>
            </div>

            {/* Score pill — "NA" before score, red score after */}
            <div className="flex items-center overflow-hidden rounded-[4px]">
              <div
                className="flex items-center justify-center px-2 h-7"
                style={{ backgroundColor: "#ffffff" }}
              >
                <p className="font-medium text-[#121212] text-center" style={{ fontSize: 12, lineHeight: "18px" }}>
                  {hasScore ? "Financial Risk Score" : "Protection score"}
                </p>
              </div>
              <div
                className="flex items-center justify-center h-7"
                style={{
                  minWidth: 39,
                  paddingLeft: 6,
                  paddingRight: 6,
                  backgroundColor: hasScore ? "rgba(220,38,38,0.72)" : "#0FA457",
                  transition: "background-color 0.3s ease",
                }}
              >
                <p className="text-white font-medium text-center" style={{ fontSize: 12, lineHeight: "18px" }}>
                  {hasScore ? riskScore : "NA"}
                </p>
              </div>
            </div>

            {hasScore ? (
              /* ── Post-score state: family member avatars ── */
              <div className="flex items-end gap-2 justify-center" style={{ marginTop: 4 }}>
                {FAMILY_MEMBERS.map((m) => (
                  <div key={m.initials} className="flex flex-col items-center gap-1">
                    <div
                      className="flex items-center justify-center rounded-full"
                      style={{
                        width: m.active ? 48 : 40,
                        height: m.active ? 48 : 40,
                        backgroundColor: "rgba(255,255,255,0.12)",
                        border: m.active ? "1.5px solid #6bcb79" : "1.5px solid rgba(255,255,255,0.2)",
                        boxShadow: m.active ? "0 2px 12px 2px rgba(107,203,121,0.3)" : "none",
                      }}
                    >
                      <span
                        className="font-medium text-white text-center"
                        style={{ fontSize: 12, letterSpacing: 1 }}
                      >
                        {m.initials}
                      </span>
                    </div>
                  </div>
                ))}
                {/* Add member button */}
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "rgba(255,255,255,0.12)",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 3V13M3 8H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            ) : (
              /* ── Pre-score state: headline + CTA ── */
              <>
                <p className="text-white font-semibold text-center" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: "-0.1px" }}>
                  Most families in India{"\n"}are one hospitalisation away from bankruptcy
                </p>
                <p className="text-center" style={{ fontSize: 14, lineHeight: "20px", color: "#8f8e92" }}>
                  Do you know where you stand?
                </p>
                <button
                  onClick={onCalculateRisk}
                  className="flex items-center justify-center border border-[#9c9c9c] bg-white rounded-lg cursor-pointer"
                  style={{ width: 226, padding: 10 }}
                >
                  <p className="font-medium text-[#121212] text-center" style={{ fontSize: 12, lineHeight: "18px" }}>
                    Calculate your Financial Risk Score
                  </p>
                </button>
              </>
            )}
          </div>
        </div>

        {/* ── Post-score: health cover strip ─────────────────────────── */}
        {hasScore && (
          <div
            className="flex items-center justify-between px-5"
            style={{ backgroundColor: "#ffffff", paddingTop: 20, paddingBottom: 20 }}
          >
            <div className="flex flex-col gap-0.5">
              <p style={{ fontSize: 16, lineHeight: "24px", color: "#040222" }}>
                <strong>₹5 Lakh</strong> Health cover
              </p>
              <p style={{ fontSize: 12, lineHeight: "18px", color: "#5b5675" }}>
                Amit + Deepti + Ayushi
              </p>
            </div>
            <button
              className="flex items-center justify-center rounded-xl border border-[#121212] cursor-pointer"
              style={{ padding: "12px 16px" }}
            >
              <span className="font-medium text-[#040222]" style={{ fontSize: 14, lineHeight: "20px" }}>
                Analyse policy
              </span>
            </button>
          </div>
        )}

        {/* ── White content area ──────────────────────────────────────── */}
        <div style={{ backgroundColor: "#ffffff" }}>
          <div className="flex flex-col gap-3 px-4 pt-4 pb-4" style={{ paddingTop: hasScore ? 4 : 32 }}>
            <p className="font-semibold text-[#121212]" style={{ fontSize: 18, lineHeight: "24px" }}>
              Smarter healthcare for you
            </p>
            <div className="flex flex-col gap-4">
              <HealthcareRow
                title="Create ABHA cards"
                subtitle="All your medical records in one place"
              />
              <HealthcareRow
                title="Analyse any health policy"
                subtitle="Find gaps in your policy for FREE"
              />
            </div>
          </div>
        </div>
      </div>

      <FloatingCategoryNav
        active="family"
        visible={visible}
        onTabChange={(tab) => onCategoryChange?.(tab)}
      />
    </div>
  );
}
