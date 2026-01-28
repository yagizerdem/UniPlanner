// import type { ApiResponse } from "../../../shared/ApiResponse";

import type { ApiResponse } from "../../../shared/models/ApiResponse";
import type { Note } from "../../../shared/models/Note";

declare global {
  interface Window {
    windowController: WindowController;
    noteController: NoteController;
  }
}

interface WindowController {
  close: () => void;
  minimize: () => void;
  maximize: () => void;
}

interface NoteController {
  readNotes: () => Promise<ApiResponse<Note[]>>;
  saveNotes: (data: Note[]) => Promise<ApiResponse<void>>;
}

export {};
