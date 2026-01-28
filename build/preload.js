"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("windowController", {
    close: () => electron_1.ipcRenderer.invoke("close"),
    minimize: () => electron_1.ipcRenderer.invoke("minimize"),
    maximize: () => electron_1.ipcRenderer.invoke("maximize"),
});
//# sourceMappingURL=preload.js.map