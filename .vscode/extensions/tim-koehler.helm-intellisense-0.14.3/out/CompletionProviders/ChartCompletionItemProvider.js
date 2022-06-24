"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartCompletionItemProvider = void 0;
const vscode = require("vscode");
const yaml = require("../yaml");
const fs = require("fs");
const utils = require("../utils");
const path_1 = require("path");
class ChartCompletionItemProvider {
    /**
     * Generates a list of completion items based on the current position in the
     * document.
     */
    provideCompletionItems(document, position, token, context) {
        const currentLine = document.lineAt(position).text;
        if (!utils.isInsideBrackets(currentLine, position.character)) {
            return undefined;
        }
        const currentString = utils.getWordAt(currentLine, position.character - 1).replace('$.', '.').trim();
        if (currentString.length === 0) {
            return [new vscode.CompletionItem('.Chart', vscode.CompletionItemKind.Method)];
        }
        if (currentString.startsWith('.') && !currentString.includes('.Chart.') && currentString.split('.').length < 3) {
            return [new vscode.CompletionItem('Chart', vscode.CompletionItemKind.Method)];
        }
        if (currentString.startsWith('.Chart.')) {
            const doc = this.getValuesFromChartFile(document);
            if (currentString === '.Chart.') {
                return this.getCompletionItemList(doc);
            }
            let currentKey = doc;
            const allKeys = currentString.replace('.Chart.', '').split('.');
            allKeys.pop();
            currentKey = this.updateCurrentKey(currentKey, allKeys);
            return this.getCompletionItemList(currentKey);
        }
        return undefined;
    }
    /**
     * Checks whether the position is part of a values reference.
     */
    isInChartString(currentLine, position) {
        return utils.getWordAt(currentLine, position - 1).includes('.Chart');
    }
    /**
     * Retrieves the values from the `values.yaml`.
     */
    getValuesFromChartFile(document) {
        const chartBasePath = utils.getChartBasePath(document.fileName);
        if (chartBasePath === undefined) {
            return undefined;
        }
        const pathToChartFile = chartBasePath + path_1.sep + 'Chart.yaml';
        if (fs.existsSync(pathToChartFile)) {
            return yaml.load(pathToChartFile);
        }
        vscode.window.showErrorMessage('Could not locate the Chart.yaml.');
        return undefined;
    }
    /**
     * Updates the currently active key.
     */
    updateCurrentKey(currentKey, allKeys) {
        for (const key in allKeys) {
            if (Array.isArray(currentKey[allKeys[key]])) {
                return undefined;
            }
            currentKey = currentKey[allKeys[key]];
        }
        return currentKey;
    }
    /**
     * Generates a list of possible completions for the current key.
     */
    getCompletionItemList(currentKey) {
        const keys = [];
        for (const key in currentKey) {
            switch (typeof currentKey[key]) {
                case 'object':
                    keys.push(new vscode.CompletionItem(key.charAt(0).toUpperCase() + key.slice(1), vscode.CompletionItemKind.Method));
                    break;
                case 'string':
                case 'boolean':
                case 'number':
                    const valueItem = new vscode.CompletionItem(key.charAt(0).toUpperCase() + key.slice(1), vscode.CompletionItemKind.Field);
                    valueItem.detail = currentKey[key].toString();
                    keys.push(valueItem);
                    break;
                default:
                    console.log('Unknown type: ' + typeof currentKey[key]);
                    const unknownItem = new vscode.CompletionItem(key.charAt(0).toUpperCase() + key.slice(1), vscode.CompletionItemKind.Issue);
                    unknownItem.detail = 'Helm-Intellisense could not find type';
                    keys.push(unknownItem);
                    break;
            }
        }
        return keys;
    }
}
exports.ChartCompletionItemProvider = ChartCompletionItemProvider;
//# sourceMappingURL=ChartCompletionItemProvider.js.map