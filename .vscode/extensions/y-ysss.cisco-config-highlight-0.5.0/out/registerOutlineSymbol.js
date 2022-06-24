"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerOutlineSymbolProvider = void 0;
const vscode = require("vscode");
const symbolsInfo_1 = require("./symbolsInfo");
function registerOutlineSymbolProvider(context) {
    context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider({ language: 'cisco' }, new CiscoConfigDocumentSymbolProvider()));
}
exports.registerOutlineSymbolProvider = registerOutlineSymbolProvider;
const regExpJoin = (delimiter, list) => {
    return new RegExp(list.map((item) => { return item.source; }).join(delimiter));
};
const regexPattern = (name) => {
    const d = symbolsInfo_1.symbolsInfo[name];
    return RegExp(`(?<index_${name}>${d.pattern.source})(?<submatch_${name}>${d.item_pattern.source})`);
};
const getSettingsOptions = () => {
    const symbols = vscode.workspace.getConfiguration('cisco-config-highlight').get('outline.symbolsList', {});
    const patterns = Object.entries(symbols).filter(item => item[1]).map(item => { return regexPattern(item[0]); });
    if (!patterns.length) {
        return { bool: false };
    }
    return { bool: true, value: regExpJoin('|', patterns) };
};
class CiscoConfigDocumentSymbolProvider {
    provideDocumentSymbols(document, _token) {
        return new Promise((resolve, reject) => {
            let symbols = [];
            const enabledOutlinePanel = vscode.workspace.getConfiguration('cisco-config-highlight').get('outline.showSymbolsInOutlinePanel', false);
            if (!enabledOutlinePanel) {
                reject('Cisco Config Highlight: The outline panel view of the symbol is disabled.');
            }
            const text = document.getText();
            let patterns = getSettingsOptions();
            if (!patterns.bool) {
                reject('Cisco Config Highlight: Symbol is not selected.');
            }
            let category_name = '';
            let parent_name = '';
            let base_node = symbols;
            let parent_node = symbols;
            text.split(/\r?\n/).forEach((item, i) => {
                let m = item.match(patterns.value || '');
                if (!(m === null || m === void 0 ? void 0 : m.groups)) {
                    return;
                }
                const data = Object.entries(m.groups).filter(item => item[1] !== undefined);
                if (data[1][1] === '') {
                    return;
                }
                let info = symbolsInfo_1.symbolsInfo[data[0][0].slice(6)];
                const position = document.lineAt(i).range;
                if (info.category_name === 'command') {
                    symbols.push(new vscode.DocumentSymbol(data[1][1].trim(), info.detail, vscode.SymbolKind.Event, position, position));
                    parent_node = symbols[symbols.length - 1].children;
                    base_node = symbols[symbols.length - 1].children;
                    category_name = info.category_name;
                    return;
                }
                if (category_name !== info.category_name) {
                    base_node.push(new vscode.DocumentSymbol(info.category_name, '', info.parent_kind ? info.parent_kind : vscode.SymbolKind.Namespace, position, position));
                    parent_node = base_node[base_node.length - 1].children;
                    category_name = info.category_name;
                }
                if (info.parent_name) {
                    let matched = data[1][1].match(info.parent_name || '');
                    if (matched) {
                        parent_name = matched[0];
                    }
                }
                const node = parent_node[parent_node.length - 1];
                if (parent_node.length > 0 && parent_name === data[1][1].trim() && node.detail !== info.detail) {
                    node.children.push(new vscode.DocumentSymbol(data[1][1].trim(), info.detail, info.kind, position, position));
                }
                else {
                    parent_node.push(new vscode.DocumentSymbol(data[1][1].trim(), info.detail, info.kind, position, position));
                }
            });
            resolve(symbols);
        });
    }
}
//# sourceMappingURL=registerOutlineSymbol.js.map