"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = close;
exports.minimize = minimize;
exports.maximize = maximize;
var main_1 = require("../main");
function close() {
    main_1.default.mainWindow.close();
}
function minimize() {
    main_1.default.mainWindow.minimize();
}
function maximize() {
    main_1.default.mainWindow.maximize();
}
//# sourceMappingURL=windowController.js.map