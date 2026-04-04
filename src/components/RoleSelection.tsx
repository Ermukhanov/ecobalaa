import { Gamepad2, Target, GraduationCap } from "lucide-react";

interface Props {
  onSelect: (role: string) => void;
}

const roles = [
  {
    id: "kids",
    label: "EcoBala Kids",
    age: "6–12 лет",
    desc: "Уроки, игры, значки",
    Icon: Gamepad2,
    gradient: "kids-gradient",
    emoji: "🐣",
  },
  {
    id: "teen",
    label: "EcoBala Teen",
    age: "13–18 лет",
    desc: "Квесты, отчёты, рейтинг",
    Icon: Target,
    gradient: "teen-gradient",
    emoji: "🌿",
  },
  {
    id: "teacher",
    label: "Учитель",
    age: "Панель учителя",
    desc: "EcoGame, комнаты, медали",
    Icon: GraduationCap,
    gradient: "eco-gradient",
    emoji: "👨‍🏫",
  },
];

const RoleSelection = ({ onSelect }: Props) => (
  <div className="h-[100dvh] w-full bg-gradient-to-b from-[hsl(195,80%,88%)] via-[hsl(150,50%,94%)] to-background flex flex-col items-center justify-center px-6">
    <h2 className="text-2xl md:text-4xl font-black text-foreground mb-2 text-center">Выберите роль</h2>
    <p className="text-muted-foreground text-sm mb-8 text-center">Кто вы в EcoBala?</p>

    <div className="space-y-4 max-w-sm w-full">
      {roles.map((r) => (
        <button
          key={r.id}
          onClick={() => onSelect(r.id)}
          className="w-full flex items-center gap-4 bg-card rounded-2xl p-5 shadow-eco-card border border-border hover:border-primary/40 hover:-translate-y-1 transition-all text-left"
        >
          <div className={`w-14 h-14 rounded-xl ${r.gradient} flex items-center justify-center text-2xl flex-shrink-0`}>
            {r.emoji}
          </div>
          <div>
            <div className="font-black text-foreground">{r.label}</div>
            <div className="text-xs font-bold text-primary">{r.age}</div>
            <div className="text-xs text-muted-foreground">{r.desc}</div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default RoleSelection;
