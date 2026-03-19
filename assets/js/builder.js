function select() {
    const selectedAspect = document.getElementById('aspect');
    fetch('/assets/json/builder.json')
        .then(res => res.json())
        .then(aspects => {
            selectedAspect.style.width = aspects[selectedAspect.value].width;
        })
        .catch(err => console.error(err));
}