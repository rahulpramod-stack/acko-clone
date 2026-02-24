const imgAmbu1 = "/assets/lob/Towing my car.png";
const imgAmbu2 = "/assets/lob/Book ambulance.png";
const imgBatteryImg = "/assets/lob/Battery jump start.png";
const imgFlatTyreImg = "/assets/lob/Flat tyre.png";
const imgFuelImg = "/assets/lob/Out of fuel.png";

// ── Time badges ─────────────────────────────────────────────────────────────

function ClockBadge({ mins }: { mins: number }) {
  return (
    <div
      className="inline-flex gap-[2px] items-center justify-center rounded-[49px]"
      style={{ border: "1px solid #474649", padding: "4px" }}
    >
      <img src="/assets/icons/clock.svg" alt="" style={{ width: 12, height: 12 }} />
      <span style={{ fontSize: 10, lineHeight: "14px", color: "#a6a6a6" }}>
        <span style={{ fontWeight: 700 }}>{mins}</span> mins
      </span>
    </div>
  );
}

function LightningBadge({ mins }: { mins: number }) {
  return (
    <div
      className="inline-flex gap-[2px] items-center justify-center rounded-[49px]"
      style={{ border: "1px solid #0fa457", padding: "4px" }}
    >
      <img src="/assets/icons/lightning.svg" alt="" style={{ width: 8, height: 12 }} />
      <span style={{ fontSize: 10, lineHeight: "14px", color: "#a6a6a6" }}>
        <span style={{ fontWeight: 700 }}>{mins}</span> mins
      </span>
    </div>
  );
}

// ── Emergency service cards ──────────────────────────────────────────────────

interface ServiceCardProps {
  title: string;
  badge?: React.ReactNode;
  imageSrc?: string;
  imageContainerStyle?: React.CSSProperties;
  flipX?: boolean;
}

function ServiceCard({ title, badge, imageSrc, imageContainerStyle, flipX }: ServiceCardProps) {
  return (
    <div
      className="flex flex-col gap-3 items-start overflow-hidden relative"
      style={{
        background: "#313131",
        borderRadius: 16,
        padding: 12,
        boxShadow: "0px 4px 10px -2px rgba(54,53,76,0.08)",
        minWidth: 0,
      }}
    >
      <div
        className="font-medium text-white"
        style={{ fontSize: 14, lineHeight: "20px" }}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {badge}
      {imageSrc && (
        <div
          className="absolute bottom-0 right-0 overflow-hidden"
          style={{ width: 80, height: 80, ...(imageContainerStyle || {}) }}
        >
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 w-full h-full"
            style={{
              objectFit: "contain",
              ...(flipX ? { transform: "scaleX(-1)" } : {}),
            }}
          />
        </div>
      )}
    </div>
  );
}

// ── Arrow button (dark/white bg variant) ────────────────────────────────────

function ArrowBtnDark() {
  return (
    <div className="overflow-hidden shrink-0" style={{ width: 22, height: 22 }}>
      <img src="/assets/icons/arrow-right-dark.svg" alt="" className="w-full h-full" />
    </div>
  );
}

// ── Emergency section ────────────────────────────────────────────────────────

