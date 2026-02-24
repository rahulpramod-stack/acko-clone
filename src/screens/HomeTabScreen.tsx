import PersonalCardsSection from "../components/PersonalCardsSection";
import CuratedReadsSection  from "../components/CuratedReadsSection";

export default function HomeTabScreen() {
  return (
    <div className="overflow-y-auto no-scrollbar flex flex-col h-full" style={{ backgroundColor: "#19191a" }}>
      <PersonalCardsSection />
      <CuratedReadsSection />
    </div>
  );
}
