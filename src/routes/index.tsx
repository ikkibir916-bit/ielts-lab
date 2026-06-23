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
    { icon: PenLine, title: t.f6Title, body: t.f6Body, to: "/writing-ai" as const },
    { icon: BookOpen, title: t.f3Title, body: t.f3Body, to: "/tasks" as const },
  ];

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 text-left">
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] max-w-4xl bg-gradient-to-r from-white via-slate-100 to-primary bg-clip-text text-transparent drop-shadow-sm font-bold">
          {t.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{t.heroSub}</p>
        
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/writing"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_0_25px_oklch(0.58_0.24_300_/_0.4)] transition-all duration-300 active:scale-98"
          >
            {t.practiceWriting}
            <ArrowRight className="size-4" />
          </Link>
          <Link
            to="/speaking"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold hover:bg-primary/10 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 active:scale-98"
          >
            <Mic className="size-4 text-primary" />
            {t.practiceSpeaking}
          </Link>
          <Link
            to="/reading"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold hover:bg-primary/10 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 active:scale-98"
          >
            <BookOpen className="size-4 text-primary" />
            {t.practiceReading}
          </Link>
          <Link
            to="/listening"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold hover:bg-primary/10 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 active:scale-98"
          >
            <Headphones className="size-4 text-primary" />
            {t.practiceListening}
          </Link>
          <Link
            to="/writing-ai"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-6 py-3.5 text-sm font-semibold hover:bg-primary/10 hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 active:scale-98"
          >
            <PenLine className="size-4 text-primary" />
            {t.practiceWritingAI}
          </Link>
        </div>

        {/* Mock band cards */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
          {[
            { v: "7.5", l: t.criteria.tr },
            { v: "7.0", l: t.criteria.cc },
            { v: "8.0", l: t.criteria.lr },
            { v: "7.5", l: t.criteria.gra },
          ].map((b) => (
            <div key={b.l} className="card-academic p-6 text-center hover:scale-[1.03] hover:shadow-[0_0_25px_oklch(0.58_0.24_300_/_0.2)] transition-all duration-300">
              <div className="font-display text-4xl font-bold bg-gradient-to-r from-gold via-amber-400 to-amber-200 bg-clip-text text-transparent">{b.v}</div>
              <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                {b.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20 border-t border-border/40">
        <h2 className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{t.featuresTitle}</h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="card-academic p-6 group hover:border-primary/40 hover:scale-[1.01] hover:shadow-[0_0_30px_oklch(0.58_0.24_300_/_0.25)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="grid place-items-center size-12 rounded-xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:scale-105 transition-all duration-300">
                  <f.icon className="size-5" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold group-hover:text-primary transition-colors">{f.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </div>
              <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary group-hover:text-accent group-hover:gap-2.5 transition-all">
                <span>Open</span>
                <ArrowRight className="size-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 py-12 text-center text-xs text-muted-foreground border-t border-border/40">
        © {new Date().getFullYear()} IELTS Lab · AI Grading Platform
      </footer>
    </main>
  );
}
