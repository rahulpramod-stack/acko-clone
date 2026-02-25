const imgChallans     = "./assets/icons/Challan.svg";
const imgVehicleInfo  = "./assets/icons/Services_RTO_info.svg";
const imgFastag       = "./assets/icons/Recharge fastag.svg";
const imgArrow        = "./assets/icons/arrow right.svg";
const imgWorryFree    = "./assets/lob/Worry free.png";

function ServiceIcon({ icon, label, borderColor = "#dceade" }: { icon: string; label: string; borderColor?: string }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-2">
      <div
        className="w-24 flex flex-col items-center px-3 py-4 rounded-[48px]"
        style={{
          backgroundColor: "rgba(255,255,255,0.8)",
          border: `1px solid ${borderColor}`,
          boxShadow: "0 6px 6px rgba(0,0,0,0.02)",
        }}
      >
        <img src={icon} alt="" className="w-8 h-8 object-contain" />
      </div>
      <span className="text-sm font-medium text-[#121212] text-center whitespace-pre-line" style={{ lineHeight: "20px" }}>
        {label}
      </span>
    </div>
  );
}

function ActionCard({
  title,
  pill,
  pillBg = "rgba(74,222,128,0.2)",
  pillColor = "#0a562a",
}: {
  title: string;
  pill?: string;
  pillBg?: string;
  pillColor?: string;
}) {
  return (
    <div
      className="flex-1 p-3 rounded-2xl relative"
      style={{
        backgroundColor: "rgba(255,255,255,0.8)",
        boxShadow: "0 6px 6px rgba(0,0,0,0.02)",
        minHeight: 116,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <span className="text-sm font-medium text-[#121212] whitespace-pre-line" style={{ lineHeight: "20px" }}>
        {title}
      </span>
      {pill && (
        <div
          className="inline-flex items-center justify-center rounded-[49px]"
          style={{ backgroundImage: `linear-gradient(94.84deg, ${pillBg} 0.48%, rgba(255,255,255,0) 89.37%)`, padding: "4px 16px 4px 8px", alignSelf: "flex-start" }}
        >
          <span className="font-medium whitespace-nowrap" style={{ color: pillColor, fontSize: 11, lineHeight: "14px" }}>
            {pill}
          </span>
        </div>
      )}
      <img src={imgArrow} alt="" className="absolute top-3 right-3 w-4 h-4 object-contain" />
    </div>
  );
}

export default function CarOwnershipSection() {
  return (
    <div
      className="pt-8 pb-8 flex flex-col gap-2"
      style={{ background: "linear-gradient(-15deg, rgb(245,245,245) 64%, rgb(225,238,230) 97%)" }}
    >
      <p className="text-xl font-semibold text-[#121212] px-4 mb-3" style={{ lineHeight: "28px", letterSpacing: "-0.1px" }}>
        Worry-free car ownership
      </p>
      <div className="flex flex-col gap-6 px-4">
        {/* Service icons */}
        <div className="flex gap-2">
          <ServiceIcon icon={imgChallans}    label={"Check traffic\nchallans"} />
          <ServiceIcon icon={imgVehicleInfo} label={"Check\nvehicle info"} />
          <ServiceIcon icon={imgFastag}      label={"Recharge\nFASTag"} />
        </div>

        {/* Action cards + car image */}
        <div className="relative">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <ActionCard title={"Get your car\nserviced"}     pill="Free pickup & drop" />
            <ActionCard title={"Save on\nyour new car"}      pill="Save up to ₹80,000" />
            <ActionCard title={"Check car\nresale price"} />
          </div>
          <img
            src={imgWorryFree}
            alt="Car"
            className="absolute pointer-events-none"
            style={{ width: 180, height: "auto", bottom: -12, right: -16 }}
          />
        </div>

        <button className="self-stretch text-center py-3 text-sm font-medium text-[#121212] bg-transparent border-0 cursor-pointer">
          View more services →
        </button>
      </div>
    </div>
  );
}
