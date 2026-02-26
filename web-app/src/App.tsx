import { useState, useCallback } from "react";
import HomeTabScreen from "./screens/HomeTabScreen";
import ExploreScreen from "./screens/HomeScreen";
import SupportTabScreen from "./screens/SupportTabScreen";
import VehicleDetailScreen from "./screens/VehicleDetailScreen";
import FamilyScreen from "./screens/FamilyScreen";
import QuestionnaireScreen, { type Question } from "./screens/QuestionnaireScreen";
import AnalysingScreen from "./screens/AnalysingScreen";
import ScoreAnalysisScreen from "./screens/ScoreAnalysisScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import BottomNav, { type Tab } from "./components/BottomNav";
import type { Category } from "./components/FloatingCategoryNav";
import { ProfileProvider } from "./contexts/ProfileContext";

type View =
  | { type: "tabs" }
  | { type: "vehicle-detail" }
  | { type: "family"; riskScore?: number }
  | { type: "questionnaire" }
  | { type: "analysing" }
  | { type: "score-analysis" }
  | { type: "notifications" }
  | { type: "profile" };

const bgByTab: Record<Tab, string> = {
  home: "#19191a",
  explore: "#060606",
  support: "#19191a",
};

const categoryToView: Record<Category, View> = {
  vehicles: { type: "vehicle-detail" },
  family:   { type: "family", riskScore: undefined },
  trips:    { type: "tabs" },
  devices:  { type: "tabs" },
};

const riskQuestions: Question[] = [
  // Q1 — About yourself
  {
    id: "about-you",
    title: "Tell us a bit about yourself",
    type: "input",
    fields: [
      { id: "age",  label: "Your age",  type: "number", placeholder: "27" },
      { id: "city", label: "Your city",  type: "text",   placeholder: "Bangalore", picker: "city" },
    ],
  },
  // Q2 — Family members
  {
    id: "family-members",
    title: "Who is in your family?",
    type: "checkbox",
    options: [
      { id: "spouse",         label: "Spouse" },
      { id: "children",       label: "Children" },
      { id: "mother",         label: "Mother" },
      { id: "father",         label: "Father" },
      { id: "mother-in-law",  label: "Mother-in-law" },
      { id: "father-in-law",  label: "Father-in-law" },
    ],
    inlineCounter: {
      triggeredBy: "children",
      question: "How many children do you have?",
      options: [
        { id: "1", label: "1" },
        { id: "2", label: "2" },
        { id: "3", label: "3" },
        { id: "4", label: "4" },
      ],
    },
  },
  // Q3 — Dependents
  {
    id: "dependents",
    title: "Who all are dependent on you?",
    subtitle: "This helps us calculate how much financial protection your family may need",
    type: "checkbox",
    options: [
      { id: "spouse",         label: "Spouse" },
      { id: "children",       label: "Children" },
      { id: "mother",         label: "Mother" },
      { id: "father",         label: "Father" },
      { id: "mother-in-law",  label: "Mother-in-law" },
      { id: "father-in-law",  label: "Father-in-law" },
    ],
  },
  // Q4 — Household income
  {
    id: "income",
    title: "What's your annual household income?",
    subtitle: "This helps measure the impact of unexpected income loss on your family",
    type: "radio",
    options: [
      { id: "below-10l",  label: "Below 10 Lakh" },
      { id: "10-20l",     label: "₹10 - 20 Lakh" },
      { id: "20-40l",     label: "₹20 - 40 Lakh" },
      { id: "above-40l",  label: "Above 40 Lakh" },
    ],
  },
  // Q5 — Health insurance
  {
    id: "health-insurance",
    title: "Do you have health insurance?",
    subtitle: "This can be personal or employer-provided policies",
    type: "radio",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no",  label: "No" },
    ],
    followUp: {
      showIfAnswer: "yes",
      question: "What's your total health coverage?",
      options: [
        { id: "below-5l",  label: "Below ₹5 Lakh" },
        { id: "5-10l",     label: "₹5 to 10 Lakh" },
        { id: "10-20l",    label: "₹10 to 20 Lakh" },
        { id: "above-20l", label: "Above ₹20 Lakh" },
      ],
    },
  },
  // Q6 — Life insurance
  {
    id: "life-insurance",
    title: "Do you have life insurance?",
    subtitle: "This can be personal or employer-provided policies",
    type: "radio",
    options: [
      { id: "yes", label: "Yes" },
      { id: "no",  label: "No" },
    ],
    followUp: {
      showIfAnswer: "yes",
      question: "What's your total life coverage?",
      options: [
        { id: "below-50l",   label: "Below ₹50 Lakh" },
        { id: "50l-1cr",     label: "₹50 lakh to 1 Cr" },
        { id: "above-1cr",   label: "Above 1 Cr" },
      ],
    },
  },
];

function AppInner() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [view, setView] = useState<View>({ type: "tabs" });

  const handleCategoryChange = useCallback((cat: Category) => {
    setView(categoryToView[cat]);
  }, []);

  // CONVENTION: `bg` must match the screen's outermost wrapper backgroundColor.
  // If they differ, the shell's bg bleeds through the 40px border-radius corners.
  // Dark-top screens → "#19191a". White screens → "#ffffff".
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

  if (view.type === "profile") {
    return shell(
      "#ebebeb",
      <ProfileScreen onBack={() => setView({ type: "tabs" })} />,
    );
  }

  if (view.type === "notifications") {
    return shell(
      "#ffffff",
      <NotificationsScreen onBack={() => setView({ type: "tabs" })} />,
    );
  }

  if (view.type === "analysing") {
    return shell(
      "#ffffff",
      <AnalysingScreen onDone={() => setView({ type: "score-analysis" })} />,
    );
  }

  if (view.type === "score-analysis") {
    return shell(
      "#ffffff",
      <ScoreAnalysisScreen
        onBack={() => setView({ type: "family" })}
        onUnderstood={() => setView({ type: "family", riskScore: 30 })}
      />,
    );
  }

  if (view.type === "questionnaire") {
    return shell(
      "#ffffff",
      <QuestionnaireScreen
        questions={riskQuestions}
        onBack={() => setView({ type: "family" })}
        onComplete={() => setView({ type: "analysing" })}
      />,
    );
  }

  if (view.type === "vehicle-detail" || view.type === "family") {
    return shell(
      "#19191a",
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
            riskScore={view.riskScore}
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
              onViewProfile={() => setView({ type: "profile" })}
            />
          )}
          {activeTab === "explore" && <ExploreScreen onViewProfile={() => setView({ type: "profile" })} />}
          {activeTab === "support" && <SupportTabScreen />}
        </div>
        <BottomNav active={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <AppInner />
    </ProfileProvider>
  );
}
