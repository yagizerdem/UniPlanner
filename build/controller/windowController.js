"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.maximize = exports.minimize = exports.close = void 0;
const main_1 = __importDefault(require("../main"));
function close() {
    main_1.default.mainWindow.close();
}
exports.close = close;
function minimize() {
    main_1.default.mainWindow.minimize();
}
exports.minimize = minimize;
function maximize() {
    main_1.default.mainWindow.maximize();
}
exports.maximize = maximize;
//# sourceMappingURL=windowController.js.map