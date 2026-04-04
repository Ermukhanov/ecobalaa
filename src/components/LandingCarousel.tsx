import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Leaf, Sprout, BookOpen, Trophy, Gamepad2, Target, Camera, BarChart3, Flame, Star, Award, Map, Mail, MapPin, Phone } from "lucide-react";

interface Props {
  onEnd: () => void;
}

const slides = [
  {
    id: "hero",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center space-y-5">
        <div className="flex items-center gap-2">
          <Leaf className="w-8 h-8 text-primary" />
          <span className="text-3xl font-black">
            <span className="text-eco-forest">Eco</span><span className="text-primary">Bala</span>
          </span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-secondary-foreground">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          🇰🇿 Қазақстандық эко-стартап
        </div>
        <h1 className="text-2xl md:text-4xl font-black leading-tight text-foreground">
          Экология <span className="text-primary">ойын</span> арқылы<br />
          <span className="text-accent">Қазақстан</span> балаларына
        </h1>
        <p className="text-muted-foreground max-w-md text-sm">
          Сабақтар, квесттер, EcoGame және мектеп рейтингі — балалардың табиғатты сүюіне арналған.
        </p>
        <div className="flex gap-6 pt-2">
          {[
            { v: "Kids+Teen", l: "Екі режим" },
            { v: "1-11", l: "Барлық сынып" },
            { v: "RU+KZ", l: "Екі тіл" },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="text-lg font-black text-accent">{s.v}</div>
              <div className="text-xs text-muted-foreground font-semibold">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "about",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center space-y-5">
        <span className="text-xs font-extrabold tracking-[3px] uppercase text-primary">БІЗ ТУРАЛЫ</span>
        <h2 className="text-2xl md:text-3xl font-black text-foreground">Біз кімбіз?</h2>
        <p className="text-muted-foreground max-w-lg text-sm">
          EcoBala — Хромтаудан шыққан стартап. Балалар мен жасөспірімдерге арналған экологиялық білім беру платформасы.
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-sm w-full">
          {[
            { icon: "🎓", title: "Сабақтар", desc: "Бейне + тесттер" },
            { icon: "🗺️", title: "Квесттер", desc: "Нақты тапсырмалар" },
            { icon: "🎮", title: "Ойындар", desc: "EcoGame-викторина" },
            { icon: "🤖", title: "Чат-бот", desc: "Хомяк-көмекші" },
          ].map((c) => (
            <div key={c.title} className="bg-card rounded-xl p-4 shadow-eco border border-border text-left">
              <div className="text-2xl mb-1">{c.icon}</div>
              <div className="text-sm font-bold text-card-foreground">{c.title}</div>
              <div className="text-xs text-muted-foreground">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "kids",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full kids-gradient text-primary-foreground px-4 py-2 text-sm font-bold">
          <Gamepad2 className="w-4 h-4" /> 6–12 жас
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-foreground">
          EcoBala <span className="text-eco-kids">Kids</span>
        </h2>
        <p className="text-muted-foreground max-w-md text-sm">
          Балаларға арналған ойын платформасы. Бейне-сабақтар, тесттер, белгілер — қазақша және орысша.
        </p>
        <div className="space-y-3 max-w-sm w-full text-left">
          {[
            { icon: BookOpen, text: "Бейне-сабақтар конспектілермен" },
            { icon: Trophy, text: "Белгілер, Eco Points, деңгейлер 🌱🌿🌳" },
            { icon: Gamepad2, text: "EcoGame — нақты уақыттағы викторина" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-eco-kids/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-eco-kids" />
              </div>
              <span className="text-sm font-semibold text-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "teen",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full teen-gradient text-primary-foreground px-4 py-2 text-sm font-bold">
          <Target className="w-4 h-4" /> 13–18 жас
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-foreground">
          EcoBala <span className="text-eco-teen">Teen</span>
        </h2>
        <p className="text-muted-foreground max-w-md text-sm">
          Нақты квесттер: сенбіліктер, ағаш отырғызу, баспаналарға көмек. Фото-есептер және мектеп рейтингі.
        </p>
        <div className="space-y-3 max-w-sm w-full text-left">
          {[
            { icon: Target, text: "Нақты эко-квесттер мен челлендждер" },
            { icon: Camera, text: "Фото-есептер верификациямен" },
            { icon: BarChart3, text: "Қазақстан бойынша мектеп рейтингі" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-eco-teen/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-eco-teen" />
              </div>
              <span className="text-sm font-semibold text-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "gamification",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center space-y-5">
        <span className="text-xs font-extrabold tracking-[3px] uppercase text-primary">ECO-REWARD</span>
        <h2 className="text-2xl md:text-3xl font-black text-foreground">Геймификация</h2>
        <div className="grid grid-cols-2 gap-3 max-w-sm w-full">
          {[
            { Icon: Flame, label: "Streak", value: "Күнделікті", desc: "Бонустар жина" },
            { Icon: Star, label: "XP", value: "Тәжірибе", desc: "Аватар өсіру" },
            { Icon: Award, label: "Белгілер", value: "Коллекция", desc: "Қайта өңдеу шебері" },
            { Icon: Map, label: "Карта", value: "Қазақстан", desc: "Сенбіліктер, мектеп" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-4 shadow-eco border border-border">
              <div className="eco-gradient w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <s.Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-xs font-bold text-primary">{s.label}</div>
              <div className="text-sm font-black text-foreground">{s.value}</div>
              <div className="text-xs text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "how",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center space-y-5">
        <span className="text-xs font-extrabold tracking-[3px] uppercase text-primary">ҚАЛАЙ ЖҰМЫС ІСТЕЙДІ</span>
        <h2 className="text-2xl md:text-3xl font-black text-foreground">Үш қарапайым қадам</h2>
        <div className="space-y-4 max-w-sm w-full">
          {[
            { num: "1", icon: "📝", title: "Тіркелу", desc: "Kids немесе Teen-де 2 минутта аккаунт жаса" },
            { num: "2", icon: "🎮", title: "Оқы және ойна", desc: "Сабақтар, квесттер, EcoGame ойна" },
            { num: "3", icon: "🏆", title: "Өс және жең", desc: "Eco Points жина, белгілер ал" },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-eco border border-border text-left">
              <div className="w-12 h-12 eco-gradient rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{s.icon}</div>
              <div>
                <div className="text-xs font-extrabold text-primary uppercase">{s.num}-қадам</div>
                <div className="text-sm font-black text-foreground">{s.title}</div>
                <div className="text-xs text-muted-foreground">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "reviews",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center space-y-5">
        <span className="text-xs font-extrabold tracking-[3px] uppercase text-primary">ПІКІРЛЕР</span>
        <h2 className="text-2xl md:text-3xl font-black text-foreground">Не айтады</h2>
        <div className="space-y-3 max-w-sm w-full">
          {[
            { name: "Мұқтар С.", role: "Teen, 16 жас", text: "EcoBala — керегі сол! 8 квест, ағаш отырғыздым. Мектеп топ-3-те!" },
            { name: "Ергали Р.", role: "Teen, 15 жас", text: "Квесттер ынталандырады! Eco Points тез жиналады, 4-деңгей!" },
            { name: "Нұрмұхан А.", role: "Teen", text: "12 квест және «Эко-батыр» белгісі. EcoBala табиғатқа көзқарасты өзгертеді!" },
          ].map((r) => (
            <div key={r.name} className="bg-card rounded-xl p-4 shadow-eco border border-border text-left">
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />)}
              </div>
              <p className="text-sm text-foreground italic mb-2">«{r.text}»</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full eco-gradient flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "contacts",
    render: () => (
      <div className="flex flex-col items-center justify-center h-full px-6 text-center space-y-5">
        <span className="text-xs font-extrabold tracking-[3px] uppercase text-primary">БАЙЛАНЫС</span>
        <h2 className="text-2xl md:text-3xl font-black text-foreground">Бізбен байланысыңыз</h2>
        <div className="space-y-3 max-w-sm w-full">
          {[
            { Icon: Mail, label: "Email", value: "ecobala.kz@gmail.com" },
            { Icon: Phone, label: "Telegram", value: "@Ecobalabot" },
            { Icon: MapPin, label: "Мекенжай", value: "Хромтау, Қазақстан" },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-eco border border-border text-left">
              <div className="w-10 h-10 rounded-lg eco-gradient flex items-center justify-center flex-shrink-0">
                <c.Icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{c.label}</div>
                <div className="text-sm font-bold text-foreground">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          {[
            { href: "https://t.me/Ecobalabot", label: "Telegram" },
            { href: "https://youtube.com/@ecobalakz", label: "YouTube" },
            { href: "https://www.instagram.com/ecobala.kz", label: "Instagram" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl px-3 py-2 text-xs font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors">
              {s.label}
            </a>
          ))}
        </div>
        <div className="text-xs text-muted-foreground pt-2">
          © 2026 EcoBala • <span className="font-bold">Ermukhanov M.</span> & <span className="font-bold">Amirtay E.</span>
        </div>
      </div>
    ),
  },
];

const LandingCarousel = ({ onEnd }: Props) => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const touchStart = useRef(0);

  const go = useCallback((dir: number) => {
    const next = current + dir;
    if (next >= total) {
      onEnd();
      return;
    }
    if (next >= 0 && next < total) setCurrent(next);
  }, [current, total, onEnd]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      go(delta > 0 ? 1 : -1);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  return (
    <div
      className="h-[100dvh] w-full overflow-hidden relative bg-gradient-to-b from-[hsl(195,80%,88%)] via-[hsl(150,50%,94%)] to-background select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-500 ease-out will-change-transform"
        style={{ transform: `translateX(-${current * 100}%)`, width: `${total * 100}%` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="h-full flex-shrink-0" style={{ width: `${100 / total}%` }}>
            {slide.render()}
          </div>
        ))}
      </div>

      {/* Left arrow */}
      {current > 0 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); go(-1); }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur border border-border shadow-eco flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-30 cursor-pointer"
          aria-label="Алдыңғы"
        >
          <ChevronLeft className="w-5 h-5 pointer-events-none" />
        </button>
      )}

      {/* Right arrow */}
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); go(1); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-card/80 backdrop-blur border border-border shadow-eco flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors z-30 cursor-pointer"
        aria-label="Келесі"
      >
        <ChevronRight className="w-5 h-5 pointer-events-none" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      {/* CTA on last slide */}
      {current === total - 1 && (
        <button
          type="button"
          onClick={onEnd}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 eco-gradient text-primary-foreground px-8 py-3 rounded-full font-bold text-sm shadow-eco hover:scale-105 transition-transform z-30 cursor-pointer"
        >
          Бастау →
        </button>
      )}
    </div>
  );
};

export default LandingCarousel;
