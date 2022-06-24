"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LintChartCommand = void 0;
const vscode = require("vscode");
const utils = require("../utils");
const fs = require("fs");
const LintCommand_1 = require("./LintCommand");
const path_1 = require("path");
function LintChartCommand(collection) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const doc = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document;
        if (doc === undefined) {
            return;
        }
        const chartBasePath = utils.getChartBasePath(doc.fileName);
        if (chartBasePath === undefined) {
            return;
        }
        const templates = walkDirectory(chartBasePath + path_1.sep + 'templates');
        let hasErrors = false;
        for (const template of templates) {
            yield vscode.workspace.openTextDocument(template).then(template => {
                if (LintCommand_1.LintCommand(collection, template)) {
                    hasErrors = true;
                }
            });
        }
        if (hasErrors) {
            return;
        }
        vscode.window.showInformationMessage(`No errors found in chart '${utils.getNameOfChart(doc.fileName)}' :)`);
    });
}
exports.LintChartCommand = LintChartCommand;
function walkDirectory(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + path_1.sep + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            /* Recurse into a subdirectory */
            results = results.concat(walkDirectory(file));
        }
        else {
            /* Is a file */
            if (file.endsWith('.yaml') || file.endsWith('.yml')) {
                results.push(file);
            }
        }
    });
    return results;
}
//# sourceMappingURL=LintChartCommand.js.map