import { useEffect, useRef, useState } from "react";

interface Props {
  onBack: () => void;
  onUnderstood: () => void;
}

/* ───────────── Score Gauge — inline SVG, tick-by-tick ── */

// Arc geometry reverse-engineered from LOB/score-speedo.svg:
//   center (82.5, 81.4), outer r=81.4, inner r=66
//   SVG angle 165° (lower-left) → clockwise 210° → SVG angle 15° (lower-right)
//   passing through SVG 270° (top, which is up in screen coords)
const GAUGE_CX       = 82.5;
const GAUGE_CY       = 81.4;
const GAUGE_R_OUTER  = 81.4;
const GAUGE_R_INNER  = 66;
const GAUGE_START    = 165;   // SVG degrees of leftmost tick
const GAUGE_ARC      = 210;   // total clockwise sweep
const TICK_COUNT     = 45;
const STAGGER_MS     = 34;
const INIT_DELAY_MS  = 320;

function buildTicks() {
  return Array.from({ length: TICK_COUNT }, (_, i) => {
    const deg = GAUGE_START + (i / (TICK_COUNT - 1)) * GAUGE_ARC;
    const rad = (deg * Math.PI) / 180;
    return {
      x1: GAUGE_CX + GAUGE_R_INNER * Math.cos(rad),
      y1: GAUGE_CY + GAUGE_R_INNER * Math.sin(rad),
      x2: GAUGE_CX + GAUGE_R_OUTER * Math.cos(rad),
      y2: GAUGE_CY + GAUGE_R_OUTER * Math.sin(rad),
    };
  });
}

// Color per tick:
//   active zone (0 → scoreTick): red fading as it nears the score mark
//   beyond score: gray
function tickColor(i: number, scoreTick: number): string {
  if (i > scoreTick) return "rgba(183,183,184,0.55)";
  const t = scoreTick > 0 ? i / scoreTick : 0;
  const opacity = (0.80 - t * 0.52).toFixed(2);  // 0.80 → 0.28
  return `rgba(220,38,38,${opacity})`;
}

const TICKS = buildTicks();

