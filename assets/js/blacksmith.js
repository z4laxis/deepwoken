document.querySelectorAll('.panel-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.panel-item').forEach(i => {
            i.dataset.active = "false";
        });
        item.dataset.active = "true";

        document.getElementById("iframe").src = `/assets/iframes/blacksmith?outfit=${item.id}`;

        fetch('/assets/json/outfits.json')
        .then(res => res.json())
        .then(outfits => {
            const outfit = outfits[item.id];
            console.log("Outfit :", outfit);
        })
        .catch(err => console.error(err));

    });
});