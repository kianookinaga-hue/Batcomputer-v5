// BAT-OS v1.0 Health Module
// Manual vitals dashboard + diagnostics

export function initHealth(windowElement) {
    const container = windowElement.querySelector("#healthApp");
    container.innerHTML = `
        <div id="healthOutput"></div>

        <div id="healthInputs">
            <input id="heartRate" type="number" placeholder="Heart Rate (bpm)">
            <input id="energyLevel" type="number" placeholder="Energy Level (1-10)">
            <input id="stressLevel" type="number" placeholder="Stress Level (1-10)">
            <button id="saveHealthBtn">Update</button>
        </div>
    `;

    const output = container.querySelector("#healthOutput");
    const btn = container.querySelector("#saveHealthBtn");

    loadHealth(output);

    btn.addEventListener("click", () => updateHealth(output));
}

//-----------------------------------------------------
// LOAD EXISTING HEALTH DATA
//-----------------------------------------------------
function loadHealth(output) {
    const stored = JSON.parse(localStorage.getItem("bat_health") || "{}");

    output.innerHTML = `
        <strong>WAYNE HEALTH MONITOR</strong><br><br>
        HEART RATE: ${stored.heartRate || "..."} bpm<br>
        ENERGY LEVEL: ${stored.energyLevel || "..."} /10<br>
        STRESS LEVEL: ${stored.stressLevel || "..."} /10<br>
        CONDITION: ${stored.condition || "No Data"}<br>
        <hr>
    `;
}

//-----------------------------------------------------
// UPDATE HEALTH & WRITE DIAGNOSTICS
//-----------------------------------------------------
function updateHealth(output) {
    const hr = document.getElementById("heartRate").value;
    const energy = document.getElementById("energyLevel").value;
    const stress = document.getElementById("stressLevel").value;

    if (!hr && !energy && !stress) return;

    const condition = diagnose(hr, energy, stress);

    const data = {
        heartRate: hr,
        energyLevel: energy,
        stressLevel: stress,
        condition
    };

    localStorage.setItem("bat_health", JSON.stringify(data));
    loadHealth(output);
}

//-----------------------------------------------------
// BASIC ANALYSIS ALGORITHM
//-----------------------------------------------------
function diagnose(hr, energy, stress) {
    const h = parseInt(hr);
    const e = parseInt(energy);
    const s = parseInt(stress);

    if (!h || !e || !s) return "Incomplete Data";

    if (h > 120 || s >= 8) return "ELEVATED ALERT";
    if (h < 55 && e <= 4) return "LOW PERFORMANCE STATE";
    if (e >= 7 && s <= 3) return "OPTIMAL CONDITION";

    return "STABLE";
}
