const panelItems = document.querySelectorAll(".panel-item");
const buttons = document.querySelectorAll(".filter");
const rightPanels = document.querySelectorAll(".right-panel");

panelItems.forEach(item => {
    const panelId = item.id + "-window";
    const panel = document.getElementById(panelId);

    if (item.getAttribute("data-active") === "true") {
        if (panel) panel.classList.remove("hidden");
    } else {
        if (panel) panel.classList.add("hidden");
    }

    item.addEventListener("click", function () {
        panelItems.forEach(panel => {
            panel.setAttribute("data-active", "false");
            const panelWindow = document.getElementById(panel.id + "-window");
            if (panelWindow) panelWindow.classList.add("hidden");
        });

        this.setAttribute("data-active", "true");

        if (panel) panel.classList.remove("hidden");
    });
});

buttons.forEach(button => {
    button.addEventListener("click", function () {
        buttons.forEach(btn => {
            btn.setAttribute("data-pressed", "false");
        });

        this.setAttribute("data-pressed", "true");
    });
});