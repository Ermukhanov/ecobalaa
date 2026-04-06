import { useI18n } from "@/lib/i18n";
import logoMain from "@/assets/logo-main.jpg";

interface Props {
  onDone: () => void;
}

const LanguageSelect = ({ onDone }: Props) => {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="h-[100dvh] w-full flex flex-col items-center justify-center px-6"
      style={{ background: "linear-gradient(160deg, hsl(145 63% 30%) 0%, hsl(150 40% 22%) 40%, hsl(170 50% 20%) 100%)" }}
    >
      <div className="flex flex-col items-center gap-5 animate-fade-in">
        <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-xl"
          style={{ boxShadow: "0 0 40px hsl(145 63% 42% / 0.3)" }}>
          <img src={logoMain} alt="EcoBala" className="w-full h-full object-cover" />
        </div>

        <h1 className="text-3xl font-black">
          <span style={{ color: "#86efac" }}>Eco</span><span className="text-white">Bala</span>
        </h1>

        <h2 className="text-lg font-bold text-white/90">{t("chooseLang")}</h2>
        <p className="text-xs text-white/40">{t("chooseLangDesc")}</p>

        <div className="space-y-3 w-full max-w-xs mt-1">
          {([
            { id: "kz" as const, label: "Қазақша", flag: "🇰🇿" },
            { id: "ru" as const, label: "Русский", flag: "🇷🇺" },
          ]).map((l) => (
            <button
              key={l.id}
              onClick={() => setLang(l.id)}
              className={`w-full flex items-center gap-4 rounded-2xl p-4 border-2 transition-all text-left backdrop-blur-sm ${
                lang === l.id
                  ? "border-primary bg-primary/15 shadow-eco"
                  : "border-white/10 bg-white/5 hover:border-primary/30"
              }`}
            >
              <span className="text-3xl">{l.flag}</span>
              <span className={`font-bold text-lg ${lang === l.id ? "text-white" : "text-white/60"}`}>{l.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={onDone}
          className="mt-3 w-full max-w-xs eco-gradient text-primary-foreground py-3.5 rounded-full font-bold text-sm shadow-eco hover:scale-[1.02] transition-transform"
        >
          {t("next")} →
        </button>
      </div>
    </div>
  );
};

export default LanguageSelect;
