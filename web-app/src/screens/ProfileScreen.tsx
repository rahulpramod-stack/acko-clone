import { useProfile } from "../contexts/ProfileContext";

interface Props {
  onBack: () => void;
}

/* ── Completion ring ────────────────────────────────────────────────── */
function CompletionRing({ pct, initials, color }: { pct: number; initials: string; color: string }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div style={{ position: "relative", width: 80, height: 80 }}>
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#e5e5ea" strokeWidth="4" />
        <circle
          cx="40" cy="40" r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          strokeDashoffset={circ / 4}
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
        </defs>
      </svg>
      {/* Avatar circle */}
      <div style={{
        position: "absolute", inset: 8,
        borderRadius: "50%", background: "#e8e8f0",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: "#040222", letterSpacing: -0.5 }}>
          {initials.charAt(0)}
        </span>
      </div>
      {/* Pct pill */}
      <div style={{
        position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)",
        background: "#040222", borderRadius: 32, border: "1px solid #fff",
        padding: "3px 8px 3px 10px", display: "flex", alignItems: "center", gap: 2, whiteSpace: "nowrap",
      }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#fff", lineHeight: "18px" }}>{pct}%</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transform: "rotate(180deg)" }}>
          <path d="M7.5 3L4.5 6L7.5 9" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* ── Settings row ───────────────────────────────────────────────────── */
function SettingsRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "2px 0" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 20, height: 20, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#4b4b4b" }}>
          {icon}
        </div>
        <span style={{ fontSize: 14, fontWeight: 500, lineHeight: "20px", color: "#121212" }}>{label}</span>
      </div>
      <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
        <path d="M1 1L8.5 8L1 15" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── SVG icons ──────────────────────────────────────────────────────── */
const icons = {
  profile:      <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 17c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  policy:       <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  address:      <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="M10 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.5"/><path d="M10 18S3.5 12.5 3.5 8a6.5 6.5 0 1 1 13 0C16.5 12.5 10 18 10 18Z" stroke="currentColor" strokeWidth="1.5"/></svg>,
  abha:         <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><rect x="2" y="5" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M6 10h2m2 0h4M6 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  payout:       <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 8h16" stroke="currentColor" strokeWidth="1.5"/><circle cx="6" cy="13" r="1" fill="currentColor"/></svg>,
  kyc:          <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="7" cy="10" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M12 9h4M12 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  savedCards:   <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M2 8h16" stroke="currentColor" strokeWidth="1.5"/></svg>,
  notification: <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="M10 2a6 6 0 0 0-6 6v3l-1.5 2.5h15L16 11V8a6 6 0 0 0-6-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 16.5a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.5"/></svg>,
  support:      <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M7 8a3 3 0 0 1 6 0c0 2-3 2.5-3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="16" r="0.75" fill="currentColor"/></svg>,
  about:        <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 9v5M10 7v.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  privacy:      <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><path d="M10 2L4 5v5c0 4 3 7 6 8 3-1 6-4 6-8V5l-6-3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  terms:        <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 6h6M7 9h6M7 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  manage:       <svg viewBox="0 0 20 20" fill="none" width="20" height="20"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
};

/* ── Service card ───────────────────────────────────────────────────── */
function ServiceCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{
      background: "#fbfbfb", borderRadius: 12, border: "2px solid #fff",
      padding: 16, display: "flex", flexDirection: "column", gap: 8,
      flex: 1, boxShadow: "0 2px 4px rgba(0,0,0,0.04)",
    }}>
      <div style={{ width: 28, height: 28, color: "#4b4b4b" }}>{icon}</div>
      <span style={{ fontSize: 14, fontWeight: 500, lineHeight: "20px", color: "#121212" }}>{label}</span>
    </div>
  );
}

