// BAT-OS v1.0 Boot Module
// Handles cinematic startup sequence and transitions into the desktop

export function startBootSequence() {
    const bootScreen = document.getElementById("boot");
    const desktop = document.getElementById("desktop");

    // Play boot audio (hum + static)
    const audio = new Audio("assets/boot_hum_static.mp3");
    audio.volume = 0.35;
    audio.play().catch(() => {
        // iOS may block autoplay, ignore silently
    });

    // Fade out audio early (3.2s)
    setTimeout(() => {
        const fadeInterval = setInterval(() => {
            if (audio.volume > 0.01) {
                audio.volume -= 0.02;
            } else {
                audio.pause();
                clearInterval(fadeInterval);
            }
        }, 50);
    }, 3200);

    // System text typing simulation
    const lines = [
        "WAYNE SYSTEMS // NODE: KIAN",
        "INITIALIZING...",
        "SECURITY PROTOCOLS: ACTIVE",
        "SYSTEM INTEGRITY: STABLE",
        "LOADING MODULES...",
        "BOOT COMPLETE"
    ];

    let index = 0;
    const terminal = document.getElementById("bootText");

    function typeNextLine() {
        if (index < lines.length) {
            const line = document.createElement("div");
            line.textContent = lines[index];
            terminal.appendChild(line);
            index++;
            setTimeout(typeNextLine, 550); 
        }
    }

    typeNextLine();

    // After 6.5 seconds → reveal desktop
    setTimeout(() => {
        bootScreen.style.opacity = "0";
        setTimeout(() => {
            bootScreen.style.display = "none";
            desktop.style.display = "block";
            desktop.style.opacity = "1";
        }, 500);
    }, 6500);
}
