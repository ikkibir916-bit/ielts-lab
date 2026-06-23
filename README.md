# IELTS Lab

AI-powered IELTS preparation platform with instant grading for Writing and Speaking sections.

## Features

- **Writing Practice**: 
  - Task 1 & Task 2 with real IELTS prompts
  - AI-generated writing tasks based on topics
  - Instant band score grading with detailed feedback
  - Image generation for Task 1 (requires OpenAI API key)

- **Speaking Practice**:
  - Parts 1, 2, and 3
  - Voice recording with transcription
  - AI grading based on IELTS criteria

- **Reading & Listening**:
  - AI-generated passages and audio
  - Interactive quiz format
  - Instant feedback

- **Cambridge IELTS Tests**:
  - Practice with authentic Cambridge test materials
  - AI grading for all sections

## Setup

1. Install dependencies:
```bash
bun install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

3. Add your API keys to `.env`:
- `GROQ_API_KEY`: Required for all AI features (get at https://console.groq.com/)
- `OPENAI_API_KEY`: Optional, required for image generation in Writing AI (get at https://platform.openai.com/api-keys)

4. Run development server:
```bash
bun dev
```

## Writing AI Feature

The new Writing AI section generates IELTS writing tasks based on custom topics:

- **Task 1**: AI generates both the prompt and an accompanying chart/diagram image
- **Task 2**: AI generates essay prompts on any topic
- Image generation requires OpenAI API key (DALL-E 3)
- If OpenAI key is not configured, tasks work without images

## API Keys

### Groq API (Required)
- Used for: Text generation, grading, transcription
- Get free key at: https://console.groq.com/
- Models: Llama 3.3 70B, Whisper for audio

### OpenAI API (Optional)
- Used for: Image generation (DALL-E 3)
- Get key at: https://platform.openai.com/api-keys
- Required for: Writing AI Task 1 image generation
