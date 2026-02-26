import { useState } from "react";
import Lottie from "lottie-react";
import crownAnimation from "../assets/animated/crown.json";
import { useProfile } from "../contexts/ProfileContext";
import ProfileSwitcherSheet from "./ProfileSwitcherSheet";

interface Props {
  onNotificationsClick?: () => void;
  onViewProfile?: () => void;
}

export default function Header({ onNotificationsClick, onViewProfile }: Props) {
  const { profile } = useProfile();
  const [showSwitcher, setShowSwitcher] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between px-4 pt-3 pb-4">
        {/* Left: avatar + greeting */}
        <button
          onClick={() => setShowSwitcher(true)}
          style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: profile.color }}
          >
            <span className="text-white text-base font-medium">{profile.initials.charAt(0)}</span>
          </div>
          <span className="text-white text-sm">Hey {profile.firstName}</span>
        </button>

        {/* Right: Privileges + bell */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 border border-[#fff09d] rounded-full px-2 py-1">
            <Lottie
              animationData={crownAnimation}
              loop
              autoplay
              style={{ width: 22, height: 22 }}
            />
            <span className="text-[#FBE67B] text-xs font-medium">Privileges</span>
          </div>
          <button
            className="relative"
            onClick={onNotificationsClick}
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#D83D37] rounded-full flex items-center justify-center z-10">
              <span className="text-white text-[9px] font-semibold">2</span>
            </div>
            <img src="./assets/icons/Notification_Bell.svg" alt="Notifications" className="w-5 h-6 object-contain" />
          </button>
        </div>
      </div>

      {showSwitcher && (
        <ProfileSwitcherSheet
          onClose={() => setShowSwitcher(false)}
          onViewProfile={onViewProfile}
        />
      )}
    </>
  );
}