function EmergencySection() {
  return (
    <div className="flex flex-col gap-6 px-4 pt-4 pb-6" style={{ background: "#19191a" }}>
      <p className="text-white font-semibold" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: -0.1 }}>
        Emergency and support
      </p>

      {/* 2-column grid — rows auto-equalise height */}
      <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Row 1 */}
        <ServiceCard
          title="Tow &amp; move<br/>my car"
          badge={<ClockBadge mins={90} />}
          imageSrc={imgAmbu1}
        />
        <ServiceCard
          title="Book an<br/>ambulance"
          imageSrc={imgAmbu2}
        />

        {/* Row 2 */}
        <ServiceCard
          title="Car battery<br/>jump-start"
          badge={<LightningBadge mins={15} />}
          imageSrc={imgBatteryImg}
        />
        <ServiceCard
          title="Flat tyre<br/>assistance"
          badge={<LightningBadge mins={20} />}
          imageSrc={imgFlatTyreImg}
        />

        {/* Row 3 */}
        <ServiceCard
          title="Car is out<br/>of fuel"
          badge={<LightningBadge mins={20} />}
          imageSrc={imgFuelImg}
        />

        {/* All services */}
        <div
          className="flex flex-col items-start justify-between overflow-hidden relative"
          style={{
            background: "#313131",
            borderRadius: 16,
            padding: 12,
            boxShadow: "0px 4px 10px -2px rgba(54,53,76,0.08)",
          }}
        >
          <div className="flex items-start justify-between w-full">
            <span className="font-medium text-white" style={{ fontSize: 14, lineHeight: "20px" }}>
              All services
            </span>
            <div className="relative shrink-0 opacity-50" style={{ width: 20, height: 20 }}>
              <img src="/assets/icons/arrow-circle.svg" alt="" className="absolute inset-0 w-full h-full" />
              <img
                src="/assets/icons/arrow-right-white.svg"
                alt=""
                className="absolute"
                style={{ width: 9, height: 8, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
              />
            </div>
          </div>
          <p style={{ fontSize: 10, lineHeight: "14px", color: "#a6a6a6" }}>
            Help with car accidents, EV charging, and more
          </p>
        </div>
      </div>

      {/* Roadside Assistance banner */}
      <div
        className="flex items-center justify-between px-4 py-3 rounded-xl w-full"
        style={{
          background: "#313131",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0px 4px 10px 0px rgba(54,53,76,0.08)",
        }}
      >
        <p className="font-medium text-white" style={{ fontSize: 12, lineHeight: "18px" }}>
          Your FREE Roadside Assistance trial<br />ends on 25 Apr 2026
        </p>
        <span className="font-medium shrink-0 ml-2" style={{ fontSize: 12, lineHeight: "18px", color: "#4ea3f9" }}>
          Know more
        </span>
      </div>
    </div>
  );
}

// ── Policy / Claim action card ───────────────────────────────────────────────

function ActionServiceCard({ icon, label }: { icon: string; label: string }) {
  return (
    <div
      className="flex-1 flex flex-col gap-4 items-start min-w-0"
      style={{
        background: "#f5f5f5",
        borderRadius: 12,
        padding: 12,
        boxShadow: "0px 2px 2px 0px rgba(0,0,0,0.02), inset 0px 1px 4px 0px rgba(255,255,255,0.56), inset 0px -1px 4px 0px rgba(0,0,0,0.08)",
      }}
    >
      <img src={icon} alt="" style={{ width: 21, height: 21, objectFit: "contain" }} />
      <p className="font-medium text-[#121212] w-full" style={{ fontSize: 12, lineHeight: "18px" }}>
        {label}
      </p>
    </div>
  );
}


// ── Policy actions section ───────────────────────────────────────────────────

function PolicyActionsSection() {
  return (
    <div className="flex flex-col gap-4 px-4 py-6" style={{ background: "#ffffff" }}>
      <p className="font-semibold text-[#121212]" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: -0.1 }}>
        Policy actions
      </p>

      {/* 3 action cards */}
      <div className="flex gap-2">
        <ActionServiceCard icon="/assets/icons/policy-download.svg" label="Download policy" />
        <ActionServiceCard icon="/assets/icons/view-policy.svg" label={"View\npolicy"} />
        <ActionServiceCard icon="/assets/icons/edit.svg" label={"Edit\npolicy"} />
      </div>

      {/* Transfer row */}
      <div
        className="flex items-center justify-between px-4 py-5 rounded-2xl w-full"
        style={{
          background: "#f5f5f5",
          border: "1px solid #ffffff",
          boxShadow: "inset 0px 1px 4px 0px rgba(255,255,255,0.56), inset 0px -1px 4px 0px rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex gap-3 items-center">
          <img src="/assets/icons/transfer.svg" alt="" style={{ width: 21, height: 21 }} />
          <p className="font-medium text-[#121212]" style={{ fontSize: 12, lineHeight: "20px" }}>
            Transfer an existing ACKO policy
          </p>
        </div>
        <ArrowBtnDark />
      </div>
    </div>
  );
}

// ── Claim actions section ────────────────────────────────────────────────────

