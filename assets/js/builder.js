function select() {
    const selectedAspect = document.getElementById('aspects').value;
    fetch('/assets/json/builder.json')
        .then(res => res.json())
        .then(aspects => {
            console.log(aspects);
            console.log(selectedAspect);
        })
        .catch(err => console.error(err));
}