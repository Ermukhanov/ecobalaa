import { Smartphone, GraduationCap, Users } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "EcoBala Kids",
    desc: "Игровая платформа для детей 6–12 лет с интерактивными уроками и видео на казахском и русском языках",
    color: "bg-eco-kids/10 text-eco-kids",
  },
  {
    icon: GraduationCap,
    title: "EcoBala Teen",
    desc: "Реальные эко-квесты для подростков 13–18 лет: субботники, челленджи, рейтинги",
    color: "bg-eco-teen/10 text-eco-teen",
  },
  {
    icon: Users,
    title: "Панель учителя",
    desc: "Инструменты для педагогов: управление классами, задания, отслеживание прогресса учеников",
    color: "bg-primary/10 text-primary",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-foreground">
            О проекте <span className="text-primary">EcoBala</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Цифровая экосистема, где каждое доброе дело в реальности конвертируется
            в прогресс внутри приложения. Три ключевых компонента:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-card rounded-2xl p-8 shadow-eco-card hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${f.color} flex items-center justify-center mb-6`}>
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-card-foreground mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
