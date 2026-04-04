import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

interface Props {
  onFinish: () => void;
}

const SplashScreen = ({ onFinish }: Props) => {
  const [phase, setPhase] = useState<"enter" | "visible" | "exit">("enter");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("visible"), 100);
    const t2 = setTimeout(() => setPhase("exit"), 2200);
    const t3 = setTimeout(onFinish, 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  return (
    <div
      className={`h-[100dvh] w-full flex flex-col items-center justify-center bg-gradient-to-b from-[hsl(145,63%,42%)] to-[hsl(170,60%,45%)] transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0" : phase === "visible" ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`flex flex-col items-center transition-all duration-700 ${
          phase === "enter" ? "scale-75 opacity-0 translate-y-4" : "scale-100 opacity-100 translate-y-0"
        }`}
      >
        <div className="w-20 h-20 rounded-3xl bg-primary-foreground/20 backdrop-blur flex items-center justify-center mb-4 animate-pulse">
          <Leaf className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-black text-primary-foreground tracking-tight">
          <span>Eco</span><span className="opacity-80">Bala</span>
        </h1>
        <p className="text-primary-foreground/70 text-sm font-semibold mt-2">
          Экология — ойын арқылы 🌱
        </p>
      </div>

      <div className="absolute bottom-10 flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default SplashScreen;
