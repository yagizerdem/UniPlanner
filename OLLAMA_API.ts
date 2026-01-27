import axios from "axios";

export const OLLAMA_API = axios.create({
  baseURL: "http://localhost:11434/api",
  validateStatus: (status) => status >= 200 && status < 300,
});
