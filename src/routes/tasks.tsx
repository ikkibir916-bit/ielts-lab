import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { writingTasks, speakingTasks } from "@/lib/tasks";
import { PenLine, Mic } from "lucide-react";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Банк заданий IELTS — Writing и Speaking | IELTS Lab" },
      {
        name: "description",
        content:
          "Подборка заданий IELTS Writing Task 1, Task 2 и Speaking Parts 1–3 с переводом на русский.",
      },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  const { t, lang } = useI18n();
  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-4xl md:text-5xl">{t.tasksTitle}</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">{t.tasksSub}</p>

      <section className="mt-12">
        <div className="flex items-center gap-3 mb-5">
          <PenLine className="size-5 text-gold" />
          <h2 className="font-display text-2xl">Writing</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {writingTasks.map((tk) => (
            <article key={tk.id} className="card-academic p-5">
              <div className="text-xs uppercase tracking-wider text-gold">{tk.part}</div>
              <p className="mt-2 text-sm leading-relaxed">{tk.prompt}</p>
              {lang === "ru" && (
                <p className="mt-2 text-xs text-muted-foreground border-t border-border pt-2">
                  {tk.promptRu}
                </p>
              )}
              <Link
                to="/writing"
                className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                {t.practiceWriting} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <div className="flex items-center gap-3 mb-5">
          <Mic className="size-5 text-gold" />
          <h2 className="font-display text-2xl">Speaking</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {speakingTasks.map((tk) => (
            <article key={tk.id} className="card-academic p-5">
              <div className="text-xs uppercase tracking-wider text-gold">{tk.part}</div>
              <p className="mt-2 text-sm leading-relaxed">{tk.prompt}</p>
              {lang === "ru" && (
                <p className="mt-2 text-xs text-muted-foreground border-t border-border pt-2">
                  {tk.promptRu}
                </p>
              )}
              <Link
                to="/speaking"
                className="mt-4 inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                {t.practiceSpeaking} →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
