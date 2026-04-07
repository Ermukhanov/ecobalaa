import { useState } from "react";
import { ChevronRight, Megaphone, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Props {
  role: string;
}

const Onboarding = ({ role }: Props) => {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const [source, setSource] = useState("");

  const sources = [
    { id: "social", label: t("sourceSocial"), icon: "📱" },
    { id: "friend", label: t("sourceFriend"), icon: "👫" },
    { id: "school", label: t("sourceSchool"), icon: "🏫" },
    { id: "search", label: t("sourceSearch"), icon: "🔍" },
    { id: "other", label: t("sourceOther"), icon: "💬" },
  ];

  const getAuthUrl = () => {
    if (role === "kids") return "/register-kids.html";
    if (role === "teen") return "/register-teen.html";
    return "/register.html";
  };

  const awaitsMap: Record<string, { icon: string; text: string }[]> = {
    kids: [
      { icon: "🎥", text: t("awaitsKids1") },
      { icon: "🎮", text: t("awaitsKids2") },
      { icon: "🏆", text: t("awaitsKids3") },
      { icon: "🐹", text: t("awaitsKids4") },
    ],
    teen: [
      { icon: "🗺️", text: t("awaitsTeen1") },
      { icon: "📸", text: t("awaitsTeen2") },
      { icon: "📊", text: t("awaitsTeen3") },
      { icon: "🔥", text: t("awaitsTeen4") },
    ],
    teacher: [
      { icon: "🎮", text: t("awaitsTeacher1") },
      { icon: "📋", text: t("awaitsTeacher2") },
      { icon: "🏅", text: t("awaitsTeacher3") },
      { icon: "📺", text: t("awaitsTeacher4") },
    ],
  };

  const next = () => {
    if (step < 1) {
      setStep(step + 1);
    } else {
      window.location.href = getAuthUrl();
    }
  };

  const steps = [
    { id: "source", title: t("sourceTitle"), Icon: Megaphone },
    { id: "awaits", title: t("awaitsTitle"), Icon: Sparkles },
  ];

  const canNext = step === 0 ? !!source : true;

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-[hsl(150,50%,94%)] via-background to-background flex flex-col">
      <div className="pt-6 px-6">
        <div className="flex gap-2 max-w-sm mx-auto">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "eco-gradient" : "bg-muted"}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="mb-2 animate-fade-in">
          {(() => {
            const StepIcon = steps[step].Icon;
            return <StepIcon className="w-7 h-7 text-primary" />;
          })()}
        </div>
        <h2 className="text-xl font-black text-foreground mb-5 text-center animate-fade-in">{steps[step].title}</h2>

        {step === 0 && (
          <div className="space-y-2 max-w-sm w-full">
            {sources.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setSource(s.id)}
                className={`w-full flex items-center gap-3 rounded-xl p-3 border-2 transition-all text-left animate-fade-in ${
                  source === s.id
                    ? "border-primary bg-primary/5 shadow-eco"
                    : "border-border bg-card hover:border-primary/30"
                }`}
                style={{ animationDelay: `${i * 0.05}s`, animationFillMode: "backwards" }}
              >
                <span className="text-lg">{s.icon}</span>
                <span className="font-semibold text-foreground text-sm">{s.label}</span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="space-y-2.5 max-w-sm w-full">
            {(awaitsMap[role] || awaitsMap.kids).map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-eco border border-border animate-fade-in"
                style={{ animationDelay: `${i * 0.08}s`, animationFillMode: "backwards" }}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <span className="text-xs font-semibold text-foreground">{item.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="px-6 pb-8">
        <button
          onClick={next}
          disabled={!canNext}
          className="w-full max-w-sm mx-auto flex items-center justify-center gap-2 eco-gradient text-primary-foreground py-3.5 rounded-full font-bold text-sm shadow-eco hover:scale-[1.02] transition-transform disabled:opacity-40 disabled:hover:scale-100"
        >
          {step < 1 ? t("next") : t("loginBtn")}
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
