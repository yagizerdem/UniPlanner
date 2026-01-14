import { app, BrowserWindow, ipcMain } from "electron";
import Main from "./main";
import * as windowController from "./controller/windowController";

Main.main(app, BrowserWindow);

app.whenReady().then(() => {
  ipcMain.handle("close", () => windowController.close());
  ipcMain.handle("minimize", () => windowController.minimize());
  ipcMain.handle("maximize", () => windowController.maximize());
});
