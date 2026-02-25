import PersonalCardsSection from "../components/PersonalCardsSection";
import CuratedReadsSection  from "../components/CuratedReadsSection";

export default function HomeTabScreen({ onVehicleClick }: { onVehicleClick?: () => void }) {
  return (
    <div className="overflow-y-auto no-scrollbar flex flex-col h-full" style={{ backgroundColor: "#19191a" }}>
      <PersonalCardsSection onVehicleClick={onVehicleClick} />
      <CuratedReadsSection />
    </div>
  );
}
