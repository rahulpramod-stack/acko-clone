import { useProfile, PROFILES } from "../contexts/ProfileContext";

interface Props {
  onClose: () => void;
  onViewProfile?: () => void;
}

export default function ProfileSwitcherSheet({ onClose, onViewProfile }: Props) {
  const { profile, setProfile } = useProfile();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)",
          zIndex: 50, borderRadius: 40,
        }}
      />
      {/* Sheet */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "#fff", borderRadius: "20px 20px 0 0",
        zIndex: 51, padding: "12px 20px 32px",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
      }}>
        {/* Handle */}
        <div style={{ width: 36, height: 4, background: "#d1d1d6", borderRadius: 2, margin: "0 auto 20px" }} />

        <p style={{ fontSize: 16, fontWeight: 600, color: "#121212", lineHeight: "22px", marginBottom: 20 }}>
          Switch profile
        </p>

        {/* Profile tiles — 2×2 grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {PROFILES.map(p => {
            const active = p.id === profile.id;
            return (
              <button
                key={p.id}
                onClick={() => { setProfile(p); onClose(); }}
                style={{
                  display: "flex", alignItems: "center", gap: 10,
                  padding: "12px 14px", borderRadius: 12,
                  border: active ? `2px solid ${p.color}` : "1.5px solid #e5e5ea",
                  background: active ? `${p.color}12` : "#fafafa",
                  cursor: "pointer", textAlign: "left",
                  transition: "border-color 0.15s",
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  background: p.color, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{p.initials.charAt(0)}</span>
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#121212", lineHeight: "18px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p.firstName}
                  </p>
                  <p style={{ fontSize: 11, color: "#8e8e93", lineHeight: "16px" }}>{p.phone.slice(0, 5)}…</p>
                </div>
                {active && (
                  <svg style={{ flexShrink: 0 }} width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill={p.color} />
                    <path d="M4.5 8l2.5 2.5L11.5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* View full profile */}
        {onViewProfile && (
          <button
            onClick={() => { onClose(); onViewProfile(); }}
            style={{
              width: "100%", padding: "14px", background: "#121212",
              borderRadius: 10, border: "none", color: "#fff",
              fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
            }}
          >
            View full profile
          </button>
        )}
      </div>
    </>
  );
}
