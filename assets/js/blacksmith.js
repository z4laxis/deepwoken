const name = document.getElementById("name");
const description = document.getElementById("description");
const price = document.getElementById("price");
const talent = document.getElementById("talent");

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
            name.textContent = outfit.name
            price.textContent = outfit.price
        })
        .catch(err => console.error(err));
    });
});