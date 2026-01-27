import { OLLAMA_API } from "../OLLAMA_API";
import { OllamaModel } from "../shared/ollama/ollama-model";
import { AxiosResponse } from "axios";

export async function isOllamaRunning() {
  try {
    await OLLAMA_API.get("tags");
    return true;
  } catch {
    return false;
  }
}

export async function getListModels(): Promise<OllamaModel[] | []> {
  try {
    const models = (await OLLAMA_API.get("tags")).data.models as OllamaModel[];
    return models;
  } catch {
    return [];
  }
}

export async function pullModelStream(
  model: string,
  onChunk: (payload: unknown) => void,
  signal?: AbortSignal,
): Promise<void> {
  let response: AxiosResponse<any> | undefined;
  try {
    response = await OLLAMA_API.post(
      "pull",
      { model },
      {
        responseType: "stream",
        signal,
      },
    );
  } catch (error) {
    throw error;
  }

  return new Promise((resolve, reject) => {
    const stream = response!.data as NodeJS.ReadableStream;
    stream.setEncoding("utf8");

    stream.on("data", (chunk: string) => {
      const parts = chunk
        .split("\n")
        .map((part) => part.trim())
        .filter(Boolean);

      for (const part of parts) {
        try {
          onChunk(JSON.parse(part));
        } catch (err) {
          // Ignore parse errors on partial lines; they will complete in next chunk
        }
      }
    });

    stream.on("end", () => resolve());
    stream.on("error", (err) => reject(err));
  });
}
