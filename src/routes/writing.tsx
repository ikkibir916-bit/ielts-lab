import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { writingTasks } from "@/lib/tasks";
import { gradeWriting, type WritingResult } from "@/lib/ielts.functions";
import { BandScore } from "@/components/BandScore";
import { Loader2, Sparkles, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { cambridgeBooks } from "@/lib/cambridge-data";

const searchSchema = z.object({
  book: z.string().optional(),
  test: z.string().optional(),
  part: z.enum(["Task 1", "Task 2"]).optional(),
});

export const Route = createFileRoute("/writing")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "IELTS Writing — AI-проверка эссе | IELTS Lab" },
      {
        name: "description",
        content:
          "Напишите эссе Task 1 или Task 2 и получите band score по 4 критериям IELTS с AI-разбором.",
      },
    ],
  }),
  component: WritingPage,
});

function WritingPage() {
  const { t, lang } = useI18n();
  const { book, test, part } = Route.useSearch();
  
  const [taskId, setTaskId] = useState(writingTasks[0].id);
  const [selectedPart, setSelectedPart] = useState<"Task 1" | "Task 2">(part || "Task 2");
  const [answer, setAnswer] = useState("");

  const cambridgeBookInfo = book ? cambridgeBooks.find((b) => b.bookId === book) : null;
  const cambridgeTestInfo = cambridgeBookInfo && test
    ? cambridgeBookInfo.tests.find((t) => t.testId === test)
    : null;

  const task = useMemo(() => {
    if (cambridgeTestInfo) {
      const isTask1 = selectedPart === "Task 1";
      const promptObj = isTask1 ? cambridgeTestInfo.sections.writingTask1 : cambridgeTestInfo.sections.writingTask2;
      return {
        id: `cambridge-${book}-${test}-${isTask1 ? "t1" : "t2"}`,
        part: selectedPart,
        prompt: promptObj.prompt,
        promptRu: promptObj.promptRu,
        minWords: isTask1 ? 150 : 250,
      };
    }
    return writingTasks.find((x) => x.id === taskId)!;
  }, [taskId, cambridgeTestInfo, selectedPart, book, test]);

  const grade = useServerFn(gradeWriting);

  const mutation = useMutation<WritingResult>({
    mutationFn: () =>
      grade({
        data: {
          prompt: task.prompt,
          part: task.part,
          answer,
          uiLang: lang,
        },
      }),
    onError: (e: Error) => toast.error(t.error, { description: e.message }),
  });

  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const tooShort = wordCount < task.minWords;
  const result = mutation.data;

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
                  ? `Раздел Writing — ${selectedPart}`
                  : `Writing Section — ${selectedPart}`}
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
      <h1 className="font-display text-4xl md:text-5xl">{t.writingTitle}</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">{t.writingSub}</p>

      <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          {/* Task selector */}
          {!cambridgeTestInfo ? (
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                {t.selectTask}
              </label>
              <select
                value={taskId}
                onChange={(e) => {
                  setTaskId(e.target.value);
                  mutation.reset();
                }}
                className="mt-2 w-full rounded-md bg-input border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {writingTasks.map((tk) => (
                  <option key={tk.id} value={tk.id}>
                    {tk.part} — {tk.prompt.slice(0, 70)}…
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                {t.selectPart}
              </label>
              <div className="mt-2 flex gap-2">
                {(["Task 1", "Task 2"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedPart(p);
                      mutation.reset();
                    }}
                    className={`flex-1 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      selectedPart === p
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-accent/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Prompt card */}
          <div className="card-academic p-6 space-y-4">
            <div className="text-xs uppercase tracking-wider text-gold">{task.part}</div>
            {task.imageUrl && (
              <div className="overflow-hidden rounded-lg border border-border bg-muted/30 p-2 flex justify-center">
                <img
                  src={task.imageUrl}
                  alt="Task Diagram"
                  className="max-h-[300px] object-contain rounded transition-transform hover:scale-105 duration-300"
                />
              </div>
            )}
            <p className="text-base leading-relaxed">{task.prompt}</p>
            {lang === "ru" && (
              <p className="text-sm text-muted-foreground border-t border-border pt-3">
                {task.promptRu}
              </p>
            )}
          </div>

          {/* Editor */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs uppercase tracking-wider text-muted-foreground">
                {t.yourAnswer}
              </label>
              <div className={`text-xs ${tooShort ? "text-destructive" : "text-muted-foreground"}`}>
                {t.wordCount}: {wordCount} / {task.minWords}+ {t.minWords}
              </div>
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={t.placeholder}
              rows={16}
              className="w-full rounded-md bg-input border border-border px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-ring resize-y"
            />
          </div>

          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || answer.trim().length < 30}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" /> {t.submitting}
              </>
            ) : (
              <>
                <Sparkles className="size-4" /> {t.submit}
              </>
            )}
          </button>
        </div>

        {/* Result panel */}
        <aside className="space-y-4">
          {!result && !mutation.isPending && (
            <div className="card-academic p-6 text-center text-sm text-muted-foreground">
              <Sparkles className="size-6 mx-auto text-gold mb-3" />
              {lang === "ru"
                ? "Напишите ответ и нажмите «Проверить» — AI выдаст band score."
                : "Write your answer and press Check — AI will produce a band score."}
            </div>
          )}

          {result && (
            <>
              <BandScore value={result.overall} label={t.overallBand} size="lg" />
              <div className="grid grid-cols-2 gap-3">
                <BandScore value={result.criteria.task_response} label={t.criteria.tr} />
                <BandScore value={result.criteria.coherence_cohesion} label={t.criteria.cc} />
                <BandScore value={result.criteria.lexical_resource} label={t.criteria.lr} />
                <BandScore value={result.criteria.grammar} label={t.criteria.gra} />
              </div>

              <div className="card-academic p-5">
                <h4 className="font-display text-lg">{t.feedback}</h4>
                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-line">
                  {result.feedback}
                </p>
              </div>

              <div className="card-academic p-5">
                <h4 className="font-display text-lg">{t.suggestions}</h4>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  {result.suggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <details className="card-academic p-5 group">
                <summary className="cursor-pointer font-display text-lg list-none flex items-center justify-between">
                  {t.improvedVersion}
                  <span className="text-xs text-gold group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed whitespace-pre-line">
                  {result.improved}
                </p>
              </details>
            </>
          )}
        </aside>
      </div>
    </main>
  );
}
