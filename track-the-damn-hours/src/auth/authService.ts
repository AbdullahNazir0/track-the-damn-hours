import * as vscode from "vscode";

export async function login(context: vscode.ExtensionContext) {
    const loginUrl = vscode.Uri.parse("http://localhost:5173/login?source=vscode");

    vscode.env.openExternal(loginUrl);

    vscode.window.showInformationMessage("🌐 Please complete login in your browser.");
}