// BAT-OS v1.0 Window Manager
let highestZ = 10;
let windowCount = 0;
const minimizedWindows = {};

export function createWindow({ title = "WINDOW", content = "" }) {
    windowCount++;

    const win = document.createElement("div");
    win.classList.add("batWindow");
    win.style.zIndex = highestZ++;

    win.innerHTML = `
        <div class="windowControls">
            <span class="maxBtn">■</span>
            <span class="minBtn">–</span>
            <span class="closeBtn">×</span>
        </div>
        <div class="windowContent">${content}</div>
        <div class="resizeHandle"></div>
    `;

    document.body.appendChild(win);

    setupDrag(win);
    setupResize(win);
    setupControls(win);

    return win;
}

function setupDrag(win) {
    const ctrl = win.querySelector(".windowControls");

    let offsetX = 0, offsetY = 0, dragging = false;

    ctrl.addEventListener("pointerdown", (e) => {
        dragging = true;
        highestZ++;
        win.style.zIndex = highestZ;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
    });

    window.addEventListener("pointermove", (e) => {
        if (!dragging) return;
        win.style.left = e.clientX - offsetX + "px";
        win.style.top = e.clientY - offsetY + "px";
    });

    window.addEventListener("pointerup", () => dragging = false);
}

function setupResize(win) {
    const handle = win.querySelector(".resizeHandle");

    let resizing = false, startX = 0, startY = 0;

    handle.addEventListener("pointerdown", (e) => {
        resizing = true;
        startX = e.clientX;
        startY = e.clientY;
        e.preventDefault();
    });

    window.addEventListener("pointermove", (e) => {
        if (!resizing) return;
        const w = win.offsetWidth + (e.clientX - startX);
        const h = win.offsetHeight + (e.clientY - startY);
        win.style.width = w + "px";
        win.style.height = h + "px";
        startX = e.clientX;
        startY = e.clientY;
    });

    window.addEventListener("pointerup", () => resizing = false);
}

function setupControls(win) {
    const closeBtn = win.querySelector(".closeBtn");
    const minBtn = win.querySelector(".minBtn");
    const maxBtn = win.querySelector(".maxBtn");

    closeBtn.addEventListener("click", () => win.remove());

    minBtn.addEventListener("click", () => {
        win.style.display = "none";
        minimizedWindows[win.dataset?.id || Math.random()] = win;
    });

    maxBtn.addEventListener("click", () => {
        if (win.classList.contains("maximized")) {
            win.classList.remove("maximized");
            win.style.width = "400px";
            win.style.height = "260px";
        } else {
            win.classList.add("maximized");
            win.style.top = "0px";
            win.style.left = "0px";
            win.style.width = window.innerWidth + "px";
            win.style.height = window.innerHeight - 40 + "px";
        }
    });
}
