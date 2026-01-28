import path from "path";
import { app } from "electron";
import { Note } from "../shared/models/Note";
import { existsSync, readFileSync, unlink } from "fs";
import { ApiResponse } from "../shared/models/ApiResponse";

export function readNotes(): Promise<ApiResponse<Note[]>> {
  const appDataPath = process.env.APPDATA;

  const notesJsonFile = path.join(
    appDataPath,
    app.name || "uniplanner",
    "notes.json",
  );

  if (!existsSync(notesJsonFile)) {
    return Promise.resolve({
      data: [],
      message: "No notes found",
      ok: true,
    } as ApiResponse<Note[]>);
  }

  const data = readFileSync(notesJsonFile);
  const notes: Note[] = JSON.parse(data.toString());
  return Promise.resolve({
    data: notes,
    message: "Notes loaded successfully",
    ok: true,
  } as ApiResponse<Note[]>);
}

export function saveNotes(notes: Note[]): Promise<ApiResponse<void>> {
  const appDataPath = process.env.APPDATA;
  const notesJsonFile = path.join(
    appDataPath,
    app.name || "uniplanner",
    "notes.json",
  );
  const data = JSON.stringify(notes, null, 2);
  return new Promise((resolve, reject) => {
    try {
      require("fs").writeFileSync(notesJsonFile, data);
      resolve({
        data: undefined,
        message: "Notes saved successfully",
        ok: true,
      } as ApiResponse<void>);
    } catch (error) {
      resolve({
        data: undefined,
        message: "Failed to save notes",
        ok: false,
      } as ApiResponse<void>);
    }
  });
}
