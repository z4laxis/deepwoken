function fetchTalentData(talentName) {
    if (!talentName) {
        console.error("No talent name provided!");
        return;
    }

    fetch(`https://api.deepwoken.co/get?type=talent&name=${encodeURIComponent(talentName)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data);

            document.getElementById("card-title").textContent = data.name || "Unknown Talent";
            document.getElementById("card-class").textContent = data.category || "Unknown Category";
            document.getElementById("card-description").textContent = data.desc || "No description available.";

            const iconElement = document.getElementById("card-icon");
            if (data.reqs?.attunement) {
                if (data.reqs.attunement.Flamecharm > 0) iconElement.src = "/assets/img/icons/talent/fire.png";
                else if (data.reqs.attunement.Frostdraw > 0) iconElement.src = "/assets/img/icons/talent/snowflake.png";
                else if (data.reqs.attunement.Thundercall > 0) iconElement.src = "/assets/img/icons/talent/lightning.png";
                else if (data.reqs.attunement.Galebreathe > 0) iconElement.src = "/assets/img/icons/talent/wind.png";
                else if (data.reqs.attunement.Shadowcast > 0) iconElement.src = "/assets/img/icons/talent/rift.png";
                else if (data.reqs.attunement.Bloodrend > 0) iconElement.src = "/assets/img/icons/talent/blood.png";
            }

            if (data.reqs?.base) {
                if (data.reqs.base.Charisma > 0) iconElement.src = "/assets/img/icons/talent/handshake.png";
                else if (data.reqs.base.Agility > 0) iconElement.src = "/assets/img/icons/talent/boots.png";
                else if (data.reqs.base.Intelligence > 0) iconElement.src = "/assets/img/icons/talent/brain.png";
            }

            if (data.stats) {
                const bonus1Element = document.getElementById("bonus-1");
                const bonus2Element = document.getElementById("bonus-2");
                const statsArray = data.stats.split(", ");
                
                if (statsArray[0] == "N/A") {
                  bonus1Element.textContent = "";
                } else {
                  bonus1Element.textContent = statsArray[0] || "";
                }
                
                
                if (statsArray.length > 1) {
                    bonus2Element.textContent = statsArray[1];
                    bonus2Element.style.display = "block";
                } else {
                    bonus2Element.style.display = "none";
                }
            } else {
                console.error("No stats available in API response.");
                document.getElementById("bonus-1").textContent = "";
                document.getElementById("bonus-2").style.display = "none";
            }

            const cardColorElement = document.getElementsByClassName("card-color")[0];
            if (cardColorElement && data.rarity) {
                cardColorElement.style.backgroundColor = `var(--color-${data.rarity.toLowerCase()})`;
                if (data.rarity === "Quest") {
                    cardColorElement.style.backgroundColor = "var(--color-common)";
                }
            } else {
                console.error("Element with class 'card-color' not found or data.rarity is missing.");
            }

            const descriptionElement = document.getElementById("card-description");
            const descriptionLength = descriptionElement.textContent.length;
            if (descriptionLength > 140) {
                descriptionElement.style.fontSize = "14px";
            } else if (descriptionLength > 120) {
                descriptionElement.style.fontSize = "16px";
            } else if (descriptionLength > 90) {
                descriptionElement.style.fontSize = "18px";
            } else {
                descriptionElement.style.fontSize = "20px";
            }
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
}

document.getElementById("update-card").addEventListener("click", () => {
    const title = document.getElementById("title-input").value.trim();
    if (!title) {
        console.error("Title is empty!");
        return;
    }
    fetchTalentData(title);
});

const urlParams = new URLSearchParams(window.location.search);
const talent = urlParams.get('query');

if (talent) {
  fetchTalentData(talent);
}