import { ChildProcess, SpawnSyncReturns, spawnSync, spawn } from 'child_process';
import { getWSLLauncherPath } from './handlePath';

export function spawnZshScript(scriptCode: string, pathZsh: string, outputHandler?: (output: string, category?: string ) => void): ChildProcess{
	const currentShell  = (process.platform === "win32") ? getWSLLauncherPath(false) : pathZsh;
	const optionalZshPathArgument = (currentShell !== pathZsh) ? pathZsh : "";

	let spawnedProcess = spawn(currentShell, [optionalZshPathArgument, "-c", scriptCode].filter(arg => arg !== ""), { stdio: ["pipe", "pipe", "pipe"], shell: false});

	if (outputHandler) {
		spawnedProcess.on("error", (error) => {
			outputHandler(`${error}`, `console`);
		});

		spawnedProcess.stderr.on("data", (data) => {
			outputHandler(`${data}`, `stderr`);
		});

		spawnedProcess.stdout.on("data", (data) => {
			outputHandler(`${data}`, `stdout`);
		});
	}

	return spawnedProcess;
}

export function spawnZshScriptSync(scriptCode: string, pathZsh: string, spawnTimeout: number): SpawnSyncReturns<Buffer>{
	const currentShell  = (process.platform === "win32") ? getWSLLauncherPath(false) : pathZsh;
	const optionalZshPathArgument = (currentShell !== pathZsh) ? pathZsh : "";

	return spawnSync(currentShell, [optionalZshPathArgument, "-c", scriptCode].filter(arg => arg !== ""), { timeout: spawnTimeout, shell: false });
}