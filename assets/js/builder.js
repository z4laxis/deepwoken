function select() {
    const selectedAspect = document.getElementById('aspects').value;
    fetch('/assets/json/builder.json')
        .then(res => res.json())
        .then(aspects => {
            console.log(aspects[selectedAspect]);
            console.log(aspects[selectedAspect.width]);
        })
        .catch(err => console.error(err));
}