import { useState } from "react";
import { ChevronRight, Globe, Megaphone, Sparkles } from "lucide-react";

interface Props {
  role: string;
}

const languages = [
  { id: "kz", label: "Қазақша", flag: "🇰🇿" },
  { id: "ru", label: "Русский", flag: "🇷🇺" },
];

const sources = [
  { id: "social", label: "Әлеуметтік желілер", icon: "📱" },
  { id: "friend", label: "Достар", icon: "👫" },
  { id: "school", label: "Мектеп / мұғалім", icon: "🏫" },
  { id: "search", label: "Интернеттен іздеу", icon: "🔍" },
  { id: "other", label: "Басқа", icon: "💬" },
];

const awaits: Record<string, { icon: string; text: string }[]> = {
  kids: [
    { icon: "🎥", text: "Қазақша және орысша бейне-сабақтар" },
    { icon: "🎮", text: "EcoGame — сыныппен нақты уақытта викторина" },
    { icon: "🏆", text: "Белгілер, Eco Points және деңгейлер 🌱🌿🌳" },
    { icon: "🐹", text: "Хомяк чат-бот — эко-көмекшің" },
  ],
  teen: [
    { icon: "🗺️", text: "Нақты квесттер: сенбіліктер, ағаш отырғызу" },
    { icon: "📸", text: "Фото-есептер және тапсырмаларды тексеру" },
    { icon: "📊", text: "Қазақстан бойынша мектеп рейтингі" },
    { icon: "🔥", text: "Streak жүйесі — күнделікті бонустар" },
  ],
  teacher: [
    { icon: "🎮", text: "EcoGame — викторинаға бөлмелер жасаңыз" },
    { icon: "📋", text: "Сыныптар мен оқушыларды басқару панелі" },
    { icon: "🏅", text: "Автоматты есептеу, медальдар, подиум" },
    { icon: "📺", text: "Интерактивті тақтада / проекторда ойын" },
  ],
};

const steps = [
  { id: "lang", title: "Тілді таңдаңыз", Icon: Globe },
  { id: "source", title: "Біз туралы қайдан білдіңіз?", Icon: Megaphone },
  { id: "awaits", title: "Сізді не күтеді", Icon: Sparkles },
];

const Onboarding = ({ role }: Props) => {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState("");
  const [source, setSource] = useState("");

  const canNext = step === 0 ? !!lang : step === 1 ? !!source : true;

  const getAuthUrl = () => {
    if (role === "kids") return "/register-kids.html";
    if (role === "teen") return "/register-teen.html";
    return "/register.html";
  };

  const next = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      window.location.href = getAuthUrl();
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-[hsl(195,80%,88%)] via-[hsl(150,50%,94%)] to-background flex flex-col">
      <div className="pt-6 px-6">
        <div className="flex gap-2 max-w-sm mx-auto">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "eco-gradient" : "bg-muted"}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="mb-2">
          {(() => {
            const StepIcon = steps[step].Icon;
            return <StepIcon className="w-8 h-8 text-primary" />;
          })()}
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6 text-center">{steps[step].title}</h2>

        {step === 0 && (
          <div className="space-y-3 max-w-sm w-full">
            {languages.map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                className={`w-full flex items-center gap-4 rounded-2xl p-5 border-2 transition-all text-left ${
                  lang === l.id
                    ? "border-primary bg-primary/5 shadow-eco"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <span className="text-3xl">{l.flag}</span>
                <span className="font-bold text-foreground text-lg">{l.label}</span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-2 max-w-sm w-full">
            {sources.map((s) => (
              <button
                key={s.id}
                onClick={() => setSource(s.id)}
                className={`w-full flex items-center gap-3 rounded-xl p-4 border-2 transition-all text-left ${
                  source === s.id
                    ? "border-primary bg-primary/5 shadow-eco"
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <span className="text-xl">{s.icon}</span>
                <span className="font-semibold text-foreground text-sm">{s.label}</span>
              </button>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3 max-w-sm w-full">
            {(awaits[role] || awaits.kids).map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-eco border border-border">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <span className="text-sm font-semibold text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={next}
          disabled={!canNext}
          className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 eco-gradient text-primary-foreground py-4 rounded-full font-bold text-base shadow-eco hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:hover:scale-100"
        >
          {step < 2 ? "Келесі" : "Кіру / Тіркелу"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
