import path from "path";
import { app } from "electron";
import { Note } from "../shared/models/Note";
import { existsSync, readFileSync, unlink } from "fs";
import { ApiResponse } from "../shared/models/ApiResponse";

export function readNotes(): Promise<Note[]> {
  const appDataPath = process.env.APPDATA;

  const notesJsonFile = path.join(
    appDataPath,
    app.name || "uniplanner",
    "notes.json",
  );

  if (!existsSync(notesJsonFile)) {
    return Promise.resolve([]);
  }

  const data = readFileSync(notesJsonFile);
  const notes: Note[] = JSON.parse(data.toString());
  return Promise.resolve(notes);
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
      reject({
        data: undefined,
        message: "Failed to save notes",
        ok: false,
      } as ApiResponse<void>);
    }
  });
}
