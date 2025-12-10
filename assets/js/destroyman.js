const destroymanDiv = document.getElementById("sharko");
const dialogueImage = document.getElementById("yap");
const dialogueText = document.getElementById("yapper");
let isSpeaking = false;

function greet() {
  /* const greeting = new Audio("https://files.catbox.moe/sb2zzw.mp3"); */
 /* greeting.play(); */
}

function startTalking(seconds) {
/*  const start_talk = new Audio("https://files.catbox.moe/9xjrvi.mp3"); */
/*  const end_talk = new Audio("https://files.catbox.moe/hv2q96.mp3"); */

/*  start_talk.play(); */
/*  setTimeout(() => { */
/*    end_talk.play(); */
/*  }, seconds * 1000); */
}

function animateTalk() {
  let isIdle = true;
  const talkInterval = setInterval(() => {
    if (isIdle) {
      destroymanDiv.style.backgroundImage = "url('/assets/img/destroyman/speaking.png')";
    } else {
      destroymanDiv.style.backgroundImage = "url('/assets/img/destroyman/idle.png')";
    }
    isIdle = !isIdle;
  }, 500);
  setTimeout(() => clearInterval(talkInterval), 5000);
}

function fetchRandomLine() {
  fetch("/assets/txt/destroyman/passive.txt")
    .then(response => response.text())
    .then(data => {
      const lines = data.split("\n").filter(line => line.trim() !== "");
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      dialogueText.textContent = randomLine
    })
}

function animateIdle() {
  let isIdle = true;
  setInterval(() => {
    if (isIdle) {
      destroymanDiv.style.backgroundSize = "100% 95%"
    } else {
      destroymanDiv.style.backgroundSize = "100% 100%"
    }
    isIdle = !isIdle;
  }, 500);
}

function startSpeaking() {
  if (isSpeaking) return;
  isSpeaking = true;
  dialogueImage.style.display = "block";
  animateTalk();
  startTalking(5);
  fetchRandomLine();
  setTimeout(() => {
    dialogueImage.style.display = "none";
    destroymanDiv.style.backgroundImage = "url('/assets/img/destroyman/idle.png')";
    isSpeaking = false;
  }, 5000);
}

function tryToSpeak() {
  if (Math.random() < 0.25) {
    startSpeaking();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  greet();
  animateIdle()
  setInterval(tryToSpeak, 2500);
});