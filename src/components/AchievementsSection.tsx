import { Flame, Star, Award, Map } from "lucide-react";

const stats = [
  { icon: Flame, label: "Система Streak", value: "Как в Duolingo", desc: "Ежедневные бонусы за активность" },
  { icon: Star, label: "XP и Уровни", value: "Опыт за дела", desc: "Растущий аватар и статус" },
  { icon: Award, label: "Бейджи", value: "Коллекционные", desc: "«Мастер переработки» и другие" },
  { icon: Map, label: "Карта добрых дел", value: "Весь Казахстан", desc: "Пункты приёма, субботники, школы" },
];

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-foreground">
            Геймификация и <span className="text-primary">Eco-Reward</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Мотивируем детей заботиться о природе через игровые механики
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative group bg-card rounded-2xl p-6 shadow-eco-card border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="eco-gradient w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <s.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide">{s.label}</p>
              <p className="text-2xl font-black text-foreground mt-1">{s.value}</p>
              <p className="text-muted-foreground text-sm mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
