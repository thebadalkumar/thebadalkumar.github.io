const LOCAL_STORAGE_KEY = "toggle-minex-theme";

const LOCAL_META_DATA = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

const DARK_THEME_PATH = "assets/css/mdb-dark.css";

const DARK_STYLE_LINK = document.getElementById("dark-theme-style");
const THEME_TOGGLER = document.getElementById("theme-toggler");

let isDark = LOCAL_META_DATA && LOCAL_META_DATA.isDark;

// check if user has already selected dark theme earlier
if (isDark) {
    enableDarkTheme();
} else {
    disableDarkTheme();
}

function toggleTheme() {
    isDark = !isDark;
    if (isDark) {
        enableDarkTheme();
    } else {
        disableDarkTheme();
    }
    const META = { isDark };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(META));
}

function enableDarkTheme() {
    DARK_STYLE_LINK.setAttribute("href", DARK_THEME_PATH);
    THEME_TOGGLER.classList.remove("mdi-weather-night");
    THEME_TOGGLER.classList.add("mdi-white-balance-sunny");
}

function disableDarkTheme() {
    DARK_STYLE_LINK.setAttribute("href", "assets/css/mdb.css");
    THEME_TOGGLER.classList.remove("mdi-white-balance-sunny");
    THEME_TOGGLER.classList.add("mdi-weather-night");
}