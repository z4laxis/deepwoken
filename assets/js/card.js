const icons = [
  "question.png", 
  "leaf.png", 
  "potion.png", 
  "fist.png", 
  "skull.png",
  "fire.png",
  "snowflake.png", 
  "wind.png", 
  "handshake.png", 
  "open_eye.png", 
  "cube.png", 
  "cube_old.png", 
  "boots.png",
  "ball.png", 
  "ball_old.png", 
  "rift.png", 
  "skeleton.png", 
  "lungs.png", 
  "mountains.png",
  "holding_on.png", 
  "orb.png", 
  "shield.png",
  "lightning.png", 
  "brain.png", 
  "explosion.png", 
  "explosion_old.png", 
  "sword.png",
  "claw.png", 
  "bell.png", 
  "teeth.png",
  "ironsing.png", 
  "daggers.png", 
  "greatsword.png",
  "blood.png",
  "silentheart.png",
  "bladeharper.png", 
  "blindseer.png",
  "chainwarden.png",
  "dawnwalker.png", 
  "starkindred.png",
  "contractor.png", 
  "fadetrimmer.png", 
  "jetstriker.png",
  "linkstrider.png", 
  "saltchemist.png",
  "visionshaper.png",
  "spellbinder.png",
  "saintsworn.png", 
  "soulbreaker.png",
  "voidhunter.png", 
  "arcwarder.png",
  "oathless.png", 
  "roll2.png", 
  
  "ceaseless_slashes.png", 
  "karita_divebomb.png", 
  "prominence_draw.png",
  "karita_leap.png", 
  "masters_flourish.png", 
  "onslaught.png", 
  "pressure_blast.png", 
  "flashdraw_strike.png", 
  "punishment.png", 
  "rapid_slashes.png",
  "twincleave.png", 
  "brace.png", 
  "dash.png", 
  "ether_barrage.png",
  "exhaustion_strike.png",
  "gaze.png",
  "glare.png", 
  "glare_old.png",
  "prediction.png", 
  "rally.png",
  "rapid_punches.png", 
  "reinforce.png",
  "revenge.png", 
  "shoulder_bash.png",
  "sing.png",
  "skyshatter_kick.png",
  "strong_leap.png", 
  "summon_cauldron.png", 
  "table_flip.png", 
  "taunt.png", 
  "adrenaline_surge.png",
  "ash_slam.png", 
  "fire_blade.png", 
  "fire_forge.png",
  "fire_forge_old.png",  
  "fire_palm.png",
  "flame_ballista.png",
  "flame_leap.png",
  "flame_repulsion.png",
  "flame_sentinel.png",
  "flare_volley.png",
  "rising_flame.png", 
  "burning_servants.png",
  "fire_eruption.png",
  "fire_gun.png",
  "flame_assault.png",
  "flame_blind.png",
  "flame_of_denial.png",
  "flaming_scourge.png", 
  "flame_wisp.png", 
  "relentless_flames.png",
  "graceful_flame.png",
  "flame_grab.png",
  "rising_wind.png", 
  "tornado.png",
  "tornado_kick.png",
  "twister_kicks.png",
  "wind_blade.png", 
  "wind_carve.png",
  "wind_gun.png",
  "wind_passage.png",
  "air_force.png", 
  "astral_wind.png",
  "champions_whirlthrow.png", 
  "gale_lunge.png",
  "gale_punch.png",
  "gale_trap.png",
  "gale_wisp.png",
  "heavenly_wind.png",
  "pillars_of_erisia.png",
  "wind_forge.png",
  "updraft.png",
  "disguise.png",
  "tacet_drop_kick.png", 
  "fleeting_sparks.png",
  "grand_javelin.png", 
  "jolt_grab.png",
  "lightning_assault.png",
  "lightning_beam.png", 
  "lightning_blade.png",
  "lightning_clones.png", 
  "bolt_piercer.png", 
  "electro_carve.png", 
  "emotion_wave.png",
  "rising_thunder.png", 
  "spark_swap.png",
  "storm_blades.png", 
  "lightning_cloak.png",
  "thunder_kick.png", 
  "thunder_wisp.png", 
  "lightning_stream.png", 
  "lightning_impact.png", 
  "lightning_strike.png", 
  "tempest_blitz.png"
];

let currentIndex = 0;

const centerImage = document.getElementById("center-image");
const cardIcon = document.getElementById("card-icon");

const titleSizeInput = document.getElementById("title-size-input");
const descSizeInput = document.getElementById("desc-size-input");

