"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("windowController", {
    close: () => electron_1.ipcRenderer.invoke("close"),
    minimize: () => electron_1.ipcRenderer.invoke("minimize"),
    maximize: () => electron_1.ipcRenderer.invoke("maximize"),
});
electron_1.contextBridge.exposeInMainWorld("noteController", {
    readNotes: () => electron_1.ipcRenderer.invoke("readNotes"),
    saveNotes: (data) => electron_1.ipcRenderer.invoke("saveNotes", data),
});
//# sourceMappingURL=preload.js.map