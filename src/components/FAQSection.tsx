const faqData = [
  { q: "Что такое EcoBala?", a: "EcoBala — платформа экологического образования для школьников Казахстана. Дети учатся, выполняют квесты и играют в экологические игры." },
  { q: "Для какого возраста платформа?", a: "Режим Kids — для детей 6-12 лет. Режим Teen — для подростков 13-17 лет. У каждого режима свой интерфейс и функции." },
  { q: "Как зарегистрироваться?", a: "Нажмите «Начать бесплатно», введите email и пароль, выберите режим (Kids или Teen). Регистрация бесплатная." },
  { q: "Что такое Eco Points?", a: "Eco Points — баллы за активность: уроки, квесты, игры. Чем больше баллов, тем выше уровень: 🌱 → 🌿 → 🌳." },
  { q: "Как работает EcoGame?", a: "Учитель создаёт игровую комнату и получает код. Ученики вводят код и участвуют в викторине в реальном времени." },
  { q: "Что такое живая эко-карта?", a: "На карте отображаются места выполненных квестов — где убрали мусор, посадили деревья. Каждое действие добавляет зелёную точку." },
];

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-xs font-extrabold tracking-[3px] uppercase text-primary">FAQ</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground text-center mb-16">
          Часто задаваемые вопросы
        </h2>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqData.map((item, i) => (
            <div key={i} className="bg-card rounded-2xl border border-border shadow-eco overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-bold text-card-foreground pr-4">{item.q}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openIndex === i ? "rotate-180" : ""}`} />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
