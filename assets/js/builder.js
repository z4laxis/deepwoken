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