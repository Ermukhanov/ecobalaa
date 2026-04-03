import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="py-8 bg-eco-forest text-primary-foreground">
    <div className="container mx-auto px-4">
      <div className="grid sm:grid-cols-3 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 font-black text-lg mb-2">
            <Leaf className="w-5 h-5" />
            EcoBala
          </div>
          <p className="text-sm text-primary-foreground/70">
            Экологическое образование для детей Казахстана. Начинаем с Хромтау.
          </p>
          <div className="flex gap-3 mt-3">
            {[
              { href: "https://t.me/Ecobalabot", label: "TG" },
              { href: "https://youtube.com/@ecobalakz", label: "YT" },
              { href: "https://www.instagram.com/ecobala.kz", label: "IG" },
            ].map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center text-xs font-bold hover:bg-primary-foreground/20 transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-extrabold text-sm mb-3">Платформа</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <a href="#about" className="block hover:text-primary-foreground transition-colors">Кто мы</a>
            <a href="#features" className="block hover:text-primary-foreground transition-colors">Возможности</a>
            <a href="#teacher" className="block hover:text-primary-foreground transition-colors">Учителям</a>
            <a href="#faq" className="block hover:text-primary-foreground transition-colors">FAQ</a>
          </div>
        </div>
        <div>
          <h4 className="font-extrabold text-sm mb-3">Войти</h4>
          <div className="space-y-2 text-sm text-primary-foreground/70">
            <a href="#" className="block hover:text-primary-foreground transition-colors">Kids — вход</a>
            <a href="#" className="block hover:text-primary-foreground transition-colors">Teen — вход</a>
            <a href="#" className="block hover:text-primary-foreground transition-colors">Учительская</a>
            <a href="#contact" className="block hover:text-primary-foreground transition-colors">Контакты</a>
          </div>
        </div>
      </div>
      <hr className="border-primary-foreground/15 mb-4" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-primary-foreground/50">
        <span>© 2026 EcoBala. Хромтау, Казахстан.</span>
        <span>Made by <span className="font-bold text-primary-foreground/70">Ermukhanov M.</span> & <span className="font-bold text-primary-foreground/70">Amirtay E.</span></span>
      </div>
    </div>
  </footer>
);

export default Footer;
