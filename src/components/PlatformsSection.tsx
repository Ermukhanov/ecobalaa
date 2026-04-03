import kidsImg from "@/assets/kids-platform.png";
import teenImg from "@/assets/teen-platform.png";
import { BookOpen, Trophy, Gamepad2, Target, Camera, BarChart3 } from "lucide-react";

const PlatformsSection = () => {
  return (
    <section id="platforms" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4 space-y-24">
        {/* Kids */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src={kidsImg} alt="EcoBala Kids" loading="lazy" width={800} height={600} className="w-full max-w-md mx-auto drop-shadow-xl" />
          </div>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full kids-gradient text-primary-foreground px-4 py-2 text-sm font-bold">
              <Gamepad2 className="w-4 h-4" /> 6–12 лет
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-foreground">
              EcoBala <span className="text-eco-kids">Kids</span>
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Игровая платформа для детей. Интерактивные уроки с видео, тесты из 10 вопросов,
              значки и рейтинг — всё на русском и казахском языках.
            </p>
            <ul className="space-y-3">
              {[
                { icon: BookOpen, text: "Видео-уроки с конспектами и тестами" },
                { icon: Trophy, text: "Бейджи, Eco Points и уровни 🌱🌿🌳" },
                { icon: Gamepad2, text: "EcoGame — викторина в реальном времени" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-eco-kids/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-eco-kids" />
                  </div>
                  <span className="text-sm font-semibold">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Teen */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full teen-gradient text-primary-foreground px-4 py-2 text-sm font-bold">
              <Target className="w-4 h-4" /> 13–18 лет
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-foreground">
              EcoBala <span className="text-eco-teen">Teen</span>
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Реальные квесты для подростков: субботники, посадка деревьев, помощь приютам.
              Фото-отчёты, рейтинг школ и живая эко-карта добрых дел.
            </p>
            <ul className="space-y-3">
              {[
                { icon: Target, text: "Реальные эко-квесты и челленджи" },
                { icon: Camera, text: "Фото-отчёты с верификацией" },
                { icon: BarChart3, text: "Рейтинг школ по всему Казахстану" },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 rounded-lg bg-eco-teen/10 flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-eco-teen" />
                  </div>
                  <span className="text-sm font-semibold">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <img src={teenImg} alt="EcoBala Teen" loading="lazy" width={800} height={600} className="w-full max-w-md mx-auto drop-shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformsSection;
