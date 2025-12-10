const icons = [
  "adrenaline_surge.png", "air_force.png", "arcwarder.png", "ash_slam.png", "astral_wind.png", "ball.png",
  "bell.png", "bladeharper.png", "blindseer.png", "blood.png", "bolt_piercer.png", "boots.png", "brace.png",
  "brain.png", "burning_servants.png", "ceaseless_slashes.png", "chainwarden.png", "champions_whirlthrow.png",
  "claw.png", "contractor.png", "cube.png", "daggers.png", "dash.png", "dawnwalker.png", "disguise.png",
  "electro_carve.png", "emotion_wave.png", "explosion.png", "ether_barrage.png", "exhaustion_strike.png",
  "fadetrimmer.png", "fire.png", "fire_blade.png", "fire_eruption.png", "fire_gun.png", "fire_palm.png",
  "fist.png", "flame_assault.png", "flame_ballista.png", "flame_bind.png", "flame_grab.png", "flame_leap.png",
  "flame_of_denial.png", "flame_repulsion.png", "flame_sentinel.png", "flame_wisp.png", "flaming_scourge.png",
  "flare_volley.png", "flashdraw_strike.png", "fleeting_sparks.png", "gale_lunge.png", "galetrap.png",
  "gale_wisp.png", "gaze.png", "glare.png", "graceful_flame.png", "grand_javelin.png", "greatsword.png",
  "handshake.png", "heavenly_wind.png", "holding_on.png", "ironsing.png", "jetstriker.png", "jolt_grab.png",
  "karita_divebomb.png", "karita_leap.png", "leaf.png", "lightning.png" ,"lightning_assault.png", "lightning_beam.png",
  "lightning_blade.png", "lightning_cloak.png", "lightning_clones.png", "lightning_impact.png",
  "lightning_stream.png", "lightning_strike.png", "linkstrider.png", "lungs.png", "masters_flourish.png",
  "mountains.png", "oathless.png", "onslaught.png", "open_eye.png", "orb.png", "potion.png", "prediction.png",
  "pressure_blast.png", "prominence_draw.png", "punishment.png", "question.png", "rally.png", "rapid_punches.png",
  "rapid_slashes.png", "reinforce.png", "relentless_flames.png", "revenge.png", "rift.png", "rising_thunder.png",
  "rising_wind.png", "roll2.png", "saintsworn.png", "saltchemist.png", "shield.png", "shoulder_bash.png",
  "silentheart.png", "sing.png", "skeleton.png","skull.png", "skyshatter_kick.png", "snowflake.png", "soulbreaker.png",
  "spark_swap.png", "spellbinder.png", "starkindred.png", "storm_blades.png", "strong_leap.png", "strong_left.png",
  "summon_cauldron.png", "sword.png", "table_flip.png", "tacet_drop_kick.png", "taunt.png", "teeth.png",
  "tempest_blitz.png", "thunder_kick.png", "thunder_wisp.png", "tornado.png", "tornado_kick.png",
  "twincleave.png", "twister_kicks.png", "updraft.png", "visionshaper.png", "voidhunter.png", "wind.png",
  "wind_gun.png", "wind_passage.png"
];

let currentIndex = 0;
const centerImage = document.getElementById("center-image");
const updateCardBtn = document.getElementById("update-card");

const titleInput = document.getElementById("title-input");
const titleSizeInput = document.getElementById("title-size-input");
const descriptionInput = document.getElementById("description-input");
const descSizeInput = document.getElementById("desc-size-input");
const starsInput = document.getElementById("stars");
const iconInput = document.getElementById("icon-input");
const imageInput = document.getElementById("imageInput");

const itemTitle = document.querySelector(".title-2d");
const itemDescription = document.querySelector(".hotbar-count");
const itemIcon = document.querySelector(".mantra-icon");
const starIcons = [
  document.querySelector(".star-1"),
  document.querySelector(".star-2"),
  document.querySelector(".star-3")
];

function updateIcon() {
  const iconPath = `/assets/img/icons/talent/${icons[currentIndex]}`;
  centerImage.src = iconPath;
}

function previousIcon() {
  currentIndex = (currentIndex - 1 + icons.length) % icons.length;
  updateIcon();
}

function nextIcon() {
  currentIndex = (currentIndex + 1) % icons.length;
  updateIcon();
}

updateCardBtn.addEventListener("click", () => {
  if (titleInput.value) {
    itemTitle.textContent = titleInput.value;
  }
  if (titleSizeInput.value) {
    itemTitle.style.fontSize = `${titleSizeInput.value}px`;
  }

  if (iconInput.value) {
    itemIcon.src = iconInput.value;
  } else if (imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = e => {
      itemIcon.src = e.target.result;
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    itemIcon.src = `/assets/img/icons/talent/${icons[currentIndex]}`;
  }

  const starValue = starsInput.value;
  starIcons.forEach((el, i) => {
    el.style.display = "none";
    if (starValue.includes(`${i + 1} star`)) {
      el.style.display = "block";
    }
  });
});
