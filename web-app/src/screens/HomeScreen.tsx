import Header             from "../components/Header";
import CrossSellCard       from "../components/CrossSellCard";
import StorefrontSection   from "../components/StorefrontSection";
import CarOwnershipSection from "../components/CarOwnershipSection";
import HealthSection       from "../components/HealthSection";
import GoBeyondSection     from "../components/GoBeyondSection";
import Footer              from "../components/Footer";

export default function ExploreScreen({ onViewProfile }: { onViewProfile?: () => void }) {
  return (
    <div className="overflow-y-auto no-scrollbar h-full bg-[#060606]">
      <div style={{ background: "linear-gradient(to bottom, #060606, #1a0a3e)" }}>
        <Header onViewProfile={onViewProfile} />
        <CrossSellCard />
      </div>

      <div
        style={{
          background: "linear-gradient(to bottom, rgb(244,236,255) 1.7%, rgb(255,255,255) 27.5%)",
        }}
      >
        <StorefrontSection />
      </div>

      <CarOwnershipSection />
      <HealthSection />
      <GoBeyondSection />
      <Footer />
    </div>
  );
}
