import { useState, useCallback, useRef, useEffect } from "react";

/* ───────────────────────── Types ──────────────────────── */

export interface QuestionOption {
  id: string;
  label: string;
}

export interface FollowUp {
  showIfAnswer: string;
  question: string;
  options: QuestionOption[];
}

export interface InputField {
  id: string;
  label: string;
  type: "text" | "number";
  placeholder?: string;
  picker?: "city";
}

export interface Question {
  id: string;
  title: string;
  subtitle?: string;
  type: "checkbox" | "radio" | "input";
  options?: QuestionOption[];
  fields?: InputField[];
  /** Inline follow-up that appears when a specific option is chosen */
  followUp?: FollowUp;
  /** For checkbox: inline number picker that appears when a specific option is toggled */
  inlineCounter?: {
    triggeredBy: string;
    question: string;
    options: QuestionOption[];
  };
}

export type Answers = Record<string, string | string[]>;

interface Props {
  questions: Question[];
  onBack: () => void;
  onComplete: (answers: Answers) => void;
}

/* ───────────────────── Sub-components ─────────────────── */

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <div
      className="shrink-0 rounded-[4px] flex items-center justify-center"
      style={{
        width: 20,
        height: 20,
        border: checked ? "none" : "1.5px solid #5b5675",
        backgroundColor: checked ? "#000000" : "transparent",
      }}
    >
      {checked && (
        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
          <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function RadioButton({ checked }: { checked: boolean }) {
  return (
    <div
      className="shrink-0 rounded-full flex items-center justify-center"
      style={{
        width: 20,
        height: 20,
        border: checked ? "none" : "1.5px solid #5b5675",
        backgroundColor: checked ? "#000000" : "transparent",
      }}
    >
      {checked && (
        <div className="rounded-full bg-white" style={{ width: 8, height: 8 }} />
      )}
    </div>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100;
  return (
    <div className="w-full overflow-hidden rounded-[7px]" style={{ height: 8 }}>
      <div className="relative w-full h-full" style={{ backgroundColor: "rgba(75,75,75,0.2)" }}>
        <div
          className="absolute left-0 top-0 h-full rounded-[40px]"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, rgba(57, 28, 87, 1) 0%, rgba(155, 87, 229, 1) 100%)",
            transition: "width 0.3s ease",
          }}
        />
      </div>
    </div>
  );
}

