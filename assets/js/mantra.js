const urlParams = new URLSearchParams(window.location.search);
const mantra = urlParams.get("query");

const titleInput = document.getElementById("title-input");
const updateButton = document.getElementById("update-card");

const title = document.getElementById("card-title");
const mantrapreview = document.getElementById("mantra-preview");
const icon = document.querySelector(".card-icon");
const description = document.querySelector(".description-container .description");

const oneStar = document.querySelector(".onestar");
const twoStar = document.querySelector(".twostar");
const threeStar = document.querySelector(".threestar");
const category = document.querySelector(".card-class");

let mantraDataCache = null;

function fetchMantraData(mantraName) {
    if (!mantraDataCache) {
        fetch("/assets/json/mantras.json")
            .then(res => {
                if (!res.ok) throw new Error("Failed to load mantras.json");
                return res.json();
            })
            .then(json => {
                mantraDataCache = json;
                findAndUpdateMantra(mantraName);
            })
            .catch(err => console.error("Fetch error:", err));
    } else {
        findAndUpdateMantra(mantraName);
    }
}

function findAndUpdateMantra(mantraName) {
    if (!mantraDataCache) return;

    const key = mantraName.toLowerCase();
    const mantraObj = mantraDataCache[key];

    if (mantraObj) {
        updateCard(mantraObj);
    } else {
        console.warn("Mantra not found:", mantraName);
    }
}

function formatIconName(fileName) {
    if (fileName === "Flashfire Sweep") {
        return "ceaseless_slashes.png";
    } else if (fileName === "Wind Carve") {
        return "galetrap.png";
    } else if (fileName === "Neural Pathway") {
        return "revenge.png";
    } else if (fileName === "Dread Whisper") {
        return "gaze.png";
    } else if (fileName === "Glorious Charge") {
        return "rally.png";
    } else if (fileName === "Hidden Blade" || fileName === "Grand Warden's Axe") {
        return "lightning_blade.png";
 
    } else {
        return String(fileName).toLowerCase().replace(/ /g, "_") + ".png";
    }
}

function updateStars(stars) {
    const starValue = parseInt(stars, 10) || 0;
    if (oneStar && twoStar && threeStar) {
        oneStar.style.display = starValue === 1 ? "block" : "none";
        twoStar.style.display = starValue === 2 ? "block" : "none";
        threeStar.style.display = starValue === 3 ? "block" : "none";
    }
}

function setIcon(attunement, data) {
    if (!icon) return;

    if (data.type === "Attunement") {
        if (data.attribute.includes("Flamecharm")) {
            icon.src = "/assets/img/icons/talent/" + formatIconName(data.name);

        } else if (data.attribute.includes("Frostdraw")) {
            icon.src = "/assets/img/icons/talent/snowflake.png";

        } else if (attunement.Thundercall > 0) {
            icon.src = "/assets/img/icons/talent/" + formatIconName(data.name);

        } else if (attunement.Galebreathe > 0) {
            icon.src = "/assets/img/icons/talent/" + formatIconName(data.name);

        } else if (attunement.Shadowcast > 0) {
            icon.src = "/assets/img/icons/talent/rift.png";

        } else if (attunement.Ironsing > 0) {
            icon.src = "/assets/img/icons/talent/ironsing.png";

        } else if (attunement.Bloodrend > 0) {
            icon.src = "/assets/img/icons/talent/blood.png";
        }

    } else if (data.type === "Oath") {
        icon.src = "/assets/img/icons/talent/" + formatIconName(data.attribute);

    } else if (data.type === "Attunementless") {
        icon.src = "/assets/img/icons/talent/" + formatIconName(data.name);

    } else if (data.type === "Monster") {
        icon.src = "/assets/img/icons/talent/claw.png";
    
    } 
    
    if (data.name === "Pumpkin Pitch") {
        icon.src = "/assets/img/icons/talent/ball.png";
        
    } else if (data.name === "Soul Beam") {
        icon.src = "/assets/img/icons/talent/orb.png";
    }
}

function setCategory(attunement, data) {
    if (!category) return;

    if (data.type === "Attunement") {
        if (data.attribute.includes("Flamecharm")) {
            category.textContent = "Fire " + data.category;

        } else if (data.attribute.includes("Frostdraw")) {
            category.textContent = "Ice " + data.category;

        } else if (attunement.Thundercall > 0) {
            category.textContent = "Lightning " + data.category;

        } else if (attunement.Galebreathe > 0) {
            category.textContent = "Wind " + data.category;

        } else if (attunement.Shadowcast > 0) {
            category.textContent = "Shadow " + data.category;

        } else if (attunement.Ironsing > 0) {
            category.textContent = "Metal " + data.category;

        } else if (attunement.Bloodrend > 0) {
            category.textContent = "Blood " + data.category;
        }

    } else if (data.type === "Oath") {
        category.textContent = data.attribute;

    } else if (data.type === "Attunementless") {
        category.textContent = data.attribute + " " + data.category;

    } else if (data.type === "Monster") {
        category.textContent = data.type + " " + data.category;
        
    }

    if (data.attribute.includes("Multiple")) {
        category.textContent = "Hybrid " + data.category;
    }
    
    if (data.name === "Soul Beam") {
        category.textContent = "Soul " + data.category;
    }
}

function setCategoryAndIcon(attunement, data) {
    setCategory(attunement, data);
    setIcon(attunement, data);
}

function updateCard(data) {
    if (title) title.textContent = data.name;
    if (description) description.textContent = data.desc;
    updateStars(data.stars);

    const attributeString = Array.isArray(data.attribute) ? data.attribute.join(", ") : data.attribute;
    if (mantrapreview) mantrapreview.src = data.gif;
    setCategoryAndIcon(data.reqs.attunement, data);
}

if (updateButton) {
    updateButton.addEventListener("click", () => {
        const inputValue = titleInput.value.trim();
        if (!inputValue) return;
        fetchMantraData(inputValue);
    });
}

if (mantra) {
    fetchMantraData(mantra);
}

updateStars(0);