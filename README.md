# VS Code Zsh Debug
A zsh debugger GUI frontend based on awesome `zshdb` scripts (zshdb included in package).

# Overview
This is a SIMPLE zshdb debugger frontend. Useful for learning zsh shell usage and writing simple scripts.

Useful hint: shellcheck extension does a great job with finding common script errors before debugging.

## Usage
1. Select **Debug -> Add Configuration** to add custom debug configuration (drop-down, path-input, etc...)
1. Select **Debug -> Start Debugging (F5)** to start debugging

See https://code.visualstudio.com/docs/editor/debugging for general usage.

## Sample features
- Debugging auto-configuration via `launch.json`

[<img src="https://raw.githubusercontent.com/rogalmic/vscode-zsh-debug/gif/images/zsh-debug-samp-launch-autoconfig.gif" width="400" style="filter: blur(1px); " title="Click to show in browser" />](https://raw.githubusercontent.com/rogalmic/vscode-zsh-debug/gif/images/zsh-debug-samp-launch-autoconfig.gif)

- Simple debugging in hello world application

[<img src="https://raw.githubusercontent.com/rogalmic/vscode-zsh-debug/gif/images/zsh-debug-samp-hello-world.gif" width="400" style="filter: blur(1px); " title="Click to show in browser"/>](https://raw.githubusercontent.com/rogalmic/vscode-zsh-debug/gif/images/zsh-debug-samp-hello-world.gif)

- Standard input handling via terminal

[<img src="https://raw.githubusercontent.com/rogalmic/vscode-zsh-debug/gif/images/zsh-debug-samp-stdin-usage.gif" width="400" style="filter: blur(1px); " title="Click to show in browser"/>](https://raw.githubusercontent.com/rogalmic/vscode-zsh-debug/gif/images/zsh-debug-samp-stdin-usage.gif)

- Pause support while script is running

[<img src="https://raw.githubusercontent.com/rogalmic/vscode-zsh-debug/gif/images/zsh-debug-samp-pause-support.gif" width="400" style="filter: blur(1px); " title="Click to show in browser"/>](https://raw.githubusercontent.com/rogalmic/vscode-zsh-debug/gif/images/zsh-debug-samp-pause-support.gif)

- Advanced "Watch" and "Debug console" usage

[<img src="https://raw.githubusercontent.com/rogalmic/vscode-zsh-debug/gif/images/zsh-debug-samp-watch-advanced.gif" width="400" style="filter: blur(1px); " title="Click to show in browser"/>](https://raw.githubusercontent.com/rogalmic/vscode-zsh-debug/gif/images/zsh-debug-samp-watch-advanced.gif)

- Conditional breakpoints usage

[<img src="https://raw.githubusercontent.com/rogalmic/vscode-zsh-debug/gif/images/zsh-debug-samp-conditional-breakpoints.gif" width="400" style="filter: blur(1px); " title="Click to show in browser"/>](https://raw.githubusercontent.com/rogalmic/vscode-zsh-debug/gif/images/zsh-debug-samp-conditional-breakpoints.gif)

For Windows users:
- Install [Windows Subsystem for Linux](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux)
- Terminal has problems with spaces in paths when powershell is used, use [WSL zsh](https://github.com/Microsoft/vscode/issues/22317) instead
- for now, debugging fails with `zsh:15: nice(5) failed: operation not permitted` (https://github.com/Microsoft/WSL/issues/1838)

For macOS users:
- Read [here](https://github.com/rogalmic/vscode-zsh-debug/wiki/macOS:-avoid-use-of--usr-local-bin-pkill) if your mac has `/usr/local/bin/pkill`.

## Dependencies
1. `zsh` version `4.3.6-dev-2` or later
2. `cat`, `mkfifo`, `rm`, `pkill`

## Limitations and known problems
* Currently debugger stops at first command
* `$0` variable shows path to zshdb
