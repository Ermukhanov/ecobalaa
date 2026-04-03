const steps = [
  { num: "1", icon: "📝", title: "Регистрация", desc: "Создай бесплатный аккаунт в Kids (6-12 лет) или Teen (13-18 лет) за 2 минуты", color: "bg-primary/10 border-primary/20" },
  { num: "2", icon: "🎮", title: "Учись и играй", desc: "Проходи уроки, выполняй квесты, играй в EcoGame с классом", color: "bg-eco-sky/10 border-eco-sky/20" },
  { num: "3", icon: "🏆", title: "Расти и побеждай", desc: "Зарабатывай Eco Points, получай значки, поднимайся в рейтинге", color: "bg-[hsl(45,100%,92%)] border-[hsl(45,80%,70%)]/30" },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-xs font-extrabold tracking-[3px] uppercase text-primary">КАК ЭТО РАБОТАЕТ</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground text-center mb-16">
          Три простых шага
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`text-center p-8 rounded-2xl border ${s.color} hover:-translate-y-2 transition-all duration-300`}
            >
              <div className="w-16 h-16 eco-gradient rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">
                {s.icon}
              </div>
              <div className="text-xs font-extrabold tracking-widest uppercase text-primary mb-2">Шаг {s.num}</div>
              <h3 className="text-xl font-black text-foreground mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
