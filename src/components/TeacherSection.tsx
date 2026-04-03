const TeacherSection = () => {
  const cards = [
    { title: "EcoGame на уроке", desc: "Создайте комнату, получите код — дети заходят по коду со своих устройств." },
    { title: "Игра на школьной доске", desc: "Запустите на проекторе или интерактивной доске." },
    { title: "Рейтинг и медали", desc: "После каждой игры — автоматический подсчёт, подиум победителей и значки." },
    { title: "Kids & Teen — для всех возрастов", desc: "Уроки для 6-12 лет (Kids) и квесты для 13-17 лет (Teen)." },
  ];

  return (
    <section id="teacher" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <span className="text-xs font-extrabold tracking-[3px] uppercase text-eco-sky">ДЛЯ УЧИТЕЛЕЙ</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-foreground text-center mb-4">
          Учительская панель
        </h2>
        <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16">
          Создавайте игровые комнаты, проводите EcoGame-викторины прямо на уроке.
        </p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((c) => (
              <div key={c.title} className="bg-card rounded-2xl p-6 shadow-eco-card border border-border hover:-translate-y-1 transition-all">
                <h3 className="font-bold text-card-foreground mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.desc}</p>
              </div>
            ))}
          </div>

          {/* Login box */}
          <div className="bg-card rounded-3xl p-8 shadow-eco-card border border-border">
            <h3 className="text-xl font-black text-card-foreground mb-3">Вход в учительскую</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Доступ только для зарегистрированных учителей. Логин и пароль выдаёт Telegram-бот.
            </p>
            <div className="bg-eco-sky/5 border border-eco-sky/20 rounded-xl p-4 text-sm text-eco-sky font-semibold leading-relaxed mb-6">
              1. Откройте @Ecobalabot в Telegram<br/>
              2. Напишите /teacher<br/>
              3. Бот пришлёт логин и пароль<br/>
              4. Войдите в учительскую
            </div>
            <a
              href="https://t.me/Ecobalabot"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 eco-gradient text-primary-foreground px-6 py-3 rounded-full font-bold text-sm transition-transform hover:scale-105 shadow-eco"
            >
              Открыть @Ecobalabot →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeacherSection;
