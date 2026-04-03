import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 font-black text-foreground">
        <Leaf className="w-5 h-5 text-primary" />
        EcoBala
      </div>
      <p className="text-sm text-muted-foreground">
        © 2025 EcoBala. Все права защищены. 🇰🇿
      </p>
    </div>
  </footer>
);

export default Footer;
