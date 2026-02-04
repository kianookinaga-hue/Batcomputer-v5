// BAT-OS v1.0 Personality Engine
// Controls system tone for terminal output

export let currentMode = "default";

//-----------------------------------------------------
// SET PERSONALITY MODE
//-----------------------------------------------------
export function setMode(mode) {
    const valid = ["default", "analysis", "alert", "shadow"];

    if (!valid.includes(mode)) return false;

    currentMode = mode;
    return true;
}

//-----------------------------------------------------
// GET CURRENT MODE
//-----------------------------------------------------
export function getMode() {
    return currentMode;
}

//-----------------------------------------------------
// FORMAT OUTPUT BASED ON MODE
//-----------------------------------------------------
export function respond(text) {
    switch (currentMode) {
        case "analysis":
            return "[ANALYSIS] " + text;

        case "alert":
            return "[ALERT] " + text.toUpperCase();

        case "shadow":
            return text.toLowerCase().replace(/\./g, "...");

        default:
            return text;
    }
}
