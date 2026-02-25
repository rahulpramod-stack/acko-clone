const imgCarImage   = "./assets/figma/car-tata-punch.png";
const imgBackIcon   = "./assets/figma/back-icon.svg";
const imgCityLogo   = "./assets/figma/car-city-logo.png";
const imgPunchLogo  = "./assets/figma/car-punch-logo.png";
const imgThirdCar   = "./assets/figma/car-third.png";
const imgAddIcon    = "./assets/figma/add-icon.svg";
const imgRefreshIcon     = "./assets/icons/refresh.svg";
const imgRC         = "./assets/figma/rc-icon.svg";
const imgDL         = "./assets/figma/dl-icon.svg";
const imgEllipseAdd = "./assets/figma/ellipse-add.svg";
const imgPlusIcon   = "./assets/figma/plus-icon.svg";
const imgGarageScene = "./assets/figma/garage-scene.png";
const imgCarForSale  = "./assets/figma/car-for-sale.png";
const imgMoneyIcon  = "./assets/figma/money-icon.svg";
const imgBellIcon   = "./assets/figma/bell-icon.svg";
const imgClaimsIcon = "./assets/figma/claims-icon.svg";
const imgHelpIcon   = "./assets/figma/help-icon.svg";
const imgInfoIcon   = "./assets/figma/info-icon.svg";

function ArrowBtnWhite() {
  return (
    <div className="overflow-hidden shrink-0" style={{ width: 22, height: 22 }}>
      <img src="./assets/icons/arrow-right.svg" alt="" className="w-full h-full" />
    </div>
  );
}

function ArrowBtnDark() {
  return (
    <div className="overflow-hidden shrink-0" style={{ width: 22, height: 22 }}>
      <img src="./assets/icons/arrow-right-dark.svg" alt="" className="w-full h-full" />
    </div>
  );
}

const cardBg = "linear-gradient(-54.38deg, rgba(255,255,255,0.08) 6.76%, rgba(255,255,255,0.016) 51.27%), linear-gradient(90deg, #202020, #202020)";
const cardInnerBg = "linear-gradient(-44.4deg, rgba(255,255,255,0.04) 6.76%, rgba(255,255,255,0.008) 51.27%), linear-gradient(90deg, #202020, #202020)";

type StatusCardData = {
  label: string;
  status?: { text: string; color: string };
  value: string;
  sub: string;
  action: string;
};

const statusCards: StatusCardData[] = [
  { label: "FAStag",        status: { text: "Low",          color: "#FFAB00" }, value: "₹29",          sub: "Updated 10 May",       action: "Recharge"            },
  { label: "Challan",       status: { text: "All clear",    color: "#0FA457" }, value: "0",            sub: "Updated 10 May",       action: "See details"         },
  { label: "Car servicing", status: { text: "Service due",  color: "#F58700" }, value: "",             sub: "Get same-day delivery", action: "See service options" },
  { label: "Car value",                                                          value: "₹5.6L - 6.5L", sub: "Updated 10 May",       action: "See valuation report"},
];

