import { Star } from "lucide-react";

const reviews = [
  {
    name: "Мұқтар Сайлау",
    initials: "МС",
    role: "Teen, 16 лет, Хромтау",
    text: "EcoBala — это то, чего не хватало! Выполнил уже 8 квестов, посадил деревья. Наша школа в топ-3!",
    rating: 5,
  },
  {
    name: "Ергали Рустембек",
    initials: "ЕР",
    role: "Teen, 15 лет, Хромтау",
    text: "Квесты реально мотивируют! Eco Points копятся быстро, уже на 4-м уровне.",
    rating: 5,
  },
  {
    name: "Нурмухан Алихан",
    initials: "НА",
    role: "Teen, EcoBala Kids выпускник",
    text: "12 выполненных квестов и значок «Эко-герой». EcoBala меняет отношение к природе!",
    rating: 5,
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-xs font-extrabold tracking-[3px] uppercase text-primary">ОТЗЫВЫ</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground text-center mb-16">
          Что говорят пользователи
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div key={r.name} className="bg-card rounded-2xl p-8 shadow-eco-card border border-border">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 italic">«{r.text}»</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full eco-gradient flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {r.initials}
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
