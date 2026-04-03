const comingSoon = [
  { icon: "📱", title: "Мобильное приложение", desc: "iOS и Android", color: "bg-primary/5 border-primary/20" },
  { icon: "🏫", title: "Турниры школ", desc: "Городские соревнования", color: "bg-eco-sky/5 border-eco-sky/20" },
  { icon: "🤖", title: "ИИ-наставник", desc: "Персональные маршруты", color: "bg-[hsl(45,100%,95%)] border-[hsl(45,80%,70%)]/30" },
  { icon: "🌍", title: "Масштаб на КЗ", desc: "Все регионы Казахстана", color: "bg-[hsl(340,70%,95%)] border-[hsl(340,60%,75%)]/30" },
];

const ComingSoonSection = () => {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-xs font-extrabold tracking-[3px] uppercase text-primary">БУДУЩЕЕ</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground text-center mb-16">
          Скоро в EcoBala
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {comingSoon.map((item) => (
            <div key={item.title} className={`p-6 rounded-2xl border-2 border-dashed ${item.color}`}>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-black text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection;
