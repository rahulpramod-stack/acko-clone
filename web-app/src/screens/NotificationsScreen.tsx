const imgBackIcon = "./assets/icons/chevron-left.svg";
const imgCarN     = "./assets/figma/notifications/car-n.png";
const imgTransferN = "./assets/figma/notifications/transfer-n.png";
const imgPlatinumN = "./assets/figma/notifications/platinum-n.png";
const imgAbhaN    = "./assets/figma/notifications/abha-n.png";
const imgFastagN  = "./assets/figma/notifications/fastag-n.png";
const imgClaimN   = "./assets/figma/notifications/claim-n.png";

/* ── Shared sub-components ──────────────────────────────── */

function IconBubble({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="shrink-0 overflow-hidden rounded-[24px]"
      style={{
        width: 40,
        height: 40,
        backgroundColor: "#ffffff",
        border: "1px solid #e8e8e8",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

function ActionButton({ label }: { label: string }) {
  return (
    <button
      style={{
        border: "1px solid #121212",
        borderRadius: 10,
        padding: "8px 12px",
        fontSize: 12,
        lineHeight: "18px",
        fontWeight: 500,
        color: "#121212",
        backgroundColor: "transparent",
        cursor: "pointer",
        alignSelf: "flex-start",  // hug content width, left-aligned
        display: "block",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

function ArrowRight() {
  return (
    <div
      className="shrink-0 flex items-center justify-center"
      style={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        border: "1px solid #121212",
        opacity: 0.5,
      }}
    >
      <img
        src="./assets/icons/chevron-right.svg"
        alt=""
        style={{ width: 8, height: 8 }}
      />
    </div>
  );
}

/* ── Alert card (with CTA button) ───────────────────────── */

interface AlertCardProps {
  icon: React.ReactNode;
  badge?: string;
  source: string;
  title: string;
  subtitle: string;
  cta: string;
  highlighted?: boolean;
}

function AlertCard({ icon, badge, source, title, subtitle, cta, highlighted }: AlertCardProps) {
  return (
    <div
      className="flex gap-3 items-start"
      style={{
        backgroundColor: highlighted ? "#f2eefc" : "#ffffff",
        borderBottom: "1px solid #e0e0e8",
        padding: 16,
      }}
    >
      <IconBubble>{icon}</IconBubble>

      <div className="flex flex-col gap-3 flex-1 min-w-0">
        {/* Badge row */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2" style={{ minHeight: 16 }}>
            {badge && (
              <span
                style={{
                  fontSize: 10,
                  lineHeight: "14px",
                  fontWeight: 500,
                  color: "#d83d37",
                }}
              >
                {badge}
              </span>
            )}
            <span
              style={{
                fontSize: 10,
                lineHeight: "14px",
                color: "#040222",
                opacity: 0.6,
              }}
            >
              {source}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <p
              style={{
                fontSize: 14,
                lineHeight: "20px",
                fontWeight: 500,
                color: "#121212",
              }}
            >
              {title}
            </p>
            <p
              style={{
                fontSize: 12,
                lineHeight: "18px",
                color: "#4b4b4b",
              }}
            >
              {subtitle}
            </p>
          </div>
        </div>
        <ActionButton label={cta} />
      </div>
    </div>
  );
}

/* ── More item (arrow-right chevron) ────────────────────── */

interface MoreItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function MoreItem({ icon, title, subtitle }: MoreItemProps) {
  return (
    <div
      className="flex gap-3 items-start"
      style={{ borderBottom: "1px solid #e0e0e8", padding: 16 }}
    >
      <IconBubble>{icon}</IconBubble>

      <div className="flex gap-3 items-start flex-1 min-w-0">
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <p
            style={{
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: 500,
              color: "#121212",
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: 12,
              lineHeight: "18px",
              color: "#4b4b4b",
            }}
          >
            {subtitle}
          </p>
        </div>
        <ArrowRight />
      </div>
    </div>
  );
}

/* ── Icon helpers ────────────────────────────────────────── */

function CenteredIcon({ src, size = 36 }: { src: string; size?: number }) {
  return (
    <img
      src={src}
      alt=""
      style={{
        position: "absolute",
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        objectFit: "contain",
      }}
    />
  );
}

/* ── Main screen ─────────────────────────────────────────── */

interface Props {
  onBack: () => void;
}

export default function NotificationsScreen({ onBack }: Props) {
  return (
    <div
      className="relative flex flex-col h-full"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="overflow-y-auto no-scrollbar flex-1" style={{ paddingBottom: 32 }}>

        {/* ── Nav bar ─────────────────────────────── */}
        <div className="flex items-center" style={{ padding: "13px 20px" }}>
          <button
            onClick={onBack}
            className="flex items-center justify-center"
            style={{ width: 24, height: 24 }}
          >
            <img
              src={imgBackIcon}
              alt="Back"
              style={{ width: 10, height: 20, objectFit: "contain" }}
            />
          </button>
        </div>

        {/* ── Title ───────────────────────────────── */}
        <div style={{ padding: "0 16px 24px" }}>
          <h1
            style={{
              fontSize: 24,
              lineHeight: "32px",
              fontWeight: 600,
              letterSpacing: -0.1,
              color: "#121212",
            }}
          >
            Notifications
          </h1>
        </div>

        {/* ── Alerts section ──────────────────────── */}
        <div className="flex flex-col" style={{ gap: 8 }}>
          <p
            style={{
              fontSize: 22,
              lineHeight: "34px",
              fontWeight: 500,
              letterSpacing: -0.1,
              color: "#121212",
              padding: "0 16px",
            }}
          >
            Alerts (3)
          </p>

          <div className="flex flex-col">
            <AlertCard
              highlighted
              icon={<CenteredIcon src={imgCarN} size={36} />}
              badge="Due in 3 days"
              source="VIRTUS • KA13AH9287"
              title="Your car insurance expires on 23 Aug 2025"
              subtitle="Renewal only takes 2 mins"
              cta="Renew now"
            />

            <AlertCard
              highlighted
              icon={<CenteredIcon src={imgTransferN} size={36} />}
              source="VIRTUS • KA13AH9287"
              title="Ownership transfer request was cancelled"
              subtitle="Upload your documents again to transfer"
              cta="Register now"
            />

            <AlertCard
              icon={<CenteredIcon src={imgPlatinumN} size={36} />}
              source="ACKO PLATINUM HEALTH"
              title="Add bank details to update policy"
              subtitle="We can't complete the update without bank details."
              cta="Continue"
            />
          </div>
        </div>

        {/* ── More section ────────────────────────── */}
        <div className="flex flex-col" style={{ gap: 8, marginTop: 48 }}>
          <p
            style={{
              fontSize: 22,
              lineHeight: "34px",
              fontWeight: 500,
              letterSpacing: -0.1,
              color: "#121212",
              padding: "0 16px",
            }}
          >
            More (3)
          </p>

          <div className="flex flex-col">
            <MoreItem
              icon={<CenteredIcon src={imgAbhaN} size={36} />}
              title="Create your ABHA ID on ACKO"
              subtitle="AIIMS and other top hospitals now use ABHA to access health records."
            />
            <MoreItem
              icon={<CenteredIcon src={imgFastagN} size={36} />}
              title="FASTag balance is running low!"
              subtitle="Check & recharge your FASTag balance instantly."
            />
            <MoreItem
              icon={<CenteredIcon src={imgClaimN} size={36} />}
              title="Claim limit per year?"
              subtitle="How many times can you claim insurance in a year?"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
