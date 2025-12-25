const icons = [
  "open_eye.png", 
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
  "bolt_piercer.png", 
  "boots.png", 
  "brace.png",
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
  "electro_carve.png", 
  "emotion_wave.png", 
  "explosion.png", 
  "ether_barrage.png", 
  "exhaustion_strike.png",
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
  "fleeting_sparks.png", 
  "gale_lunge.png", 
  "galetrap.png",
  "gale_wisp.png", 
  "gaze.png", 
  "glare.png", 
  "graceful_flame.png", 
  "grand_javelin.png", 
  "greatsword.png",
  "handshake.png", 
  "heavenly_wind.png", 
  "holding_on.png", 
  "ironsing.png", 
  "jetstriker.png", 
  "jolt_grab.png",
  "karita_divebomb.png", 
  "karita_leap.png", 
  "leaf.png", 
  "lightning.png",
  "lightning_assault.png", 
  "lightning_beam.png",
  "lightning_blade.png", 
  "lightning_cloak.png", 
  "lightning_clones.png", 
  "lightning_impact.png",
  "lightning_stream.png", 
  "lightning_strike.png", 
  "linkstrider.png", 
  "lungs.png", 
  "masters_flourish.png",
  "mountains.png", 
  "oathless.png", 
  "onslaught.png", 
  "orb.png", 
  "potion.png", 
  "prediction.png",
  "pressure_blast.png", 
  "prominence_draw.png", 
  "punishment.png", 
  "question.png", 
  "rally.png", 
  "rapid_punches.png",
  "rapid_slashes.png", 
  "reinforce.png", 
  "relentless_flames.png", 
  "revenge.png", 
  "rift.png", 
  "rising_thunder.png",
  "rising_wind.png", 
  "roll2.png", 
  "saintsworn.png", 
  "saltchemist.png", 
  "shield.png", 
  "shoulder_bash.png",
  "silentheart.png", 
  "sing.png", 
  "skeleton.png",
  "skull.png", 
  "skyshatter_kick.png", 
  "snowflake.png", 
  "soulbreaker.png",
  "spark_swap.png", 
  "starkindred.png", 
  "storm_blades.png",
  "strong_leap.png", 
  "strong_left.png",
  "summon_cauldron.png", 
  "sword.png", 
  "table_flip.png", 
  "tacet_drop_kick.png", 
  "taunt.png", 
  "teeth.png",
  "tempest_blitz.png", 
  "thunder_kick.png", 
  "thunder_wisp.png", 
  "tornado.png", 
  "tornado_kick.png",
  "twincleave.png", 
  "twister_kicks.png", 
  "updraft.png", 
  "visionshaper.png",
  "voidhunter.png", 
  "wind.png",
  "wind_gun.png",
  "wind_passage.png"
];

let currentIndex = 0;

const centerImage = document.getElementById("center-image");
const centerText = document.getElementById("center-text");
const cardIcon = document.getElementById("card-icon");
const updateButton = document.getElementById("update-card");

const titleInput = document.getElementById("title-input");
const classInput = document.getElementById("class-input");
const descriptionInput = document.getElementById("description-input");
const frozenInput = document.getElementById("frozen-input");
const bonusesInput = document.getElementById("bonuses-input");
const rarityInput = document.getElementById("rarities");
const starsInput = document.getElementById("stars");
const iconInput = document.getElementById("icon-input");
const borderInput = document.getElementById("border-input");
const colorInput = document.getElementById("color-input");

const cardTitle = document.getElementById("card-title");
const cardClass = document.getElementById("card-class");
const cardDescription = document.getElementById("card-description");
const cardFrozen = document.querySelector(".card-frozen");
const cardBonuses = document.getElementById("card-bonuses");
const cardColor = document.querySelector(".card-color");

const oneStar = document.querySelector(".onestar");
const twoStar = document.querySelector(".twostar");
const threeStar = document.querySelector(".threestar");

function updateIcon() {
  const iconPath = `/assets/img/icons/talent/${icons[currentIndex]}`;
  centerImage.src = iconPath;
  centerText.textContent = formatIconName(icons[currentIndex]);
}

function formatIconName(fileName) {
  return fileName.replace(".png", "").replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function previousIcon() {
  currentIndex = (currentIndex - 1 + icons.length) % icons.length;
  updateIcon();
}

function nextIcon() {
  currentIndex = (currentIndex + 1) % icons.length;
  updateIcon();
}

updateButton.addEventListener("click", () => {
  cardIcon.src = `/assets/img/icons/talent/${icons[currentIndex]}`;

  const title = titleInput.value;
  const tclass = classInput.value;
  const description = descriptionInput.value;
  const frozen = frozenInput.checked;
  const bonuses = bonusesInput.value.split(",");
  const rarity = rarityInput.value;
  const stars = starsInput.value;
  const icon = iconInput.value;
  const customColor = colorInput.value;

  if (icon) cardIcon.src = icon;
  if (title) cardTitle.textContent = title;
  if (tclass) cardClass.textContent = tclass;
  if (description) cardDescription.textContent = description;

  cardFrozen.style.display = frozen ? "block" : "none";

  cardBonuses.innerHTML = "";
  bonuses.forEach((bonus) => {
    const bonusDiv = document.createElement("div");
    bonusDiv.classList.add("bonus");
    bonusDiv.textContent = bonus.trim();
    cardBonuses.appendChild(bonusDiv);
  });

  const rarityColors = {
    "Common": "var(--color-card-common)", 
    "Rare": "var(--color-card-rare)", 
    "Advanced": "var(--color-card-advanced)", 
    "Legendary": "var(--color-card-legendary)", 
    "Mantra": "var(--color-card-mantra)", "Bell": 
    "var(--color-card-bell)", "Legendary Bell": 
    "var(--color-card-legendary-bell)", 
    "Drowned Bell": "var(--color-card-drowned-bell)", 
    "Corrupted Bell": "var(--color-card-corrupted-bell)", 
    "Oath": "var(--color-card-oath)", 
    "Mystery": "var(--color-card-mystery)", 
    "Trait": "var(--color-card-trait)", 
    "Faction": "var(--color-card-faction)"
  };

  cardColor.style.backgroundColor = customColor || rarityColors[rarity] || alert("Please select a valid rarity.");

  const starsDisplay = {
    "0 stars": [false, false, false], "1 star": [true, false, false], "2 stars": [false, true, false], "3 stars": [false, false, true],
  };

  if (starsDisplay[stars]) {
    [oneStar, twoStar, threeStar].forEach((el, i) => el.style.display = starsDisplay[stars][i] ? "block" : "none");
  } else {
    alert("Please select a valid star amount.");
  }

  const descriptionLength = description.length;
  const fontSizeMap = [[50, "14px", "90%"], [40, "16px", "85%"], [30, "18px", "80%"], [0, "20px", "75%"]];
  
  for (const [limit, size, width] of fontSizeMap) {
    if (descriptionLength > limit) {
      Object.assign(cardDescription.style, { fontSize: size, width });
      break;
    }
  }
});