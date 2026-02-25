const imgVisaBg    = "https://www.figma.com/api/mcp/asset/19e6a71f-bd1b-49fc-946c-a88cdb935d8d";
const imgAmbulance = "https://www.figma.com/api/mcp/asset/6e485cdf-a204-490a-9c34-9bf51b9fa3d2";
const imgArrow     = "/assets/icons/arrow right.svg";

const cards = [
  { id: "visa",      bg: imgVisaBg,    title: "Get a visa for your next trip",       subtitle: "End-to-end expert assistance",   cta: "Apply for a visa" },
  { id: "ambulance", bg: imgAmbulance, title: "Are you prepared for an emergency?", subtitle: "Book an ambulance in seconds",    cta: "Book an ambulance" },
];

export default function GoBeyondSection() {
  return (
    <div className="bg-white pt-8 pb-8 flex flex-col gap-4">
      <p className="text-xl font-semibold text-[#121212] px-4" style={{ lineHeight: "28px", letterSpacing: "-0.1px" }}>
        Go beyond insurance
      </p>

      {/* Horizontal scroll list */}
      <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative overflow-hidden rounded-2xl flex-shrink-0"
            style={{ width: 312, height: 182, backgroundColor: "#626262", boxShadow: "0 4px 10px -2px rgba(54,53,76,0.08)" }}
          >
            {/* Background image */}
            <img src={card.bg} alt="" className="absolute inset-0 w-full h-full object-cover" />

            {/* Left gradient overlay */}
            <div
              className="absolute left-0 top-0 bottom-0"
              style={{
                width: 162,
                background: "linear-gradient(to right, rgba(0,0,0,0.55), rgba(0,0,0,0))",
              }}
            />

            {/* Text */}
            <div className="absolute left-6 top-6 flex flex-col gap-2" style={{ width: 168 }}>
              <span className="text-white text-base font-semibold" style={{ lineHeight: "22px" }}>
                {card.title}
              </span>
              <span className="text-[rgba(255,255,255,0.8)] text-[10px]" style={{ lineHeight: "14px" }}>
                {card.subtitle}
              </span>
            </div>

            {/* CTA */}
            <button
              className="absolute bottom-6 left-6 flex items-center gap-1 bg-white rounded-xl px-4 py-2 border-0 cursor-pointer"
            >
              <span className="text-[#121212] text-xs font-medium">{card.cta}</span>
              <img src={imgArrow} alt="" className="w-3 h-3 object-contain" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