const frozenInput = document.getElementById("frozen-input");
const favouredInput = document.getElementById("favoured-input");
const foretoldInput = document.getElementById("foretold-input");
const rarityInput = document.getElementById("rarities");
const starsInput = document.getElementById("stars");
const iconInput = document.getElementById("icon-input");
const colorInput = document.getElementById("color-picker-input");
const cardContainer = document.querySelector(".card-container");
const cardScaleInput = document.getElementById("card-scale-input");
const backgroundColorPicker = document.getElementById("background-color-picker-input");
const backgroundInput = document.getElementById("background-input");
const backgroundFileInput = document.getElementById("background-file-input");

const cardTitle = document.getElementById("card-title");
const cardClass = document.getElementById("card-class");
const cardDescription = document.getElementById("card-description");
const cardFrozen = document.querySelector(".card-frozen");
const cardFavour = document.querySelector(".card-favour");
const cardForetold = document.querySelector(".card-foretold");
const cardColor = document.querySelector(".card-color");

const oneStar = document.querySelector(".onestar");
const twoStar = document.querySelector(".twostar");
const threeStar = document.querySelector(".threestar");

function updateIcon() {
  const iconPath = `/assets/img/icons/talent/${icons[currentIndex]}`;
  centerImage.src = iconPath;
}

function previousIcon() {
  currentIndex = (currentIndex - 1 + icons.length) % icons.length;
  updateIcon();
  updateCard();
}

function nextIcon() {
  currentIndex = (currentIndex + 1) % icons.length;
  updateIcon();
  updateCard();
}

function updateCard() {
  const frozen = frozenInput.checked;
  const favoured = favouredInput.checked;
  const foretold = foretoldInput.checked;
  const rarity = rarityInput.value;
  const stars = starsInput.value;
  const icon = iconInput.value;
  const selectedColor = colorInput?.value;

  cardIcon.style.maskImage = icon || `url(/assets/img/icons/talent/${icons[currentIndex]})`;

  cardFrozen.hidden = !frozen;
  cardFavour.hidden = !favoured;
  cardForetold.hidden = !foretold;

  if (!cardFrozen.hidden) {
    cardFavour.hidden = true;
    cardForetold.hidden = true;
   } else if (!cardFavour.hidden) {
    cardFrozen.hidden = true;
    cardForetold.hidden = true;
   } else if (!cardForetold.hidden) {
    cardFrozen.hidden = true;
    cardFavour.hidden = true;
    }
  }

  const rarityColors = {
    "Common": "var(--color-card-common)",
    "Rare": "var(--color-card-rare)",
    "Advanced": "var(--color-card-advanced)",
    "Legendary": "var(--color-card-legendary)",
    "Mantra": "var(--color-card-mantra)",
    "Bell": "var(--color-card-bell)",
    "Legendary Bell": "var(--color-card-legendary-bell)",
    "Drowned Bell": "var(--color-card-drowned-bell)",
    "Corrupted Bell": "var(--color-card-corrupted-bell)",
    "Oath": "var(--color-card-oath)",
    "Mystery": "var(--color-card-mystery)",
    "Trait": "var(--color-card-trait)",
    "Faction": "var(--color-card-faction)"
  };

  if (backgroundColorPicker.value) {
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = backgroundColorPicker.value;
  } else {
    document.body.style.backgroundColor = "";
    document.body.style.backgroundImage = "radial-gradient(#223125, #06110e)";
  }

  cardColor.style.backgroundColor = selectedColor || rarityColors[rarity] || "transparent";

  const starsDisplay = {
    "0 stars": [false, false, false],
    "1 star": [true, false, false],
    "2 stars": [false, true, false],
    "3 stars": [false, false, true]
  };
  [oneStar, twoStar, threeStar].forEach((el, i) => el.hidden = !starsDisplay[stars][i]);

  if (titleSizeInput.value) cardTitle.style.fontSize = `${titleSizeInput.value}px`;
  if (descSizeInput.value) cardDescription.style.fontSize = `${descSizeInput.value}px`;

  if (!cardScaleInput || !cardContainer) return;
  const scale = cardScaleInput.value || 100;
  cardContainer.style.zoom = `${scale}%`;

  if (backgroundInput.value) {
  document.body.style.backgroundImage = `url(${backgroundInput.value})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
}

[
  titleSizeInput, 
  descSizeInput, 
  frozenInput,
  favouredInput,
  foretoldInput,
  rarityInput, 
  starsInput, 
  iconInput,
  colorInput,  
  backgroundColorPicker,
  backgroundInput,
  backgroundFileInput,
  cardScaleInput,
].forEach(input => {
  input?.addEventListener("input", updateCard);
  input?.addEventListener("change", updateCard);
});


document.getElementById("imageInput")?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) cardIcon.style.maskImage = "url(" + URL.createObjectURL(file) + ")";
});

document.getElementById("border-file-input")?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) document.querySelector(".card-outline").src = URL.createObjectURL(file);
});

backgroundFileInput?.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  document.body.style.backgroundImage = `url(${url})`;
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundPosition = "center";
});


updateCard();