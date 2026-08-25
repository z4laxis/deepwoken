const video = document.getElementById("bg-video");
video.muted = true;
video.volume = 0;
video.play().catch(() => {
    console.log("Autoplay blocked until user interacts");
});

const hoverSound = document.getElementById("hover-sound");
const clickSound = document.getElementById("click-sound");

const promptText = document.querySelector("p");
const mainMenu = document.querySelector("main");
const updateLogs = document.querySelector(".update-logs");

let hasContinued = false; 

function Continue() {
    if (hasContinued) return; 
    hasContinued = true;     

    clickSound.currentTime = 0;
    clickSound.volume = 0.25;
    clickSound.play();
    promptText.classList.add("fade-out");
    
        video.muted = false;
    video.volume = 0.1;
    video.play();

    setTimeout(() => {
        promptText.remove(); 
        mainMenu.hidden = false;
        updateLogs.hidden = false;
    }, 1500);
}

document.addEventListener("keydown", Continue);
document.addEventListener("click", Continue);

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("mouseenter", () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });

    button.addEventListener("click", () => {
        clickSound.currentTime = 0;
        clickSound.volume = 0.25;
        clickSound.play();

        const href = button.getAttribute("href");
        if (href) {
            setTimeout(() => {
                window.location.href = href;
            }, 750);
        }
    });
});