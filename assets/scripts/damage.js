function calculateMantraDamage(baseDamage, scaling, investment, songchant = 0) {
    const multiplier = (1 + (scaling / 10) * (investment / 100)) * (1 + songchant * 0.05);
    const damage = baseDamage * multiplier;
    return Math.round(damage * 100) / 100;
}

document.getElementById("button").addEventListener("click", () => {
    console.log(calculateMantraDamage(60, 1.65, 95, 2));
});

console.log("Strong Left Damage:", calculateMantraDamage(60, 1.65, 95, 2)); 
console.log("Gale Lunge Damage:", calculateMantraDamage(16.25, 2.75, 60, 0)); 