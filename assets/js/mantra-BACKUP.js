const urlParams = new URLSearchParams(window.location.search);
const mantra = urlParams.get('query');

if (mantra) {
    fetchMantraData(mantra);
}

const titleInput = document.getElementById("title-input");
const updateButton = document.getElementById("update-card");

const title = document.getElementById("card-title");
const mantrapreview = document.getElementById("mantra-preview");
const icon = document.querySelector(".bg");
const description = document.querySelector(".description-container .description");

const oneStar = document.querySelector(".onestar");
const twoStar = document.querySelector(".twostar");
const threeStar = document.querySelector(".threestar");
const category = document.querySelector(".class");

let mantraDataCache = null;

function formatIconName(fileName) {
    if (typeof fileName === "string") {
        return fileName.toLowerCase().replace(/ /g, "_") + ".png";
    } else {
        console.error("formatIconName: fileName is not a string", fileName);
        return "question.png";
    }
}

function updateStars(stars) {
    if (stars == 1) {
        oneStar.style.display = "block";
        twoStar.style.display = "none";
        threeStar.style.display = "none";
    } else if (stars == 2) {
        oneStar.style.display = "none";
        twoStar.style.display = "block";
        threeStar.style.display = "none";
    } else if (stars == 3) {
        oneStar.style.display = "none";
        twoStar.style.display = "none";
        threeStar.style.display = "block";
    } else {
        oneStar.style.display = "none";
        twoStar.style.display = "none";
        threeStar.style.display = "none";
    }
}

function setCategoryAndIcon(attunement, data) {
    if (data.type == "Attunement") {
        if (data.attribute.includes("Flamecharm")) {
            icon.src = "/assets/img/icons/talent/" + formatIconName(data.name);
            category.textContent = "Fire " + data.category;

        } else if (data.attribute.includes("Frostdraw")) {
            icon.src = "/assets/img/icons/talent/snowflake.png";
            category.textContent = "Ice " + data.category;

        } else if (attunement.Thundercall > 0) {
            icon.src = "/assets/img/icons/talent/lightning.png";
            category.textContent = "Lightning " + data.category;

        } else if (attunement.Galebreathe > 0) {
            icon.src = "/assets/img/icons/talent/" + formatIconName(data.name);
            category.textContent = "Wind " + data.category;

        } else if (attunement.Shadowcast > 0) {
            icon.src = "/assets/img/icons/talent/rift.png";
            category.textContent = "Shadow " + data.category;

        } else if (attunement.Ironsing > 0) {
            icon.src = "/assets/img/icons/talent/ironsing.png";
            category.textContent = "Metal " + data.category;

        } else if (attunement.Bloodrend > 0) {
            icon.src = "/assets/img/icons/talent/blood.png";
            category.textContent = "Blood " + data.category;
        }

    } else if (data.type == "Oath") {
        icon.src = "/assets/img/icons/talent/" + formatIconName(data.attribute);
        category.textContent = data.attribute;

    } else if (data.type == "Attunementless") {
        icon.src = "/assets/img/icons/talent/" + formatIconName(data.name);
        category.textContent = data.attribute + " " + data.category;

    } else if (data.type == "Monster") {
        icon.src = "/assets/img/icons/talent/claw.png";
        category.textContent = data.type + " " + data.category;
    } 
    
    if (data.name == "Pumpkin Pitch") {
        icon.src = "/assets/img/icons/talent/fast_ball.png";
        category.textContent = data.type + " " + data.category;
        description.textContent = "Lob explosive pumpkins at your foes."
        mantrapreview.src = "https://static.wikia.nocookie.net/project-deepwoken/images/4/4f/Pumpkin_Pitch.gif"
    }

    if (data.attribute.includes("Multiple")) {
        category.textContent = "Hybrid " + data.category;
    }
}

function updateCard(data) {
    title.textContent = data.name;
    description.textContent = data.desc;
    updateStars(data.stars);

    const attributeString = Array.isArray(data.attribute) ? data.attribute.join(", ") : data.attribute;
    mantrapreview.src = `https://deepwoken.co ${data.gif}`;
    setCategoryAndIcon(data.reqs.attunement, { ...data, attribute: attributeString });
}

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


updateButton.addEventListener("click", () => {
    const inputValue = titleInput.value.trim();
    if (!inputValue) return;
    fetchMantraData(inputValue);
});

if (mantra) {
    fetchMantraData(mantra);
}

updateStars(0);