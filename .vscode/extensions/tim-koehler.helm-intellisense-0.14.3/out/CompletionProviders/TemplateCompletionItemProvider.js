"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateCompletionItemProvider = void 0;
const vscode = require("vscode");
const utils = require("../utils");
class TemplateCompletionItemProvider {
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
            return [new vscode.CompletionItem('.Template', vscode.CompletionItemKind.Method)];
        }
        if (currentString.startsWith('.') && !currentString.includes('.Files.') && currentString.split('.').length < 3) {
            return [new vscode.CompletionItem('Template', vscode.CompletionItemKind.Method)];
        }
        if (/^\.Template\.\w*$/.test(currentString)) {
            return this.getCompletionItemList();
        }
        return [];
    }
    /**
     * Put together list of items with the information from the official Helm website.
     */
    getCompletionItemList() {
        const name = new vscode.CompletionItem('Name', vscode.CompletionItemKind.Field);
        name.detail = 'A namespaced file path to the current template (e.g. mychart/templates/mytemplate.yaml)';
        const basePath = new vscode.CompletionItem('BasePath', vscode.CompletionItemKind.Field);
        basePath.detail = 'BasePath: The namespaced path to the templates directory of the current chart (e.g. mychart/templates).';
        return [
            name,
            basePath
        ];
    }
}
exports.TemplateCompletionItemProvider = TemplateCompletionItemProvider;
//# sourceMappingURL=TemplateCompletionItemProvider.js.map