function randomize() {
    for (let step = 1; step < 5; step++) {

        Promise.all([
            fetch("/data/traan/market-prices.json").then(r => r.json()),
            fetch("/data/traan/market-lines.json").then(r => r.json())
        ])
        .then(([items, lines]) => {

            const item = items[Math.floor(Math.random() * items.length)];
            const line = lines[Math.floor(Math.random() * lines.length)];
            const card = document.getElementById(step);

            card.querySelector("h2").textContent = item.name;
            card.querySelector(".item-desc").textContent = line.line;
            card.querySelector(".price").childNodes[0].textContent = item.price + " ";
        })

        .catch(error => console.error("Error loading JSON:", error));
    }
}

randomize()