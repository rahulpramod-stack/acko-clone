// Local quick-card icons
const imgPolicyIcon = "./assets/icons/Your Policy.svg";
const imgMoneyIcon  = "./assets/icons/Rewards.svg";
const imgChevron    = "./assets/icons/arrow right.svg";

// Local LOB assets (served from /public)
const imgCar      = "./assets/lob/Car.png";
const imgHospital = "./assets/lob/Hospital.png";
const imgBike     = "./assets/lob/Bike.png";
const imgTravel   = "./assets/lob/Travel.png";
const imgLife     = "./assets/lob/Life.png";

// ─── Quick Access Card ────────────────────────────────────────────────────────
function QuickCard({ icon, label }: { icon: string; label: string }) {
  return (
    <button
      className="flex-1 flex items-center justify-between px-3 h-12 rounded-2xl bg-white border-0 cursor-pointer"
      style={{
        boxShadow:
          "0px 2px 2px rgba(0,0,0,0.02), inset 0px 1px 4px rgba(255,255,255,0.56), inset 0px -1px 4px rgba(0,0,0,0.08)",
        background:
          "linear-gradient(90deg, rgba(153,116,249,0.016) 0%, rgba(153,116,249,0.016) 100%), #fff",
      }}
    >
      <div className="flex items-center gap-2">
        <div
          className="relative w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, rgba(153,116,249,0.15) 0%, rgba(153,116,249,0.05) 100%)" }}
        >
          <img
            src={icon}
            alt=""
            className="object-contain"
            style={{ width: 18, height: 18 }}
          />
        </div>
        <span className="text-[12px] font-medium text-[rgba(0,0,0,0.88)]"
          style={{ lineHeight: "18px" }}>
          {label}
        </span>
      </div>
      <img src={imgChevron} alt="" className="w-4 h-4 object-contain" />
    </button>
  );
}

