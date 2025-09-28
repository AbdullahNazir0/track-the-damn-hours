import * as vscode from 'vscode';
import { login } from "./auth/authService";
import { AuthUriHandler } from './auth/uriHandler';

const TOKEN_KEY = "authToken";

export async function getToken(context: vscode.ExtensionContext): Promise<string | null> {
	return await context.secrets.get(TOKEN_KEY) || null;
}

export async function saveToken(context: vscode.ExtensionContext, token: string) {
	await context.secrets.store(TOKEN_KEY, token);
}

export async function clearToken(context: vscode.ExtensionContext) {
	await context.secrets.delete(TOKEN_KEY);
}

export async function activate(context: vscode.ExtensionContext) {

	const token = await getToken(context);

	if (!token) {
		vscode.window.showInformationMessage("You are not logged in. Redirecting to login...");
		vscode.commands.executeCommand("trackTime.login"); // trigger login automatically
	}

	vscode.window.showInformationMessage("Welcome back! Token loaded.");

	context.subscriptions.push(
		vscode.commands.registerCommand("trackTime.login", async () => {
			await login(context);
		})
	);

	const uriHandler = new AuthUriHandler(context);
	context.subscriptions.push(vscode.window.registerUriHandler(uriHandler));
}

export function deactivate() { }
