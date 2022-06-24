"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableCompletionItemProvider = void 0;
const vscode = require("vscode");
const utils = require("../utils");
const ZERO_POSITION = new vscode.Position(0, 0);
const VARIABLE_DECLARATION_PATTERN = /{{-?\s*\$(?<key>[a-zA-Z0-9_]+?)\s*:=\s*(?<value>.+?)\s*-?}}/g;
class VariableCompletionItemProvider {
    provideCompletionItems(document, position) {
        const currentLine = document.lineAt(position).text;
        if (!utils.isInsideBrackets(currentLine, position.character)) {
            return undefined;
        }
        return this.getDefinedVariables(document, position)
            .map(this.toCompletionItem);
    }
    toCompletionItem(variable) {
        const completionItem = new vscode.CompletionItem(variable.key, vscode.CompletionItemKind.Variable);
        completionItem.detail = variable.value;
        return completionItem;
    }
    /**
     * Returns a record of all variables defined above the given position.
     */
    getDefinedVariables(document, position) {
        const previousText = document.getText(new vscode.Range(ZERO_POSITION, position));
        return this.getVariables(previousText);
    }
    /**
     * Extracts all variable declarations from the given string. Declared variables
     * are returned as a Record, mapping variable names to variable values.
     *
     * @param str The string in which to search for variable declarations.
     */
    getVariables(str) {
        let result;
        const templates = [];
        while ((result = VARIABLE_DECLARATION_PATTERN.exec(str)) !== null) {
            if (result.groups === undefined) {
                console.warn('getDefinedVariables: capture groups are unexpectedly undefined.');
                continue;
            }
            templates.push({ key: result.groups.key, value: result.groups.value.trim() });
        }
        return templates;
    }
}
exports.VariableCompletionItemProvider = VariableCompletionItemProvider;
//# sourceMappingURL=VariableCompletionItemProvider.js.map