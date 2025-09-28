import * as vscode from "vscode";
import { saveToken } from "../extension";

export class AuthUriHandler implements vscode.UriHandler {
    constructor(private context: vscode.ExtensionContext) { }
    
    async handleUri(uri: vscode.Uri): Promise<void> {
        const query = new URLSearchParams(uri.query);
        const token = query.get("token");

        if (!token) {
            vscode.window.showErrorMessage("❌ Login failed, no token received.");
        }

        await saveToken(this.context, token!);
        vscode.window.showInformationMessage("✅ Logged in successfully!");
    }
} 