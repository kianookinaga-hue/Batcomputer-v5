// BAT-OS v1.0 Terminal Module
let history = [];
let historyIndex = -1;

export function initTerminal(windowElement) {
    const container = windowElement.querySelector("#terminalApp");
    container.innerHTML = `
        <div id="terminalOutput"></div>
        <input id="terminalInput" type="text" autofocus placeholder="Enter command...">
    `;

    const output = container.querySelector("#terminalOutput");
    const input = container.querySelector("#terminalInput");

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const command = input.value.trim();
            input.value = "";
            runCommand(command, output);
            history.push(command);
            historyIndex = history.length;
        }

        if (e.key === "ArrowUp" && history.length > 0) {
            historyIndex = Math.max(0, historyIndex - 1);
            input.value = history[historyIndex];
        }
        if (e.key === "ArrowDown" && history.length > 0) {
            historyIndex = Math.min(history.length, historyIndex + 1);
            input.value = history[historyIndex] || "";
        }
    });
}

function runCommand(cmd, output) {
    appendOutput(`> ${cmd}`, output);

    const lower = cmd.toLowerCase();

    switch (lower) {
        case "help":
            return appendOutput(helpText(), output);
        case "clear":
            return (output.innerHTML = "");
        case "time":
            return appendOutput(new Date().toLocaleTimeString(), output);
        case "date":
            return appendOutput(new Date().toLocaleDateString(), output);
        case "system":
            return appendOutput(systemInfo(), output);
        case "whoami":
            return appendOutput("Operator: KIAN", output);
        case "version":
            return appendOutput("BAT-OS v1.0 // Prototype Build", output);
        case "reboot":
        case "restart":
            appendOutput("Rebooting system…", output);
            setTimeout(() => location.reload(), 800);
            return;
        case "logs":
            return appendOutput("Mission Logs module not yet connected.", output);
        case "intel":
            return appendOutput("Intel module not yet connected.", output);
        case "health":
            return appendOutput("Health diagnostics not yet connected.", output);
        default:
            return appendOutput("Unknown command. Type 'help' for assistance.", output);
    }
}

function appendOutput(text, output) {
    const line = document.createElement("div");
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

function helpText() {
    return `
Available commands:
help       Show this list
clear      Clear terminal
time       Show current time
date       Show date
system     System diagnostics
whoami     Identify operator
version    OS build info
reboot     Restart BAT-OS
logs       Open mission logs
intel      Open intel module
health     Open health module
`;
}

function systemInfo() {
    return `
BAT-OS SYSTEM STATUS:
CPU LOAD: 4%
MEMORY: STABLE
SECURITY: ACTIVE
USER: KIAN
NODE: HONOLULU
`;
}