function AssetStatusCard({ data }: { data: StatusCardData }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl flex-1" style={{ background: cardBg }}>
      <div className="flex flex-col h-20 w-full" style={{ background: cardInnerBg }}>
        <div className="flex flex-col gap-2 items-start px-3 py-2 w-full">
          <div className="flex items-center justify-between w-full">
            <p className="text-white opacity-60" style={{ fontSize: 12, lineHeight: "18px" }}>
              {data.label}
            </p>
            {data.status && (
              <span style={{ fontSize: 10, lineHeight: "14px", fontWeight: 500, color: data.status.color }}>
                {data.status.text}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="flex gap-2 items-center">
              {data.value && (
                <p className="text-white font-medium" style={{ fontSize: 14, lineHeight: "20px" }}>
                  {data.value}
                </p>
              )}
              <div className="relative shrink-0" style={{ width: 24, height: 24 }}>
                <img alt="" className="absolute inset-0 w-full h-full" src={imgRefreshIcon} />
              </div>
            </div>
            <p className="text-white opacity-60 w-full" style={{ fontSize: 10, lineHeight: "14px" }}>
              {data.sub}
            </p>
          </div>
        </div>
      </div>
      <div
        className="flex gap-1 items-center px-3 py-2"
        style={{ backgroundColor: "rgba(255,255,255,0.06)", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-white font-medium" style={{ fontSize: 12, lineHeight: "18px" }}>
          {data.action}
        </p>
        <ArrowBtnWhite />
      </div>
    </div>
  );
}

function DocCard({ img, label1, label2, isAdd }: { img?: string; label1: string; label2: string; isAdd?: boolean }) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <div
        className="flex items-center justify-center rounded-2xl"
        style={{ width: 96, height: 96, backgroundColor: "#f5f5f5" }}
      >
        {isAdd ? (
          <div className="relative" style={{ width: 32, height: 32 }}>
            <img alt="" className="absolute inset-0 w-full h-full" src={imgEllipseAdd} />
            <img alt="" className="absolute" style={{ width: 24, height: 24, top: 4, left: 4 }} src={imgPlusIcon} />
          </div>
        ) : (
          <div className="relative overflow-hidden" style={{ width: 48, height: 48 }}>
            <img alt={label1} className="absolute inset-0 w-full h-full object-contain" src={img} />
          </div>
        )}
      </div>
      <div className="text-center" style={{ fontSize: 12, lineHeight: "18px", color: "#121212" }}>
        <p>{label1}</p>
        <p>{label2}</p>
      </div>
    </div>
  );
}

function MoreActionRow({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-4 items-center">
        <div className="relative" style={{ width: 40, height: 40 }}>
          <div className="rounded-lg absolute inset-0" style={{ backgroundColor: "#f5f5f5" }} />
          <img alt="" className="absolute" style={{ width: 24, height: 24, top: 8, left: 8 }} src={icon} />
        </div>
        <p className="font-medium text-[#121212]" style={{ fontSize: 16, lineHeight: "24px" }}>
          {label}
        </p>
      </div>
      <ArrowBtnDark />
    </div>
  );
}

export default function VehicleDetailScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="overflow-y-auto no-scrollbar flex flex-col h-full">

      {/* ── Dark header ─────────────────────────────────────────────────── */}
      <div style={{ backgroundColor: "#19191a" }}>

        {/* Back nav */}
        <div className="flex items-center px-5 py-3">
          <button onClick={onBack} className="flex items-center justify-center -ml-0.5">
            <div className="relative" style={{ width: 11, height: 24 }}>
              <img alt="Back" className="absolute inset-0 w-full h-full object-contain" src={imgBackIcon} />
            </div>
          </button>
        </div>

        {/* Vehicle title + plate + car image */}
        <div className="flex items-start justify-between px-5 pb-3">
          <div className="flex flex-col gap-3">
            <p className="text-white font-semibold" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: "-0.1px" }}>
              Tata Punch
            </p>
            <div className="flex overflow-hidden rounded-[4px]">
              <div
                className="flex flex-col items-center justify-center gap-px"
                style={{ width: 28, height: 28, backgroundColor: "rgba(23,109,224,0.3)" }}
              >
                <div
                  className="border border-dashed border-white flex items-center justify-center"
                  style={{ width: 10, height: 10, borderRadius: 10 }}
                >
                  <div style={{ width: 4, height: 4, backgroundColor: "white", borderRadius: 1 }} />
                </div>
                <p className="text-white font-bold text-center" style={{ fontSize: 8, lineHeight: "8px" }}>IND</p>
              </div>
              <div
                className="flex items-center justify-center px-2"
                style={{ height: 28, backgroundColor: "rgba(255,255,255,0.1)" }}
              >
                <p className="text-white font-bold" style={{ fontSize: 12, lineHeight: "18px" }}>
                  KA05-EQ-8055
                </p>
              </div>
            </div>
          </div>
          <div className="relative" style={{ width: 141, height: 80 }}>
            <img alt="Tata Punch" className="absolute inset-0 w-full h-full object-contain" src={imgCarImage} />
          </div>
        </div>

        {/* Vehicle selector row */}
        <div className="flex gap-2.5 items-center justify-center px-5 py-3">
          <div
            className="flex items-center justify-center rounded-full overflow-hidden shrink-0"
            style={{ width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <img alt="Honda City" src={imgCityLogo} style={{ width: 32, height: 16 }} className="object-contain" />
          </div>
          <div
            className="flex items-center justify-center rounded-full overflow-hidden shrink-0"
            style={{
              width: 48,
              height: 48,
              backgroundColor: "rgba(255,255,255,0.12)",
              border: "1.5px solid #6BCB79",
              boxShadow: "0px 2px 12px 2px rgba(107,203,121,0.3)",
            }}
          >
            <img alt="Tata Punch" src={imgPunchLogo} style={{ width: 40, height: 22 }} className="object-contain" />
          </div>
          <div
            className="flex items-center justify-center rounded-full overflow-hidden shrink-0"
            style={{ width: 40, height: 40, backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <img alt="Vehicle" src={imgThirdCar} style={{ width: 28, height: 20 }} className="object-contain" />
          </div>
          <div
            className="flex gap-1.5 items-center px-3 rounded-full shrink-0"
            style={{ height: 40, backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <div className="relative shrink-0" style={{ width: 13, height: 13 }}>
              <img alt="" className="absolute inset-0 w-full h-full" src={imgAddIcon} />
            </div>
            <p className="text-white" style={{ fontSize: 14, lineHeight: "20px" }}>Add new</p>
          </div>
        </div>

        {/* Status cards 2×2 + full-width pollution row */}
        <div className="flex flex-col gap-3 px-4 pb-6">
          <div className="flex gap-3">
            <AssetStatusCard data={statusCards[0]} />
            <AssetStatusCard data={statusCards[1]} />
          </div>
          <div className="flex gap-3">
            <AssetStatusCard data={statusCards[2]} />
            <AssetStatusCard data={statusCards[3]} />
          </div>
          <div
            className="flex items-center justify-between px-3 py-2.5 rounded-xl"
            style={{
              backgroundColor: "#313131",
              border: "1px solid rgba(231,231,240,0.1)",
              boxShadow: "0px 4px 6px 0px rgba(54,53,76,0.08)",
            }}
          >
            <div className="flex gap-2 items-center">
              <p className="text-white opacity-60" style={{ fontSize: 12, lineHeight: "18px" }}>
                Pollution check
              </p>
              <p className="font-medium" style={{ fontSize: 12, lineHeight: "18px", color: "#0FA457" }}>
                Active
              </p>
              <div className="relative shrink-0" style={{ width: 24, height: 24 }}>
                <img alt="" className="absolute inset-0 w-full h-full" src={imgRefreshIcon} />
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <p className="text-white font-medium" style={{ fontSize: 12, lineHeight: "18px" }}>
                See details
              </p>
              <ArrowBtnWhite />
            </div>
          </div>
        </div>
      </div>

      {/* ── Your car's coverage ─────────────────────────────────────────── */}
      <div
        className="flex flex-col gap-5 items-start px-4 pt-6 pb-4"
        style={{ background: "linear-gradient(181.57deg, rgb(244,236,255) 1.7%, rgb(255,255,255) 27.55%)" }}
      >
        <p className="font-semibold w-full" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: "-0.1px", color: "#121212" }}>
          Your car's coverage
        </p>
        <div
          className="flex flex-col gap-4 items-start px-3 py-5 rounded-2xl w-full"
          style={{ background: "linear-gradient(to bottom, #fcfbff, #efe9fb)", border: "1px solid #5920c5" }}
        >
          <div className="flex flex-col gap-4 items-start w-full">
            <div className="flex flex-col gap-1 w-full">
              <p className="font-medium w-full" style={{ fontSize: 14, lineHeight: "20px", color: "#D83D37" }}>
                Your car is not protected
              </p>
              <p className="font-semibold" style={{ fontSize: 16, lineHeight: "22px", color: "#040222" }}>
                Protect you car starting at just ₹799/month
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="relative shrink-0" style={{ width: 20, height: 20 }}>
                <img alt="" className="absolute inset-0 w-full h-full" src={imgMoneyIcon} />
              </div>
              <p style={{ fontSize: 14, lineHeight: "20px", color: "#4b4b4b" }}>
                Instant policy issuance. No commissions.
              </p>
            </div>
          </div>
          <div
            className="flex items-center justify-center p-3 rounded-xl w-full"
            style={{ backgroundColor: "#121212", border: "1px solid #040222" }}
          >
            <p className="text-white font-medium" style={{ fontSize: 14, lineHeight: "20px" }}>
              Explore our plans
            </p>
          </div>
        </div>
      </div>

      {/* ── Proof and paperwork ─────────────────────────────────────────── */}
      <div className="bg-white flex flex-col py-4 gap-5">
        <div className="px-4">
          <p className="font-semibold text-[#121212]" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: "-0.1px" }}>
            Proof and paperwork
          </p>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-3 items-start px-4" style={{ width: "max-content" }}>
            <DocCard img={imgRC}  label1="Registration" label2="certificate" />
            <DocCard img={imgDL}  label1="Driving"      label2="licence"     />
            <DocCard isAdd label1="Policy"        label2="document"    />
            <DocCard isAdd label1="Pollution"     label2="certificate" />
          </div>
        </div>
      </div>

      {/* ── Purchase your next car with ACKO Drive ──────────────────────── */}
      <div className="bg-white flex flex-col gap-5 py-4">
        <div className="px-4">
          <p className="font-semibold text-[#121212]" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: "-0.1px" }}>
            Purchase your next car with ACKO Drive
          </p>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 px-4" style={{ width: "max-content" }}>
            {/* Garage card */}
            <div
              className="relative rounded-[20px] overflow-hidden shrink-0"
              style={{ width: 310, height: 360, backgroundColor: "#1e140e" }}
            >
              <img
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                src={imgGarageScene}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 75.75%, rgba(0,0,0,0.5) 87.875%, black 100%)" }}
              />
              <div
                className="absolute inset-0 flex flex-col items-start"
                style={{ padding: "28.8px 18px 18px 21.6px" }}
              >
                <p className="text-white font-semibold" style={{ fontSize: 16, lineHeight: "23px" }}>
                  Take car care to the next level
                </p>
                <p className="text-white opacity-80 mt-1" style={{ fontSize: 11, lineHeight: "18px" }}>
                  Premium maintenance at unbeatable prices
                </p>
              </div>
              <div
                className="absolute flex items-center justify-center rounded-[10px] bg-white"
                style={{ width: 270, height: 40, bottom: 20, left: 20 }}
              >
                <p className="font-medium text-[#121212]" style={{ fontSize: 13, lineHeight: "18px" }}>
                  Book your car service
                </p>
              </div>
            </div>
            {/* Purchase card */}
            <div
              className="relative rounded-[20px] overflow-hidden shrink-0"
              style={{ width: 310, height: 360, backgroundColor: "#1e140e" }}
            >
              <img
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                src={imgCarForSale}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 74%, #1e140e 100%)" }}
              />
              <div
                className="absolute inset-0 flex flex-col items-start"
                style={{ padding: "28.8px 18px 18px 21.6px" }}
              >
                <p className="text-white font-semibold" style={{ fontSize: 16, lineHeight: "23px" }}>
                  Save ₹80,000* on your next car
                </p>
                <p className="text-white opacity-80 mt-1" style={{ fontSize: 11, lineHeight: "18px" }}>
                  Supersaver deals and superfast delivery
                </p>
              </div>
              <div
                className="absolute flex items-center justify-center rounded-[10px] bg-white"
                style={{ width: 270, height: 40, bottom: 20, left: 20 }}
              >
                <p className="font-medium text-[#121212]" style={{ fontSize: 13, lineHeight: "18px" }}>
                  Explore new cars
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── More actions ────────────────────────────────────────────────── */}
      <div className="bg-white flex flex-col gap-6 px-4 pt-4 pb-8">
        <p className="font-semibold text-[#121212]" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: "-0.1px" }}>
          More actions
        </p>
        <div className="flex flex-col gap-5 items-end w-full">
          <MoreActionRow icon={imgInfoIcon}   label="View car info"    />
          <div className="w-[287px]" style={{ height: 1, backgroundColor: "#E7E7F0" }} />
          <MoreActionRow icon={imgBellIcon}   label="Manage alerts"   />
          <div className="w-[287px]" style={{ height: 1, backgroundColor: "#E7E7F0" }} />
          <MoreActionRow icon={imgClaimsIcon} label="View all claims" />
          <div className="w-[287px]" style={{ height: 1, backgroundColor: "#E7E7F0" }} />
          <MoreActionRow icon={imgHelpIcon}   label="Get help"        />
        </div>
      </div>

    </div>
  );
}
