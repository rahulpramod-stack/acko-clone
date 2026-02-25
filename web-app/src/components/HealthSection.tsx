const imgAbha           = "./assets/icons/ABHA.svg";
const imgHealthAnalyse  = "./assets/icons/policy health analyser.svg";
const imgAmbulance      = "./assets/icons/Ambulance.svg";
const imgArrow          = "./assets/icons/arrow right.svg";
const imgHealthBag      = "./assets/lob/Health bag.png";

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
  pillBg = "rgba(236,72,153,0.12)",
  pillColor = "#e157d4",
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
        minHeight: 90,
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
          <span className="font-medium whitespace-nowrap" style={{ color: pillColor, fontSize: 11, lineHeight: "14px" }}>{pill}</span>
        </div>
      )}
      <img src={imgArrow} alt="" className="absolute top-3 right-3 w-4 h-4 object-contain" />
    </div>
  );
}

export default function HealthSection() {
  return (
    <div
      className="pt-8 pb-8 flex flex-col gap-2"
      style={{ background: "linear-gradient(-36deg, rgb(245,245,245) 3%, rgb(243,232,240) 99%)" }}
    >
      <p className="text-xl font-semibold text-[#121212] px-4 mb-3" style={{ lineHeight: "28px", letterSpacing: "-0.1px" }}>
        Health and{"\n"}emergency readiness
      </p>
      <div className="flex flex-col gap-6 px-4">
        <div className="flex gap-2">
          <ServiceIcon icon={imgAbha}          label={"Create\nABHA cards"}          borderColor="#ede2eb" />
          <ServiceIcon icon={imgHealthAnalyse} label={"Analyse any\nhealth policy"}  borderColor="#ede2eb" />
          <ServiceIcon icon={imgAmbulance}     label={"Book an\nambulance"}          borderColor="#ede2eb" />
        </div>
        <div className="relative">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <ActionCard title={"Talk to\na doctor"}   pill="Free consultation" />
            <ActionCard title={"Book lab\ntests"}      pill="Up to 70% off" />
            <div style={{ gridColumn: 2 }}>
              <ActionCard title={"Buy\nmedicines"} pill="Up to 20% off" />
            </div>
          </div>
          <img
            src={imgHealthBag}
            alt="Health bag"
            className="absolute pointer-events-none"
            style={{ width: 160, height: "auto", bottom: -12, left: -16 }}
          />
        </div>
      </div>
    </div>
  );
}
