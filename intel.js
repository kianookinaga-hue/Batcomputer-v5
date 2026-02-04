// BAT-OS v1.0 Intel Module
// Tactical system data + placeholder weather conditions

export function initIntel(windowElement) {
    const container = windowElement.querySelector("#intelApp");
    container.innerHTML = `
        <div id="intelOutput"></div>
        <button id="refreshIntelBtn">Refresh Intel</button>
    `;

    const output = container.querySelector("#intelOutput");
    const refreshBtn = container.querySelector("#refreshIntelBtn");

    loadIntel(output);

    refreshBtn.addEventListener("click", () => loadIntel(output));
}

function loadIntel(output) {
    const now = new Date();

    const intelData = {
        location: "HONOLULU NODE",
        time: now.toLocaleTimeString(),
        date: now.toLocaleDateString(),
        temperature: approxTemp(),
        humidity: approxHumidity(),
        uvIndex: approxUV(),
        status: tacticalStatus()
    };

    output.innerHTML = `
        <strong>WAYNE INTEL SYSTEM</strong><br>
        LOCATION: ${intelData.location}<br>
        DATE: ${intelData.date}<br>
        TIME: ${intelData.time}<br><br>

        TEMP: ${intelData.temperature}°F<br>
        HUMIDITY: ${intelData.humidity}%<br>
        UV INDEX: ${intelData.uvIndex}<br>
        CONDITIONS: ${intelData.status}<br>

        <hr>
        <em>API Hook Ready: Replace placeholder values with live data when external API is added.</em>
    `;
}

function approxTemp() {
    return Math.floor(75 + Math.random() * 4);
}

function approxHumidity() {
    return Math.floor(60 + Math.random() * 20);
}

function approxUV() {
    return Math.floor(3 + Math.random() * 6);
}

function tacticalStatus() {
    const statuses = [
        "CLEAR",
        "HUMID",
        "LIGHT CLOUD",
        "OVERCAST",
        "WIND SHIFT",
        "STABLE",
        "UNEVEN SKY"
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
}
