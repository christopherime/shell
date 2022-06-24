"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const registerUpdateInfo_1 = require("./registerUpdateInfo");
const registerOutlineSymbol_1 = require("./registerOutlineSymbol");
function activate(context) {
    (0, registerUpdateInfo_1.registerUpdateInfo)(context);
    (0, registerOutlineSymbol_1.registerOutlineSymbolProvider)(context);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map