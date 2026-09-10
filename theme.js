const settingsButton = document.getElementById("settingsButton");
const settingsOverlay = document.getElementById("settingsOverlay");
const settingsClose = document.getElementById("settingsClose");
const themeOptions = document.querySelectorAll("[data-theme-option]");

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem("cipher-theme", theme);

  themeOptions.forEach(option => {
    option.classList.toggle("active", option.dataset.themeOption === theme);
  });
}

function openSettings() {
  settingsOverlay.classList.add("open");
  settingsOverlay.setAttribute("aria-hidden", "false");
}

function closeSettings() {
  settingsOverlay.classList.remove("open");
  settingsOverlay.setAttribute("aria-hidden", "true");
}

settingsButton.addEventListener("click", openSettings);
settingsClose.addEventListener("click", closeSettings);

settingsOverlay.addEventListener("click", event => {
  if (event.target === settingsOverlay) {
    closeSettings();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && settingsOverlay.classList.contains("open")) {
    closeSettings();
  }
});

themeOptions.forEach(option => {
  option.addEventListener("click", () => {
    applyTheme(option.dataset.themeOption);
  });
});

const savedTheme = localStorage.getItem("cipher-theme");
const allowedThemes = [
  "phenikaa",
  "youtube",
  "shopee",
  "tiktok",
  "ben10",
  "steam",
  "discord",
  "valorant",
  "lol"
];

applyTheme(allowedThemes.includes(savedTheme) ? savedTheme : "phenikaa");