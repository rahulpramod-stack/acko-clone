import PersonalCardsSection from "../components/PersonalCardsSection";
import CuratedReadsSection  from "../components/CuratedReadsSection";

export default function HomeTabScreen({
  onVehicleClick,
  onFamilyClick,
  onNotificationsClick,
}: {
  onVehicleClick?: () => void;
  onFamilyClick?: () => void;
  onNotificationsClick?: () => void;
}) {
  return (
    <div className="overflow-y-auto no-scrollbar flex flex-col h-full" style={{ backgroundColor: "#19191a" }}>
      <PersonalCardsSection onVehicleClick={onVehicleClick} onFamilyClick={onFamilyClick} onNotificationsClick={onNotificationsClick} />
      <CuratedReadsSection />
    </div>
  );
}
