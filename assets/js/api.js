const SUPABASE_URL = 'https://idyjvmmldtdvpklkzrgr.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkeWp2bW1sZHRkdnBrbGt6cmdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyODg4NTgsImV4cCI6MjA2ODg2NDg1OH0.DB-6F-joVK-oaFCw9jBoiqXlPFAMzbzh4TLE2EdD_b0';

async function fetchData(talentName) {
  if (!talentName) {
    console.error("No talent name provided!");
    return null;
  }

  const endpoint = 'talents';
  const url = `${SUPABASE_URL}/rest/v1/${endpoint}?select=*&name=eq.${encodeURIComponent(talentName)}&limit=1`;

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    console.error('Supabase fetch failed:', await res.text());
    return null;
  }

  const data = await res.json();
  return data[0] ?? null;
}

async function fetchTalentData(talentName) {
  const data = await fetchData(talentName);
  console.log(data);

  if (!data) {
    console.error("Talent not found.");
    return;
  }

  document.getElementById("card-title").textContent = data.name || "Unknown Talent";
  document.getElementById("card-class").textContent = data.category || "Unknown Category";
  document.getElementById("card-description").textContent = data.description || "No description available.";

  const iconElement = document.getElementById("card-icon");
  iconElement.src = "/assets/img/icons/talent/" + data.icon + ".png" || "/assets/img/icons//question.png";

  if (data.stats) {
    const bonus1Element = document.getElementById("bonus-1");
    const bonus2Element = document.getElementById("bonus-2");

    data.stats.array.forEach(bonus, index => {
        
    });

    bonus1Element.textContent = bonus|| "";

    if (index > 1) {
      bonus2Element.textContent = bonus;
      bonus2Element.style.display = "block";
    } else {
      bonus2Element.style.display = "none";
    }
  }

  const cardColorElement = document.getElementsByClassName("card-color")[0];
  if (cardColorElement && data.rarity) {
    cardColorElement.style.backgroundColor =
      data.rarity === `var(--color-card-${data.rarity.toLowerCase()})`;
  }

  const descriptionElement = document.getElementById("card-description");
  const len = descriptionElement.textContent.length;
  descriptionElement.style.fontSize =
    len > 140 ? "14px" :
    len > 120 ? "16px" :
    len > 90  ? "18px" : "20px";
}

document.getElementById("update-card").addEventListener("click", () => {
  const title = document.getElementById("title-input").value.trim();
  if (!title) return;
  fetchTalentData(title);
});

const urlParams = new URLSearchParams(window.location.search);
const talent = urlParams.get("query");
if (talent) fetchTalentData(talent);