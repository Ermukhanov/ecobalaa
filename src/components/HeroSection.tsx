import heroImg from "@/assets/hero-eco.png";
import { Leaf, TreePine, Sprout } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 eco-gradient opacity-5" />
      <div className="absolute top-20 left-10 animate-bounce opacity-20">
        <Leaf className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute bottom-32 right-20 animate-bounce opacity-15" style={{ animationDelay: "1s" }}>
        <TreePine className="w-20 h-20 text-primary" />
      </div>
      <div className="absolute top-40 right-40 animate-bounce opacity-10" style={{ animationDelay: "0.5s" }}>
        <Sprout className="w-12 h-12 text-accent" />
      </div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
            <Leaf className="w-4 h-4" />
            🇰🇿 Образовательный эко-стартап
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-foreground">
            Eco<span className="text-primary">Bala</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg">
            Превращаем заботу о природе в увлекательную игру для детей и подростков Казахстана
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#platforms"
              className="inline-flex items-center gap-2 eco-gradient text-primary-foreground px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-eco"
            >
              <Sprout className="w-5 h-5" />
              Начать путь
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 border-2 border-primary text-primary px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Узнать больше
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={heroImg}
            alt="EcoBala — дети заботятся о планете"
            width={1024}
            height={768}
            className="w-full max-w-lg drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
