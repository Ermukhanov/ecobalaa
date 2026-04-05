import { Gamepad2, Target, GraduationCap } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Props {
  onSelect: (role: string) => void;
}

const RoleSelection = ({ onSelect }: Props) => {
  const { t } = useI18n();

  const roles = [
    { id: "kids", label: t("roleKids"), age: t("roleKidsAge"), desc: t("roleKidsDesc"), Icon: Gamepad2, gradient: "kids-gradient", emoji: "🐣" },
    { id: "teen", label: t("roleTeen"), age: t("roleTeenAge"), desc: t("roleTeenDesc"), Icon: Target, gradient: "teen-gradient", emoji: "🌿" },
    { id: "teacher", label: t("roleTeacher"), age: t("roleTeacherAge"), desc: t("roleTeacherDesc"), Icon: GraduationCap, gradient: "eco-gradient", emoji: "👨‍🏫" },
  ];

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-[hsl(150,50%,94%)] via-background to-background flex flex-col items-center justify-center px-6">
      <h2 className="text-2xl font-black text-foreground mb-2 text-center animate-fade-in">{t("roleTitle")}</h2>
      <p className="text-muted-foreground text-sm mb-8 text-center animate-fade-in">{t("roleDesc")}</p>
      <div className="space-y-3 max-w-sm w-full">
        {roles.map((r, i) => (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            className="w-full flex items-center gap-4 bg-card rounded-2xl p-4 shadow-eco-card border border-border hover:border-primary/40 hover:-translate-y-1 transition-all text-left animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "backwards" }}
          >
            <div className={`w-12 h-12 rounded-xl ${r.gradient} flex items-center justify-center text-xl flex-shrink-0`}>
              {r.emoji}
            </div>
            <div>
              <div className="font-black text-foreground text-sm">{r.label}</div>
              <div className="text-[10px] font-bold text-primary">{r.age}</div>
              <div className="text-[10px] text-muted-foreground">{r.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;
