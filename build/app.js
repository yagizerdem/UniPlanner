"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var main_1 = require("./main");
var windowController = require("./controller/windowController");
main_1.default.main(electron_1.app, electron_1.BrowserWindow);
electron_1.app.whenReady().then(function () {
    electron_1.ipcMain.handle("close", function () { return windowController.close(); });
    electron_1.ipcMain.handle("minimize", function () { return windowController.minimize(); });
    electron_1.ipcMain.handle("maximize", function () { return windowController.maximize(); });
});
//# sourceMappingURL=app.js.map