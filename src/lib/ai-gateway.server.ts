// AI Gateway — Groq
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_WHISPER_URL = "https://api.groq.com/openai/v1/audio/transcriptions";

type ContentPart =
  | { type: "text"; text: string }
  | { type: "input_audio"; input_audio: { data: string; format: string } }
  | { type: "image_url"; image_url: { url: string } };

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string | ContentPart[];
}

export interface ChatCompletionOptions {
  model?: string;
  messages: ChatMessage[];
  response_format?: { type: "json_object" };
  temperature?: number;
  max_tokens?: number;
}

/** Получение и валидация Groq API ключа */
function getGroqApiKey(): string {
  const apiKey = process.env.GROQ_API_KEY;

  if (apiKey && !apiKey.includes("your_groq_api_key_here") && apiKey.trim() !== "") {
    return apiKey.trim();
  }
  throw new Error("API ключ Groq не настроен. Пожалуйста, добавьте GROQ_API_KEY в файл .env");
}

/** Основная функция для текстовых chat-запросов */
export async function chatCompletion(opts: ChatCompletionOptions): Promise<string> {
  const apiKey = getGroqApiKey();
  const modelName = opts.model ?? "llama-3.3-70b-versatile";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`,
  };

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: modelName,
      messages: opts.messages,
      max_tokens: opts.max_tokens ?? 4000,
      ...(opts.response_format ? { response_format: opts.response_format } : {}),
      ...(opts.temperature != null ? { temperature: opts.temperature } : {}),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    if (res.status === 429) throw new Error("Превышен лимит запросов Groq. Попробуйте позже.");
    throw new Error(`Groq API Error ${res.status}: ${text.slice(0, 300)}`);
  }

  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = json.choices?.[0]?.message?.content;
  if (!content) throw new Error("Groq вернул пустой ответ");
  return content;
}

/**
 * Транскрипция аудио через Groq Whisper.
 */
export async function transcribeAudio(audioBase64: string, audioFormat: string): Promise<string> {
  const apiKey = getGroqApiKey();

  // Конвертируем base64 в Blob для отправки через FormData
  const mimeMap: Record<string, string> = {
    webm: "audio/webm",
    mp4: "audio/mp4",
    ogg: "audio/ogg",
    wav: "audio/wav",
    mp3: "audio/mpeg",
  };
  const mime = mimeMap[audioFormat] || "audio/webm";
  const ext = audioFormat || "webm";

  const binaryStr = atob(audioBase64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  const audioBlob = new Blob([bytes], { type: mime });

  const formData = new FormData();
  formData.append("file", audioBlob, `recording.${ext}`);
  formData.append("model", "whisper-large-v3");
  formData.append("response_format", "text");
  formData.append("language", "en");

  const res = await fetch(GROQ_WHISPER_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Groq Whisper API Error ${res.status}: ${text.slice(0, 300)}`);
  }

  const transcription = await res.text();
  return transcription.trim();
}

export function extractJson<T>(raw: string): T {
  // Очистка строки от Markdown-разметки типа ```json ...
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned) as T;
}

