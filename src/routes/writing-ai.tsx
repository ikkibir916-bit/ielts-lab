import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { gradeWriting, generateWritingPrompt, type WritingResult, type GeneratedWritingPrompt } from "@/lib/ielts.functions";
import { BandScore } from "@/components/BandScore";
import { Loader2, Sparkles, PenLine } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/writing-ai")({
  head: () => ({
    meta: [
      { title: "IELTS Writing AI — Генерация заданий | IELTS Lab" },
      {
        name: "description",
        content: "AI генерирует Writing задания по вашей теме и проверяет их с разбором по критериям.",
      },
    ],
  }),
  component: WritingAIPage,
});

const TOPICS = [
  "Climate change and environment",
  "Technology and society",
  "Education and learning",
  "Health and lifestyle",
  "Work and career",
  "Globalization and culture",
];

function WritingAIPage() {
  const { t, lang } = useI18n();
  
  const [topic, setTopic] = useState(TOPICS[0]);
  const [answer, setAnswer] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedWritingPrompt | null>(null);

  const generate = useServerFn(generateWritingPrompt);
  const grade = useServerFn(gradeWriting);

  const generateMutation = useMutation<GeneratedWritingPrompt>({
    mutationFn: () =>
      generate({ data: { topic, part: "Task 2", uiLang: lang } }),
    onSuccess: (data) => {
      setGeneratedPrompt(data);
      setAnswer("");
    },
    onError: (e: Error) => toast.error(t.error, { description: e.message }),
  });

  const gradeMutation = useMutation<WritingResult>({
    mutationFn: () =>
      grade({
        data: {
          prompt: generatedPrompt!.prompt,
          part: generatedPrompt!.part,
          answer,
          uiLang: lang,
        },
      }),
    onError: (e: Error) => toast.error(t.error, { description: e.message }),
  });

  const wordCount = answer.trim().split(/\s+/).filter(Boolean).length;
  const tooShort = generatedPrompt && wordCount < generatedPrompt.minWords;
  const result = gradeMutation.data;

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl md:text-5xl">Writing с AI</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">
        {lang === "ru"
          ? "AI генерирует IELTS Writing задания по вашей теме и проверяет их с подробным разбором."
          : "AI generates IELTS Writing tasks based on your topic and grades them with detailed feedback."}
      </p>

      <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-6">
          {/* Topic selector */}
          <div className="space-y-4">
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
                  onClick={() => generateMutation.mutate()}
                  disabled={generateMutation.isPending || topic.trim().length < 2}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {generateMutation.isPending ? (
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
          </div>

          {/* Generated prompt card */}
          {generatedPrompt && (
            <div className="card-academic p-6 space-y-4">
              <div className="text-xs uppercase tracking-wider text-gold">Task 2</div>
              <p className="text-base leading-relaxed">{generatedPrompt.prompt}</p>
              {lang === "ru" && (
                <p className="text-sm text-muted-foreground border-t border-border pt-3">
                  {generatedPrompt.promptRu}
                </p>
              )}
            </div>
          )}

          {/* Editor */}
          {generatedPrompt && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t.yourAnswer}
                </label>
                <div className={`text-xs ${tooShort ? "text-destructive" : "text-muted-foreground"}`}>
                  {t.wordCount}: {wordCount} / {generatedPrompt.minWords}+ {t.minWords}
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
          )}

          {generatedPrompt && (
            <button
              onClick={() => gradeMutation.mutate()}
              disabled={gradeMutation.isPending || answer.trim().length < 30}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {gradeMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> {t.submitting}
                </>
              ) : (
                <>
                  <Sparkles className="size-4" /> {t.submit}
                </>
              )}
            </button>
          )}

          {!generatedPrompt && !generateMutation.isPending && (
            <div className="card-academic p-10 text-center text-sm text-muted-foreground">
              <PenLine className="size-6 mx-auto text-gold mb-3" />
              {lang === "ru"
                ? "Выберите тему, тип задания и нажмите «Сгенерировать задание»."
                : "Pick a topic, task type and press Generate task."}
            </div>
          )}
        </div>

        {/* Results sidebar */}
        <aside className="space-y-6">
          {result && (
            <div className="card-academic p-6 space-y-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gold">
                <Sparkles className="size-4" /> {t.overallBand}
              </div>
              <BandScore value={result.overall} label={t.overallBand} size="lg" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.criteria.tr}</span>
                  <span className="font-semibold">{result.criteria.task_response}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.criteria.cc}</span>
                  <span className="font-semibold">{result.criteria.coherence_cohesion}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.criteria.lr}</span>
                  <span className="font-semibold">{result.criteria.lexical_resource}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t.criteria.gra}</span>
                  <span className="font-semibold">{result.criteria.grammar}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {t.feedback}
                </div>
                <p className="text-sm leading-relaxed">{result.feedback}</p>
              </div>

              {result.suggestions.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                    {t.suggestions}
                  </div>
                  <ul className="space-y-2">
                    {result.suggestions.map((s, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-border pt-4">
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                  {t.improvedVersion}
                </div>
                <p className="text-sm leading-relaxed whitespace-pre-line">{result.improved}</p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
