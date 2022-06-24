"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationConditions = void 0;
const notificationAction_1 = require("./notificationAction");
exports.notificationConditions = [
    {
        type: 'info',
        version_info: '<0.4.0',
        messege: 'Updated from lower version (${previousVersion}). Version ${currentVersion} contains changes incompatible with version <0.4.0. Please check Changelog for details.',
        button_label: 'Show Changelog',
        action: notificationAction_1.default_action
    }
];
//# sourceMappingURL=notificationConditions.js.map