const aspectSelection = document.getElementById('aspects');

function select() {
    const selectedAspect = document.getElementById('aspect').value;
    fetch('/assets/json/builder.json')
        .then(res => res.json())
        .then(aspects => {
            aspectSelection.style.width = aspects[selectedAspect].width;
        })
        .catch(err => console.error(err));
}