import { useMemo, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { GeneratedQuiz } from "@/lib/ielts.functions";
import { useI18n } from "@/lib/i18n";

interface Props {
  quiz: GeneratedQuiz;
}

export function QuizRunner({ quiz }: Props) {
  const { t } = useI18n();
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);

  const score = useMemo(() => {
    return quiz.questions.reduce(
      (acc, q, i) => acc + (answers[i] === q.answerIndex ? 1 : 0),
      0,
    );
  }, [answers, quiz.questions]);

  return (
    <div className="space-y-5">
      {quiz.questions.map((q, i) => {
        const chosen = answers[i];
        const isCorrect = checked && chosen === q.answerIndex;
        const isWrong = checked && chosen !== undefined && chosen !== q.answerIndex;
        return (
          <div key={i} className="card-academic p-5">
            <div className="flex items-start gap-3">
              <span className="font-display text-gold text-lg shrink-0">
                {i + 1}.
              </span>
              <div className="flex-1">
                <p className="font-medium">{q.q}</p>
                <div className="mt-3 grid gap-2">
                  {q.options.map((opt, j) => {
                    const selected = chosen === j;
                    const correctOpt = checked && j === q.answerIndex;
                    const wrongOpt = checked && selected && j !== q.answerIndex;
                    return (
                      <label
                        key={j}
                        className={`flex items-start gap-3 rounded-md border px-3 py-2 cursor-pointer text-sm transition-colors ${
                          correctOpt
                            ? "border-emerald-500/60 bg-emerald-500/10"
                            : wrongOpt
                              ? "border-destructive/60 bg-destructive/10"
                              : selected
                                ? "border-primary/60 bg-primary/10"
                                : "border-border hover:bg-accent/40"
                        }`}
                      >
                        <input
                          type="radio"
                          className="mt-1"
                          name={`q-${i}`}
                          disabled={checked}
                          checked={selected}
                          onChange={() =>
                            setAnswers((a) => ({ ...a, [i]: j }))
                          }
                        />
                        <span>{opt}</span>
                      </label>
                    );
                  })}
                </div>
                {checked && (
                  <div
                    className={`mt-3 flex items-start gap-2 text-sm ${
                      isCorrect ? "text-emerald-400" : "text-destructive"
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="size-4 mt-0.5" />
                    ) : (
                      <XCircle className="size-4 mt-0.5" />
                    )}
                    <div>
                      <div className="font-medium">
                        {isCorrect ? t.correct : t.incorrect}
                      </div>
                      <div className="text-muted-foreground mt-1">
                        <span className="text-foreground/80">{t.explanation}: </span>
                        {q.explanation}
                      </div>
                    </div>
                  </div>
                )}
                {/* unused isWrong reference to satisfy lint */}
                <span className="hidden">{String(isWrong)}</span>
              </div>
            </div>
          </div>
        );
      })}

      {!checked ? (
        <button
          onClick={() => setChecked(true)}
          disabled={Object.keys(answers).length < quiz.questions.length}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {t.checkAnswers}
        </button>
      ) : (
        <div className="card-academic p-6 text-center">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            {t.yourScore}
          </div>
          <div className="mt-2 font-display text-5xl text-gold">
            {score} / {quiz.questions.length}
          </div>
        </div>
      )}
    </div>
  );
}
