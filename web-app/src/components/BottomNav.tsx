export type Tab = "explore" | "home" | "support";

const tabs: { id: Tab; label: string; active: string; default: string }[] = [
  {
    id: "explore",
    label: "Explore",
    active: "/assets/nav/explore-active.svg",
    default: "/assets/nav/explore-default.svg",
  },
  {
    id: "home",
    label: "Home",
    active: "/assets/nav/home-active.svg",
    default: "/assets/nav/home-default.svg",
  },
  {
    id: "support",
    label: "Support",
    active: "/assets/nav/support-active.svg",
    default: "/assets/nav/support-default.svg",
  },
];

export default function BottomNav({
  active = "home",
  onTabChange,
}: {
  active?: Tab;
  onTabChange?: (tab: Tab) => void;
}) {
  const activeIndex = tabs.findIndex((t) => t.id === active);
  const glowLeft = `${((activeIndex + 0.5) / tabs.length) * 100}%`;

  return (
    <div
      className="relative flex items-end shrink-0"
      style={{ height: 66, backgroundColor: "#121212" }}
    >
      {/* Purple radial glow behind active tab */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: glowLeft,
          transform: "translateX(-50%)",
          width: 120,
          height: 66,
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(120,60,220,0.35) 0%, transparent 70%)",
        }}
      />

      {tabs.map((tab) => {
        const isActive = tab.id === active;
        const isHome = tab.id === "home";
        const icon = isActive ? tab.active : tab.default;

        if (isHome) {
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange?.(tab.id)}
              className="relative flex-1 flex flex-col items-center border-0 bg-transparent cursor-pointer"
              style={{ paddingTop: 4, paddingBottom: 8 }}
            >
              <img
                src={icon}
                alt={tab.label}
                style={{ width: 36, height: 36, objectFit: "contain" }}
              />
              <span
                className="font-medium"
                style={{ fontSize: 10, lineHeight: "14px", color: "#fff", marginTop: 4 }}
              >
                {tab.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange?.(tab.id)}
            className="flex-1 flex flex-col items-center border-0 bg-transparent cursor-pointer"
            style={{ paddingTop: 16, paddingBottom: 8 }}
          >
            <img
              src={icon}
              alt={tab.label}
              style={{ width: 24, height: 24, objectFit: "contain" }}
            />
            <span
              className="font-medium"
              style={{
                fontSize: 10,
                lineHeight: "14px",
                color: isActive ? "#fff" : "#757575",
                marginTop: 4,
              }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
