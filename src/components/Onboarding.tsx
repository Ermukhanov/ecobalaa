import { useState } from "react";
import { ChevronRight, Globe, Megaphone, Sparkles } from "lucide-react";

interface Props {
  role: string;
}

const languages = [
  { id: "ru", label: "Русский", flag: "🇷🇺" },
  { id: "kz", label: "Қазақша", flag: "🇰🇿" },
];

const sources = [
  { id: "social", label: "Соцсети", icon: "📱" },
  { id: "friend", label: "Друзья", icon: "👫" },
  { id: "school", label: "Школа / учитель", icon: "🏫" },
  { id: "search", label: "Поиск в интернете", icon: "🔍" },
  { id: "other", label: "Другое", icon: "💬" },
];

const awaits: Record<string, { icon: string; text: string }[]> = {
  kids: [
    { icon: "🎥", text: "Видео-уроки с тестами на русском и казахском" },
    { icon: "🎮", text: "EcoGame — викторина с классом в реальном времени" },
    { icon: "🏆", text: "Бейджи, Eco Points и уровни 🌱🌿🌳" },
    { icon: "🐹", text: "Чат-бот хомяк — твой эко-помощник" },
  ],
  teen: [
    { icon: "🗺️", text: "Реальные квесты: субботники, посадка деревьев" },
    { icon: "📸", text: "Фото-отчёты и верификация заданий" },
    { icon: "📊", text: "Рейтинг школ по всему Казахстану" },
    { icon: "🔥", text: "Система Streak — ежедневные бонусы" },
  ],
  teacher: [
    { icon: "🎮", text: "EcoGame — создавайте комнаты для викторин" },
    { icon: "📋", text: "Панель управления классами и учениками" },
    { icon: "🏅", text: "Автоматический подсчёт, медали, подиум" },
    { icon: "📺", text: "Игра на интерактивной доске / проекторе" },
  ],
};

const steps = [
  { id: "lang", title: "Выберите язык", Icon: Globe },
  { id: "source", title: "Откуда вы о нас узнали?", Icon: Megaphone },
  { id: "awaits", title: "Что вас ждёт", Icon: Sparkles },
];

const Onboarding = ({ role }: Props) => {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState("");
  const [source, setSource] = useState("");

  const canNext = step === 0 ? !!lang : step === 1 ? !!source : true;

  const next = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // User said they'll add login/register themselves
      // For now just show a placeholder
    }
  };

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-[hsl(195,80%,88%)] via-[hsl(150,50%,94%)] to-background flex flex-col">
      {/* Progress */}
      <div className="pt-6 px-6">
        <div className="flex gap-2 max-w-sm mx-auto">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "eco-gradient" : "bg-muted"}`} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="mb-2">
          {(() => {
            const StepIcon = steps[step].Icon;
            return <StepIcon className="w-8 h-8 text-primary" />;
          })()}
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-6 text-center">{steps[step].title}</h2>

        {/* Step 0: Language */}
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

        {/* Step 1: Source */}
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

        {/* Step 2: What awaits */}
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

      {/* Bottom button */}
      <div className="px-6 pb-8">
        <button
          onClick={next}
          disabled={!canNext}
          className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 eco-gradient text-primary-foreground py-4 rounded-full font-bold text-base shadow-eco hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:hover:scale-100"
        >
          {step < 2 ? "Далее" : "Войти / Регистрация"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
