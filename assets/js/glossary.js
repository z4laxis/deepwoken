function search() {
  const input = document.getElementById("search").value.toLowerCase();
  const entries = document.querySelectorAll(".entry");

  entries.forEach(entry => {
    const name = entry.querySelector(".name").textContent.toLowerCase();

    if (name.includes(input)) {
      entry.classList.remove("hidden");
    } else {
      entry.classList.add("hidden");
    }
  });
}