// ─── Car Image (Figma-exact positioning) ─────────────────────────────────────
// Container: 64×64, bottom:-1px right:-1px, overflow:hidden
// Inner image renders at 171% width, clipped to show the front-center of the car
function CarImage() {
  return (
    <div
      className="absolute overflow-hidden"
      style={{ bottom: -1, right: -1, width: 64, height: 64 }}
    >
      <div
        className="absolute"
        style={{ bottom: 3, left: "50%", transform: "translateX(-50%)", width: 64, height: 64 }}
      >
        <img
          src={imgCar}
          alt="Car"
          className="absolute max-w-none"
          style={{
            width: "fit-content",
            height: "90.48%",
            left: "6px",
            top: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        />
      </div>
    </div>
  );
}

// ─── Hospital Image (Figma-exact positioning) ─────────────────────────────────
function HospitalImage() {
  return (
    <div
      className="absolute overflow-hidden"
      style={{ bottom: -1, right: -1.5, width: 64, height: 64 }}
    >
      <div className="absolute" style={{ bottom: 0, right: 0, width: 63, height: 63 }}>
        <img
          src={imgHospital}
          alt="Health"
          className="absolute max-w-none"
          style={{
            width: "100%",
            height: "fit-content",
            left: "-1px",
            top: "0px",
            overflow: "visible",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            gap: "0px",
          }}
        />
      </div>
    </div>
  );
}

// ─── Bike Image (Figma-exact positioning) ─────────────────────────────────────
function BikeImage() {
  return (
    <div
      className="absolute overflow-hidden"
      style={{ bottom: -0.67, right: -1, width: 48, height: 48 }}
    >
      <div
        className="absolute"
        style={{ bottom: 0, left: "50%", transform: "translateX(-50%)", width: 48, height: 48 }}
      >
        <img
          src={imgBike}
          alt="Bike"
          className="absolute max-w-none"
          style={{ width: "fit-content", height: "100%", left: "4.69%", top: "-0.01%" }}
        />
      </div>
    </div>
  );
}

// ─── Travel Image (Figma-exact positioning) ──────────────────────────────────
function TravelImage() {
  return (
    <div
      className="absolute overflow-hidden"
      style={{ bottom: -0.67, right: -1, width: 48, height: 48 }}
    >
      <div
        className="absolute"
        style={{ bottom: -2, left: "calc(50% + 2.5px)", transform: "translateX(-50%)", width: 53, height: 52 }}
      >
        <img
          src={imgTravel}
          alt="Travel"
          className="absolute max-w-none"
          style={{ width: "101.93%", height: "80.63%", left: "-5px", top: "4px" }}
        />
      </div>
    </div>
  );
}

// ─── Life Image (Figma-exact positioning) ─────────────────────────────────────
function LifeImage() {
  return (
    <div
      className="absolute overflow-hidden"
      style={{ bottom: -0.67, right: -1, width: 56, height: 56 }}
    >
      <div
        className="absolute"
        style={{ bottom: 0, left: "calc(50% + 4px)", transform: "translateX(-50%)", width: 56, height: 56 }}
      >
        <img
          src={imgLife}
          alt="Life"
          className="absolute max-w-none"
          style={{ width: "fit-content", height: "106.36%", left: "-3px", top: "4px" }}
        />
      </div>
    </div>
  );
}

// ─── Bento Grid ───────────────────────────────────────────────────────────────
function BentoGrid() {
  const cardShadow = "0px 4px 10px -2px rgba(54,53,76,0.08)";
  const cardBorder = "1px solid rgba(0,0,0,0.05)";

  return (
    <div className="flex gap-3 px-4" style={{ height: 265 }}>

      {/* ── Left column ── */}
      <div className="flex flex-col gap-3" style={{ flex: "1 0 0", minWidth: 0 }}>

        {/* Car card */}
        <div
          className="bg-white relative overflow-hidden flex flex-col"
          style={{ height: 124, borderRadius: 16, padding: 12, border: cardBorder, boxShadow: cardShadow, flexShrink: 0, justifyContent: "flex-start" }}
        >
          <div className="flex flex-col gap-2">
            {/* Title row */}
            <div className="flex flex-col gap-1 relative">
              <span className="font-medium text-[#121212] whitespace-nowrap"
                style={{ fontSize: 16, lineHeight: "24px" }}>
                Car
              </span>
              <span className="text-[#4b4b4b] whitespace-nowrap"
                style={{ fontSize: 12, lineHeight: "18px" }}>
                Get your policy instantly
              </span>
              {/* Sale badge — absolute at top-right of title block */}
              <div
                className="absolute flex items-center justify-center rounded-[21px]"
                style={{
                  left: 96,
                  top: 0,
                  padding: "2px 12px",
                  background: "linear-gradient(95deg, #de6d2e 7.76%, #e157d4 113.79%)",
                }}
              >
                <span className="text-white font-medium whitespace-nowrap"
                  style={{ fontSize: 10, lineHeight: "14px" }}>
                  Sale
                </span>
              </div>
            </div>
            {/* Pill */}
            <div
              className="inline-flex items-center justify-center rounded-[49px]"
              style={{
                padding: "4px 16px 4px 8px",
                backgroundImage: "linear-gradient(94.84deg, rgb(235,210,255) 0.48%, rgba(235,210,255,0) 89.37%)",
                alignSelf: "flex-start",
              }}
            >
              <span className="font-medium whitespace-nowrap" style={{ color: "#5920c5", fontSize: 11, lineHeight: "14px" }}>
                Zero commission
              </span>
            </div>
          </div>
          <CarImage />
        </div>

        {/* Health card */}
        <div
          className="bg-white relative overflow-hidden flex flex-col flex-1"
          style={{ borderRadius: 12, padding: 12, border: cardBorder, boxShadow: cardShadow }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-[2px]">
              <span className="font-medium text-[#121212] whitespace-nowrap"
                style={{ fontSize: 16, lineHeight: "24px" }}>
                Health
              </span>
              <span className="text-[#4b4b4b] whitespace-nowrap"
                style={{ fontSize: 12, lineHeight: "18px" }}>
                100% bill coverage
              </span>
            </div>
            <div
              className="inline-flex items-center justify-center rounded-[49px]"
              style={{
                padding: "4px 16px 4px 8px",
                backgroundImage: "linear-gradient(94.07deg, rgb(235,210,255) 0.48%, rgba(235,210,255,0) 89.37%)",
                alignSelf: "flex-start",
              }}
            >
              <span className="font-medium whitespace-nowrap" style={{ color: "#5920c5", fontSize: 11, lineHeight: "14px" }}>
                Avail 0% GST
              </span>
            </div>
          </div>
          <HospitalImage />
        </div>
      </div>

      {/* ── Right column ── */}
      <div className="flex flex-col gap-3" style={{ flex: "1 0 0", minWidth: 0 }}>

        {/* Bike card */}
        <div
          className="bg-white relative overflow-hidden flex flex-col justify-center flex-1"
          style={{ borderRadius: 12, padding: "0 0 0 12px", border: cardBorder, boxShadow: cardShadow }}
        >
          <div className="flex flex-col gap-[2px]">
            <span className="font-medium text-[#121212] whitespace-nowrap"
              style={{ fontSize: 14, lineHeight: "20px" }}>
              Bike
            </span>
            <span className="text-[#4b4b4b] whitespace-nowrap"
              style={{ fontSize: 10, lineHeight: "14px" }}>
              Insure in 1 min
            </span>
          </div>
          <BikeImage />
        </div>

        {/* Travel card */}
        <div
          className="bg-white relative overflow-hidden flex flex-col justify-center flex-1"
          style={{ borderRadius: 12, padding: "0 0 0 12px", border: cardBorder, boxShadow: cardShadow }}
        >
          <div className="flex flex-col gap-[2px]">
            <span className="font-medium text-[#121212] whitespace-nowrap"
              style={{ fontSize: 14, lineHeight: "20px" }}>
              Travel
            </span>
            <div
              className="inline-flex items-center justify-center rounded-[49px]"
              style={{
                padding: "4px 16px 4px 8px",
                backgroundImage: "linear-gradient(93.42deg, rgb(235,210,255) 0.48%, rgba(235,210,255,0) 89.37%)",
                alignSelf: "flex-start",
              }}
            >
              <span className="font-medium whitespace-nowrap" style={{ color: "#5920c5", fontSize: 10, lineHeight: "14px" }}>
                Get AirPass
              </span>
            </div>
          </div>
          <TravelImage />
        </div>

        {/* Life card */}
        <div
          className="bg-white relative overflow-hidden flex flex-col justify-center flex-1"
          style={{ borderRadius: 12, padding: "0 0 0 12px", border: cardBorder, boxShadow: cardShadow }}
        >
          <div className="flex flex-col gap-[2px]">
            <span className="font-medium text-[#121212] whitespace-nowrap"
              style={{ fontSize: 14, lineHeight: "20px" }}>
              Life
            </span>
            <span className="text-[#4b4b4b] whitespace-nowrap"
              style={{ fontSize: 10, lineHeight: "14px" }}>
              Flexible coverage
            </span>
          </div>
          <LifeImage />
        </div>
      </div>
    </div>
  );
}

// ─── Storefront Section ───────────────────────────────────────────────────────
export default function StorefrontSection() {
  return (
    <div>
      {/* Quick access row */}
      <div className="flex gap-4 px-4 pt-4 pb-4" style={{ borderRadius: "0px", boxSizing: "content-box" }}>
        <QuickCard icon={imgPolicyIcon} label="Your policies" />
        <QuickCard icon={imgMoneyIcon}  label="Rewards" />
      </div>

      {/* Buy insurance */}
      <div style={{ paddingTop: 8, paddingBottom: 24 }}>
        <p
          className="font-semibold text-[#121212] px-4"
          style={{ fontSize: 20, lineHeight: "28px", letterSpacing: "-0.1px", marginBottom: 16 }}
        >
          Buy insurance
        </p>
        <BentoGrid />
      </div>
    </div>
  );
}
