function select(selectID) {
    const selectedElement = document.getElementById(selectID);
    fetch('/assets/json/builder.json')
        .then(res => res.json())
        .then(elements => {
            selectedElement.style.width = elements[selectedElement.value].width;
        })
        .catch(err => console.error(err));
}

document.querySelectorAll(".stat").forEach(node => {
    // Prevent typing specific characters like '-', 'e', '+', '.'
    node.addEventListener("keydown", function(event) {
        if (event.key === "-" || event.key === "e" || event.key === "+" || event.key === ".") {
            event.preventDefault();
        }
    });

    // Apply filters when the input loses focus (after typing)
    node.addEventListener("blur", function(event) {
        // Remove non-numeric characters
        let val = this.value.replace(/[^0-9]/g, "");

        // Keep 0 if empty
        if (val === "") {
            this.value = "0";
            return;
        }

        // Remove leading zeros ("0n" becomes "n")
        val = val.replace(/^0+/, "");
        if (val === "") {
            val = "0";
        }

        let num = parseInt(val, 10);
        let maxVal = parseInt(this.max, 10) || Number.MAX_SAFE_INTEGER;

        // Logic specifically for traits row
        const parentRow = this.closest(".stat-row");
        if (parentRow && parentRow.classList.contains("traits")) {
            maxVal = 6; // Maximum for a single trait
            
            // Calculate the sum of all other traits
            let otherSum = 0;
            const traits = parentRow.querySelectorAll(".stat");
            traits.forEach(trait => {
                if (trait !== this && !trait.hasAttribute("hidden")) {
                    otherSum += parseInt(trait.value || "0", 10);
                }
            });
            
            // The maximum available points for this trait so the total doesn't exceed 12
            const availableAmount = 12 - otherSum;
            if (maxVal > availableAmount) {
                maxVal = Math.max(0, availableAmount);
            }
        }

        // Clamp the number to the allowed maximum
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