function ClaimActionsSection() {
  return (
    <div className="flex flex-col gap-4 px-4 pb-6" style={{ background: "#ffffff" }}>
      <p className="font-semibold text-[#121212]" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: -0.1 }}>
        Claim actions
      </p>
      <div className="flex gap-2">
        <ActionServiceCard icon="/assets/icons/ABHA.svg"        label="Download health e-cards" />
        <ActionServiceCard icon="/assets/icons/claim-action.svg" label="Update on my claim status" />
        <ActionServiceCard icon="/assets/icons/file-a-new.svg"  label="File a new claim" />
      </div>
    </div>
  );
}

// ── Need more help section ───────────────────────────────────────────────────

function NeedMoreHelpSection() {
  return (
    <div className="flex flex-col gap-4 px-4 pb-6" style={{ background: "#ffffff" }}>
      <p className="font-semibold text-[#121212]" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: -0.1 }}>
        Need more help?
      </p>
      <div className="flex gap-3">
        {/* Talk to us */}
        <div
          className="flex-1 flex items-center justify-between pl-3 pr-2 py-3 rounded-2xl"
          style={{ background: "#f5f5f5", border: "1px solid #ffffff" }}
        >
          <div className="flex gap-2 items-center">
            <img src="/assets/icons/talk-to-us.svg" alt="" style={{ width: 21, height: 21 }} />
            <div className="flex flex-col gap-0.5">
              <p className="font-medium text-[#121212]" style={{ fontSize: 14, lineHeight: "20px" }}>
                Talk to us
              </p>
              <p style={{ fontSize: 10, lineHeight: "14px", color: "#4b4b4b" }}>
                5 - 10 mins wait
              </p>
            </div>
          </div>
          <ArrowBtnDark />
        </div>

        {/* Write to us */}
        <div
          className="flex-1 flex items-center justify-between pl-3 pr-2 py-3 rounded-2xl"
          style={{ background: "#f5f5f5", border: "1px solid #ffffff" }}
        >
          <div className="flex gap-2 items-center">
            <img src="/assets/icons/write-to-us.svg" alt="" style={{ width: 21, height: 21 }} />
            <div className="flex flex-col gap-0.5">
              <p className="font-medium text-[#121212]" style={{ fontSize: 14, lineHeight: "20px" }}>
                Write to us
              </p>
              <p style={{ fontSize: 10, lineHeight: "14px", color: "#4b4b4b" }}>
                12 - 24 hrs wait
              </p>
            </div>
          </div>
          <ArrowBtnDark />
        </div>
      </div>
    </div>
  );
}

// ── Chatbot section ──────────────────────────────────────────────────────────

function SuggestionBubble({ text, borderRadius = "16px 16px 16px 4px" }: { text: string; borderRadius?: string }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        background: "#ebebeb",
        border: "1px solid #e8e8e8",
        borderRadius,
        padding: "8px 12px",
      }}
    >
      <p style={{ fontSize: 12, lineHeight: "18px", color: "#121212" }}>{text}</p>
    </div>
  );
}