function ScoreGauge({ score }: { score: number }) {
  const [displayScore, setDisplayScore] = useState(0);
  const [sweepDone,    setSweepDone]    = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const scoreTick = Math.round((score / 100) * (TICK_COUNT - 1));

  useEffect(() => {
    const duration  = TICK_COUNT * STAGGER_MS + 200;
    const startTime = performance.now() + INIT_DELAY_MS;

    const frame = (now: number) => {
      const elapsed  = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setSweepDone(true);
        setTimeout(() => setBadgeVisible(true), 200);
      }
    };
    rafRef.current = requestAnimationFrame(frame);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [score]);

  return (
    <>
      <style>{`
        @keyframes tickIn {
          0%   { opacity: 0; }
          50%  { opacity: 1; }
          75%  { opacity: 0.7; }
          100% { opacity: 1; }
        }
        @keyframes badgePop {
          0%   { opacity: 0; transform: translateY(6px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div className="flex flex-col items-center">
        <div style={{ position: "relative", width: 186, height: 130 }}>

          {/* Inline SVG — one <line> per tick, staggered in */}
          <svg
            width="165"
            height="105"
            viewBox="0 0 165 105"
            style={{ display: "block", margin: "0 auto", overflow: "visible" }}
          >
            {TICKS.map((t, i) => (
              <line
                key={i}
                x1={t.x1} y1={t.y1}
                x2={t.x2} y2={t.y2}
                stroke={tickColor(i, scoreTick)}
                strokeWidth={4.5}
                strokeLinecap="round"
                style={{
                  opacity: 0,
                  animation: `tickIn 0.28s ease-out ${INIT_DELAY_MS + i * STAGGER_MS}ms both`,
                }}
              />
            ))}
          </svg>

          {/* Score number counts up in sync */}
          <span
            className="font-semibold"
            style={{
              position: "absolute",
              left: "50%",
              bottom: 14,
              transform: "translateX(-50%)",
              fontSize: 52,
              lineHeight: "64px",
              letterSpacing: "-0.5px",
              color: "rgba(220,38,38,0.72)",
              opacity: displayScore > 0 ? 1 : 0,
              transition: "opacity 0.25s ease",
              whiteSpace: "nowrap",
            }}
          >
            {displayScore}
          </span>
        </div>
      </div>

      {/* Badge pops in after sweep completes */}
      <div
        style={{
          marginTop: 24,
          padding: "4px 16px",
          borderRadius: 16,
          backgroundColor: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(220,38,38,0.56)",
          opacity: badgeVisible ? 1 : 0,
          animation: badgeVisible
            ? "badgePop 0.35s cubic-bezier(0.34,1.56,0.64,1) both"
            : "none",
        }}
      >
        <span style={{ fontSize: 14, lineHeight: "20px", color: "#000" }}>
          {sweepDone ? "Needs urgent attention" : "\u00a0"}
        </span>
      </div>
    </>
  );
}

/* ───────────── Insight Item ─────────────────────────── */

function InsightItem({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 items-start">
      <img alt="" src={icon} className="shrink-0" style={{ width: 40, height: 40 }} />
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p className="font-medium" style={{ fontSize: 16, lineHeight: "24px", color: "#040222" }}>
          {title}
        </p>
        <div style={{ fontSize: 14, lineHeight: "20px", color: "#757575" }}>{children}</div>
      </div>
    </div>
  );
}

/* ───────────── Recommendation Card ──────────────────── */

function RecommendCard({
  icon,
  title,
  description,
  cta,
}: {
  icon: string;
  title: React.ReactNode;
  description: string;
  cta: string;
}) {
  return (
    <div
      className="flex flex-col"
      style={{
        padding: "20px 16px",
        backgroundColor: "#f5f5f5",
        border: "1px solid rgba(224,224,232,0.3)",
        borderRadius: 24,
      }}
    >
      <div className="flex gap-4 items-start">
        <img alt="" src={icon} className="shrink-0" style={{ width: 40, height: 40 }} />
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <div className="flex flex-col gap-1">
            <p className="font-medium" style={{ fontSize: 16, lineHeight: "24px", color: "#040222" }}>
              {title}
            </p>
            <p style={{ fontSize: 14, lineHeight: "20px", color: "#757575" }}>{description}</p>
          </div>
          <p
            className="font-medium"
            style={{ fontSize: 12, lineHeight: "18px", color: "rgba(59, 130, 246, 0.72)" }}
          >
            {cta}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ───────────── Main Screen ──────────────────────────── */

export default function ScoreAnalysisScreen({ onBack, onUnderstood }: Props) {
  return (
    <div className="relative flex flex-col h-full" style={{ backgroundColor: "#ffffff" }}>
      {/* Red gradient tint at top */}
      <div
        className="absolute top-0 left-0 w-full"
        style={{
          height: 180,
          background:
            "linear-gradient(180deg, rgba(220,38,38,0.11) 0%, rgba(255,255,255,0.2) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Header with back button */}
      <div className="relative flex items-center px-4 pt-3" style={{ height: 48 }}>
        <button
          onClick={onBack}
          className="flex items-center justify-center cursor-pointer"
          style={{ width: 24, height: 24 }}
        >
          <img alt="Back" src="./assets/icons/chevron-left.svg" className="w-full h-full" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="relative flex-1 overflow-y-auto no-scrollbar pb-10">
        {/* Title + Gauge section */}
        <div className="flex flex-col items-center" style={{ paddingTop: 16 }}>
          <p
            className="font-semibold text-center"
            style={{
              fontSize: 24,
              lineHeight: "32px",
              letterSpacing: "-0.1px",
              color: "#121212",
              maxWidth: 320,
            }}
          >
            Your family's{"\n"}financial risk score
          </p>

          <div style={{ marginTop: 18 }} className="flex flex-col items-center">
            <ScoreGauge score={30} />
          </div>
        </div>

        {/* Insights section */}
        <div className="flex flex-col gap-4 px-4" style={{ marginTop: 40 }}>
          <p className="font-semibold" style={{ fontSize: 18, lineHeight: "24px", color: "#000" }}>
            Insights based on your score
          </p>

          {/* Insights card */}
          <div
            className="flex flex-col gap-6"
            style={{
              padding: "20px 16px",
              backgroundColor: "#ffffff",
              border: "1px solid rgba(224,224,232,0.3)",
              borderRadius: 24,
            }}
          >
            <InsightItem
              icon="./assets/icons/good-score.svg"
              title="You have basic health coverage"
            >
              <p>You have a ₹5 lakh health policy in place. That's a solid foundation.</p>
            </InsightItem>

            <InsightItem
              icon="./assets/icons/alert.svg"
              title="Your current health coverage may not be enough"
            >
              <p>
                A major medical event in a metro city can cost{" "}
                <strong style={{ color: "#040222" }}>₹15L to ₹20L</strong>, especially for
                families supporting ageing parents.
              </p>
            </InsightItem>

            <InsightItem
              icon="./assets/icons/alert.svg"
              title="You do not have life insurance"
            >
              <p>
                You have 3 dependents. Without life cover, their financial security depends
                entirely on your current savings.
              </p>
            </InsightItem>
          </div>

          {/* "What does this mean" callout */}
          <div
            className="flex flex-col gap-3"
            style={{
              padding: "20px 16px",
              backgroundColor: "#ffffff",
              border: "1px solid rgba(224,224,232,0.3)",
              borderRadius: 24,
            }}
          >
            <div className="flex items-center gap-2">
              <img
                alt=""
                src="./assets/icons/light-bulb-filled.svg"
                style={{ width: 18, height: 18 }}
              />
              <span
                className="font-medium"
                style={{
                  fontSize: 14,
                  lineHeight: "20px",
                  background: "linear-gradient(-89deg, #e64980 15%, #451999 99%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                What does this mean for you
              </span>
            </div>
            <p style={{ fontSize: 14, lineHeight: "20px", color: "#36354c" }}>
              In a major health emergency, you may need to pay a large part of the bill{" "}
              <strong>out-of-pocket.</strong> This could create financial stress for your family.
            </p>
          </div>
        </div>

        {/* Recommendations section */}
        <div className="flex flex-col gap-4 px-4" style={{ marginTop: 40 }}>
          <p className="font-semibold" style={{ fontSize: 18, lineHeight: "24px", color: "#000" }}>
            How can you improve your score?
          </p>

          <RecommendCard
            icon="./assets/icons/health-cover.svg"
            title="Upgrade your health cover"
            description="Keep your ₹5L base plan and add a ₹10L to ₹20L super top up. This significantly boosts coverage at a relatively low cost."
            cta="Explore ACKO's Super Top Up plan →"
          />

          <RecommendCard
            icon="./assets/icons/life-plan.svg"
            title={
              <>
                Protect your family's future with a ₹1.5&nbsp;Cr+ term life plan
              </>
            }
            description="A ₹1.5 Cr+ term-life plan can help replace 10 to 15 years of income. Buying earlier locks in lower premiums and long term protection."
            cta="Explore ACKO Life Term plan →"
          />
        </div>

        {/* ── I understood CTA ─────────────────────────────── */}
        <div className="px-4" style={{ marginTop: 40, paddingBottom: 8 }}>
          <button
            onClick={onUnderstood}
            className="w-full flex items-center justify-center rounded-xl cursor-pointer"
            style={{
              height: 52,
              backgroundColor: "#121212",
            }}
          >
            <span
              className="font-semibold"
              style={{ fontSize: 16, lineHeight: "22px", color: "#ffffff" }}
            >
              I understood
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
