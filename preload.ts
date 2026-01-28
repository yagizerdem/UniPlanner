import { contextBridge, ipcRenderer } from "electron";
import { Note } from "./shared/models/Note";

contextBridge.exposeInMainWorld("windowController", {
  close: () => ipcRenderer.invoke("close"),
  minimize: () => ipcRenderer.invoke("minimize"),
  maximize: () => ipcRenderer.invoke("maximize"),
});

contextBridge.exposeInMainWorld("noteController", {
  readNotes: () => ipcRenderer.invoke("readNotes"),
  saveNotes: (data: Note[]) => ipcRenderer.invoke("saveNotes", data),
});
