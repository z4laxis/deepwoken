const entries = document.querySelectorAll(".entry");

function search() {
  const input = document.getElementById("search").value.toLowerCase();

  entries.forEach(entry => {
    const name = entry.querySelector(".name").textContent.toLowerCase();

    if (name.includes(input)) {
      entry.classList.remove("hidden");
    } else {
      entry.classList.add("hidden");
    }
  });
}

function filter(category) {
  entries.forEach(entry => {
    const cat = entry.querySelector(".category").textContent.toLowerCase();

    if (cat.includes(category)) {
      entry.classList.remove("hidden");
    } else {
      entry.classList.add("hidden");
    }
  });
}
