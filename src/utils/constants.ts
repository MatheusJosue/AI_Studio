export const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
export const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY || "";

export const CHAT_MODELS = [
  {
    id: "mixtral-8x7b-32768",
    name: "Mixtral 8x7B",
    description: "Fast and powerful model",
  },
  {
    id: "llama-3.1-70b-versatile",
    name: "LLaMA 3.1 70B",
    description: "High quality, versatile model",
  },
];

export const IMAGE_MODELS = [
  {
    id: "stabilityai/stable-diffusion-2-1",
    name: "Stable Diffusion 2.1",
    description: "Fast, quality image generation",
  },
  {
    id: "runwayml/stable-diffusion-v1-5",
    name: "Stable Diffusion 1.5",
    description: "Lightweight, fast generation",
  },
];

export const MAX_IMAGE_HISTORY = 20;
export const MAX_CHAT_HISTORY = 100;
