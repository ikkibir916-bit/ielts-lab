import { Link, useLocation } from "@tanstack/react-router";
import { useI18n, type Lang } from "@/lib/i18n";
import { GraduationCap } from "lucide-react";

export function Header() {
  const { lang, setLang, t } = useI18n();
  const location = useLocation();

  const nav = [
    { to: "/", label: t.home },
    { to: "/writing", label: t.writing },
    { to: "/writing-ai", label: t.writingAi },
    { to: "/speaking", label: t.speaking },
    { to: "/reading", label: t.reading },
    { to: "/listening", label: t.listening },
    { to: "/tasks", label: t.tasks },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/70">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group text-foreground transition-all duration-300">
          <div className="grid place-items-center size-9 rounded-lg bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_-3px_oklch(0.58_0.24_300_/_0.2)]">
            <GraduationCap className="size-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg group-hover:text-primary transition-colors">{t.appName}</span>
            <span className="text-xs text-muted-foreground -mt-0.5">IELTS · AI Grader</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = location.pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-2 rounded-md text-sm transition-all duration-300 relative ${
                  active
                    ? "text-foreground font-medium bg-primary/10 shadow-[0_0_15px_-3px_oklch(0.58_0.24_300_/_0.2)] border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 rounded-md border border-border p-0.5 bg-surface">
          {(["ru", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors uppercase ${
                lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
