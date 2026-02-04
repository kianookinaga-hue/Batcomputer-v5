// BAT-OS v1.0 Mission Logs Module
// Local-storage based detective journal system

export function initMissionLogs(windowElement) {
    const container = windowElement.querySelector("#logsApp");
    container.innerHTML = `
        <div id="logsOutput"></div>
        <textarea id="logInput" placeholder="Write observation..."></textarea>
        <button id="saveLogBtn">Save Entry</button>
    `;

    const output = container.querySelector("#logsOutput");
    const input = container.querySelector("#logInput");
    const saveBtn = container.querySelector("#saveLogBtn");

    loadLogs(output);

    saveBtn.addEventListener("click", () => {
        const text = input.value.trim();
        if (!text) return;

        const entry = {
            time: new Date().toLocaleString(),
            note: text
        };

        const logs = JSON.parse(localStorage.getItem("bat_logs") || "[]");
        logs.push(entry);
        localStorage.setItem("bat_logs", JSON.stringify(logs));

        input.value = "";
        loadLogs(output);
    });
}

function loadLogs(output) {
    output.innerHTML = "";

    const logs = JSON.parse(localStorage.getItem("bat_logs") || "[]");

    logs.forEach((entry) => {
        const div = document.createElement("div");
        div.classList.add("logEntry");
        div.innerHTML = `
            <strong>${entry.time}</strong><br>
            ${entry.note}
            <hr>
        `;
        output.appendChild(div);
    });
}