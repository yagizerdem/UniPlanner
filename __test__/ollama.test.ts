import { describe, expect, test } from "@jest/globals";
import { getListModels, isOllamaRunning, pullModel } from "../service/ollama";

test("ollama running test", async () => {
  const flag = await isOllamaRunning();
  expect(flag).toBe(true); // if user is not closed ollama  , it should be true
});

test("get installed models from ollama", async () => {
  const models = await getListModels();
  console.log(models, "models");
});

test("pull model from ollama", async () => {
  const response = await pullModel("gemma3");
  console.log(response, "pull response");
});
