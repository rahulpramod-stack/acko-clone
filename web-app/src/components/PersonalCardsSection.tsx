const imgCityLogo   = "./assets/figma/car-city-logo-2.png";
const imgCretaLogo  = "./assets/figma/car-creta-logo.png";
const imgFlightIcon = "./assets/icons/trips.svg";
const imgPhoneIcon  = "./assets/icons/devices.svg";

const cardShadow = "0px 4px 10px -2px rgba(54,53,76,0.08)";

function ArrowButton() {
  return (
    <div className="relative shrink-0 opacity-50" style={{ width: 20, height: 20 }}>
      <img src="./assets/icons/arrow-circle.svg" alt="" className="absolute inset-0 w-full h-full" />
      <img
        src="./assets/icons/arrow-right-white.svg"
        alt=""
        className="absolute"
        style={{ width: 9, height: 8, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}

function AvatarCircle({ src, initials }: { src?: string; initials?: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-full overflow-hidden shrink-0"
      style={{
        width: 40,
        height: 40,
        backgroundColor: "#292929",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {src
        ? <img src={src} alt="" className="object-contain" style={{ width: 28, height: 20 }} />
        : <span className="font-medium text-[#e7e7f0]" style={{ fontSize: 12, letterSpacing: 1 }}>{initials}</span>
      }
    </div>
  );
}

function AvatarStack({ children }: { children: React.ReactNode }) {
  return <div className="flex [&>*:not(:first-child)]:-ml-3">{children}</div>;
}

function EntityCard({
  title,
  subtitle,
  topSlot,
  iconSrc,
  onClick,
}: {
  title: string;
  subtitle: string;
  topSlot?: React.ReactNode;
  iconSrc?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex-1 flex flex-col p-3 rounded-2xl overflow-hidden min-w-0"
      style={{ backgroundColor: "#313131", boxShadow: cardShadow, gap: topSlot ? 12 : 0, cursor: onClick ? "pointer" : undefined }}
      onClick={onClick}
    >
      {topSlot && <div>{topSlot}</div>}
      <div className="flex items-end justify-between flex-1">
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-col" style={{ gap: 4 }}>
            {iconSrc && (
              <div className="relative overflow-hidden shrink-0" style={{ width: 20, height: 20 }}>
                <img src={iconSrc} alt="" style={{ width: "100%", height: "100%" }} />
              </div>
            )}
            <span className="font-medium text-white whitespace-nowrap" style={{ fontSize: 16, lineHeight: "24px" }}>
              {title}
            </span>
          </div>
          <span className="whitespace-nowrap" style={{ fontSize: 10, lineHeight: "14px", color: "rgba(255,255,255,0.6)" }}>
            {subtitle}
          </span>
        </div>
        <ArrowButton />
      </div>
    </div>
  );
}

export default function PersonalCardsSection({
  onVehicleClick,
  onFamilyClick,
  onNotificationsClick,
}: {
  onVehicleClick?: () => void;
  onFamilyClick?: () => void;
  onNotificationsClick?: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 pb-6" style={{ backgroundColor: "#19191a" }}>
      <div className="flex flex-col gap-5 px-4 pt-5">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-white" style={{ fontSize: 20, lineHeight: "28px", letterSpacing: "-0.1px" }}>
            Vishwanath's home
          </p>
          <button
            onClick={onNotificationsClick}
            className="relative flex items-center justify-center"
            style={{ background: "none", border: "none", padding: 4, cursor: "pointer" }}
          >
            <div
              className="absolute flex items-center justify-center"
              style={{
                width: 16, height: 16,
                backgroundColor: "#D83D37",
                borderRadius: "50%",
                top: 0, right: 0,
                fontSize: 9, fontWeight: 600, color: "#ffffff",
                zIndex: 1,
              }}
            >
              2
            </div>
            <img
              src="./assets/icons/Notification_Bell.svg"
              alt="Notifications"
              style={{ width: 20, height: 24, objectFit: "contain" }}
            />
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <EntityCard
              title="Vehicles"
              subtitle="City, Creta"
              topSlot={
                <AvatarStack>
                  <AvatarCircle src={imgCityLogo} />
                  <AvatarCircle src={imgCretaLogo} />
                </AvatarStack>
              }
              onClick={onVehicleClick}
            />
            <EntityCard
              title="Family"
              subtitle="4 members"
              topSlot={
                <AvatarStack>
                  <AvatarCircle initials="AD" />
                  <AvatarCircle initials="SC" />
                  <AvatarCircle initials="+2" />
                </AvatarStack>
              }
              onClick={onFamilyClick}
            />
          </div>
          <div className="flex gap-3">
            <EntityCard
              title="Trips"
              subtitle="AirPass, International..."
              iconSrc={imgFlightIcon}
            />
            <EntityCard
              title="Devices"
              subtitle="Mobile screen protect"
              iconSrc={imgPhoneIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
