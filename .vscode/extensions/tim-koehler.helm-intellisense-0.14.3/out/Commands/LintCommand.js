"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markErrors = exports.clearErrors = exports.isDefaultDefined = exports.getInvalidTpls = exports.getInvalidKeyPaths = exports.getAllKeyPathElementsOfDocument = exports.getAllUsedNamedTemplateElementsOfDocument = exports.LintCommand = exports.ElementType = void 0;
const vscode = require("vscode");
const utils = require("../utils");
var ElementType;
(function (ElementType) {
    ElementType[ElementType["KEY_PATH"] = 0] = "KEY_PATH";
    ElementType[ElementType["TEMPLATE"] = 1] = "TEMPLATE";
})(ElementType = exports.ElementType || (exports.ElementType = {}));
function LintCommand(collection, doc) {
    var _a;
    if (doc === void 0) { doc = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document; }
    if (doc === undefined) {
        return false;
    }
    const excludes = vscode.workspace.getConfiguration('helm-intellisense').get('excludeFromLinting');
    if (!Array.isArray(excludes)) {
        return false;
    }
    for (const exclude of excludes) {
        if (typeof exclude !== 'string') {
            continue;
        }
        if (exclude.includes('*')) {
            const splits = exclude.split('*');
            if (doc.fileName.endsWith(splits[splits.length - 1])) {
                clearErrors(doc, collection);
                return false;
            }
        }
        else {
            if (doc.fileName.includes(exclude)) {
                clearErrors(doc, collection);
                return false;
            }
        }
    }
    const chartBasePath = utils.getChartBasePath(doc.fileName);
    if (chartBasePath === undefined) {
        return false;
    }
    // Make sure linted file is a template
    const regex = `^${chartBasePath}\\.*`;
    if (!doc.fileName.replace(new RegExp(regex), '').includes('templates')) {
        return false;
    }
    const keyElements = getAllKeyPathElementsOfDocument(doc);
    const values = utils.getValuesFromFile(doc.fileName);
    const errorKeyPathElements = getInvalidKeyPaths(keyElements, values, doc);
    const usedTplElements = getAllUsedNamedTemplateElementsOfDocument(doc);
    const definedTpls = utils.getAllNamedTemplatesFromFiles(doc.fileName);
    const errorTplElements = getInvalidTpls(usedTplElements, definedTpls);
    const allErrorElementsCombined = errorKeyPathElements.concat(errorTplElements);
    markErrors(allErrorElementsCombined, doc, collection);
    return allErrorElementsCombined.length > 0;
}
exports.LintCommand = LintCommand;
function getAllUsedNamedTemplateElementsOfDocument(doc) {
    const txt = doc.getText().split('\n');
    const elementArray = new Array();
    for (let lineIndex = 0; lineIndex < txt.length; lineIndex++) {
        const line = txt[lineIndex];
        const regex = /\{\{-? *(template|include) +"(.+?)".*?\}\}/g;
        const result = regex.exec(line);
        if (result === null) {
            continue;
        }
        elementArray.push({
            line: lineIndex,
            name: result[2],
            range: new vscode.Range(new vscode.Position(lineIndex, line.indexOf(result[2])), new vscode.Position(lineIndex, line.indexOf(result[2]) + result[2].length)),
            type: ElementType.TEMPLATE,
        });
    }
    return elementArray;
}
exports.getAllUsedNamedTemplateElementsOfDocument = getAllUsedNamedTemplateElementsOfDocument;
function getAllKeyPathElementsOfDocument(doc) {
    const txt = doc.getText().split('\n');
    const elementArray = new Array();
    for (let lineIndex = 0; lineIndex < txt.length; lineIndex++) {
        const line = txt[lineIndex];
        if (!line.includes('.Values')) {
            continue;
        }
        const regexBrackets = /\{\{-? ?(else )?if .*?\}\}/g;
        if (regexBrackets.exec(line) !== null) {
            continue;
        }
        const words = line.split(' ');
        let insideComment = false;
        for (let word of words) {
            if (word.startsWith('*/')) {
                insideComment = false;
                continue;
            }
            else if (word.startsWith('/*')) {
                insideComment = true;
                continue;
            }
            if (insideComment) {
                continue;
            }
            if (!word.includes('.Values')) {
                continue;
            }
            word = word.replace('{{', '').replace('}}', '').replace('(', '').replace(')', '');
            elementArray.push({
                line: lineIndex,
                name: word,
                range: new vscode.Range(new vscode.Position(lineIndex, line.indexOf(word)), new vscode.Position(lineIndex, line.indexOf(word) + word.length)),
                type: ElementType.KEY_PATH,
            });
        }
    }
    return elementArray;
}
exports.getAllKeyPathElementsOfDocument = getAllKeyPathElementsOfDocument;
function getInvalidKeyPaths(elements, values, doc) {
    const errorElements = new Array();
    elements.forEach(element => {
        const parts = element.name.split('.');
        parts.shift(); // Remove empty
        parts.shift(); // Remove '.Values'
        let current = values;
        for (const part of parts) {
            current = current[part];
            if (current === undefined) {
                if (isDefaultDefined(element.line, doc)) {
                    break;
                }
                errorElements.push(element);
            }
        }
    });
    return errorElements;
}
exports.getInvalidKeyPaths = getInvalidKeyPaths;
function getInvalidTpls(elements, definedTpls) {
    const errorElements = new Array();
    elements.forEach(element => {
        if (!definedTpls.includes(element.name)) {
            errorElements.push(element);
        }
    });
    return errorElements;
}
exports.getInvalidTpls = getInvalidTpls;
function isDefaultDefined(lineNumber, doc) {
    const line = doc.getText(new vscode.Range(new vscode.Position(lineNumber, 0), new vscode.Position(lineNumber + 1, 0)));
    return line.includes('| default');
}
exports.isDefaultDefined = isDefaultDefined;
function clearErrors(document, collection) {
    collection.set(document.uri, []);
}
exports.clearErrors = clearErrors;
function markErrors(elements, document, collection) {
    collection.set(document.uri, createDiagnosticsArray(elements, document.uri));
}
exports.markErrors = markErrors;
function createDiagnosticsArray(elements, uri) {
    const diagnostics = new Array();
    elements.forEach(element => {
        let message = '';
        switch (element.type) {
            case ElementType.KEY_PATH:
                message = 'Value not defined';
                break;
            case ElementType.TEMPLATE:
                message = 'Template not defined';
                break;
            default:
                break;
        }
        diagnostics.push({
            code: '',
            message: message,
            range: element.range,
            severity: vscode.DiagnosticSeverity.Error,
            source: 'Helm-Intellisense',
            relatedInformation: [new vscode.DiagnosticRelatedInformation(new vscode.Location(uri, element.range), element.name)]
        });
    });
    return diagnostics;
}
//# sourceMappingURL=LintCommand.js.map