"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default_action = void 0;
const vscode = require("vscode");
// Unused ideas
// https://code.visualstudio.com/api/extension-guides/webview
const default_action = (previousVersion, currentVersion) => {
    console.log('default-action', previousVersion, currentVersion);
    vscode.commands.executeCommand('extension.open', 'Y-Ysss.cisco-config-highlight');
};
exports.default_action = default_action;
//# sourceMappingURL=notificationAction.js.map