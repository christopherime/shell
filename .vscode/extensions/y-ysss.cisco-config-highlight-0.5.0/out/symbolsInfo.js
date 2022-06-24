"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.symbolsInfo = void 0;
const vscode_1 = require("vscode");
exports.symbolsInfo = {
    'command': {
        pattern: /^(?!\\s)[0-9a-zA-Z\\-]+(?:(#|>))(?!.*(#|>|\s)$)/,
        kind: vscode_1.SymbolKind.String,
        parent_kind: vscode_1.SymbolKind.Event,
        node_name: 'command',
        category_name: 'command',
        detail: 'command',
        item_pattern: /.*$/
    },
    'ip_vrf': {
        pattern: /^(?:\s|\t)*ip\svrf(?!\sforwarding)(?:\s)/,
        kind: vscode_1.SymbolKind.Field,
        node_name: 'ip_vrf',
        category_name: 'ip_vrf',
        detail: 'ip vrf',
        item_pattern: /.*$/
    },
    'router_bgp': {
        pattern: /^(?:\s|\t)*router\sbgp(?:\s)/,
        kind: vscode_1.SymbolKind.Class,
        node_name: 'router_bgp',
        category_name: 'router bgp',
        detail: 'router bgp',
        item_pattern: /\d*$/
    },
    'address_family': {
        pattern: /^(?:\s|\t)*(address-family)(?:\s)/,
        kind: vscode_1.SymbolKind.Field,
        node_name: 'address_family',
        category_name: 'router bgp',
        parent_name: '.*',
        detail: 'address-family',
        item_pattern: /.*$/
    },
    'class_map': {
        pattern: /^(?:\s|\t)*(class-map)(?:\s)/,
        kind: vscode_1.SymbolKind.Variable,
        node_name: 'class_map',
        category_name: 'class-map',
        detail: 'class-map',
        item_pattern: /.*$/
    },
    'policy_map': {
        pattern: /^(?:\s|\t)*(policy-map)(?:\s)/,
        kind: vscode_1.SymbolKind.Variable,
        node_name: 'policy_map',
        category_name: 'policy-map',
        detail: 'policy-map',
        item_pattern: /.*$/
    },
    'interface': {
        pattern: /^(?:\s|\t)*(interface)(?:\s)/,
        kind: vscode_1.SymbolKind.Class,
        node_name: 'interface',
        category_name: 'interface',
        detail: 'interface',
        item_pattern: /[^.]*$/
    },
    'sub_interface': {
        pattern: /^(?:\s|\t)*(interface)(?:\s)/,
        kind: vscode_1.SymbolKind.Interface,
        node_name: 'interface',
        category_name: 'interface',
        parent_name: '.+\.',
        detail: 'sub-interface',
        item_pattern: /.*\..*$/
    }
};
//# sourceMappingURL=symbolsInfo.js.map