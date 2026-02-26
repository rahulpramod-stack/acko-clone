import { createContext, useContext, useState } from "react";

export interface Profile {
  id: string;
  name: string;
  firstName: string;
  phone: string;
  initials: string;
  color: string;
  completionPct: number;
}

export const PROFILES: Profile[] = [
  { id: "vishwanath", name: "Vishwanath D",    firstName: "Vishwanath", phone: "9988776655", initials: "VD", color: "#D97706", completionPct: 85 },
  { id: "suprathik",  name: "Suprathik Saha",  firstName: "Suprathik",  phone: "8095781414", initials: "SS", color: "#5920C5", completionPct: 40 },
  { id: "rahul",      name: "Rahul Pramod",    firstName: "Rahul",      phone: "9876543210", initials: "RP", color: "#DC2626", completionPct: 75 },
  { id: "appu",       name: "Appu Kumar",      firstName: "Appu",       phone: "9123456789", initials: "AK", color: "#059669", completionPct: 60 },
];

interface ProfileContextValue {
  profile: Profile;
  setProfile: (p: Profile) => void;
}

const ProfileContext = createContext<ProfileContextValue>({
  profile: PROFILES[0],
  setProfile: () => {},
});

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(PROFILES[0]);
  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
