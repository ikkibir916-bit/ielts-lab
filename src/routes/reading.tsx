import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { generateQuiz, type GeneratedQuiz } from "@/lib/ielts.functions";
import { QuizRunner } from "@/components/QuizRunner";
import { BookOpen, Loader2, Sparkles, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { cambridgeBooks } from "@/lib/cambridge-data";

const searchSchema = z.object({
  book: z.string().optional(),
  test: z.string().optional(),
});

export const Route = createFileRoute("/reading")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "IELTS Reading — AI-задания | IELTS Lab" },
      {
        name: "description",
        content:
          "Тренируйте IELTS Reading: AI генерирует академический текст и 5 вопросов с разбором.",
      },
    ],
  }),
  component: ReadingPage,
});

const TOPICS = [
  "The history of coffee",
  "Renewable energy in cities",
  "Bilingual education",
  "Memory and sleep",
  "Urban beekeeping",
  "Space tourism",
];

function ReadingPage() {
  const { t, lang } = useI18n();
  const { book, test } = Route.useSearch();

  const cambridgeBookInfo = book ? cambridgeBooks.find((b) => b.bookId === book) : null;
  const cambridgeTestInfo = cambridgeBookInfo && test
    ? cambridgeBookInfo.tests.find((t) => t.testId === test)
    : null;

  const initialTopic = cambridgeTestInfo
    ? cambridgeTestInfo.sections.readingTopic
    : TOPICS[0];

  const [topic, setTopic] = useState(initialTopic);

  useEffect(() => {
    if (cambridgeTestInfo) {
      setTopic(cambridgeTestInfo.sections.readingTopic);
    }
  }, [book, test]);

  const generate = useServerFn(generateQuiz);

  const mutation = useMutation<GeneratedQuiz>({
    mutationFn: () =>
      generate({ data: { topic, uiLang: lang, kind: "reading" } }),
    onError: (e: Error) => toast.error(t.error, { description: e.message }),
  });

  const quiz = mutation.data;

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
      <h1 className="font-display text-4xl md:text-5xl">{t.readingTitle}</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">{t.readingSub}</p>

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
            <article className="card-academic p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold">
                <BookOpen className="size-4" /> Passage
              </div>
              <h2 className="mt-2 font-display text-2xl">{quiz.title}</h2>
              <p className="mt-4 text-sm leading-relaxed whitespace-pre-line">
                {quiz.passage}
              </p>
            </article>
          )}

          {!quiz && !mutation.isPending && (
            <div className="card-academic p-10 text-center text-sm text-muted-foreground">
              <Sparkles className="size-6 mx-auto text-gold mb-3" />
              {lang === "ru"
                ? "Выберите тему и нажмите «Сгенерировать задание»."
                : "Pick a topic and press Generate task."}
            </div>
          )}
        </div>

        <aside>{quiz && <QuizRunner quiz={quiz} />}</aside>
      </div>
    </main>
  );
}
