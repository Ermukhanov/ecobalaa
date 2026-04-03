import { Mail, MapPin, Phone, Instagram, Send } from "lucide-react";

const ContactsSection = () => {
  return (
    <section id="contacts" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-foreground">Контакты</h2>
          <p className="text-lg text-muted-foreground">Свяжитесь с нами для сотрудничества</p>
        </div>

        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          {[
            { icon: Mail, label: "Email", value: "info@ecobala.kz" },
            { icon: Phone, label: "Телефон", value: "+7 (700) 123-45-67" },
            { icon: MapPin, label: "Адрес", value: "Казахстан, г. Алматы" },
            { icon: Instagram, label: "Instagram", value: "@ecobala.kz" },
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
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
