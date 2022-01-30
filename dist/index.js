"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomHex = exports.random = exports.padHex = exports.breakHex = exports.formatHex = exports.rawHex = exports.ColorResult = void 0;
__exportStar(require("./convert"), exports);
__exportStar(require("./methods"), exports);
var utils_1 = require("./utils");
Object.defineProperty(exports, "ColorResult", { enumerable: true, get: function () { return utils_1.ColorResult; } });
Object.defineProperty(exports, "rawHex", { enumerable: true, get: function () { return utils_1.rawHex; } });
Object.defineProperty(exports, "formatHex", { enumerable: true, get: function () { return utils_1.formatHex; } });
Object.defineProperty(exports, "breakHex", { enumerable: true, get: function () { return utils_1.breakHex; } });
Object.defineProperty(exports, "padHex", { enumerable: true, get: function () { return utils_1.padHex; } });
Object.defineProperty(exports, "random", { enumerable: true, get: function () { return utils_1.random; } });
Object.defineProperty(exports, "randomHex", { enumerable: true, get: function () { return utils_1.randomHex; } });
