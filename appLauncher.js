// BAT-OS v1.0 App Launcher (Command Palette)
// Handles opening apps and displaying the launcher UI

import { createWindow } from "./windowManager.js";

let palette, inputField, listContainer;

//-----------------------------------------------------
// INIT APP LAUNCHER
//-----------------------------------------------------
export function initAppLauncher() {
    palette = document.getElementById("commandPalette");
    inputField = document.getElementById("commandInput");
    listContainer = document.getElementById("commandList");

    inputField.addEventListener("keyup", handleInput);
    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") hidePalette();
    });

    rebuildList();
}

//-----------------------------------------------------
// AVAILABLE APPS
//-----------------------------------------------------
const apps = {
    terminal: {
        label: "Terminal",
        launch: () => {
            createWindow({
                title: "Terminal",
                content: "<div id='terminalApp'>Terminal loaded.</div>"
            });
        }
    },
    logs: {
        label: "Mission Logs",
        launch: () => {
            createWindow({
                title: "Mission Logs",
                content: "<div>Mission Log module coming online.</div>"
            });
        }
    },
    intel: {
        label: "Intel Ops",
        launch: () => {
            createWindow({
                title: "Intel Ops",
                content: "<div>Intel module initializing.</div>"
            });
        }
    },
    health: {
        label: "Health Monitor",
        launch: () => {
            createWindow({
                title: "Health",
                content: "<div>Health diagnostics loading.</div>"
            });
        }
    },
    settings: {
        label: "System Settings",
        launch: () => {
            createWindow({
                title: "Settings",
                content: "<div>Settings panel placeholder.</div>"
            });
        }
    },
    restart: {
        label: "Restart System",
        launch: () => {
            location.reload();
        }
    }
};

//-----------------------------------------------------
// SHOW + HIDE PALETTE
//-----------------------------------------------------
export function showPalette() {
    palette.style.display = "flex";
    setTimeout(() => {
        palette.style.opacity = "1";
        inputField.focus();
    }, 10);
}

export function hidePalette() {
    palette.style.opacity = "0";
    setTimeout(() => {
        palette.style.display = "none";
        inputField.value = "";
        rebuildList();
    }, 200);
}

//-----------------------------------------------------
// INPUT HANDLING
//-----------------------------------------------------
function handleInput(e) {
    if (e.key === "Enter") {
        const command = inputField.value.trim().toLowerCase();
        if (apps[command]) {
            hidePalette();
            apps[command].launch();
        }
        return;
    }

    rebuildList(inputField.value.trim().toLowerCase());
}

//-----------------------------------------------------
// BUILD COMMAND LIST
//-----------------------------------------------------
function rebuildList(filter = "") {
    listContainer.innerHTML = "";

    Object.keys(apps).forEach((key) => {
        if (filter && !key.includes(filter)) return;

        const item = document.createElement("div");
        item.classList.add("commandItem");
        item.textContent = key;
        item.addEventListener("click", () => {
            hidePalette();
            apps[key].launch();
        });

        listContainer.appendChild(item);
    });
}
