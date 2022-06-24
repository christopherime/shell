"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValuesCompletionItemProvider = void 0;
const vscode = require("vscode");
const utils = require("../utils");
class ValuesCompletionItemProvider {
    /**
     * Generates a list of completion items based on the current position in the
     * document.
     */
    provideCompletionItems(document, position) {
        const currentLine = document.lineAt(position).text;
        if (!utils.isInsideBrackets(currentLine, position.character)) {
            return undefined;
        }
        const currentString = utils.getWordAt(currentLine, position.character - 1).replace('$.', '.').trim();
        if (currentString.length === 0) {
            return [new vscode.CompletionItem('.Values', vscode.CompletionItemKind.Method)];
        }
        if (currentString.startsWith('.') && !currentString.includes('.Values') && currentString.split('.').length < 3) {
            return [new vscode.CompletionItem('Values', vscode.CompletionItemKind.Method)];
        }
        if (currentString.startsWith('.Values.')) {
            const doc = utils.getValuesFromFile(document.fileName);
            if (currentString === '.Values.') {
                return this.getCompletionItemList(doc);
            }
            let currentKey = doc;
            const allKeys = currentString.replace('.Values.', '').split('.');
            allKeys.pop();
            currentKey = this.updateCurrentKey(currentKey, allKeys);
            return this.getCompletionItemList(currentKey);
        }
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
                    keys.push(new vscode.CompletionItem(key, vscode.CompletionItemKind.Method));
                    break;
                case 'string':
                case 'boolean':
                case 'number':
                    const valueItem = new vscode.CompletionItem(key, vscode.CompletionItemKind.Field);
                    valueItem.detail = currentKey[key].toString();
                    keys.push(valueItem);
                    break;
                default:
                    const unknownItem = new vscode.CompletionItem(key, vscode.CompletionItemKind.Issue);
                    unknownItem.detail = 'Helm-Intellisense could not find type';
                    keys.push(unknownItem);
                    break;
            }
        }
        return keys;
    }
}
exports.ValuesCompletionItemProvider = ValuesCompletionItemProvider;
//# sourceMappingURL=ValuesCompletionItemProvider.js.map