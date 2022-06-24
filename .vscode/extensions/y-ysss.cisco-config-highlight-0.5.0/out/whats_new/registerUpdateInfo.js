"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUpdateInfo = void 0;
const vscode = require("vscode");
const semver = require("semver");
const extension_id = 'Y-Ysss.cisco-config-highlight';
function registerUpdateInfo(context) {
    console.log('Hello');
    const versionKey = `${extension_id}.version`;
    context.globalState.setKeysForSync([versionKey]);
    // https://code.visualstudio.com/api/extension-capabilities/common-capabilities
    const previousVersion = context.globalState.get(versionKey);
    const currentVersion = context.extension.packageJSON.version;
    // context.globalState.update(versionKey, currentVersion);
    context.globalState.update(versionKey, '0.3.6'); // -----------------------------DEBUG
    console.log(previousVersion, currentVersion);
    if (!isHigher(previousVersion, currentVersion)) {
        return;
    }
    const message = vscode.window.showInformationMessage("Update Cisco-Config-Highlight", "Show Changelog");
    message.then((value) => {
        console.log(value);
    });
}
exports.registerUpdateInfo = registerUpdateInfo;
function isHigher(previousVersion, currentVersion) {
    if (previousVersion) {
        return semver.lt(previousVersion, currentVersion);
    }
    return false;
}
//# sourceMappingURL=registerUpdateInfo.js.map