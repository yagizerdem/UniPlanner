import { pullModelStream } from "../service/ollama";

(async () => {
  try {
    const r = await pullModelStream("gemma3", (payload) => {
      console.log("Chunk:", payload);
    });

    console.log("Pull complete", r);
  } catch (err) {
    console.error("Error during pull:", err);
  }
})();
