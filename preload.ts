import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("windowController", {
  close: () => ipcRenderer.invoke("close"),
  minimize: () => ipcRenderer.invoke("minimize"),
  maximize: () => ipcRenderer.invoke("maximize"),
});
