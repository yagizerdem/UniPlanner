interface OllamaModelDetails {
  format: string; // "gguf"
  family: string; // "gemma"
  families: string[]; // ["gemma"]
  parameter_size: string; // "4.3B"
  quantization_level: string; // "Q4_K_M"
}

interface OllamaModel {
  name: string; // "gemma3"
  modified_at: string; // ISO timestamp
  size: number; // bytes
  digest: string; // sha256
  details: OllamaModelDetails;
}

export { OllamaModel, OllamaModelDetails };
