import { useState } from "react";
import HomeTabScreen from "./screens/HomeTabScreen";
import ExploreScreen from "./screens/HomeScreen";
import SupportTabScreen from "./screens/SupportTabScreen";
import VehicleDetailScreen from "./screens/VehicleDetailScreen";
import BottomNav, { type Tab } from "./components/BottomNav";

type View = { type: "tabs" } | { type: "vehicle-detail" };

const bgByTab: Record<Tab, string> = {
  home: "#19191a",
  explore: "#060606",
  support: "#19191a",
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [view, setView] = useState<View>({ type: "tabs" });

  if (view.type === "vehicle-detail") {
    return (
      <div
        className="relative overflow-hidden"
        style={{
          width: 375,
          height: 812,
          borderRadius: 40,
          boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
          backgroundColor: "#19191a",
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 min-h-0">
            <VehicleDetailScreen onBack={() => setView({ type: "tabs" })} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: 375,
        height: 812,
        borderRadius: 40,
        boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
        backgroundColor: bgByTab[activeTab],
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 min-h-0">
          {activeTab === "home"    && <HomeTabScreen onVehicleClick={() => setView({ type: "vehicle-detail" })} />}
          {activeTab === "explore" && <ExploreScreen />}
          {activeTab === "support" && <SupportTabScreen />}
        </div>
        <BottomNav active={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
