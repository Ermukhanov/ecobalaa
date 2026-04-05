import { useEffect, useState } from "react";
import logoMain from "@/assets/logo-main.jpg";

interface Props {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: Props) => {
  const [phase, setPhase] = useState<"hidden" | "icon" | "text" | "bar" | "exit">("hidden");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("icon"), 200);
    const t2 = setTimeout(() => setPhase("text"), 900);
    const t3 = setTimeout(() => setPhase("bar"), 1500);
    const t4 = setTimeout(() => setPhase("exit"), 3000);
    const t5 = setTimeout(onFinish, 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [onFinish]);

  const show = phase !== "hidden";
  const showText = phase === "text" || phase === "bar" || phase === "exit";
  const showBar = phase === "bar" || phase === "exit";

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500"
      style={{
        background: "linear-gradient(160deg, hsl(145 63% 30%) 0%, hsl(150 40% 22%) 40%, hsl(170 50% 20%) 100%)",
        opacity: phase === "exit" ? 0 : 1,
      }}
    >
      {/* Ambient glow */}
      <div className="absolute top-[-30%] left-[-20%] w-[70%] h-[70%] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(145 63% 42% / 0.4), transparent 70%)" }} />
      <div className="absolute bottom-[-20%] right-[-15%] w-[60%] h-[60%] rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, hsl(170 60% 45% / 0.3), transparent 70%)" }} />

      {/* Floating leaves */}
      {["🌿", "🍃", "🌱", "☘️", "🍀"].map((e, i) => (
        <span
          key={i}
          className="absolute text-xl transition-opacity duration-700"
          style={{
            left: `${12 + i * 18}%`,
            top: `${15 + (i % 3) * 25}%`,
            opacity: show ? 0.15 : 0,
            transitionDelay: `${0.3 + i * 0.15}s`,
            animation: `floatLeaf ${5 + i}s ease-in-out infinite ${i * 0.6}s`,
          }}
        >
          {e}
        </span>
      ))}

      {/* Logo container */}
      <div
        className="flex flex-col items-center gap-5 transition-all duration-700"
        style={{
          transform: show ? "translateY(0) scale(1)" : "translateY(40px) scale(0.8)",
          opacity: show ? 1 : 0,
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Icon */}
        <div className="relative">
          <div
            className="w-28 h-28 rounded-3xl flex items-center justify-center shadow-2xl overflow-hidden"
            style={{
              boxShadow: "0 0 60px hsl(145 63% 42% / 0.4), 0 20px 40px hsl(0 0% 0% / 0.3)",
            }}
          >
            <img src={logoMain} alt="EcoBala" className="w-full h-full object-cover" />
          </div>
          <div
            className="absolute -inset-3 rounded-[28px] border-2 border-primary/30"
            style={{ animation: "pulseRing 2s ease-out infinite" }}
          />
          <div
            className="absolute -inset-6 rounded-[32px] border border-primary/15"
            style={{ animation: "pulseRing 2s ease-out infinite 0.5s" }}
          />
        </div>

        {/* Brand */}
        <div className="text-center">
          <h1 className="text-5xl font-black leading-none tracking-tight">
            <span style={{ color: "#86efac" }}>Eco</span>
            <span className="text-white">Bala</span>
          </h1>
          <p
            className="text-xs font-bold tracking-[3px] uppercase mt-2 transition-all duration-500"
            style={{
              color: "rgba(255,255,255,0.45)",
              opacity: showText ? 1 : 0,
              transform: showText ? "translateY(0)" : "translateY(8px)",
            }}
          >
            🇰🇿 Эко-платформа
          </p>
        </div>

        {/* Tagline pill */}
        <div
          className="flex items-center gap-2 rounded-full px-5 py-2.5 backdrop-blur-md transition-all duration-500"
          style={{
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.12)",
            opacity: showText ? 1 : 0,
            transform: showText ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "0.1s",
          }}
        >
          <span className="text-sm">🌱</span>
          <span className="text-white/80 text-sm font-semibold">Экология — ойын арқылы</span>
        </div>
      </div>

      {/* Loading bar */}
      <div
        className="absolute bottom-16 w-40 transition-opacity duration-400"
        style={{ opacity: showBar ? 1 : 0 }}
      >
        <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.12)" }}>
          <div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(90deg, #86efac, #2dd4bf)",
              animation: showBar ? "loadProgress 1.5s ease-out forwards" : "none",
            }}
          />
        </div>
        <p className="text-center mt-3 text-[11px] font-semibold tracking-wider" style={{ color: "rgba(255,255,255,0.35)" }}>
          Жүктелуде...
        </p>
      </div>

      <style>{`
        @keyframes floatLeaf {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-18px) rotate(8deg); }
        }
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        @keyframes loadProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
