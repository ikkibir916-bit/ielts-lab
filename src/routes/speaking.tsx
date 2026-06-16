import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import { speakingTasks } from "@/lib/tasks";
import { gradeSpeaking, type SpeakingResult } from "@/lib/ielts.functions";
import { BandScore } from "@/components/BandScore";
import { Loader2, Mic, Square, Volume2, Play, ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useEnglishVoices } from "@/hooks/use-english-voices";
import { z } from "zod";
import { cambridgeBooks } from "@/lib/cambridge-data";

const searchSchema = z.object({
  book: z.string().optional(),
  test: z.string().optional(),
  part: z.enum(["Part 1", "Part 2", "Part 3"]).optional(),
});

export const Route = createFileRoute("/speaking")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "IELTS Speaking — AI-проверка устной речи | IELTS Lab" },
      {
        name: "description",
        content:
          "Запишите ответ голосом и получите AI-оценку IELTS Speaking по 4 критериям с транскрипцией.",
      },
    ],
  }),
  component: SpeakingPage,
});

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function SpeakingPage() {
  const { t, lang } = useI18n();
  const { book, test, part } = Route.useSearch();

  const [taskId, setTaskId] = useState(speakingTasks[0].id);
  const [selectedPart, setSelectedPart] = useState<"Part 1" | "Part 2" | "Part 3">(part || "Part 1");

  const cambridgeBookInfo = book ? cambridgeBooks.find((b) => b.bookId === book) : null;
  const cambridgeTestInfo = cambridgeBookInfo && test
    ? cambridgeBookInfo.tests.find((t) => t.testId === test)
    : null;

  const task = useMemo(() => {
    if (cambridgeTestInfo) {
      let promptObj;
      if (selectedPart === "Part 1") {
        promptObj = cambridgeTestInfo.sections.speakingPart1;
      } else if (selectedPart === "Part 2") {
        promptObj = cambridgeTestInfo.sections.speakingPart2;
      } else {
        promptObj = cambridgeTestInfo.sections.speakingPart3;
      }
      return {
        id: `cambridge-${book}-${test}-${selectedPart.toLowerCase().replace(" ", "")}`,
        part: selectedPart,
        prompt: promptObj.prompt,
        promptRu: promptObj.promptRu,
      };
    }
    return speakingTasks.find((x) => x.id === taskId)!;
  }, [taskId, cambridgeTestInfo, selectedPart, book, test]);

  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const grade = useServerFn(gradeSpeaking);
  const mutation = useMutation<SpeakingResult>({
    mutationFn: async () => {
      if (!audioBlob) throw new Error("No recording");
      const base64 = await blobToBase64(audioBlob);
      // Map mime to format
      const mime = audioBlob.type || "audio/webm";
      const format = mime.includes("mp4") || mime.includes("aac")
        ? "mp4"
        : mime.includes("ogg")
          ? "ogg"
          : mime.includes("wav")
            ? "wav"
            : "webm";
      return grade({
        data: {
          prompt: task.prompt,
          part: task.part,
          audioBase64: base64,
          audioFormat: format,
          uiLang: lang,
        },
      });
    },
    onError: (e: Error) => toast.error(t.error, { description: e.message }),
  });

  const reset = () => {
    setAudioBlob(null);
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setElapsed(0);
    mutation.reset();
  };

  const start = async () => {
    try {
      reset();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((tr) => tr.stop());
      };
      recorderRef.current = rec;
      rec.start();
      setRecording(true);
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
    } catch {
      toast.error(t.needMicrophone);
    }
  };

  const stop = () => {
    recorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const { selectedVoice } = useEnglishVoices();

  const speakPrompt = () => {
    if (!("speechSynthesis" in window)) return;
    const u = new SpeechSynthesisUtterance(task.prompt);
    if (selectedVoice) {
      u.voice = selectedVoice;
      u.lang = selectedVoice.lang;
    } else {
      u.lang = "en-GB";
    }
    u.rate = 0.95;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };

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
                  ? `Раздел Speaking — ${selectedPart}`
                  : `Speaking Section — ${selectedPart}`}
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
      <h1 className="font-display text-4xl md:text-5xl">{t.speakingTitle}</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">{t.speakingSub}</p>

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
                  reset();
                }}
                className="mt-2 w-full rounded-md bg-input border border-border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {speakingTasks.map((tk) => (
                  <option key={tk.id} value={tk.id}>
                    {tk.part} — {tk.prompt.slice(0, 60)}…
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
                {(["Part 1", "Part 2", "Part 3"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setSelectedPart(p);
                      reset();
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

          <div className="card-academic p-6">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-gold">{task.part}</div>
              <button
                onClick={speakPrompt}
                className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <Volume2 className="size-4" /> {t.listenQuestion}
              </button>
            </div>
            <p className="mt-3 text-base leading-relaxed">{task.prompt}</p>
            {lang === "ru" && (
              <p className="mt-3 text-sm text-muted-foreground border-t border-border pt-3">
                {task.promptRu}
              </p>
            )}
          </div>

          {/* Recorder */}
          <div className="card-academic p-8 flex flex-col items-center">
            <button
              onClick={recording ? stop : start}
              className={`relative grid place-items-center size-28 rounded-full transition-all border ${
                recording
                  ? "bg-destructive/20 border-destructive text-destructive animate-pulse"
                  : "bg-primary/15 border-primary text-primary hover:bg-primary/25"
              }`}
            >
              {recording ? <Square className="size-9" /> : <Mic className="size-10" />}
            </button>
            <div className="mt-5 text-sm text-muted-foreground">
              {recording
                ? `${t.recording} · ${formatTime(elapsed)}`
                : audioBlob
                  ? formatTime(elapsed)
                  : t.record}
            </div>

            {audioUrl && !recording && (
              <div className="mt-5 flex items-center gap-3">
                <audio src={audioUrl} controls className="h-9" />
                <button
                  onClick={() => mutation.mutate()}
                  disabled={mutation.isPending}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> {t.submitting}
                    </>
                  ) : (
                    <>
                      <Play className="size-4" /> {t.submit}
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <aside className="space-y-4">
          {!result && !mutation.isPending && (
            <div className="card-academic p-6 text-center text-sm text-muted-foreground">
              <Mic className="size-6 mx-auto text-gold mb-3" />
              {lang === "ru"
                ? "Запишите ответ, AI оценит его как экзаменатор IELTS."
                : "Record your answer; AI will grade it like an IELTS examiner."}
            </div>
          )}
          {result && (
            <>
              <BandScore value={result.overall} label={t.overallBand} size="lg" />
              <div className="grid grid-cols-2 gap-3">
                <BandScore value={result.criteria.fluency_coherence} label={t.criteria.fc} />
                <BandScore value={result.criteria.lexical_resource} label={t.criteria.lr} />
                <BandScore value={result.criteria.grammar} label={t.criteria.gra} />
                <BandScore value={result.criteria.pronunciation} label={t.criteria.pron} />
              </div>

              <div className="card-academic p-5">
                <h4 className="font-display text-lg">{t.transcription}</h4>
                <p className="mt-2 text-sm text-muted-foreground italic whitespace-pre-line">
                  “{result.transcription}”
                </p>
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
            </>
          )}
        </aside>
      </div>
    </main>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}
