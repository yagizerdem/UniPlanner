"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("windowController", {
    close: function () { return electron_1.ipcRenderer.invoke("close"); },
    minimize: function () { return electron_1.ipcRenderer.invoke("minimize"); },
    maximize: function () { return electron_1.ipcRenderer.invoke("maximize"); },
});
//# sourceMappingURL=preload.js.map