function ChatbotSection() {
  return (
    <div
      className="flex flex-col px-4 pt-6 pb-4 flex-1 min-h-screen"
      style={{ background: "linear-gradient(179.83deg, rgb(239,233,251) 0%, rgb(248,247,250) 23.833%)" }}
    >
      {/* Drag handle */}
      <div className="flex justify-center mb-4">
        <div className="rounded-full" style={{ width: 48, height: 4, background: "#4b4b4b" }} />
      </div>

      {/* AI Avatar */}
      <div className="flex flex-col items-center gap-3 pt-4 pb-2">
        <div className="relative" style={{ width: 88, height: 88 }}>
          <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
            <img src="/assets/icons/aashiq-logo.svg" alt="Aashiq" style={{ width: "53%", height: "41%" }} />
          </div>
          {/* Online dot */}
          <img
            src="/assets/icons/online-dot.svg"
            alt=""
            className="absolute"
            style={{ width: "22.73%", height: "22.73%", bottom: 0, right: 0 }}
          />
        </div>

        <p className="text-center" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: -0.1 }}>
          <span className="font-semibold text-[#121212]">Hi Aashiq, </span>
          <span className="text-[#121212]" style={{ fontWeight: 400 }}>I&apos;m here to help </span>
          <br />
          <span className="text-[#121212]" style={{ fontWeight: 400 }}>with anything on ACKO</span>
        </p>

        <div className="flex gap-2 items-center font-medium" style={{ fontSize: 12, lineHeight: "18px", color: "#121212" }}>
          <span>Instant support</span>
          <span>•</span>
          <span>24x7 online</span>
          <span>•</span>
          <span>Tailored for you</span>
        </div>
      </div>

      {/* Continue previous chat card */}
      <div className="flex items-start gap-3 p-3 rounded-2xl mt-4" style={{ background: "#efe9fb" }}>
        <div className="flex items-center justify-center rounded-full bg-white shrink-0" style={{ width: 32, height: 32 }}>
          <img src="/assets/icons/chat-history.svg" alt="" style={{ width: 16, height: 16 }} />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium text-black" style={{ fontSize: 14, lineHeight: "20px" }}>
            Continue your previous chat?
          </p>
          <p className="text-[#121212]" style={{ fontSize: 12, lineHeight: "18px" }}>
            We last spoke about car insurance for your Honda City, and the zero depreciation add-on.
          </p>
        </div>
      </div>

      {/* Suggestion bubbles — mt-auto pushes them to the bottom, near the AskInput */}
      <div className="flex flex-col gap-3 mt-auto">
        <div className="flex gap-3 justify-end">
          <SuggestionBubble text={"Compare insurance\nplans for Honda City"} borderRadius="16px 16px 4px 4px" />
          <SuggestionBubble text={"Learn about the zero\ndepreciation add-on"} borderRadius="16px 16px 16px 16px" />
        </div>
        <div className="flex gap-3 justify-end">
          <SuggestionBubble text={"I want to see what\nmy policy covers"} borderRadius="16px 16px 4px 16px" />
          <SuggestionBubble text={"I want an update on\nmy ongoing claim"} />
        </div>
      </div>
    </div>
  );
}

// ── Ask me anything input ────────────────────────────────────────────────────

function AskInput() {
  return (
    <div className="flex items-end justify-center pb-4 pt-2 shrink-0 relative overflow-hidden">
      {/* Color gradient: transparent at top → matches ChatbotSection bg at bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(248, 247, 250, 0) 0%, rgb(248, 247, 250) 60%)",
        }}
      />
      {/* Progressive blur layer: no blur at top → full blur at bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backdropFilter: "blur(13px)",
          WebkitBackdropFilter: "blur(13px)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
        }}
      />
      {/* Input pill */}
      <div
        className="flex items-center justify-between px-4 relative"
        style={{
          zIndex: 1,
          background: "#ffffff",
          borderRadius: 100,
          width: 224,
          height: 48,
          boxShadow: "0px 20px 20px -3px rgba(0,0,0,0.02), 0px 6px 6px -2px rgba(0,0,0,0.02), 0px 2px 4px -1px rgba(0,0,0,0.02)",
        }}
      >
        <p style={{ fontSize: 14, lineHeight: "20px", color: "#757575" }}>Ask me anything</p>
        <img src="/assets/icons/send-btn.svg" alt="Send" style={{ width: 16, height: 16 }} />
      </div>
    </div>
  );
}

// ── Main screen ──────────────────────────────────────────────────────────────

export default function SupportTabScreen() {
  return (
    <div className="flex flex-col h-full relative" style={{ backgroundColor: "rgb(248, 247, 250)" }}>
      {/* Scrollable content — extra bottom padding so last item clears the floating AskInput */}
      <div className="overflow-y-auto no-scrollbar flex flex-col flex-1 min-h-0" style={{ paddingBottom: 80 }}>
        <EmergencySection />
        <PolicyActionsSection />
        <ClaimActionsSection />
        <NeedMoreHelpSection />
        <ChatbotSection />
      </div>
      {/* AskInput floats over the scroll content so backdrop-filter has content to blur */}
      <div className="absolute bottom-0 left-0 right-0">
        <AskInput />
      </div>
    </div>
  );
}
