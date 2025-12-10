const panelItems = document.querySelectorAll(".panel-item");
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