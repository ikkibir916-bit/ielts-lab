import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { generateQuiz, type GeneratedQuiz } from "@/lib/ielts.functions";
import { QuizRunner } from "@/components/QuizRunner";
import { Headphones, Loader2, Pause, Play, Sparkles, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useEnglishVoices } from "@/hooks/use-english-voices";
import { z } from "zod";
import { cambridgeBooks } from "@/lib/cambridge-data";

const searchSchema = z.object({
  book: z.string().optional(),
  test: z.string().optional(),
});

export const Route = createFileRoute("/listening")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "IELTS Listening — AI-задания | IELTS Lab" },
      {
        name: "description",
        content:
          "Тренируйте IELTS Listening: AI генерирует аудиозапись и 5 вопросов с разбором.",
      },
    ],
  }),
  component: ListeningPage,
});

const TOPICS = [
  "University course registration",
  "Booking a city tour",
  "Lecture on volcanoes",
  "Job interview at a cafe",
  "Renting a flat",
  "Library induction",
];

function ListeningPage() {
  const { t, lang } = useI18n();
  const { book, test } = Route.useSearch();

  const cambridgeBookInfo = book ? cambridgeBooks.find((b) => b.bookId === book) : null;
  const cambridgeTestInfo = cambridgeBookInfo && test
    ? cambridgeBookInfo.tests.find((t) => t.testId === test)
    : null;

  const initialTopic = cambridgeTestInfo
    ? cambridgeTestInfo.sections.listeningTopic
    : TOPICS[0];

  const [topic, setTopic] = useState(initialTopic);

  useEffect(() => {
    if (cambridgeTestInfo) {
      setTopic(cambridgeTestInfo.sections.listeningTopic);
    }
  }, [book, test]);
  const [playing, setPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const {
    voices,
    selectedVoice,
    selectedVoiceUri,
    setSelectedVoiceUri,
    getAccentLabel,
    isNaturalVoice,
  } = useEnglishVoices();

  const generate = useServerFn(generateQuiz);

  const mutation = useMutation<GeneratedQuiz>({
    mutationFn: () =>
      generate({ data: { topic, uiLang: lang, kind: "listening" } }),
    onSuccess: () => {
      setShowTranscript(false);
      setPlaying(false);
      if (typeof window !== "undefined") window.speechSynthesis.cancel();
    },
    onError: (e: Error) => toast.error(t.error, { description: e.message }),
  });

  const quiz = mutation.data;

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined") window.speechSynthesis.cancel();
    };
  }, []);

  const handlePlay = () => {
    if (!quiz || typeof window === "undefined") return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(quiz.passage);
    if (selectedVoice) {
      utter.voice = selectedVoice;
      utter.lang = selectedVoice.lang;
    } else {
      utter.lang = "en-US";
    }
    utter.rate = 0.95;
    utter.onend = () => setPlaying(false);
    utter.onerror = () => setPlaying(false);
    utterRef.current = utter;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setPlaying(true);
  };

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      {cambridgeTestInfo && (
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-lg border border-gold/30 bg-gold/5 p-4 text-sm">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-gold shrink-0" />
            <div>
              <span className="font-semibold text-foreground">
                {t.practiceMode.replace("{book}", book || "").replace("{test}", test || "")}
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">
                {lang === "ru"
                  ? "Тема задания установлена в соответствии с официальным тестом."
                  : "Task topic set to match the official Cambridge IELTS test."}
              </p>
            </div>
          </div>
          <Link
            to="/cambridge"
            className="inline-flex items-center gap-1 text-xs text-gold hover:underline"
          >
            <ArrowLeft className="size-3" /> {lang === "ru" ? "Назад к тестам" : "Back to tests"}
          </Link>
        </div>
      )}
      <h1 className="font-display text-4xl md:text-5xl">{t.listeningTitle}</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">{t.listeningSub}</p>

      <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">
              {t.topic}
            </label>
            <div className="mt-2 flex gap-2">
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1 rounded-md bg-input border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending || topic.trim().length < 2}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> {t.generating}
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" /> {t.generate}
                  </>
                )}
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {TOPICS.map((tp) => (
                <button
                  key={tp}
                  onClick={() => setTopic(tp)}
                  className="text-xs px-2.5 py-1 rounded-full border border-border hover:bg-accent/50 transition-colors"
                >
                  {tp}
                </button>
              ))}
            </div>
          </div>

          {quiz && (
            <div className="card-academic p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold">
                <Headphones className="size-4" /> Audio
              </div>
              <h2 className="mt-2 font-display text-2xl">{quiz.title}</h2>
              <div className="mt-4 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={handlePlay}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {playing ? (
                      <>
                        <Pause className="size-4" /> {t.pauseAudio}
                      </>
                    ) : (
                      <>
                        <Play className="size-4" /> {t.playAudio}
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowTranscript((v) => !v)}
                    className="text-sm text-muted-foreground hover:text-foreground underline-offset-2 hover:underline transition-colors"
                  >
                    {showTranscript
                      ? lang === "ru"
                        ? "Скрыть транскрипт"
                        : "Hide transcript"
                      : lang === "ru"
                        ? "Показать транскрипт"
                        : "Show transcript"}
                  </button>
                </div>

                {voices.length > 0 && (
                  <div className="flex flex-col gap-1.5 border-t border-border/50 pt-4 max-w-md">
                    <label htmlFor="voice-select" className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                      <span>{lang === "ru" ? "Голос / Акцент:" : "Voice / Accent:"}</span>
                      {selectedVoice && isNaturalVoice(selectedVoice) && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 font-semibold px-1.5 py-0.5 rounded border border-emerald-500/20">
                          {lang === "ru" ? "Премиум" : "Premium"} ✨
                        </span>
                      )}
                    </label>
                    <select
                      id="voice-select"
                      value={selectedVoiceUri}
                      onChange={(e) => setSelectedVoiceUri(e.target.value)}
                      className="w-full rounded-md bg-input border border-border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                    >
                      {voices.map((v) => {
                        const isNat = isNaturalVoice(v);
                        return (
                          <option key={v.voiceURI} value={v.voiceURI}>
                            {v.name} ({getAccentLabel(v)}) {isNat ? "✨" : ""}
                          </option>
                        );
                      })}
                    </select>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      {lang === "ru"
                        ? "💡 Для реалистичных голосов используйте Chrome/Edge. Различные акценты (UK, US, AU) помогают тренировать реальный IELTS."
                        : "💡 For realistic voices, use Chrome/Edge. Practicing different accents (UK, US, AU) helps prepare for the actual IELTS exam."}
                    </p>
                  </div>
                )}
              </div>
              {showTranscript && (
                <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-muted-foreground border-t border-border pt-4">
                  {quiz.passage}
                </p>
              )}
            </div>
          )}

          {!quiz && !mutation.isPending && (
            <div className="card-academic p-10 text-center text-sm text-muted-foreground">
              <Sparkles className="size-6 mx-auto text-gold mb-3" />
              {lang === "ru"
                ? "Выберите тему и сгенерируйте аудиозадание."
                : "Pick a topic and generate an audio task."}
            </div>
          )}
        </div>

        <aside>{quiz && <QuizRunner quiz={quiz} />}</aside>
      </div>
    </main>
  );
}
