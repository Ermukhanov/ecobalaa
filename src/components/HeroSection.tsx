import heroImg from "@/assets/hero-eco.png";
import { Leaf, Sprout } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Sky-to-green gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(195,80%,88%)] via-[hsl(150,50%,94%)] to-background" />

      {/* Floating particles */}
      <div className="absolute top-20 left-[5%] text-2xl animate-bounce opacity-40" style={{ animationDuration: "6s" }}>🍃</div>
      <div className="absolute top-[35%] left-[30%] text-xl animate-bounce opacity-30" style={{ animationDuration: "8s", animationDelay: "2s" }}>🌿</div>
      <div className="absolute top-[15%] right-[20%] text-lg animate-bounce opacity-25" style={{ animationDuration: "7s", animationDelay: "1s" }}>🦋</div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-5">
          {/* Tagline */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-black text-2xl md:text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EcoBala
            </span>
            <span className="text-muted-foreground/40 text-xl">|</span>
            <span className="text-sm md:text-base font-bold text-accent italic">
              экологиялық білім беру
            </span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground backdrop-blur-sm">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            🇰🇿 Экологический обучающий стартап
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] text-foreground">
            Экология через{" "}
            <span className="text-primary">игру</span>
            <br />
            для детей{" "}
            <span className="text-accent">Казахстана</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            Уроки, квесты, EcoGame и рейтинг школ — всё для того, чтобы дети и подростки полюбили заботу о природе.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#features"
              className="inline-flex items-center gap-2 eco-gradient text-primary-foreground px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-eco"
            >
              <Sprout className="w-5 h-5" />
              Начать бесплатно
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Узнать больше
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            <div>
              <div className="text-xl font-black text-accent">Kids+Teen</div>
              <div className="text-xs text-muted-foreground font-semibold">Две стороны платформы</div>
            </div>
            <div>
              <div className="text-xl font-black text-accent">1-11</div>
              <div className="text-xs text-muted-foreground font-semibold">Все классы</div>
            </div>
            <div>
              <div className="text-xl font-black text-accent">RU+KZ</div>
              <div className="text-xs text-muted-foreground font-semibold">Два языка</div>
            </div>
          </div>
        </div>

        {/* Hero card */}
        <div className="flex justify-center relative">
          <div className="absolute -top-4 -left-4 bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm font-bold shadow-eco-card animate-bounce z-10" style={{ animationDuration: "3s" }}>
            🌱 +25 Eco Points
          </div>
          <div className="bg-card/95 backdrop-blur-sm rounded-3xl p-7 shadow-eco-card border border-border max-w-sm w-full relative">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-primary/20 flex items-center justify-center text-2xl">🐣</div>
              <div>
                <div className="font-extrabold text-card-foreground">Алия К.</div>
                <div className="text-xs text-muted-foreground">Kids • 4 класс</div>
              </div>
              <div className="ml-auto bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full">🌿 Ур. 5</div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Прогресс уровня</span>
              <span>720 / 1000</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
              <div className="h-full eco-gradient rounded-full" style={{ width: "72%" }} />
            </div>
            <div className="flex gap-2 mb-4">
              {["🏆 Эко-герой", "🌳 Садовод", "♻️ Чистота"].map((b) => (
                <span key={b} className="bg-secondary text-xs font-bold text-secondary-foreground px-3 py-1.5 rounded-full">{b}</span>
              ))}
            </div>
            <div className="flex items-center gap-3 bg-muted rounded-xl p-3">
              <span className="text-2xl">🗺️</span>
              <div>
                <div className="text-sm font-bold text-card-foreground">Посади дерево</div>
                <div className="text-xs text-primary font-bold">+50 Eco Points</div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-secondary text-secondary-foreground rounded-full px-4 py-2 text-sm font-bold shadow-eco-card animate-bounce z-10" style={{ animationDuration: "4s", animationDelay: "1s" }}>
            🏫 Школа #7 — #1 рейтинг
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
