import { Star } from "lucide-react";

const reviews = [
  {
    name: "Айгерим Т.",
    role: "Учитель биологии, Алматы",
    text: "EcoBala изменила подход моих учеников к экологии. Дети с удовольствием выполняют задания и соревнуются за бейджи!",
    rating: 5,
  },
  {
    name: "Дамир К.",
    role: "Ученик, 14 лет",
    text: "Круто, что за реальные дела — субботники и переработку — можно получать XP. Мы с друзьями уже на 5 уровне!",
    rating: 5,
  },
  {
    name: "Марина С.",
    role: "Родитель",
    text: "Наконец-то приложение, которое учит детей ответственности перед природой, а не просто развлекает. Рекомендую!",
    rating: 5,
  },
];

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-foreground">
            Отзывы
          </h2>
          <p className="text-lg text-muted-foreground">Что говорят пользователи EcoBala</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <div key={r.name} className="bg-card rounded-2xl p-8 shadow-eco-card border border-border">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 italic">"{r.text}"</p>
              <div>
                <p className="font-bold text-foreground">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
