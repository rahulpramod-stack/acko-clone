import { useState, useCallback } from "react";
import HomeTabScreen from "./screens/HomeTabScreen";
import ExploreScreen from "./screens/HomeScreen";
import SupportTabScreen from "./screens/SupportTabScreen";
import VehicleDetailScreen from "./screens/VehicleDetailScreen";
import FamilyScreen from "./screens/FamilyScreen";
import QuestionnaireScreen, { type QuizState } from "./screens/QuestionnaireScreen";
import AnalysingScreen from "./screens/AnalysingScreen";
import ScoreAnalysisScreen from "./screens/ScoreAnalysisScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import BottomNav, { type Tab } from "./components/BottomNav";
import type { Category } from "./components/FloatingCategoryNav";

type View =
  | { type: "tabs" }
  | { type: "vehicle-detail" }
  | { type: "family" }
  | { type: "questionnaire" }
  | { type: "analysing"; answers: QuizState }
  | { type: "score-analysis"; answers: QuizState }
  | { type: "notifications" };

const bgByTab: Record<Tab, string> = {
  home: "#19191a",
  explore: "#060606",
  support: "#19191a",
};

const categoryToView: Record<Category, View> = {
  vehicles: { type: "vehicle-detail" },
  family:   { type: "family" },
  trips:    { type: "tabs" },
  devices:  { type: "tabs" },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [view, setView] = useState<View>({ type: "tabs" });

  const handleCategoryChange = useCallback((cat: Category) => {
    setView(categoryToView[cat]);
  }, []);

  // CONVENTION: `bg` must match the screen's outermost wrapper backgroundColor.
  // If they differ, the shell's bg bleeds through the 40px border-radius corners.
  // Dark-top screens → "#000" or "#19191a". White screens → "#ffffff".
  const shell = (bg: string, children: React.ReactNode) => (
    <div
      className="relative overflow-hidden"
      style={{
        width: 375,
        height: 812,
        borderRadius: 40,
        boxShadow: "0 24px 48px rgba(0,0,0,0.5)",
        backgroundColor: bg,
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 min-h-0">{children}</div>
      </div>
    </div>
  );

  if (view.type === "notifications") {
    return shell(
      "#ffffff",
      <NotificationsScreen onBack={() => setView({ type: "tabs" })} />,
    );
  }

  if (view.type === "analysing") {
    const answers = view.answers;
    return shell(
      "#000",
      <AnalysingScreen onDone={() => setView({ type: "score-analysis", answers })} />,
    );
  }

  if (view.type === "score-analysis") {
    const answers = view.answers;
    return shell(
      "#f2f2f7",
      <ScoreAnalysisScreen
        quizState={answers}
        onBack={() => setView({ type: "family" })}
        onUnderstood={() => setView({ type: "family" })}
      />,
    );
  }

  if (view.type === "questionnaire") {
    return shell(
      "#f2f2f7",
      <QuestionnaireScreen
        onBack={() => setView({ type: "family" })}
        onComplete={(answers) => setView({ type: "analysing", answers })}
      />,
    );
  }

  if (view.type === "vehicle-detail" || view.type === "family") {
    return shell(
      "#000",
      <>
        {view.type === "vehicle-detail" && (
          <VehicleDetailScreen
            onBack={() => setView({ type: "tabs" })}
            onCategoryChange={handleCategoryChange}
          />
        )}
        {view.type === "family" && (
          <FamilyScreen
            onBack={() => setView({ type: "tabs" })}
            onCalculateRisk={() => setView({ type: "questionnaire" })}
            onCategoryChange={handleCategoryChange}
          />
        )}
      </>,
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
          {activeTab === "home" && (
            <HomeTabScreen
              onVehicleClick={() => setView({ type: "vehicle-detail" })}
              onFamilyClick={() => setView({ type: "family" })}
              onNotificationsClick={() => setView({ type: "notifications" })}
            />
          )}
          {activeTab === "explore" && <ExploreScreen />}
          {activeTab === "support" && <SupportTabScreen />}
        </div>
        <BottomNav active={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}
