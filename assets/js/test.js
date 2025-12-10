document.addEventListener("DOMContentLoaded", () => {
    const cardGrid = document.querySelector(".card-grid");

    const cardData = [
        { title: "Chaotic Charm", icon: "charm.png", desc: "Charms enemies when hit", bonus: "+1 Wildcard Mantra Slot" },
        { title: "Under The Radar", icon: "stealth.png", desc: "Lower bounty threshold", bonus: "+1 Health" },
        { title: "Tough Love", icon: "strength.png", desc: "Deal more damage", bonus: "+1 Posture" },
        { title: "Duelist’s Dance", icon: "duelist.png", desc: "Parrying boosts posture", bonus: "+4 Carry Load" },
        { title: "Exoskeleton", icon: "armor.png", desc: "Gain extra armor", bonus: "+2 Posture" },
        { title: "Berserker", icon: "rage.png", desc: "More damage when low", bonus: "+10% Defense" },
        { title: "To The Finish", icon: "final.png", desc: "Take less damage <50% HP", bonus: "+5% Health" }
    ];

    for (let i = 0; i < 24; i++) {
        let cardInfo = cardData[i % cardData.length]; 

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="title">${cardInfo.title}</div>
            <img src="/assets/img/icons/${cardInfo.icon}" class="icon" alt="Card Icon">
            <div class="description">${cardInfo.desc}</div>
            <div class="bonuses">${cardInfo.bonus}</div>
        `;

        cardGrid.appendChild(card);
    }
});
