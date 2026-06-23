import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "ru" | "en";

const STORAGE_KEY = "ielts.lang";

const dict = {
  ru: {
    appName: "IELTS Lab",
    tagline: "Подготовка к IELTS с AI-оценкой Writing и Speaking",
    heroSub:
      "Сдавайте пробные задания, получайте мгновенную оценку по 4 официальным критериям IELTS и развёрнутый фидбек.",
    start: "Начать тренировку",
    writing: "Writing",
    writingAi: "Writing AI",
    speaking: "Speaking",
    reading: "Reading",
    listening: "Listening",
    tasks: "Банк заданий",
    home: "Главная",
    readingTitle: "AI-проверка Reading",
    readingSub: "AI создаёт академический текст и 5 вопросов. Отвечайте — узнайте свой результат.",
    listeningTitle: "AI-проверка Listening",
    listeningSub: "AI генерирует короткую аудиозапись и вопросы. Прослушайте и ответьте.",
    generate: "Сгенерировать задание",
    generating: "AI готовит задание…",
    playAudio: "Прослушать",
    pauseAudio: "Пауза",
    checkAnswers: "Проверить ответы",
    yourScore: "Ваш результат",
    correct: "Верно",
    incorrect: "Неверно",
    explanation: "Объяснение",
    topic: "Тема",
    f4Title: "Reading с AI",
    f4Body: "Новый академический текст и вопросы по нему — каждый раз свежие.",
    f5Title: "Listening с AI",
    f5Body: "AI генерирует короткое аудио и вопросы — тренируйте восприятие на слух.",
    writingTitle: "AI-проверка Writing",
    writingSub:
      "Напишите эссе по реальному заданию IELTS и получите band score по 4 критериям с подробным разбором.",
    speakingTitle: "AI-проверка Speaking",
    speakingSub:
      "Запишите ответ голосом. AI расшифрует речь и оценит её как настоящий экзаменатор.",
    selectTask: "Выберите задание",
    yourAnswer: "Ваш ответ",
    wordCount: "Слов",
    submit: "Проверить",
    submitting: "AI анализирует…",
    overallBand: "Overall Band",
    feedback: "Фидбек",
    suggestions: "Что улучшить",
    improvedVersion: "Улучшенная версия",
    record: "Начать запись",
    stop: "Остановить",
    listenQuestion: "Прослушать вопрос",
    transcription: "Транскрипция",
    listenBack: "Прослушать запись",
    criteria: {
      tr: "Task Response",
      cc: "Coherence & Cohesion",
      lr: "Lexical Resource",
      gra: "Grammar Range & Accuracy",
      fc: "Fluency & Coherence",
      pron: "Pronunciation",
    },
    tasksTitle: "Банк заданий IELTS",
    tasksSub: "Реальные форматы Writing Task 1 / Task 2 и Speaking Parts 1–3.",
    practiceWriting: "Тренировать Writing",
    practiceSpeaking: "Тренировать Speaking",
    practiceReading: "Тренировать Reading",
    practiceListening: "Тренировать Listening",
    practiceWritingAI: "Writing с AI",
    minWords: "минимум слов",
    error: "Ошибка",
    placeholder: "Начните печатать ваш ответ здесь…",
    needMicrophone: "Необходим доступ к микрофону",
    recording: "Идёт запись",
    builtWith: "Powered by Lovable AI",
    imageGenError: "Ошибка генерации изображения",
    featuresTitle: "Что внутри",
    f1Title: "Точная оценка Writing",
    f1Body: "Получите band score, как от настоящего экзаменатора — Task Response, Coherence, Lexis, Grammar.",
    f6Title: "Writing с AI",
    f6Body: "AI генерирует задания по вашей теме и проверяет их с подробным разбором.",
    f2Title: "Speaking с записью голоса",
    f2Body: "Запишите ответ, AI расшифрует речь и оценит беглость, словарь, грамматику и произношение.",
    f3Title: "Реальные задания",
    f3Body: "Промпты в формате актуальных экзаменов: Task 1, Task 2 и три части Speaking.",
    cambridgeTests: "Тесты Cambridge",
    cambridgeSub: "Практикуйте реальные тесты Cambridge IELTS 10–20 с AI-оценкой.",
    book: "Книга",
    test: "Тест",
    startSection: "Начать раздел",
    cambridgeTitle: "Подготовка по книгам Cambridge IELTS",
    cambridgeDesc: "Выберите книгу и тест для прохождения практики. AI сгенерирует или проверит ваши ответы в реальном времени.",
    practiceMode: "Режим практики: Cambridge {book} - Тест {test}",
    selectPart: "Выберите часть",
    allSections: "Все разделы",
  },
  en: {
    appName: "IELTS Lab",
    tagline: "Prepare for IELTS with AI grading for Writing and Speaking",
    heroSub:
      "Take realistic tasks and get instant band scores on all four IELTS criteria with detailed feedback.",
    start: "Start practising",
    writing: "Writing",
    writingAi: "Writing AI",
    speaking: "Speaking",
    reading: "Reading",
    listening: "Listening",
    tasks: "Task bank",
    home: "Home",
    readingTitle: "AI Reading checker",
    readingSub: "AI creates an academic passage with 5 questions. Answer and see your score.",
    listeningTitle: "AI Listening checker",
    listeningSub: "AI generates a short audio clip and questions. Listen and answer.",
    generate: "Generate task",
    generating: "AI is preparing the task…",
    playAudio: "Play",
    pauseAudio: "Pause",
    checkAnswers: "Check answers",
    yourScore: "Your score",
    correct: "Correct",
    incorrect: "Incorrect",
    explanation: "Explanation",
    topic: "Topic",
    f4Title: "Reading with AI",
    f4Body: "A fresh academic passage with questions — newly generated every time.",
    f5Title: "Listening with AI",
    f5Body: "AI generates a short audio clip and questions to train your listening.",
    writingTitle: "AI Writing checker",
    writingSub:
      "Write an essay on a real IELTS prompt and get a band score across all four criteria with deep feedback.",
    speakingTitle: "AI Speaking checker",
    speakingSub:
      "Record your spoken answer. AI will transcribe it and grade it like a real examiner.",
    selectTask: "Choose a task",
    yourAnswer: "Your answer",
    wordCount: "Words",
    submit: "Check",
    submitting: "AI is analysing…",
    overallBand: "Overall Band",
    feedback: "Feedback",
    suggestions: "How to improve",
    improvedVersion: "Improved version",
    record: "Start recording",
    stop: "Stop",
    listenQuestion: "Listen to the question",
    transcription: "Transcription",
    listenBack: "Play recording",
    criteria: {
      tr: "Task Response",
      cc: "Coherence & Cohesion",
      lr: "Lexical Resource",
      gra: "Grammar Range & Accuracy",
      fc: "Fluency & Coherence",
      pron: "Pronunciation",
    },
    tasksTitle: "IELTS task bank",
    tasksSub: "Authentic Writing Task 1 / Task 2 and Speaking Parts 1–3 prompts.",
    practiceWriting: "Practise Writing",
    practiceSpeaking: "Practise Speaking",
    practiceReading: "Practise Reading",
    practiceListening: "Practise Listening",
    practiceWritingAI: "Writing with AI",
    minWords: "minimum words",
    error: "Error",
    placeholder: "Start typing your answer here…",
    needMicrophone: "Microphone access required",
    recording: "Recording",
    builtWith: "Powered by Lovable AI",
    imageGenError: "Image generation error",
    featuresTitle: "What's inside",
    f1Title: "Accurate Writing grading",
    f1Body: "Get a band score from a virtual examiner — Task Response, Coherence, Lexis, Grammar.",
    f6Title: "Writing with AI",
    f6Body: "AI generates writing tasks based on your topic and grades them with detailed feedback.",
    f2Title: "Speaking with voice recording",
    f2Body: "Record your answer; AI transcribes and grades fluency, vocabulary, grammar, pronunciation.",
    f3Title: "Authentic tasks",
    f3Body: "Prompts modelled on real exams: Task 1, Task 2 and all three Speaking parts.",
    cambridgeTests: "Cambridge Tests",
    cambridgeSub: "Practice authentic Cambridge IELTS 10–20 tests with AI feedback.",
    book: "Book",
    test: "Test",
    startSection: "Start Section",
    cambridgeTitle: "Cambridge IELTS Practice",
    cambridgeDesc: "Select a Cambridge book and test to begin. AI will generate tasks or grade your performance in real time.",
    practiceMode: "Practice Mode: Cambridge {book} - Test {test}",
    selectPart: "Select part",
    allSections: "All sections",
  },
};

type Dict = typeof dict.ru;

interface I18nContext {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
}

const Ctx = createContext<I18nContext | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved === "ru" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  };

  return <Ctx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
