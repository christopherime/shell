"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUpdateInfo = void 0;
const vscode = require("vscode");
const semver = require("semver");
const notificationConditions_1 = require("./notificationConditions");
function registerUpdateInfo(context) {
    // console.log('Hello');
    const versionKey = `previous_version`;
    context.globalState.setKeysForSync([versionKey]);
    // https://code.visualstudio.com/api/extension-capabilities/common-capabilities
    const previousVersion = context.globalState.get(versionKey);
    const currentVersion = context.extension.packageJSON.version;
    context.globalState.update(versionKey, currentVersion);
    // context.globalState.update(versionKey, '0.3.6');   // -----------------------------DEBUG
    // console.log(context.globalState.keys());
    console.log(previousVersion, currentVersion);
    if (previousVersion && isIgnore(previousVersion, currentVersion)) {
        return;
    }
    notificationConditions_1.notificationConditions.forEach(info => {
        if (!previousVersion || semver.satisfies(previousVersion, info.version_info)) {
            let prev = previousVersion ? previousVersion : 'undefined';
            let message = info.messege.split('${previousVersion}').join(prev);
            message = message.split('${currentVersion}').join(currentVersion);
            const dialog = getDialog(info, message);
            dialog.then(() => {
                info.action(prev, currentVersion);
            });
        }
    });
}
exports.registerUpdateInfo = registerUpdateInfo;
function getDialog(info, message) {
    if (info.type === 'info') {
        return vscode.window.showInformationMessage(message, info.button_label);
    }
    else if (info.type === 'warn') {
        return vscode.window.showWarningMessage(message, info.button_label);
    }
    else {
        return vscode.window.showInformationMessage(message, info.button_label);
    }
}
function isIgnore(previousVersion, currentVersion) {
    const isLessThan = semver.lt(previousVersion, currentVersion);
    if (isLessThan) {
        const differs = semver.diff(previousVersion, currentVersion);
        if (!differs || differs === "patch") {
            return true;
        }
    }
    return !isLessThan;
}
//# sourceMappingURL=registerUpdateInfo.js.map