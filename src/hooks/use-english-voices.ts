import { useEffect, useState } from "react";

export interface VoiceQuality {
  voice: SpeechSynthesisVoice;
  isNatural: boolean;
  accentLabel: string;
}

// Map language codes to human-readable accent labels
const ACCENT_MAP: Record<string, string> = {
  "en-US": "American (US)",
  "en-GB": "British (UK)",
  "en-AU": "Australian (AU)",
  "en-CA": "Canadian (CA)",
  "en-IN": "Indian (IN)",
  "en-IE": "Irish (IE)",
  "en-NZ": "New Zealand (NZ)",
  "en-ZA": "South African (ZA)",
  "en-SG": "Singaporean (SG)",
};

/**
 * Score a voice based on its name and language to select the best native speaker.
 */
function scoreVoice(voice: SpeechSynthesisVoice): number {
  let score = 0;
  const nameLower = voice.name.toLowerCase();

  // 1. Cloud-based natural voices are highly realistic
  if (nameLower.includes("natural")) {
    score += 100;
  }
  // 2. Google Online voices are high-quality
  if (nameLower.includes("google")) {
    score += 80;
  }
  // 3. Microsoft Online/Edge voices
  if (nameLower.includes("online")) {
    score += 60;
  }
  // 4. Apple/macOS Premium voices
  if (nameLower.includes("premium") || nameLower.includes("enhanced")) {
    score += 40;
  }
  // 5. Offline desktop voices (robotic)
  if (nameLower.includes("desktop") || nameLower.includes("local")) {
    score -= 20;
  }

  // 6. Accent preferences for IELTS (prefers UK and US standard)
  if (voice.lang === "en-GB") {
    score += 10;
  } else if (voice.lang === "en-US") {
    score += 8;
  } else if (voice.lang === "en-AU") {
    score += 6;
  } else if (voice.lang === "en-CA") {
    score += 4;
  } else if (voice.lang.startsWith("en-")) {
    score += 2;
  }

  return score;
}

export function useEnglishVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceUri, setSelectedVoiceUri] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      // Filter for English voices
      const englishVoices = allVoices.filter((v) =>
        v.lang.toLowerCase().startsWith("en")
      );

      // Sort by score (descending)
      const sortedVoices = [...englishVoices].sort(
        (a, b) => scoreVoice(b) - scoreVoice(a)
      );

      setVoices(sortedVoices);

      // Auto-select voice from localStorage, or use the highest scoring one
      const savedUri = localStorage.getItem("ielts_selected_voice_uri");
      if (savedUri && sortedVoices.some((v) => v.voiceURI === savedUri)) {
        setSelectedVoiceUri(savedUri);
      } else if (sortedVoices.length > 0) {
        setSelectedVoiceUri(sortedVoices[0].voiceURI);
      }
    };

    updateVoices();

    // Chrome/Opera/Edge load voices asynchronously and trigger this event
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  const handleSelectVoiceUri = (uri: string) => {
    setSelectedVoiceUri(uri);
    localStorage.setItem("ielts_selected_voice_uri", uri);
  };

  const selectedVoice = voices.find((v) => v.voiceURI === selectedVoiceUri) || null;

  const getAccentLabel = (voice: SpeechSynthesisVoice): string => {
    // Exact match
    if (ACCENT_MAP[voice.lang]) return ACCENT_MAP[voice.lang];
    // Case-insensitive match or prefix
    const cleanLang = voice.lang.replace("_", "-");
    for (const key of Object.keys(ACCENT_MAP)) {
      if (cleanLang.toLowerCase() === key.toLowerCase() || cleanLang.toLowerCase().startsWith(key.toLowerCase())) {
        return ACCENT_MAP[key];
      }
    }
    return voice.lang;
  };

  const isNaturalVoice = (voice: SpeechSynthesisVoice): boolean => {
    const nameLower = voice.name.toLowerCase();
    return (
      nameLower.includes("natural") ||
      nameLower.includes("google") ||
      nameLower.includes("online") ||
      nameLower.includes("premium") ||
      nameLower.includes("enhanced")
    );
  };

  return {
    voices,
    selectedVoice,
    selectedVoiceUri,
    setSelectedVoiceUri: handleSelectVoiceUri,
    getAccentLabel,
    isNaturalVoice,
    hasSpeechSynthesis: typeof window !== "undefined" && "speechSynthesis" in window,
  };
}
