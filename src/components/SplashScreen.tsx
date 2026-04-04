import { useEffect, useState } from "react";
import EcoBalaLogo from "./EcoBalaLogo";

interface Props {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: Props) => {
  const [phase, setPhase] = useState<"hidden" | "logo" | "tagline" | "bars" | "exit">("hidden");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 100);
    const t2 = setTimeout(() => setPhase("tagline"), 800);
    const t3 = setTimeout(() => setPhase("bars"), 1400);
    const t4 = setTimeout(() => setPhase("exit"), 2800);
    const t5 = setTimeout(onFinish, 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [onFinish]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999, overflow: "hidden",
        background: "linear-gradient(145deg, #14532d 0%, #166534 30%, #0f766e 70%, #134e4a 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        transition: "opacity 0.5s ease",
        opacity: phase === "exit" ? 0 : 1,
      }}
    >
      {/* Animated background circles */}
      <div style={{
        position: "absolute", top: "-20%", left: "-20%",
        width: "60%", height: "60%",
        background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
        animation: "pulse 4s ease-in-out infinite",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "-10%",
        width: "50%", height: "50%",
        background: "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)",
        animation: "pulse 5s ease-in-out infinite 1s",
      }} />

      {/* Floating particles */}
      {["🌿", "🍃", "🌱", "🌾", "🍀"].map((emoji, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${15 + i * 18}%`,
          top: `${20 + (i % 2) * 40}%`,
          fontSize: "20px",
          opacity: phase === "hidden" ? 0 : 0.25,
          transform: `rotate(${i * 25}deg)`,
          transition: `opacity 0.8s ease ${0.3 + i * 0.15}s`,
          animation: `float${i % 2} 6s ease-in-out infinite ${i * 0.8}s`,
        }}>
          {emoji}
        </div>
      ))}

      {/* Main logo */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",
        transform: phase === "hidden" ? "translateY(30px) scale(0.85)" : "translateY(0) scale(1)",
        opacity: phase === "hidden" ? 0 : 1,
        transition: "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        {/* Logo icon with glow */}
        <div style={{
          position: "relative",
          filter: "drop-shadow(0 0 30px rgba(34,197,94,0.5))",
        }}>
          <svg width="90" height="90" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" fill="url(#splashGrad)" />
            <path d="M24 10C24 10 14 16 14 26C14 31.523 18.477 36 24 36C29.523 36 34 31.523 34 26C34 16 24 10 24 10Z" fill="white" fillOpacity="0.2" />
            <path d="M24 14C21 20 18 24 18 28C18 31.314 20.686 34 24 34C27.314 34 30 31.314 30 28C30 24 27 20 24 14Z" fill="white" fillOpacity="0.95" />
            <line x1="24" y1="34" x2="24" y2="39" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M24 28C22 26 19 25 17 26" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <path d="M24 30C26 28 29 27 31 28" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <circle cx="13" cy="15" r="2" fill="white" fillOpacity="0.7" />
            <circle cx="35" cy="17" r="1.5" fill="white" fillOpacity="0.6" />
            <circle cx="10" cy="28" r="1.2" fill="white" fillOpacity="0.5" />
            <defs>
              <linearGradient id="splashGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#0d9488" />
              </linearGradient>
            </defs>
          </svg>
          {/* Pulse ring */}
          <div style={{
            position: "absolute", inset: "-8px",
            border: "2px solid rgba(74,222,128,0.3)",
            borderRadius: "50%",
            animation: "ring 2s ease-out infinite",
          }} />
        </div>

        {/* Brand name */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 900,
            fontSize: "44px",
            lineHeight: 1,
            letterSpacing: "-1px",
          }}>
            <span style={{ color: "#86efac" }}>Eco</span>
            <span style={{ color: "#ffffff" }}>Bala</span>
          </div>
          <div style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginTop: "4px",
          }}>
            🇰🇿 Edu Platform
          </div>
        </div>

        {/* Tagline */}
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "99px",
          padding: "8px 20px",
          opacity: phase === "tagline" || phase === "bars" || phase === "exit" ? 1 : 0,
          transform: (phase === "tagline" || phase === "bars") ? "translateY(0)" : "translateY(10px)",
          transition: "all 0.5s ease 0.1s",
        }}>
          <span style={{ fontSize: "14px" }}>🌱</span>
          <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px", fontWeight: 600 }}>
            Экология — ойын арқылы
          </span>
        </div>
      </div>

      {/* Loading bar */}
      <div style={{
        position: "absolute", bottom: "60px",
        width: "160px",
        opacity: phase === "bars" || phase === "exit" ? 1 : 0,
        transition: "opacity 0.4s ease",
      }}>
        <div style={{
          height: "3px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "99px",
          overflow: "hidden",
        }}>
          <div style={{
            height: "100%",
            background: "linear-gradient(90deg, #86efac, #2dd4bf)",
            borderRadius: "99px",
            animation: phase === "bars" ? "loadBar 1.4s ease-out forwards" : "none",
          }} />
        </div>
        <div style={{
          textAlign: "center",
          marginTop: "10px",
          fontSize: "11px",
          color: "rgba(255,255,255,0.4)",
          fontWeight: 600,
          letterSpacing: "1px",
        }}>
          Жүктелуде...
        </div>
      </div>

      <style>{`
        @keyframes float0 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-8deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.7; }
        }
        @keyframes ring {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes loadBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
