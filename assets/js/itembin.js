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

const titleInput = document.getElementById("title-input");
const titleSizeInput = document.getElementById("title-size-input");
const starsInput = document.getElementById("stars");
const iconInput = document.getElementById("icon-input");
const imageInput = document.getElementById("imageInput");

const itemTitle = document.querySelector(".title-2d");
const itemIcon = document.querySelector(".mantra-icon");

const starIcons = [
  document.querySelector(".star-1"),
  document.querySelector(".star-2"),
  document.querySelector(".star-3")
];

function updateIconPreview() {
  centerImage.src = `/assets/img/icons/talent/${icons[currentIndex]}`;
}

function previousIcon() {
  currentIndex = (currentIndex - 1 + icons.length) % icons.length;
  updateIconPreview();
  updateItem();
}

function nextIcon() {
  currentIndex = (currentIndex + 1) % icons.length;
  updateIconPreview();
  updateItem();
}

function updateItem() {

  if (titleSizeInput.value) {
    itemTitle.style.fontSize = `${titleSizeInput.value}px`;
  }

  if (iconInput.value) {
    itemIcon.src = iconInput.value;
  } else if (imageInput.files[0]) {
    itemIcon.src = URL.createObjectURL(imageInput.files[0]);
  } else {
    itemIcon.src = `/assets/img/icons/talent/${icons[currentIndex]}`;
  }

  const starValue = starsInput.value;
  starIcons.forEach((star, i) => {
    star.style.display = starValue.includes(`${i + 1} star`) ? "block" : "none";
  });
}

[
  titleInput,
  titleSizeInput,
  starsInput,
  iconInput,
  imageInput
].forEach(input => {
  input?.addEventListener("input", updateItem);
  input?.addEventListener("change", updateItem);
});

updateIconPreview();
updateItem();