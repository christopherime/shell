"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode_1 = require("vscode");
const vscode_languageclient_1 = require("vscode-languageclient");
const path = __importStar(require("path"));
const statusBar_1 = require("./apis/statusBar");
function activate(context) {
    const outputChannel = vscode_1.window.createOutputChannel('GraphQL Language Server');
    const config = getConfig();
    const { debug } = config;
    if (debug) {
        console.log('Extension "vscode-graphql" is now active!');
    }
    const serverPath = path.join('out', 'server', 'index.js');
    const serverModule = context.asAbsolutePath(serverPath);
    const debugOptions = {
        execArgv: ['--nolazy', '--inspect=localhost:6009'],
    };
    const serverOptions = {
        run: {
            module: serverModule,
            transport: vscode_languageclient_1.TransportKind.ipc,
        },
        debug: {
            module: serverModule,
            transport: vscode_languageclient_1.TransportKind.ipc,
            options: { ...(debug ? debugOptions : {}) },
        },
    };
    const clientOptions = {
        documentSelector: [
            { scheme: 'file', language: 'graphql' },
            { scheme: 'file', language: 'javascript' },
            { scheme: 'file', language: 'javascriptreact' },
            { scheme: 'file', language: 'typescript' },
            { scheme: 'file', language: 'typescriptreact' },
        ],
        synchronize: {
            fileEvents: [
                vscode_1.workspace.createFileSystemWatcher('/{graphql.config.*,.graphqlrc,.graphqlrc.*,package.json}', false, true),
                vscode_1.workspace.createFileSystemWatcher('**/{*.graphql,*.graphqls,*.gql,*.js,*.mjs,*.cjs,*.esm,*.es,*.es6,*.jsx,*.ts,*.tsx}'),
            ],
        },
        outputChannel,
        outputChannelName: 'GraphQL Language Server',
        revealOutputChannelOn: vscode_languageclient_1.RevealOutputChannelOn.Never,
        initializationFailedHandler: err => {
            outputChannel.appendLine('Initialization failed');
            outputChannel.appendLine(err.message);
            if (err.stack) {
                outputChannel.appendLine(err.stack);
            }
            if (debug) {
                outputChannel.show();
            }
            return false;
        },
    };
    const client = new vscode_languageclient_1.LanguageClient('vscode-graphql', 'GraphQL Language Server', serverOptions, clientOptions, debug);
    let clientLSPDisposable = client.start();
    context.subscriptions.push(clientLSPDisposable);
    const commandShowOutputChannel = vscode_1.commands.registerCommand('vscode-graphql.showOutputChannel', () => outputChannel.show());
    context.subscriptions.push(commandShowOutputChannel);
    const statusBarItem = (0, statusBar_1.createStatusBar)();
    context.subscriptions.push(statusBarItem);
    client.onReady().then(() => {
        (0, statusBar_1.initStatusBar)(statusBarItem, client, vscode_1.window.activeTextEditor);
    });
    vscode_1.commands.registerCommand('vscode-graphql.restart', async () => {
        outputChannel.appendLine(`Stopping GraphQL LSP`);
        await client.stop();
        clientLSPDisposable.dispose();
        outputChannel.appendLine(`Restarting GraphQL LSP`);
        clientLSPDisposable = client.start();
        context.subscriptions.push(clientLSPDisposable);
        outputChannel.appendLine(`GraphQL LSP restarted`);
    });
}
exports.activate = activate;
function deactivate() {
    console.log('Extension "vscode-graphql" has been de-activated!!');
}
exports.deactivate = deactivate;
function getConfig() {
    return vscode_1.workspace.getConfiguration('vscode-graphql', vscode_1.window.activeTextEditor ? vscode_1.window.activeTextEditor.document.uri : null);
}
//# sourceMappingURL=extension.js.map