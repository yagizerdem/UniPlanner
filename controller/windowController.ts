import Main from "../main";

export function close() {
  Main.mainWindow.close();
}

export function minimize() {
  Main.mainWindow.minimize();
}

export function maximize() {
  Main.mainWindow.maximize();
}
