import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { PenLine, Mic, BookOpen, Headphones, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "IELTS Lab — AI-подготовка к IELTS Writing и Speaking" },
      {
        name: "description",
        content:
          "Тренируйтесь для IELTS с AI: получите мгновенный band score по эссе и устным ответам с разбором по 4 критериям.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();

  const features = [
    { icon: PenLine, title: t.f1Title, body: t.f1Body, to: "/writing" as const },
    { icon: Mic, title: t.f2Title, body: t.f2Body, to: "/speaking" as const },
    { icon: BookOpen, title: t.f4Title, body: t.f4Body, to: "/reading" as const },
    { icon: Headphones, title: t.f5Title, body: t.f5Body, to: "/listening" as const },
    { icon: BookOpen, title: t.f3Title, body: t.f3Body, to: "/tasks" as const },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] max-w-4xl">
          {t.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">{t.heroSub}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            to="/writing"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {t.practiceWriting}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/speaking"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-medium hover:bg-accent transition-colors"
          >
            <Mic className="size-4" />
            {t.practiceSpeaking}
          </Link>
        </div>

        {/* Mock band card */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
          {[
            { v: "7.5", l: t.criteria.tr },
            { v: "7.0", l: t.criteria.cc },
            { v: "8.0", l: t.criteria.lr },
            { v: "7.5", l: t.criteria.gra },
          ].map((b) => (
            <div key={b.l} className="card-academic p-5 text-center">
              <div className="font-display text-4xl text-gold">{b.v}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                {b.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-16 border-t border-border/60">
        <h2 className="font-display text-3xl md:text-4xl">{t.featuresTitle}</h2>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="card-academic p-6 group hover:border-primary/60 transition-colors"
            >
              <div className="grid place-items-center size-11 rounded-lg bg-primary/15 text-primary border border-primary/30">
                <f.icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm text-gold group-hover:gap-2 transition-all">
                Open <ArrowRight className="size-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-center text-xs text-muted-foreground border-t border-border/60">
        © {new Date().getFullYear()} IELTS Lab
      </footer>
    </main>
  );
}
