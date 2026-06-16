import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { chatCompletion, transcribeAudio, extractJson } from "./ai-gateway.server";

const WritingInput = z.object({
  prompt: z.string().min(10),
  part: z.enum(["Task 1", "Task 2"]),
  answer: z.string().min(30),
  uiLang: z.enum(["ru", "en"]).default("en"),
});

export interface WritingResult {
  overall: number;
  criteria: {
    task_response: number;
    coherence_cohesion: number;
    lexical_resource: number;
    grammar: number;
  };
  feedback: string;
  suggestions: string[];
  improved: string;
  word_count: number;
}

export const gradeWriting = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => WritingInput.parse(data))
  .handler(async ({ data }): Promise<WritingResult> => {
    const wordCount = data.answer.trim().split(/\s+/).filter(Boolean).length;
    const langLabel = data.uiLang === "ru" ? "Russian" : "English";

    const system = `You are a certified IELTS examiner. Grade the candidate's ${data.part} essay strictly using the official IELTS public band descriptors. Be precise, use half-bands (e.g. 6.5).
Return STRICT JSON with this shape and no extra text:
{
  "overall": number,
  "criteria": { "task_response": number, "coherence_cohesion": number, "lexical_resource": number, "grammar": number },
  "feedback": string,
  "suggestions": string[],
  "improved": string
}
- "feedback" must be detailed (3-6 sentences), written in ${langLabel}.
- "suggestions" must contain 3-5 concrete action items in ${langLabel}.
- "improved" must be a rewritten, band 8+ version of the candidate's essay in ENGLISH.
- All band scores must be between 1 and 9 in 0.5 steps.`;

    const user = `IELTS Writing ${data.part}
Prompt:
${data.prompt}

Candidate answer (${wordCount} words):
${data.answer}`;

    const raw = await chatCompletion({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const parsed = extractJson<Omit<WritingResult, "word_count">>(raw);
    return { ...parsed, word_count: wordCount };
  });

const SpeakingInput = z.object({
  prompt: z.string().min(5),
  part: z.enum(["Part 1", "Part 2", "Part 3"]),
  audioBase64: z.string().min(100),
  audioFormat: z.string().default("webm"),
  uiLang: z.enum(["ru", "en"]).default("en"),
});

export interface SpeakingResult {
  overall: number;
  criteria: {
    fluency_coherence: number;
    lexical_resource: number;
    grammar: number;
    pronunciation: number;
  };
  transcription: string;
  feedback: string;
  suggestions: string[];
}

export const gradeSpeaking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => SpeakingInput.parse(data))
  .handler(async ({ data }): Promise<SpeakingResult> => {
    const langLabel = data.uiLang === "ru" ? "Russian" : "English";

    // ШАГ 1: Транскрибируем аудио через Groq Whisper
    const transcription = await transcribeAudio(data.audioBase64, data.audioFormat);

    if (!transcription || transcription.trim().length < 5) {
      throw new Error(
        data.uiLang === "ru"
          ? "Не удалось распознать речь. Пожалуйста, говорите громче и чётче."
          : "Could not transcribe speech. Please speak louder and more clearly."
      );
    }

    // ШАГ 2: Отправляем транскрипцию на оценку в LLM
    const system = `You are a certified IELTS Speaking examiner. The candidate's spoken answer has been transcribed below.
Grade strictly using the IELTS Speaking public band descriptors with half-bands.
Return STRICT JSON only:
{
  "overall": number,
  "criteria": { "fluency_coherence": number, "lexical_resource": number, "grammar": number, "pronunciation": number },
  "feedback": string,
  "suggestions": string[]
}
- "feedback": 3-6 sentences, written in ${langLabel}.
- "suggestions": 3-5 concrete tips, in ${langLabel}.
- Bands between 1 and 9 in 0.5 steps.
- For pronunciation, since you only have the transcript, evaluate based on word choice patterns, typical L1 interference signs, and overall intelligibility implied by the text. Be fair and give a reasonable estimate.`;

    const user = `IELTS Speaking ${data.part}
Prompt: ${data.prompt}

Candidate's transcribed answer:
"${transcription}"`;

    const raw = await chatCompletion({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const parsed = extractJson<Omit<SpeakingResult, "transcription">>(raw);
    return { ...parsed, transcription };
  });

// ===== Reading / Listening generation =====

const GenInput = z.object({
  topic: z.string().min(2).max(120),
  uiLang: z.enum(["ru", "en"]).default("en"),
  kind: z.enum(["reading", "listening"]),
});

export interface QuizQuestion {
  q: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface GeneratedQuiz {
  title: string;
  passage: string;
  questions: QuizQuestion[];
}

export const generateQuiz = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => GenInput.parse(data))
  .handler(async ({ data }): Promise<GeneratedQuiz> => {
    const langLabel = data.uiLang === "ru" ? "Russian" : "English";
    const isReading = data.kind === "reading";

    const system = `You are an IELTS materials author. Generate an authentic IELTS ${isReading ? "Academic Reading" : "Listening"} task.
${isReading
  ? "Write an academic passage of 280-380 words in clear ENGLISH about the topic."
  : "Write a short monologue or dialogue transcript of 180-260 words in clear ENGLISH that will be read aloud. Use a natural spoken style. For a dialogue use lines like 'A: ...' / 'B: ...' on separate lines."}
Then write 5 multiple-choice questions (4 options each) testing comprehension at IELTS band 6-7 difficulty.
Return STRICT JSON only:
{
  "title": string,
  "passage": string,
  "questions": [
    { "q": string, "options": [string,string,string,string], "answerIndex": number, "explanation": string }
  ]
}
- "answerIndex" is 0-3.
- "explanation" must be 1-2 sentences in ${langLabel}, citing a phrase from the passage.
- Questions are in ENGLISH. Make distractors plausible.`;

    const raw = await chatCompletion({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: system },
        { role: "user", content: `Topic: ${data.topic}\nKind: ${data.kind}` },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const parsed = extractJson<GeneratedQuiz>(raw);
    parsed.questions = (parsed.questions ?? []).slice(0, 5).map((q) => ({
      ...q,
      options: q.options.slice(0, 4),
      answerIndex: Math.max(0, Math.min(3, q.answerIndex ?? 0)),
    }));
    return parsed;
  });
