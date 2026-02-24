const imgIllustration = "https://www.figma.com/api/mcp/asset/b5b0c963-aaa9-4966-90b8-3178b81bad09";
const imgArrow        = "https://www.figma.com/api/mcp/asset/7f311c73-32d7-47df-b0f7-01fa4c350d2b";

export default function CrossSellCard() {
  return (
    <div className="flex flex-col items-center gap-3 pt-8 pb-8">
      {/* Illustration */}
      <img
        src={imgIllustration}
        alt="health policy"
        className="w-full object-cover"
        style={{ height: 120 }}
      />

      {/* Title */}
      <p
        className="text-white text-center text-2xl font-semibold px-4"
        style={{ lineHeight: "32px", letterSpacing: "-0.5px" }}
      >
        Does your health policy<br />have coverage gaps?
      </p>

      {/* Subtitle with gradient highlight */}
      <div
        className="px-4 py-2 w-full"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.24), rgba(255,255,255,0))",
        }}
      >
        <p className="text-[rgba(255,255,255,0.8)] text-xs text-center" style={{ lineHeight: "18px" }}>
          Try our <strong>FREE</strong> policy analyser to find out!
        </p>
      </div>

      {/* CTA button */}
      <button className="flex items-center gap-1 bg-white rounded-xl px-3 py-2 h-9 cursor-pointer border-0">
        <span className="text-[#121212] text-xs font-medium">Analyse your policy</span>
        <img src={imgArrow} alt="" className="w-3 h-3 object-contain" />
      </button>
    </div>
  );
}
