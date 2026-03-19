function select(selectID) {
    const selectedElement = document.getElementById(selectID);
    fetch('/assets/json/builder.json')
        .then(res => res.json())
        .then(elements => {
            selectedElement.style.width = elements[selectedElement.value].width;
        })
        .catch(err => console.error(err));
}