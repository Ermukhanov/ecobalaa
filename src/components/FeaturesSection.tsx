const features = [
  { icon: "📚", title: "Видео-уроки", desc: "YouTube-уроки с конспектом и тестом из 10 вопросов. На русском и казахском." },
  { icon: "🎮", title: "EcoGame", desc: "Учитель создаёт комнату, ученики заходят по коду. Рейтинг, медали, значки после игры." },
  { icon: "🌍", title: "Живая эко-карта", desc: "Каждый выполненный квест добавляет зелёную точку на карту." },
  { icon: "🏆", title: "Геймификация", desc: "Eco Points, уровни 🌱🌿🌳, значки. Рейтинг школ по всему Казахстану." },
  { icon: "🐹", title: "Чат-бот хомяк", desc: "Маскот-хомяк отвечает на вопросы об экологии и помогает в платформе." },
  { icon: "📋", title: "Квесты и отчёты", desc: "Подростки выполняют задания и отправляют фото-отчёты. Система начисляет баллы." },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-xs font-extrabold tracking-[3px] uppercase text-primary">ВОЗМОЖНОСТИ</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground text-center mb-16">
          Всё для экообразования
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-card rounded-2xl p-7 shadow-eco-card border border-border hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold text-card-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
