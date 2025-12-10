const icons = [
  "adrenaline_surge.png",
  "air_force.png",
  "arcwarder.png",
  "ash_slam.png",
  "astral_wind.png",
  "ball.png",
  "bell.png",
  "bladeharper.png",
  "blindseer.png",
  "blood.png",
  "brace.png",
  "boots.png",
  "brain.png",
  "burning_servants.png",
  "ceaseless_slashes.png",
  "chainwarden.png",
  "champions_whirlthrow.png",
  "claw.png",
  "contractor.png",
  "cube.png",
  "daggers.png",
  "dash.png",
  "dawnwalker.png",
  "disguise.png",
  "eruption.png",
  "ether_barrage.png",
  "exhaustion_strike.png",
  "eye.png",
  "fadetrimmer.png",
  "fire.png",
  "fire_blade.png",
  "fire_eruption.png",
  "fire_gun.png",
  "fire_palm.png",
  "fist.png",
  "flame_assault.png",
  "flame_ballista.png",
  "flame_bind.png",
  "flame_grab.png",
  "flame_leap.png",
  "flame_of_denial.png",
  "flame_repulsion.png",
  "flame_sentinel.png",
  "flame_wisp.png",
  "flaming_scourge.png",
  "flare_volley.png",
  "flashdraw_strike.png",
  "flashfire_sweep.png",
  "gale_lunge.png",
  "gale_trap.png",
  "gale_wisp.png",
  "gaze.png",
  "glare.png",
  "graceful_flame.png",
  "greatsword.png",
  "handshake.png",
  "heavenly_wind.png",
  "ironsing.png",
  "jetstriker.png",
  "karita_divebomb.png",
  "karita_leap.png",
  "leaf.png",
  "linkstrider.png",
  "lungs.png",
  "masters_flourish.png",
  "mountains.png",
  "oathless.png",
  "onslaught.png",
  "potion.png",
  "prediction.png",
  "pressure_blast.png",
  "promience_draw.png",
  "punishment.png",
  "question.png",
  "rally.png",
  "rapid_punches.png",
  "rapid_slashes.png",
  "reinforce.png",
  "relentless_flames.png",
  "revenge.png",
  "rift.png",
  "rising_wind.png",
  "roll2.png",
  "saintsworn.png",
  "saltchemist.png",
  "shield.png",
  "shoulder_bash.png",
  "silentheart.png",
  "sing.png",
  "skeleton.png",
  "skyshatter_kick.png",
  "skull.png",
  "snow.png",
  "songchant.png",
  "soulbreaker.png",
  "starkindred.png",
  "strong_leap.png",
  "strong_left.png",
  "summon_cauldron.png",
  "sword.png",
  "table_flip.png",
  "tacet_drop_kick.png",
  "taunt.png",
  "teeth.png",
  "thunder.png",
  "tornado.png",
  "tornado_kick.png",
  "twincleave.png",
  "twister_kicks.png",
  "undead.png",
  "updraft.png",
  "visionshaper.png",
  "wind.png",
  "wind_gun.png",
  "wind_passage.png",
];

let currentIndex = 0;

function updateIcon() {
  const iconPath = `/cardcreator/assets/img/icons/talent/${icons[currentIndex]}`;
  document.getElementById("center-image").src = iconPath;
  document.getElementById("center-text").textContent = formatIconName(icons[currentIndex]);
}

function formatIconName(fileName) {
  return fileName
    .replace(".png", "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function previousIcon() {
  currentIndex = (currentIndex - 1 + icons.length) % icons.length;
  updateIcon();
}

function nextIcon() {
  currentIndex = (currentIndex + 1) % icons.length;
  updateIcon();
}

function changeIcon() {
  const iconPath = `/cardcreator/assets/img/icons/talent/${icons[currentIndex]}`;
  document.getElementById("card-icon").src = iconPath;
}

document.getElementById("update-card").addEventListener("click", () => {
  const title = document.getElementById("title-input").value;
  const tclass = document.getElementById("class-input").value;
  const description = document.getElementById("description-input").value;
  const frozen = document.getElementById("frozen-input").checked;

  const bonuses = document.getElementById("bonuses-input").value.split(",");
  const rarity = document.getElementById("rarities").value;
  const stars = document.getElementById("stars").value;

  const icon = document.getElementById("icon-input").value;
  const customColor = document.getElementById("color-input").value;

  if (icon) document.getElementById("card-icon").src = icon;

  if (title) document.getElementById("card-title").textContent = title;

  if (tclass) document.getElementById("card-class").textContent = tclass;

  if (description) document.getElementById("card-description").textContent = description;

  document.querySelector(".card-frozen").style.display = frozen ? "block" : "none";

  const bonusesContainer = document.getElementById("card-bonuses");
  bonusesContainer.innerHTML = "";
  bonuses.forEach((bonus) => {
    const bonusDiv = document.createElement("div");
    bonusDiv.classList.add("bonus");
    bonusDiv.textContent = bonus.trim();
    bonusesContainer.appendChild(bonusDiv);
  });

  const cardColorDiv = document.querySelector(".card-color");
  if (customColor) {
    cardColorDiv.style.backgroundColor = customColor;
  } else {
    const rarityColors = {
      "Common": "var(--color-common)",
      "Rare": "var(--color-rare)",
      "Advanced": "var(--color-advanced)",
      "Legendary": "var(--color-legendary)",
      "Mantra": "var(--color-mantra)",
      "Bell": "var(--color-bell)",
      "Legendary Bell": "var(--color-legendary-bell)",
      "Drowned Bell": "var(--color-drowned-bell)",
      "Corrupted Bell": "var(--color-corrupted-bell)",
      "Oath": "var(--color-oath)",
      "Mystery": "var(--color-mystery)",
      "Trait": "var(--color-trait)",
    };

    if (rarityColors[rarity]) {
      cardColorDiv.style.backgroundColor = rarityColors[rarity];
    } else {
      alert("Please select a valid rarity.");
    }
  }

  const starsDisplay = {
    "0 stars": [false, false, false],
    "1 star": [true, false, false],
    "2 stars": [false, true, false],
    "3 stars": [false, false, true],
  };

  const oneStar = document.querySelector(".onestar");
  const twoStar = document.querySelector(".twostar");
  const threeStar = document.querySelector(".threestar");

  if (starsDisplay[stars]) {
    oneStar.style.display = starsDisplay[stars][0] ? "block" : "none";
    twoStar.style.display = starsDisplay[stars][1] ? "block" : "none";
    threeStar.style.display = starsDisplay[stars][2] ? "block" : "none";
  } else {
    alert("Please select a valid star amount.");
  }

  const descriptionElement = document.getElementById("card-description");
  const descriptionLength = description.length;

  if (descriptionLength > 140) {
    descriptionElement.style.fontSize = "12px";

  } else if (descriptionLength > 120) {
    descriptionElement.style.fontSize = "14px";

  } else if (descriptionLength > 90) {
    descriptionElement.style.fontSize = "16px";

  } else {
    descriptionElement.style.fontSize = "18px";

  }
});

function changebg(bgcolor){
  document.body.style.background = (bgcolor);
}