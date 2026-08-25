function select(selectID) {
    const selectedElement = document.getElementById(selectID);
    fetch('/data/builder.json')
        .then(res => res.json())
        .then(elements => {
            selectedElement.style.width = elements[selectedElement.value].width;
        })
        .catch(err => console.error(err));
}

document.querySelectorAll(".stat").forEach(node => {
    node.addEventListener("keydown", function(event) {
        if (event.key === "-" || event.key === "e" || event.key === "+" || event.key === ".") {
            event.preventDefault();
        }
    });

    node.addEventListener("blur", function(event) {
        let val = this.value.replace(/[^0-9]/g, "");

        if (val === "") {
            this.value = "0";
            return;
        }

        val = val.replace(/^0+/, "");
        if (val === "") {
            val = "0";
        }

        let num = parseInt(val, 10);
        let maxVal = parseInt(this.max, 10) || Number.MAX_SAFE_INTEGER;

        const parentRow = this.closest(".stat-row");
        if (parentRow && parentRow.classList.contains("traits")) {
            maxVal = 6; 
            
            let otherSum = 0;
            const traits = parentRow.querySelectorAll(".stat");
            traits.forEach(trait => {
                if (trait !== this && !trait.hasAttribute("hidden")) {
                    otherSum += parseInt(trait.value || "0", 10);
                }
            });
            
            const availableAmount = 12 - otherSum;
            if (maxVal > availableAmount) {
                maxVal = Math.max(0, availableAmount);
            }
        }

        if (num > maxVal) {
            num = maxVal;
        }

        this.value = num;
    });

    node.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            const element = document.getElementById(node.dataset.element);
            if (element) {
                let val = parseFloat(element.value);
                if (val > 100) element.value = 100;
                if (val < 0) element.value = 0;
            }
        }
    }); 
});

panelItems.forEach(item => {
    const panelId = item.id + "-window";
    const panel = document.getElementById(panelId);

    if (item.getAttribute("data-active") === "true") {
        if (panel) panel.classList.remove("hidden");
    } else {
        if (panel) panel.classList.add("hidden");
    }

    item.addEventListener("click", function () {
        const activeItem = this;

        panelItems.forEach(panel => {
            panel.setAttribute("data-active", "false");
            const panelWindow = document.getElementById(panel.id + "-window");
            if (panelWindow) panelWindow.classList.add("hidden");
            activeItem.querySelector("img").src = `/assets/images/icons/builder/tabs/${activeItem.id}.png`;
        });

        activeItem.setAttribute("data-active", "true");
        activeItem.querySelector("img").src = `/assets/images/icons/builder/tabs/${activeItem.id}hover.png`;

        const activePanel = document.getElementById(activeItem.id + "-window");
        if (activePanel) activePanel.classList.remove("hidden");
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