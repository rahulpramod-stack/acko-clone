import { useState, useEffect, useCallback, useRef } from "react";

export type Category = "vehicles" | "family" | "trips" | "devices";

const categoryIcons = {
  vehicles: "./assets/icons/car-menu.svg",
  family:   "./assets/icons/family-menu.svg",
  trips:    "./assets/icons/trips-menu.svg",
  devices:  "./assets/icons/devices-menu.svg",
};

const items: { key: Category; label: string; icon: string }[] = [
  { key: "vehicles", label: "Vehicles", icon: categoryIcons.vehicles },
  { key: "family",   label: "Family",   icon: categoryIcons.family   },
  { key: "trips",    label: "Trips",    icon: categoryIcons.trips    },
  { key: "devices",  label: "Devices",  icon: categoryIcons.devices  },
];

interface Props {
  active: Category;
  visible: boolean;
  onTabChange: (tab: Category) => void;
}

export default function FloatingCategoryNav({ active, visible, onTabChange }: Props) {
  return (
    <div
      className="absolute bottom-0 left-0 w-full flex flex-col items-center pointer-events-none"
      style={{
        paddingBottom: 12,
        paddingTop: 20,
        backgroundImage: visible
          ? "linear-gradient(180deg, rgba(53,53,53,0) 0%, rgb(53,53,53) 100%)"
          : "none",
        transform: visible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease, background-image 0.3s ease",
      }}
    >
      <div
        className="flex items-center rounded-[72px] w-[calc(100%-32px)] pointer-events-auto"
        style={{
          backgroundColor: "rgba(15,15,16,0.9)",
          padding: 8,
          gap: 2,
        }}
      >
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              onClick={() => onTabChange(item.key)}
              className="flex flex-col gap-0.5 items-center justify-center flex-1 rounded-[36px] cursor-pointer"
              style={{
                height: 48,
                backgroundColor: isActive ? "rgba(107,107,107,0.3)" : "transparent",
                backdropFilter: isActive ? "blur(5px)" : undefined,
                position: "relative",
                border: "none",
              }}
            >
              <img src={item.icon} alt="" style={{ width: 20, height: 20, opacity: isActive ? 1 : 0.6 }} />
              <p
                style={{
                  fontSize: 12,
                  lineHeight: "18px",
                  color: isActive ? "#ffffff" : "#a6a6a6",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {item.label}
              </p>
              {isActive && (
                <div
                  className="absolute inset-0 rounded-[inherit] pointer-events-none"
                  style={{ boxShadow: "inset 0px 0px 4px 0px rgba(255,255,255,0.15)" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Hook that tracks scroll direction and returns whether the nav should be visible.
 * Attach the returned ref to the scrollable container.
 */
export function useNavScrollVisibility() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const lastScrollTop = useRef(0);
  const [visible, setVisible] = useState(true);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const st = el.scrollTop;
    const threshold = 8;

    if (st <= 0) {
      setVisible(true);
    } else if (st - lastScrollTop.current > threshold) {
      setVisible(false);
    } else if (lastScrollTop.current - st > threshold) {
      setVisible(true);
    }
    lastScrollTop.current = st;
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  return { scrollRef, visible };
}
