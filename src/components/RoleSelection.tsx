import { Gamepad2, Target, GraduationCap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logoKids from "@/assets/logo-kids.jpg";
import logoTeen from "@/assets/logo-teen.jpg";
import logoMain from "@/assets/logo-main.jpg";

interface Props {
  onSelect: (role: string) => void;
}

const RoleSelection = ({ onSelect }: Props) => {
  const { t } = useI18n();

  const roles = [
    { id: "kids", label: t("roleKids"), age: t("roleKidsAge"), desc: t("roleKidsDesc"), logo: logoKids, gradient: "kids-gradient" },
    { id: "teen", label: t("roleTeen"), age: t("roleTeenAge"), desc: t("roleTeenDesc"), logo: logoTeen, gradient: "teen-gradient" },
    { id: "teacher", label: t("roleTeacher"), age: t("roleTeacherAge"), desc: t("roleTeacherDesc"), logo: logoMain, gradient: "eco-gradient" },
  ];

  return (
    <div className="h-[100dvh] w-full bg-gradient-to-b from-[hsl(150,50%,95%)] via-background to-background flex flex-col items-center justify-center px-6">
      <h2 className="text-2xl font-black text-foreground mb-1 text-center animate-fade-in">{t("roleTitle")}</h2>
      <p className="text-muted-foreground text-sm mb-6 text-center animate-fade-in">{t("roleDesc")}</p>
      <div className="space-y-3 max-w-sm w-full">
        {roles.map((r, i) => (
          <button
            key={r.id}
            onClick={() => onSelect(r.id)}
            className="w-full flex items-center gap-4 bg-card rounded-2xl p-4 shadow-eco border border-border hover:border-primary/40 hover:-translate-y-1 hover:shadow-eco-card transition-all text-left animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "backwards" }}
          >
            <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
              <img src={r.logo} alt={r.label} className="w-full h-full object-cover" />
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