/* ── Main screen ────────────────────────────────────────────────────── */
export default function ProfileScreen({ onBack }: Props) {
  const { profile } = useProfile();

  const settingsRows = [
    { icon: icons.profile,      label: "Your profile" },
    { icon: icons.policy,       label: "Link ACKO corporate policy" },
    { icon: icons.address,      label: "Addresses" },
    { icon: icons.abha,         label: "Your ABHA cards" },
    { icon: icons.payout,       label: "Payout methods" },
    { icon: icons.kyc,          label: "KYC information" },
    { icon: icons.savedCards,   label: "Saved cards" },
    { icon: icons.notification, label: "Notifications" },
    { icon: icons.support,      label: "Support" },
    { icon: icons.about,        label: "About us" },
    { icon: icons.privacy,      label: "Privacy policy" },
    { icon: icons.terms,        label: "Terms & conditions" },
    { icon: icons.manage,       label: "Manage account" },
  ];

  return (
    <div className="relative flex flex-col h-full" style={{ backgroundColor: "#ebebeb" }}>
      {/* ── Nav ── */}
      <div style={{ flexShrink: 0, background: "#ebebeb", padding: "16px 20px 13px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}>
          <div style={{ position: "relative", width: 10, height: 20 }}>
            <svg width="10" height="20" viewBox="0 0 10 20" fill="none">
              <path d="M8.5 2L1.5 10L8.5 18" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ paddingBottom: 40 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center", padding: "0 16px" }}>

          {/* Profile card */}
          <div style={{
            background: "#fbfbfb", border: "1px solid #fff", borderRadius: 16,
            width: "100%", padding: "32px 24px 24px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.04), inset 0 1px 4px #fff",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center", width: "100%" }}>
              {/* Ring + avatar */}
              <CompletionRing pct={profile.completionPct} initials={profile.initials} color={profile.color} />

              {/* Name + phone */}
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 24, fontWeight: 600, color: "#040222", letterSpacing: -0.1, lineHeight: "32px" }}>{profile.name}</p>
                <p style={{ fontSize: 16, fontWeight: 400, color: "#5b5675", lineHeight: "24px" }}>{profile.phone}</p>
              </div>
            </div>

            {/* CTA */}
            <button style={{
              width: "100%", padding: "8px 24px", background: "#121212",
              border: "0.9px solid #5b5675", borderRadius: 8, color: "#fff",
              fontSize: 14, fontWeight: 500, lineHeight: "20px", cursor: "pointer",
              fontFamily: "inherit", textAlign: "center",
            }}>
              Complete your profile
            </button>
          </div>

          {/* ACKO Essentials */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#121212", lineHeight: "22px" }}>Your ACKO essentials</p>
            <div style={{ display: "flex", gap: 8 }}>
              <ServiceCard icon={<svg viewBox="0 0 28 28" fill="none" width="28" height="28"><rect x="4" y="3" width="15" height="20" rx="2" stroke="#4b4b4b" strokeWidth="1.5"/><path d="M7 8h9M7 11.5h9M7 15h6" stroke="#4b4b4b" strokeWidth="1.5" strokeLinecap="round"/><circle cx="21" cy="21" r="5" fill="#ebe9fb" stroke="#5920C5" strokeWidth="1.2"/><path d="M19 21l1.5 1.5L23 19.5" stroke="#5920C5" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>} label="Policies" />
              <ServiceCard icon={<svg viewBox="0 0 24 24" fill="none" width="24" height="24"><rect x="3" y="8" width="18" height="12" rx="2" stroke="#4b4b4b" strokeWidth="1.5"/><path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="#4b4b4b" strokeWidth="1.5" strokeLinecap="round"/><circle cx="12" cy="14" r="2" stroke="#4b4b4b" strokeWidth="1.2"/></svg>} label="Rewards" />
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: "100%", height: 1, background: "#d1d1d6", margin: "8px 0" }} />

          {/* Settings list */}
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 24 }}>
            {settingsRows.map(row => (
              <SettingsRow key={row.label} icon={row.icon} label={row.label} />
            ))}
          </div>

          {/* Footer disclaimer */}
          <div style={{ marginTop: 16, width: "100%", display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
            <div style={{ background: "#efe9fb", borderRadius: 12, padding: 12, width: "100%", textAlign: "center" }}>
              <p style={{ fontSize: 12, color: "#4b4b4b", lineHeight: "18px" }}>
                All the non-insurance services listed on this app are facilitated by ACKO Tech.{" "}
                <span style={{ fontWeight: 500, color: "#121212" }}>Read more</span>
              </p>
            </div>
            <p style={{ fontSize: 12, color: "#4b4b4b", lineHeight: "18px" }}>
              Version 4.0.2&nbsp;&nbsp;|&nbsp;&nbsp;Last visited: Mar 28, 1:30 PM
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
