import { spawnZshScriptSync } from './spawnZsh';

enum validatePathResult {
	success = 0,
	notExistCwd,
	notFoundZsh,
	notFoundZshdb,
	notFoundCat,
	notFoundMkfifo,
	notFoundPkill,
	timeout,
	cannotChmod,
	unsupportedZshVersion,
	unknown,
}

/**
 * @example
 * _validatePath("./", "zsh", "type", "type", "type", "type");
 * // => validatePathResult.success
 *
 * @example
 * _validatePath("non-exist-directory", "zsh", "type", "type", "type", "type");
 * // => validatePathResult.notExistCwd
 *
 * @example
 * _validatePath("./", "invalid-zsh-path", "type", "type", "type", "type");
 * // => validatePathResult.notFoundZsh
 *
 * @example
 * _validatePath("./", "zsh", "invalid-zshdb-path", "type", "type", "type");
 * // => validatePathResult.notFoundZshdb
 *
 * @example
 * _validatePath("./", "zsh", "type", "invalid-cat-path", "type", "type");
 * // => validatePathResult.notFoundCat
 *
 * @example
 * _validatePath("./", "zsh", "type", "type", "invalid-mkfifo-path", "type");
 * // => validatePathResult.notFoundMkfifo
 *
 * @example
 * _validatePath("./", "zsh", "type", "type", "type", "invalid-pkill-path");
 * // => validatePathResult.notFoundPkill
 *
 * @example
 * _validatePath("./", "zsh", "type", "type", "type", "invalid-pkill-path");
 * // => validatePathResult.notFoundPkill
 *
 * @example
 * _validatePath("invalid-path", "invalid-path", "invalid-path", "invalid-path", "invalid-path", "invalid-path");
 * // => validatePathResult.notFoundZsh
 *
 * @example
 * _validatePath("./", "zsh", "", "", "", "", 1);
 * // => validatePathResult.timeout
 */
function _validatePath(cwd: string,
	pathZsh: string, pathZshdb: string, pathCat: string, pathMkfifo: string, pathPkill: string, spawnTimeout: number = 5000): [validatePathResult, string] {

	const vpr = validatePathResult;

	const proc = spawnZshScriptSync(
		((pathZshdb.indexOf("zshdb_dir") > 0) ? `chmod +x "${pathZshdb}" || exit ${vpr.cannotChmod};` : ``) +
		`type "${pathZshdb}" || exit ${vpr.notFoundZshdb};` +
		`type "${pathCat}" || exit ${vpr.notFoundCat};` +
		`type "${pathMkfifo}" || exit ${vpr.notFoundMkfifo};` +
		`type "${pathPkill}" || exit ${vpr.notFoundPkill};` +
		`test -d "${cwd}" || exit ${vpr.notExistCwd};` , pathZsh, spawnTimeout);

	if (proc.error !== undefined) {
		// @ts-ignore Property 'code' does not exist on type 'Error'.
		if (proc.error.code === "ENOENT") {
			return [vpr.notFoundZsh, ""];
		}
		// @ts-ignore Property 'code' does not exist on type 'Error'.
		if (proc.error.code === "ETIMEDOUT") {
			return [vpr.timeout, ""];
		}
		return [vpr.unknown, ""];
	}

	const errorString = proc.stderr.toString();

	return [<validatePathResult>proc.status, errorString];
}

/**
 * @returns "" on success, non-empty error message on failure.
 * @example
 * validatePath("./", "zsh", "type", "type", "type", "type");
 * // => ""
 * @example
 * validatePath("non-exist-directory", "zsh", "type", "type", "type", "type");
 * // => "Error: cwd (non-exist-directory) does not exist."
 */
export function validatePath(cwd: string,
	pathZsh: string, pathZshdb: string, pathCat: string, pathMkfifo: string, pathPkill: string): string {

	const rc = _validatePath(cwd, pathZsh, pathZshdb, pathCat, pathMkfifo, pathPkill);

	const askReport = `If it is reproducible, please report it to https://github.com/rogalmic/vscode-zsh-debug/issues.`;

	const stderrContent = `\n\n${rc["1"]}`;

	switch (rc["0"]) {
		case validatePathResult.success: {
			return ``;
		}
		case validatePathResult.notExistCwd: {
			return `Error: cwd (${cwd}) does not exist.` + stderrContent;
		}
		case validatePathResult.notFoundZsh: {
			return `Error: zsh not found. (pathZsh: ${pathZsh})` + stderrContent;
		}
		case validatePathResult.notFoundZshdb: {
			return `Error: zshdb not found. (pathZshdb: ${pathZshdb})` + stderrContent;
		}
		case validatePathResult.notFoundCat: {
			return `Error: cat not found. (pathCat: ${pathCat})` + stderrContent;
		}
		case validatePathResult.notFoundMkfifo: {
			return `Error: mkfifo not found. (pathMkfifo: ${pathMkfifo})` + stderrContent;
		}
		case validatePathResult.notFoundPkill: {
			return `Error: pkill not found. (pathPkill: ${pathPkill})` + stderrContent;
		}
		case validatePathResult.timeout: {
			return `Error: BUG: timeout while validating environment. ` + askReport  + stderrContent;
		}
		case validatePathResult.cannotChmod: {
			return `Error: Cannot chmod +x internal zshdb copy.` + stderrContent;
		}
		case validatePathResult.unsupportedZshVersion: {
			return `Error: Only zsh versions 4.* are supported.` + stderrContent;
		}
		case validatePathResult.unknown: {
			return `Error: BUG: unknown error ocurred while validating environment. ` + askReport + stderrContent;
		}
	}

	return `Error: BUG: reached to unreachable code while validating environment (code ${rc}). ` + askReport + stderrContent;
}

