"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const main_1 = __importDefault(require("./main"));
const windowController = __importStar(require("./controller/windowController"));
const app_init_1 = require("./app_init");
main_1.default.main(electron_1.app, electron_1.BrowserWindow);
electron_1.app.whenReady().then(() => {
    electron_1.ipcMain.handle("close", () => windowController.close());
    electron_1.ipcMain.handle("minimize", () => windowController.minimize());
    electron_1.ipcMain.handle("maximize", () => windowController.maximize());
});
electron_1.app.whenReady().then(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, app_init_1.createRootFolders)();
        const installed = yield (0, app_init_1.checkOllamaInstalled)();
        if (!installed) {
            yield (0, app_init_1.downloadOllama)();
            yield (0, app_init_1.setupOllama)();
        }
        else {
            console.log("Ollama is already installed.");
        }
    }
    catch (err) {
        console.error("Error during Ollama setup:", err);
    }
}));
//# sourceMappingURL=app.js.map