import { app, BrowserWindow, ipcMain } from "electron";
import Main from "./main";
import * as windowController from "./controller/windowController";
import {
  checkOllamaInstalled,
  createRootFolders,
  downloadOllama,
  setupOllama,
} from "./app_init";

Main.main(app, BrowserWindow);

app.whenReady().then(() => {
  ipcMain.handle("close", () => windowController.close());
  ipcMain.handle("minimize", () => windowController.minimize());
  ipcMain.handle("maximize", () => windowController.maximize());
});

app.whenReady().then(async () => {
  try {
    await createRootFolders();
    const installed: boolean = await checkOllamaInstalled();
    if (!installed) {
      await downloadOllama();
      await setupOllama();
    } 
    else {
      console.log("Ollama is already installed.");
    }
  }
  catch (err) {
      console.error("Error during Ollama setup:", err);
  }
});
