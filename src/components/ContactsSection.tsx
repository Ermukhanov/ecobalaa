import { Mail, MapPin, Phone } from "lucide-react";

const ContactsSection = () => {
  return (
    <section id="contact" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-xs font-extrabold tracking-[3px] uppercase text-primary">КОНТАКТЫ</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground text-center mb-16">
          Свяжитесь с нами
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact info */}
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "ecobala.kz@gmail.com" },
              { icon: Phone, label: "Telegram-бот", value: "@Ecobalabot" },
              { icon: MapPin, label: "Адрес", value: "Хромтау, Казахстан" },
            ].map((c) => (
              <div key={c.label} className="flex items-center gap-4 bg-card rounded-xl p-5 shadow-eco-card border border-border">
                <div className="w-12 h-12 rounded-xl eco-gradient flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{c.label}</p>
                  <p className="font-bold text-foreground">{c.value}</p>
                </div>
              </div>
            ))}

            {/* Social */}
            <div className="pt-2">
              <p className="text-sm font-extrabold text-foreground mb-3">Мы в соцсетях:</p>
              <div className="flex gap-3">
                {[
                  { href: "https://t.me/Ecobalabot", label: "Telegram" },
                  { href: "https://youtube.com/@ecobalakz", label: "YouTube" },
                  { href: "https://www.instagram.com/ecobala.kz", label: "Instagram" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-card border border-border rounded-xl px-4 py-2 text-sm font-bold text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-eco"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Made by */}
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-2">Создано командой</p>
              <div className="flex gap-2">
                <span className="bg-secondary text-secondary-foreground text-sm font-bold px-3 py-1.5 rounded-full">👨‍💻 Ermukhanov M.</span>
                <span className="bg-secondary text-secondary-foreground text-sm font-bold px-3 py-1.5 rounded-full">👨‍💻 Amirtay E.</span>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-eco-card border border-border h-80 lg:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12134.435739800409!2d58.43433668648167!3d50.25550171417464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2skz!4v1773414341819!5m2!1sru!2skz"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
              title="Карта Хромтау"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
