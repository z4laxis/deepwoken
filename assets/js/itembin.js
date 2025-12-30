const icons = [
  "question.png", "leaf.png", "potion.png", "fist.png", "skull.png",
  "fire.png", "snowflake.png", "wind.png", "handshake.png", "open_eye.png",
  "cube.png", "cube_old.png", "boots.png", "ball.png", "ball_old.png",
  "rift.png", "skeleton.png", "lungs.png", "mountains.png",
  "holding_on.png", "orb.png", "shield.png", "lightning.png", "brain.png",
  "explosion.png", "explosion_old.png", "sword.png", "claw.png", "bell.png",
  "teeth.png", "ironsing.png", "daggers.png", "greatsword.png", "blood.png"
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
  if (titleInput.value) {
    itemTitle.textContent = titleInput.value;
  }

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