import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Trophy, Gamepad2, Target, Camera, BarChart3, Flame, Star, Award, Map, Mail, MapPin, Phone } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logoMain from "@/assets/logo-main.jpg";
import logoKids from "@/assets/logo-kids.jpg";
import logoTeen from "@/assets/logo-teen.jpg";

interface Props {
  onEnd: () => void;
}

const LandingCarousel = ({ onEnd }: Props) => {
  const { t } = useI18n();
  const [current, setCurrent] = useState(0);
  const touchStart = useRef(0);
  const [animKey, setAnimKey] = useState(0);

  const slides = [
    // Hero
    () => (
      <div className="flex flex-col items-center justify-center h-full px-5 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg border-2 border-primary/20">
          <img src={logoMain} alt="EcoBala" className="w-full h-full object-cover" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-xs font-bold text-primary">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          {t("kazStartup")}
        </div>
        <h1 className="text-xl md:text-3xl font-black leading-tight text-foreground">
          {t("heroTitle1")} <span className="text-primary">{t("heroTitle2")}</span> {t("heroTitle3")}<br />
          <span className="text-accent">{t("heroTitle4")}</span> {t("heroTitle5")}
        </h1>
        <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">{t("heroDesc")}</p>
        <div className="flex gap-4 pt-1">
          {[
            { v: "Kids+Teen", l: t("heroStat1") },
            { v: "1-11", l: t("heroStat2") },
            { v: "RU+KZ", l: t("heroStat3") },
          ].map((s) => (
            <div key={s.v} className="text-center bg-card rounded-xl px-3 py-2 shadow-eco border border-border">
              <div className="text-sm font-black text-primary">{s.v}</div>
              <div className="text-[9px] text-muted-foreground font-semibold">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    // About
    () => (
      <div className="flex flex-col items-center justify-center h-full px-5 text-center space-y-4">
        <span className="text-[10px] font-extrabold tracking-[3px] uppercase text-primary/70">{t("aboutLabel")}</span>
        <h2 className="text-xl md:text-2xl font-black text-foreground">{t("aboutTitle")}</h2>
        <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">{t("aboutDesc")}</p>
        <div className="grid grid-cols-2 gap-2 max-w-xs w-full">
          {[
            { icon: "🎓", title: t("aboutLessons"), desc: t("aboutLessonsDesc"), color: "from-primary/10 to-accent/5" },
            { icon: "🗺️", title: t("aboutQuests"), desc: t("aboutQuestsDesc"), color: "from-eco-teen/10 to-primary/5" },
            { icon: "🎮", title: t("aboutGames"), desc: t("aboutGamesDesc"), color: "from-eco-kids/10 to-eco-sky/5" },
            { icon: "🤖", title: t("aboutBot"), desc: t("aboutBotDesc"), color: "from-accent/10 to-eco-mint/10" },
          ].map((c) => (
            <div key={c.title} className={`bg-gradient-to-br ${c.color} rounded-xl p-3 border border-border/50 hover:shadow-eco transition-shadow`}>
              <div className="text-xl mb-1.5">{c.icon}</div>
              <div className="text-xs font-bold text-card-foreground">{c.title}</div>
              <div className="text-[10px] text-muted-foreground leading-tight">{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    // Kids
    () => (
      <div className="flex flex-col items-center justify-center h-full px-5 text-center space-y-4">
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-3 border-eco-kids/30">
          <img src={logoKids} alt="EcoBala Kids" className="w-full h-full object-cover" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full kids-gradient text-primary-foreground px-3 py-1.5 text-xs font-bold shadow-md">
          <Gamepad2 className="w-3.5 h-3.5" /> {t("kidsAge")}
        </div>
        <h2 className="text-xl md:text-2xl font-black text-foreground">
          EcoBala <span className="text-eco-kids">Kids</span>
        </h2>
        <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">{t("kidsDesc")}</p>
        <div className="space-y-2 max-w-xs w-full text-left">
          {[
            { icon: BookOpen, text: t("kidsF1") },
            { icon: Trophy, text: t("kidsF2") },
            { icon: Gamepad2, text: t("kidsF3") },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 bg-eco-kids/5 rounded-xl p-3 border border-eco-kids/15">
              <div className="w-8 h-8 rounded-lg bg-eco-kids/15 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-eco-kids" />
              </div>
              <span className="text-xs font-semibold text-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    // Teen
    () => (
      <div className="flex flex-col items-center justify-center h-full px-5 text-center space-y-4">
        <div className="w-20 h-20 rounded-full overflow-hidden shadow-lg border-3 border-eco-teen/30">
          <img src={logoTeen} alt="EcoBala Teen" className="w-full h-full object-cover" />
        </div>
        <div className="inline-flex items-center gap-2 rounded-full teen-gradient text-primary-foreground px-3 py-1.5 text-xs font-bold shadow-md">
          <Target className="w-3.5 h-3.5" /> {t("teenAge")}
        </div>
        <h2 className="text-xl md:text-2xl font-black text-foreground">
          EcoBala <span className="text-eco-teen">Teen</span>
        </h2>
        <p className="text-muted-foreground max-w-sm text-xs leading-relaxed">{t("teenDesc")}</p>
        <div className="space-y-2 max-w-xs w-full text-left">
          {[
            { icon: Target, text: t("teenF1") },
            { icon: Camera, text: t("teenF2") },
            { icon: BarChart3, text: t("teenF3") },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 bg-eco-teen/5 rounded-xl p-3 border border-eco-teen/15">
              <div className="w-8 h-8 rounded-lg bg-eco-teen/15 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-4 h-4 text-eco-teen" />
              </div>
              <span className="text-xs font-semibold text-foreground">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    // Gamification
    () => (
      <div className="flex flex-col items-center justify-center h-full px-5 text-center space-y-4">
        <span className="text-[10px] font-extrabold tracking-[3px] uppercase text-primary/70">{t("gamifLabel")}</span>
        <h2 className="text-xl md:text-2xl font-black text-foreground">{t("gamifTitle")}</h2>
        <div className="grid grid-cols-2 gap-2 max-w-xs w-full">
          {[
            { Icon: Flame, label: "Streak", value: t("gamifStreak"), desc: t("gamifStreakDesc"), grad: "from-orange-400 to-red-400" },
            { Icon: Star, label: "XP", value: t("gamifXP"), desc: t("gamifXPDesc"), grad: "from-yellow-400 to-amber-500" },
            { Icon: Award, label: "Badges", value: t("gamifBadges"), desc: t("gamifBadgesDesc"), grad: "from-primary to-accent" },
            { Icon: Map, label: "Map", value: t("gamifMap"), desc: t("gamifMapDesc"), grad: "from-eco-kids to-eco-sky" },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl p-3 shadow-eco border border-border hover:scale-[1.02] transition-transform">
              <div className={`bg-gradient-to-br ${s.grad} w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-1.5 shadow-sm`}>
                <s.Icon className="w-4 h-4 text-white" />
              </div>
              <div className="text-[10px] font-bold text-primary">{s.label}</div>
              <div className="text-xs font-black text-foreground">{s.value}</div>
              <div className="text-[9px] text-muted-foreground">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    // How it works
    () => (
      <div className="flex flex-col items-center justify-center h-full px-5 text-center space-y-4">
        <span className="text-[10px] font-extrabold tracking-[3px] uppercase text-primary/70">{t("howLabel")}</span>
        <h2 className="text-xl md:text-2xl font-black text-foreground">{t("howTitle")}</h2>
        <div className="space-y-2.5 max-w-xs w-full">
          {[
            { num: "1", icon: "📝", title: t("howStep1"), desc: t("howStep1Desc"), accent: "border-l-primary" },
            { num: "2", icon: "🎮", title: t("howStep2"), desc: t("howStep2Desc"), accent: "border-l-eco-kids" },
            { num: "3", icon: "🏆", title: t("howStep3"), desc: t("howStep3Desc"), accent: "border-l-accent" },
          ].map((s) => (
            <div key={s.num} className={`flex items-center gap-3 bg-card rounded-xl p-3 shadow-eco border border-border border-l-4 ${s.accent} text-left`}>
              <div className="w-10 h-10 eco-gradient rounded-xl flex items-center justify-center text-lg flex-shrink-0 shadow-sm">{s.icon}</div>
              <div>
                <div className="text-[9px] font-extrabold text-primary uppercase">{s.num}-қадам</div>
                <div className="text-xs font-black text-foreground">{s.title}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    // Reviews
    () => (
      <div className="flex flex-col items-center justify-center h-full px-5 text-center space-y-4">
        <span className="text-[10px] font-extrabold tracking-[3px] uppercase text-primary/70">{t("reviewsLabel")}</span>
        <h2 className="text-xl md:text-2xl font-black text-foreground">{t("reviewsTitle")}</h2>
        <div className="space-y-2 max-w-xs w-full">
          {[
            { name: "Мұқтар С.", role: "Teen, 16", text: "EcoBala — керегі сол! 8 квест, ағаш отырғыздым." },
            { name: "Ергали Р.", role: "Teen, 15", text: "Квесттер ынталандырады! Eco Points тез жиналады." },
            { name: "Нұрмұхан А.", role: "Teen", text: "12 квест және «Эко-батыр» белгісі!" },
          ].map((r) => (
            <div key={r.name} className="bg-card rounded-xl p-3 shadow-eco border border-border text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full" />
              <div className="flex gap-0.5 mb-1.5">
                {[1,2,3,4,5].map((i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
              </div>
              <p className="text-xs text-foreground italic mb-2 relative z-10">«{r.text}»</p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full eco-gradient flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-sm">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-[10px] font-bold text-foreground">{r.name}</div>
                  <div className="text-[9px] text-muted-foreground">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    // Contacts
    () => (
      <div className="flex flex-col items-center justify-center h-full px-5 text-center space-y-4">
        <span className="text-[10px] font-extrabold tracking-[3px] uppercase text-primary/70">{t("contactsLabel")}</span>
        <h2 className="text-xl md:text-2xl font-black text-foreground">{t("contactsTitle")}</h2>
        <div className="space-y-2 max-w-xs w-full">
          {[
            { Icon: Mail, label: t("contactEmail"), value: "ecobala.kz@gmail.com" },
            { Icon: Phone, label: t("contactTelegram"), value: "@Ecobalabot" },
            { Icon: MapPin, label: t("contactAddress"), value: t("contactCity") },
          ].map((c) => (
            <div key={c.label} className="flex items-center gap-3 bg-card rounded-xl p-3 shadow-eco border border-border text-left hover:border-primary/30 transition-colors">
              <div className="w-9 h-9 rounded-lg eco-gradient flex items-center justify-center flex-shrink-0 shadow-sm">
                <c.Icon className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-[9px] text-muted-foreground uppercase tracking-wider">{c.label}</div>
                <div className="text-xs font-bold text-foreground">{c.value}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          {[
            { href: "https://t.me/Ecobalabot", label: "Telegram", emoji: "💬" },
            { href: "https://youtube.com/@ecobalakz", label: "YouTube", emoji: "▶️" },
            { href: "https://www.instagram.com/ecobala.kz", label: "Instagram", emoji: "📸" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
              className="bg-card border border-border rounded-xl px-3 py-1.5 text-[10px] font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 flex items-center gap-1">
              <span>{s.emoji}</span> {s.label}
            </a>
          ))}
        </div>
        <div className="text-[9px] text-muted-foreground pt-1">
          © 2026 EcoBala • <span className="font-bold">Ermukhanov M.</span> & <span className="font-bold">Amirtay E.</span>
        </div>
      </div>
    ),
  ];

  const total = slides.length;

  const go = useCallback((dir: number) => {
    setCurrent((prev) => {
      const next = prev + dir;
      if (next >= total) { onEnd(); return prev; }
      if (next < 0) return prev;
      setAnimKey((k) => k + 1);
      return next;
    });
  }, [total, onEnd]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) go(delta > 0 ? 1 : -1);
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
      className="h-[100dvh] w-full overflow-hidden relative bg-gradient-to-b from-[hsl(150,50%,95%)] via-background to-background select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div key={animKey} className="h-full w-full animate-fade-in">
        {slides[current]()}
      </div>

      {current > 0 && (
        <button type="button" onClick={() => go(-1)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/90 backdrop-blur border border-border shadow-eco flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all z-30"
          aria-label={t("prev")}>
          <ChevronLeft className="w-4 h-4 pointer-events-none" />
        </button>
      )}

      <button type="button" onClick={() => go(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/90 backdrop-blur border border-border shadow-eco flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all z-30"
        aria-label={t("nextSlide")}>
        <ChevronRight className="w-4 h-4 pointer-events-none" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
        {slides.map((_, i) => (
          <button type="button" key={i} onClick={() => { setCurrent(i); setAnimKey((k) => k + 1); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "bg-primary w-5" : "bg-muted-foreground/25 w-1.5"}`} />
        ))}
      </div>

      {current === total - 1 && (
        <button type="button" onClick={onEnd}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 eco-gradient text-primary-foreground px-6 py-2.5 rounded-full font-bold text-sm shadow-eco hover:scale-105 transition-transform z-30">
          {t("start")}
        </button>
      )}
    </div>
  );
};

export default LandingCarousel;
