import { GraduationCap, Map, Gamepad2, Bot, Users, Smartphone } from "lucide-react";

const cards = [
  { icon: "🎓", title: "Уроки", desc: "Видео-уроки с тестами для детей 6-12 лет" },
  { icon: "🗺️", title: "Квесты", desc: "Реальные эко-задания с картой добрых дел" },
  { icon: "🎮", title: "Игры", desc: "EcoGame-викторины и игры для доски" },
  { icon: "🤖", title: "Чат-бот", desc: "Хомяк-помощник отвечает на вопросы" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-xs font-extrabold tracking-[3px] uppercase text-primary">О НАС</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground text-center mb-4">
          Кто мы такие?
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          EcoBala — стартап из Хромтау, Казахстан. Мы создаём цифровую платформу экологического
          образования для детей и подростков.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: cards + pills */}
          <div>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {cards.map((c) => (
                <div
                  key={c.title}
                  className="bg-card rounded-2xl p-6 shadow-eco-card hover:-translate-y-1 transition-all duration-300 border border-border"
                >
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="text-base font-bold text-card-foreground mb-1">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-extrabold text-foreground mb-3">Для кого платформа:</p>
              <div className="flex gap-3 flex-wrap">
                <span className="bg-eco-kids/15 text-eco-kids font-bold text-sm px-4 py-2 rounded-full">Kids</span>
                <span className="bg-eco-teen/15 text-eco-teen font-bold text-sm px-4 py-2 rounded-full">Teen</span>
                <span className="bg-primary/10 text-primary font-bold text-sm px-4 py-2 rounded-full">Учитель</span>
              </div>
            </div>
          </div>

          {/* Right: Goal card */}
          <div className="bg-gradient-to-br from-eco-forest via-primary to-eco-sky rounded-3xl p-10 text-primary-foreground relative overflow-hidden flex flex-col justify-center">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-foreground/5 rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-foreground/5 rounded-full" />
            <div className="relative z-10 text-center">
              <div className="text-5xl mb-4">🇰🇿</div>
              <h3 className="text-2xl font-black mb-2">🎯 Цель — весь Казахстан</h3>
              <p className="text-primary-foreground/80 mb-6">
                Начинаем с Хромтау — масштабируемся на все 14 регионов
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <span className="bg-primary-foreground/15 border border-primary-foreground/25 rounded-xl px-4 py-2 text-xs font-extrabold">📍 Хромтау — старт</span>
                <span className="bg-primary-foreground/15 border border-primary-foreground/25 rounded-xl px-4 py-2 text-xs font-extrabold">🚀 14 регионов</span>
                <span className="bg-[hsl(45,100%,70%)]/25 border border-[hsl(45,100%,70%)]/50 rounded-xl px-4 py-2 text-xs font-extrabold text-[hsl(45,100%,85%)]">🌱 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