function PillPicker({
  options,
  selected,
  onSelect,
}: {
  options: QuestionOption[];
  selected: string | undefined;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex gap-3 flex-wrap">
      {options.map((opt) => {
        const isActive = selected === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className="flex items-center justify-center rounded-lg cursor-pointer"
            style={{
              padding: "10px 20px",
              backgroundColor: isActive ? "#121212" : "#ffffff",
              border: isActive ? "1.5px solid #121212" : "1px solid #e8e8e8",
              color: isActive ? "#ffffff" : "#4b4b4b",
              fontSize: 14,
              lineHeight: "20px",
              fontWeight: 500,
              transition: "all 0.15s ease",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ───────────────────── Decorative BG ──────────────────── */

function HeroBg() {
  return (
    <div className="absolute top-0 left-0 w-full overflow-hidden" style={{ height: 216 }}>
      <div className="absolute inset-0" style={{ backgroundColor: "#f8fdff" }} />
      <div
        className="absolute"
        style={{
          width: 180,
          height: 230,
          left: -54,
          top: -31,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(83,46,212,0.08) 0%, transparent 70%)",
          transform: "rotate(-85deg)",
        }}
      />
      <div
        className="absolute"
        style={{
          width: 196,
          height: 168,
          right: -70,
          top: -41,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(83,46,212,0.06) 0%, transparent 70%)",
          transform: "rotate(19deg)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-full"
        style={{
          height: 64,
          background: "linear-gradient(to bottom, rgba(255,255,255,0), #ffffff)",
        }}
      />
    </div>
  );
}

/* ───────── City picker bottom sheet ──────────────────── */

const INDIAN_CITIES = [
  "Agra", "Ahmedabad", "Ajmer", "Aligarh", "Allahabad", "Amravati", "Amritsar",
  "Aurangabad", "Bangalore", "Bareilly", "Belgaum", "Bhilai", "Bhopal",
  "Bhubaneswar", "Bikaner", "Chandigarh", "Chennai", "Coimbatore", "Cuttack",
  "Dehradun", "Delhi", "Dhanbad", "Durgapur", "Erode", "Faridabad",
  "Gandhinagar", "Ghaziabad", "Gorakhpur", "Guntur", "Gurgaon", "Guwahati",
  "Gwalior", "Hubli", "Hyderabad", "Imphal", "Indore", "Jabalpur", "Jaipur",
  "Jalandhar", "Jammu", "Jamshedpur", "Jhansi", "Jodhpur", "Kanpur", "Kochi",
  "Kolhapur", "Kolkata", "Kota", "Kozhikode", "Lucknow", "Ludhiana", "Madurai",
  "Mangalore", "Meerut", "Moradabad", "Mumbai", "Mysore", "Nagpur", "Nanded",
  "Nashik", "Navi Mumbai", "Noida", "Patna", "Pondicherry", "Pune", "Raipur",
  "Rajkot", "Ranchi", "Salem", "Shimla", "Siliguri", "Solapur", "Srinagar",
  "Surat", "Thane", "Thiruvananthapuram", "Thrissur", "Tiruchirappalli",
  "Tirupati", "Udaipur", "Ujjain", "Vadodara", "Varanasi", "Vijayawada",
  "Visakhapatnam", "Warangal",
];

function CityPickerSheet({
  open,
  selected,
  onSelect,
  onClose,
}: {
  open: boolean;
  selected: string;
  onSelect: (city: string) => void;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
      setTimeout(() => searchRef.current?.focus(), 320);
    } else {
      setVisible(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) setSearch("");
  }, [open]);

  if (!open && !visible) return null;

  const filtered = search.trim()
    ? INDIAN_CITIES.filter((c) => c.toLowerCase().includes(search.toLowerCase()))
    : INDIAN_CITIES;

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 280);
  };

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col justify-end"
      style={{ backgroundColor: visible ? "rgba(0,0,0,0.35)" : "transparent", transition: "background-color 0.28s ease" }}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "20px 20px 0 0",
          maxHeight: "70%",
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: "#e0e0e0" }} />
        </div>

        {/* Title */}
        <p className="font-semibold px-5 pt-2 pb-3" style={{ fontSize: 18, lineHeight: "24px", color: "#121212" }}>
          Select your city
        </p>

        {/* Search */}
        <div className="px-5 pb-3">
          <div
            className="flex items-center gap-2 rounded-[10px]"
            style={{ padding: "10px 14px", backgroundColor: "#f5f5f5" }}
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6.5" stroke="#999" strokeWidth="1.5" />
              <path d="M14 14L18 18" stroke="#999" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search city..."
              className="w-full outline-none bg-transparent"
              style={{ fontSize: 15, lineHeight: "20px", color: "#121212" }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="shrink-0 cursor-pointer" style={{ color: "#999", fontSize: 18, lineHeight: 1 }}>
                &times;
              </button>
            )}
          </div>
        </div>

        {/* City list */}
        <div className="overflow-y-auto flex-1 pb-8" style={{ WebkitOverflowScrolling: "touch" }}>
          {filtered.length === 0 ? (
            <p className="px-5 py-6 text-center" style={{ fontSize: 14, color: "#999" }}>
              No cities found
            </p>
          ) : (
            filtered.map((city) => {
              const isSelected = city === selected;
              return (
                <button
                  key={city}
                  onClick={() => { onSelect(city); handleClose(); }}
                  className="flex items-center justify-between w-full px-5 cursor-pointer"
                  style={{
                    padding: "14px 20px",
                    backgroundColor: isSelected ? "#f7f7f7" : "transparent",
                    borderBottom: "1px solid #f2f2f2",
                  }}
                >
                  <span style={{ fontSize: 15, lineHeight: "22px", color: isSelected ? "#121212" : "#4b4b4b", fontWeight: isSelected ? 600 : 400 }}>
                    {city}
                  </span>
                  {isSelected && (
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                      <path d="M1 6L5.5 10.5L15 1" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────── Question renderers ─────────────────────────── */

function InputQuestion({
  question,
  values,
  onChange,
}: {
  question: Question;
  values: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
}) {
  const [citySheetOpen, setCitySheetOpen] = useState(false);
  const cityField = question.fields?.find((f) => f.picker === "city");

  return (
    <div className="flex flex-col gap-5 mt-7">
      {question.fields?.map((field) => {
        const hasValue = (values[field.id] || "").trim().length > 0;

        if (field.picker === "city") {
          return (
            <div key={field.id} className="flex flex-col gap-2">
              <label style={{ fontSize: 14, lineHeight: "20px", color: "#7a787d", fontWeight: 500 }}>
                {field.label}
              </label>
              <button
                onClick={() => setCitySheetOpen(true)}
                className="w-full rounded-[12px] text-left cursor-pointer flex items-center justify-between"
                style={{
                  padding: "16px 20px",
                  fontSize: 16,
                  lineHeight: "24px",
                  color: hasValue ? "#121212" : "#9ca3af",
                  border: hasValue ? "1px solid #121212" : "1px solid #e8e8e8",
                  backgroundColor: "#ffffff",
                }}
              >
                <span>{hasValue ? values[field.id] : field.placeholder || "Select city"}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="shrink-0" style={{ opacity: 0.4 }}>
                  <path d="M1 1L5 5L9 1" stroke="#121212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          );
        }

        return (
          <div key={field.id} className="flex flex-col gap-2">
            <label
              style={{ fontSize: 14, lineHeight: "20px", color: "#7a787d", fontWeight: 500 }}
            >
              {field.label}
            </label>
            <input
              type={field.type}
              placeholder={field.placeholder}
              value={values[field.id] || ""}
              onChange={(e) => onChange(field.id, e.target.value)}
              className="w-full rounded-[12px] outline-none"
              style={{
                padding: "16px 20px",
                fontSize: 16,
                lineHeight: "24px",
                color: "#121212",
                border: hasValue ? "1px solid #121212" : "1px solid #e8e8e8",
                backgroundColor: "#ffffff",
              }}
            />
          </div>
        );
      })}

      {cityField && (
        <CityPickerSheet
          open={citySheetOpen}
          selected={values[cityField.id] || ""}
          onSelect={(city) => onChange(cityField.id, city)}
          onClose={() => setCitySheetOpen(false)}
        />
      )}
    </div>
  );
}

function OptionsQuestion({
  question,
  selected,
  onToggle,
  counterValue,
  onCounterChange,
  followUpValue,
  onFollowUpChange,
}: {
  question: Question;
  selected: string[];
  onToggle: (id: string) => void;
  counterValue?: string;
  onCounterChange?: (id: string) => void;
  followUpValue?: string;
  onFollowUpChange?: (id: string) => void;
}) {
  const isRadio = question.type === "radio";
  const showCounter =
    question.inlineCounter && selected.includes(question.inlineCounter.triggeredBy);
  const showFollowUp =
    question.followUp && selected.includes(question.followUp.showIfAnswer);

  return (
    <div className="flex flex-col gap-4 mt-7">
      {question.options?.map((opt) => {
        const isSelected = selected.includes(opt.id);
        const counterLabel =
          opt.id === question.inlineCounter?.triggeredBy && counterValue
            ? ` (${counterValue})`
            : "";

        return (
          <div key={opt.id} className="flex flex-col gap-3">
            <button
              onClick={() => onToggle(opt.id)}
              className="flex items-center justify-between rounded-[12px] w-full text-left cursor-pointer"
              style={{
                padding: "16px 20px",
                backgroundColor: "#ffffff",
                border: isSelected ? "1px solid #121212" : "1px solid #e8e8e8",
              }}
            >
              <span style={{ fontSize: 16, lineHeight: "24px", color: isSelected ? "#121212" : "#4b4b4b" }}>
                {opt.label}{counterLabel}
              </span>
              {isRadio ? <RadioButton checked={isSelected} /> : <Checkbox checked={isSelected} />}
            </button>

            {/* Inline children counter */}
            {opt.id === question.inlineCounter?.triggeredBy && showCounter && (
              <div className="flex flex-col gap-2 pl-2 pb-1">
                <p style={{ fontSize: 14, lineHeight: "20px", color: "#4b4b4b", fontWeight: 500 }}>
                  {question.inlineCounter!.question}
                </p>
                <PillPicker
                  options={question.inlineCounter!.options}
                  selected={counterValue}
                  onSelect={(id) => onCounterChange?.(id)}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* Follow-up sub-question (health/life coverage) */}
      {showFollowUp && question.followUp && (
        <div className="flex flex-col gap-3 mt-2 pt-4" style={{ borderTop: "1px solid #f0f0f0" }}>
          <p className="font-medium" style={{ fontSize: 16, lineHeight: "24px", color: "#121212" }}>
            {question.followUp.question}
          </p>
          <PillPicker
            options={question.followUp.options}
            selected={followUpValue}
            onSelect={(id) => onFollowUpChange?.(id)}
          />
        </div>
      )}
    </div>
  );
}

/* ───────────────────── Main Component ─────────────────── */

export default function QuestionnaireScreen({ questions, onBack, onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});

  const question = questions[step];
  const isLast = step === questions.length - 1;

  /* ── Derived state per question type ─── */

  const selectedOptions = (
    question.type === "checkbox" || question.type === "radio"
      ? (answers[question.id] as string[] | undefined) || []
      : []
  );

  const inputValues: Record<string, string> =
    question.type === "input"
      ? (question.fields || []).reduce((acc, f) => {
          acc[f.id] = (answers[`${question.id}.${f.id}`] as string) || "";
          return acc;
        }, {} as Record<string, string>)
      : {};

  const counterKey = `${question.id}.__counter`;
  const counterValue = (answers[counterKey] as string) || undefined;

  const followUpKey = `${question.id}.__followUp`;
  const followUpValue = (answers[followUpKey] as string) || undefined;

  /* ── Can continue? ─── */

  let canContinue = false;
  if (question.type === "input") {
    canContinue = (question.fields || []).every(
      (f) => ((answers[`${question.id}.${f.id}`] as string) || "").trim().length > 0,
    );
  } else {
    canContinue = selectedOptions.length > 0;
    if (question.inlineCounter && selectedOptions.includes(question.inlineCounter.triggeredBy)) {
      canContinue = canContinue && !!counterValue;
    }
    if (question.followUp && selectedOptions.includes(question.followUp.showIfAnswer)) {
      canContinue = canContinue && !!followUpValue;
    }
  }

  /* ── Handlers ─── */

  const toggleOption = useCallback(
    (optionId: string) => {
      setAnswers((prev) => {
        const current = (prev[question.id] as string[] | undefined) || [];
        if (question.type === "radio") {
          const cleared = { ...prev, [question.id]: [optionId] };
          if (question.followUp && optionId !== question.followUp.showIfAnswer) {
            delete cleared[followUpKey];
          }
          return cleared;
        }
        const next = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId];
        const updated = { ...prev, [question.id]: next };
        if (question.inlineCounter && optionId === question.inlineCounter.triggeredBy && current.includes(optionId)) {
          delete updated[counterKey];
        }
        return updated;
      });
    },
    [question.id, question.type, question.followUp, question.inlineCounter, counterKey, followUpKey],
  );

  const handleInputChange = useCallback(
    (fieldId: string, value: string) => {
      setAnswers((prev) => ({ ...prev, [`${question.id}.${fieldId}`]: value }));
    },
    [question.id],
  );

  const handleCounterChange = useCallback(
    (id: string) => {
      setAnswers((prev) => ({ ...prev, [counterKey]: id }));
    },
    [counterKey],
  );

  const handleFollowUpChange = useCallback(
    (id: string) => {
      setAnswers((prev) => ({ ...prev, [followUpKey]: id }));
    },
    [followUpKey],
  );

  const handleContinue = () => {
    if (!canContinue) return;
    if (isLast) {
      onComplete(answers);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    } else {
      onBack();
    }
  };

  return (
    <div className="relative flex flex-col h-full" style={{ backgroundColor: "#ffffff" }}>
      <HeroBg />

      {/* ── Header: back + progress ────────────────────────────── */}
      <div className="relative flex flex-col gap-3 items-start w-full px-4 pt-3">
        <button onClick={handleBack} className="flex items-center justify-center cursor-pointer" style={{ width: 24, height: 24 }}>
          <img alt="Back" src="./assets/icons/chevron-left.svg" className="w-full h-full" />
        </button>
        <ProgressBar current={step} total={questions.length} />
      </div>

      {/* ── Scrollable question content ────────────────────────── */}
      <div className="relative flex-1 overflow-y-auto no-scrollbar px-4 pt-6 pb-28">
        <p className="font-semibold text-[#121212]" style={{ fontSize: 28, lineHeight: "36px", letterSpacing: "-0.1px" }}>
          {question.title}
        </p>

        {question.subtitle && (
          <p className="mt-2" style={{ fontSize: 14, lineHeight: "20px", color: "#7a787d" }}>
            {question.subtitle}
          </p>
        )}

        {question.type === "input" ? (
          <InputQuestion question={question} values={inputValues} onChange={handleInputChange} />
        ) : (
          <OptionsQuestion
            question={question}
            selected={selectedOptions}
            onToggle={toggleOption}
            counterValue={counterValue}
            onCounterChange={handleCounterChange}
            followUpValue={followUpValue}
            onFollowUpChange={handleFollowUpChange}
          />
        )}
      </div>

      {/* ── Bottom CTA ─────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 w-full flex flex-col items-center px-5 pb-5 pt-3"
        style={{ boxShadow: "0px -4px 8px rgba(54,53,76,0.06)", backgroundColor: "#ffffff" }}
      >
        <button
          onClick={handleContinue}
          className="w-full flex items-center justify-center rounded-lg cursor-pointer"
          style={{
            height: 48,
            backgroundColor: canContinue ? "#121212" : "#e8e8e8",
            transition: "background-color 0.2s ease",
          }}
        >
          <span
            className="font-semibold text-center"
            style={{ fontSize: 16, lineHeight: "22px", color: canContinue ? "#ffffff" : "#a0a0a0" }}
          >
            {isLast ? "Finish" : "Continue"}
          </span>
        </button>
      </div>
    </div>
  );
}
