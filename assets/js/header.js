var isOpen = false

function returnToMenu() {
    window.location.replace("/");
}

function changeIcon() {
    isOpen = !isOpen
    const img = document.getElementById("encyclopedia").querySelector("img");
    
    img.src = isOpen
        ? "/assets/img/icons/topbar/encyclopediaopen.png"
        : "/assets/img/icons/topbar/encyclopediaclosed.png";
}