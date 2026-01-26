"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maximize = exports.minimize = exports.close = void 0;
var main_1 = require("../main");
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