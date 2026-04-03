import { useState } from "react";
import { Leaf, Menu, X } from "lucide-react";

const links = [
  { label: "О проекте", href: "#about" },
  { label: "Возможности", href: "#features" },
  { label: "Платформы", href: "#platforms" },
  { label: "Учителям", href: "#teacher" },
  { label: "Отзывы", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/96 backdrop-blur-md border-b border-primary/15 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-black text-lg text-eco-forest no-underline">
          <Leaf className="w-5 h-5 text-primary" />
          <span className="text-eco-forest">Eco</span><span className="text-primary">Bala</span>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-primary font-bold transition-colors text-sm">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a href="#features" className="eco-gradient text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold transition-transform hover:scale-105 shadow-eco no-underline">
            Начать бесплатно
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-b border-border px-4 pb-4 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-muted-foreground hover:text-primary font-bold transition-colors border-b border-border/50 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a href="#features" className="block eco-gradient text-primary-foreground text-center rounded-full py-3 font-bold mt-2 no-underline">
            Начать бесплатно
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
