import { useI18n } from "@/lib/i18n";
import { Leaf } from "lucide-react";

interface Props {
  onDone: () => void;
}

const LanguageSelect = ({ onDone }: Props) => {
  const { lang, setLang, t } = useI18n();

  const select = (l: "kz" | "ru") => {
    setLang(l);
  };

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-[hsl(150,40%,22%)] via-[hsl(150,30%,30%)] to-background flex flex-col items-center justify-center px-6">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        {/* Logo */}
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl"
          style={{ background: "linear-gradient(135deg, hsl(145 63% 45%), hsl(170 60% 40%))" }}
        >
          <Leaf className="w-10 h-10 text-white" strokeWidth={2.5} />
        </div>

        <h1 className="text-3xl font-black text-white">
          <span style={{ color: "#86efac" }}>Eco</span>Bala
        </h1>

        <h2 className="text-xl font-bold text-white/90">{t("chooseLang")}</h2>
        <p className="text-sm text-white/50">{t("chooseLangDesc")}</p>

        <div className="space-y-3 w-full max-w-xs mt-2">
          {([
            { id: "kz" as const, label: "Қазақша", flag: "🇰🇿" },
            { id: "ru" as const, label: "Русский", flag: "🇷🇺" },
          ]).map((l) => (
            <button
              key={l.id}
              onClick={() => select(l.id)}
              className={`w-full flex items-center gap-4 rounded-2xl p-5 border-2 transition-all text-left ${
                lang === l.id
                  ? "border-primary bg-primary/10 shadow-eco"
                  : "border-white/10 bg-white/5 hover:border-primary/30"
              }`}
            >
              <span className="text-3xl">{l.flag}</span>
              <span className={`font-bold text-lg ${lang === l.id ? "text-white" : "text-white/70"}`}>{l.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onDone}
          className="mt-4 w-full max-w-xs eco-gradient text-primary-foreground py-4 rounded-full font-bold text-base shadow-eco hover:scale-[1.02] transition-transform"
        >
          {t("next")} →
        </button>
      </div>
    </div>
  );
};

export default LanguageSelect;
