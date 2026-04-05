import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "kz" | "ru";

const translations = {
  // Splash
  splashTagline: { kz: "Экология — ойын арқылы", ru: "Экология — через игру" },
  splashLoading: { kz: "Жүктелуде...", ru: "Загрузка..." },
  splashPlatform: { kz: "🇰🇿 Эко-платформа", ru: "🇰🇿 Эко-платформа" },

  // Language selection
  chooseLang: { kz: "Тілді таңдаңыз", ru: "Выберите язык" },
  chooseLangDesc: { kz: "Қолданба тілін таңдаңыз", ru: "Выберите язык приложения" },
  next: { kz: "Келесі", ru: "Далее" },

  // Hero
  heroTitle1: { kz: "Экология", ru: "Экология" },
  heroTitle2: { kz: "ойын", ru: "игра" },
  heroTitle3: { kz: "арқылы", ru: "через" },
  heroTitle4: { kz: "Қазақстан", ru: "Казахстан" },
  heroTitle5: { kz: "балаларына", ru: "детям" },
  heroDesc: {
    kz: "Сабақтар, квесттер, EcoGame және мектеп рейтингі — балалардың табиғатты сүюіне арналған.",
    ru: "Уроки, квесты, EcoGame и школьный рейтинг — чтобы дети полюбили природу.",
  },
  heroStat1: { kz: "Екі режим", ru: "Два режима" },
  heroStat2: { kz: "Барлық сынып", ru: "Все классы" },
  heroStat3: { kz: "Екі тіл", ru: "Два языка" },
  kazStartup: { kz: "🇰🇿 Қазақстандық эко-стартап", ru: "🇰🇿 Казахстанский эко-стартап" },

  // About
  aboutLabel: { kz: "БІЗ ТУРАЛЫ", ru: "О НАС" },
  aboutTitle: { kz: "Біз кімбіз?", ru: "Кто мы?" },
  aboutDesc: {
    kz: "EcoBala — Хромтаудан шыққан стартап. Балалар мен жасөспірімдерге арналған экологиялық білім беру платформасы.",
    ru: "EcoBala — стартап из Хромтау. Образовательная эко-платформа для детей и подростков.",
  },
  aboutLessons: { kz: "Сабақтар", ru: "Уроки" },
  aboutLessonsDesc: { kz: "Бейне + тесттер", ru: "Видео + тесты" },
  aboutQuests: { kz: "Квесттер", ru: "Квесты" },
  aboutQuestsDesc: { kz: "Нақты тапсырмалар", ru: "Реальные задания" },
  aboutGames: { kz: "Ойындар", ru: "Игры" },
  aboutGamesDesc: { kz: "EcoGame-викторина", ru: "EcoGame-викторина" },
  aboutBot: { kz: "Чат-бот", ru: "Чат-бот" },
  aboutBotDesc: { kz: "Хомяк-көмекші", ru: "Хомяк-помощник" },

  // Kids
  kidsTitle: { kz: "EcoBala Kids", ru: "EcoBala Kids" },
  kidsAge: { kz: "6–12 жас", ru: "6–12 лет" },
  kidsDesc: {
    kz: "Балаларға арналған ойын платформасы. Бейне-сабақтар, тесттер, белгілер — қазақша және орысша.",
    ru: "Игровая платформа для детей. Видео-уроки, тесты, бейджи — на казахском и русском.",
  },
  kidsF1: { kz: "Бейне-сабақтар конспектілермен", ru: "Видео-уроки с конспектами" },
  kidsF2: { kz: "Белгілер, Eco Points, деңгейлер 🌱🌿🌳", ru: "Бейджи, Eco Points, уровни 🌱🌿🌳" },
  kidsF3: { kz: "EcoGame — нақты уақыттағы викторина", ru: "EcoGame — викторина в реальном времени" },

  // Teen
  teenTitle: { kz: "EcoBala Teen", ru: "EcoBala Teen" },
  teenAge: { kz: "13–18 жас", ru: "13–18 лет" },
  teenDesc: {
    kz: "Нақты квесттер: сенбіліктер, ағаш отырғызу, баспаналарға көмек. Фото-есептер және мектеп рейтингі.",
    ru: "Реальные квесты: субботники, посадка деревьев, помощь приютам. Фото-отчёты и рейтинг школ.",
  },
  teenF1: { kz: "Нақты эко-квесттер мен челлендждер", ru: "Реальные эко-квесты и челленджи" },
  teenF2: { kz: "Фото-есептер верификациямен", ru: "Фото-отчёты с верификацией" },
  teenF3: { kz: "Қазақстан бойынша мектеп рейтингі", ru: "Рейтинг школ по Казахстану" },

  // Gamification
  gamifLabel: { kz: "ECO-REWARD", ru: "ECO-REWARD" },
  gamifTitle: { kz: "Геймификация", ru: "Геймификация" },
  gamifStreak: { kz: "Күнделікті", ru: "Ежедневно" },
  gamifStreakDesc: { kz: "Бонустар жина", ru: "Собирай бонусы" },
  gamifXP: { kz: "Тәжірибе", ru: "Опыт" },
  gamifXPDesc: { kz: "Аватар өсіру", ru: "Расти аватар" },
  gamifBadges: { kz: "Коллекция", ru: "Коллекция" },
  gamifBadgesDesc: { kz: "Қайта өңдеу шебері", ru: "Мастер переработки" },
  gamifMap: { kz: "Қазақстан", ru: "Казахстан" },
  gamifMapDesc: { kz: "Сенбіліктер, мектеп", ru: "Субботники, школы" },

  // How it works
  howLabel: { kz: "ҚАЛАЙ ЖҰМЫС ІСТЕЙДІ", ru: "КАК ЭТО РАБОТАЕТ" },
  howTitle: { kz: "Үш қарапайым қадам", ru: "Три простых шага" },
  howStep1: { kz: "Тіркелу", ru: "Регистрация" },
  howStep1Desc: { kz: "Kids немесе Teen-де 2 минутта аккаунт жаса", ru: "Создай аккаунт за 2 минуты в Kids или Teen" },
  howStep2: { kz: "Оқы және ойна", ru: "Учись и играй" },
  howStep2Desc: { kz: "Сабақтар, квесттер, EcoGame ойна", ru: "Уроки, квесты, играй в EcoGame" },
  howStep3: { kz: "Өс және жең", ru: "Расти и побеждай" },
  howStep3Desc: { kz: "Eco Points жина, белгілер ал", ru: "Собирай Eco Points, получай бейджи" },

  // Reviews
  reviewsLabel: { kz: "ПІКІРЛЕР", ru: "ОТЗЫВЫ" },
  reviewsTitle: { kz: "Не айтады", ru: "Что говорят" },

  // Contacts
  contactsLabel: { kz: "БАЙЛАНЫС", ru: "КОНТАКТЫ" },
  contactsTitle: { kz: "Бізбен байланысыңыз", ru: "Свяжитесь с нами" },
  contactEmail: { kz: "Email", ru: "Email" },
  contactTelegram: { kz: "Telegram", ru: "Telegram" },
  contactAddress: { kz: "Мекенжай", ru: "Адрес" },
  contactCity: { kz: "Хромтау, Қазақстан", ru: "Хромтау, Казахстан" },
  start: { kz: "Бастау →", ru: "Начать →" },
  prev: { kz: "Алдыңғы", ru: "Назад" },
  nextSlide: { kz: "Келесі", ru: "Далее" },

  // Role selection
  roleTitle: { kz: "Рөлді таңдаңыз", ru: "Выберите роль" },
  roleDesc: { kz: "EcoBala-да сіз кімсіз?", ru: "Кто вы в EcoBala?" },
  roleKids: { kz: "EcoBala Kids", ru: "EcoBala Kids" },
  roleKidsAge: { kz: "6–12 жас", ru: "6–12 лет" },
  roleKidsDesc: { kz: "Сабақтар, ойындар, белгілер", ru: "Уроки, игры, бейджи" },
  roleTeen: { kz: "EcoBala Teen", ru: "EcoBala Teen" },
  roleTeenAge: { kz: "13–18 жас", ru: "13–18 лет" },
  roleTeenDesc: { kz: "Квесттер, есептер, рейтинг", ru: "Квесты, отчёты, рейтинг" },
  roleTeacher: { kz: "Мұғалім", ru: "Учитель" },
  roleTeacherAge: { kz: "Мұғалім панелі", ru: "Панель учителя" },
  roleTeacherDesc: { kz: "EcoGame, бөлмелер, медальдар", ru: "EcoGame, комнаты, медали" },

  // Onboarding
  sourceTitle: { kz: "Біз туралы қайдан білдіңіз?", ru: "Откуда вы узнали о нас?" },
  awaitsTitle: { kz: "Сізді не күтеді", ru: "Что вас ждёт" },
  sourceSocial: { kz: "Әлеуметтік желілер", ru: "Соцсети" },
  sourceFriend: { kz: "Достар", ru: "Друзья" },
  sourceSchool: { kz: "Мектеп / мұғалім", ru: "Школа / учитель" },
  sourceSearch: { kz: "Интернеттен іздеу", ru: "Поиск в интернете" },
  sourceOther: { kz: "Басқа", ru: "Другое" },
  loginBtn: { kz: "Кіру / Тіркелу", ru: "Войти / Регистрация" },

  // Awaits
  awaitsKids1: { kz: "Қазақша және орысша бейне-сабақтар", ru: "Видео-уроки на казахском и русском" },
  awaitsKids2: { kz: "EcoGame — сыныппен нақты уақытта викторина", ru: "EcoGame — викторина в реальном времени" },
  awaitsKids3: { kz: "Белгілер, Eco Points және деңгейлер 🌱🌿🌳", ru: "Бейджи, Eco Points и уровни 🌱🌿🌳" },
  awaitsKids4: { kz: "Хомяк чат-бот — эко-көмекшің", ru: "Хомяк чат-бот — твой эко-помощник" },
  awaitsTeen1: { kz: "Нақты квесттер: сенбіліктер, ағаш отырғызу", ru: "Реальные квесты: субботники, посадка деревьев" },
  awaitsTeen2: { kz: "Фото-есептер және тапсырмаларды тексеру", ru: "Фото-отчёты и проверка заданий" },
  awaitsTeen3: { kz: "Қазақстан бойынша мектеп рейтингі", ru: "Рейтинг школ по Казахстану" },
  awaitsTeen4: { kz: "Streak жүйесі — күнделікті бонустар", ru: "Streak-система — ежедневные бонусы" },
  awaitsTeacher1: { kz: "EcoGame — викторинаға бөлмелер жасаңыз", ru: "EcoGame — создавайте комнаты для викторин" },
  awaitsTeacher2: { kz: "Сыныптар мен оқушыларды басқару панелі", ru: "Панель управления классами и учениками" },
  awaitsTeacher3: { kz: "Автоматты есептеу, медальдар, подиум", ru: "Автоматический подсчёт, медали, подиум" },
  awaitsTeacher4: { kz: "Интерактивті тақтада / проекторда ойын", ru: "Игра на интерактивной доске / проекторе" },
} as const;

type TranslationKey = keyof typeof translations;

interface I18nContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType>({
  lang: "kz",
  setLang: () => {},
  t: (key) => translations[key]?.kz || key,
});

export const useI18n = () => useContext(I18nContext);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Lang>("kz");
  const t = (key: TranslationKey) => translations[key]?.[lang] || key;
  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
};
