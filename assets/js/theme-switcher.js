const LOCAL_STORAGE_KEY = "toggle-minex-theme";

const LOCAL_META_DATA = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

const DARK_THEME_PATH = "assets/css/mdb.css";

const DARK_STYLE_LINK = document.getElementById("dark-theme-style");
const THEME_TOGGLER = document.getElementById("theme-toggler");
const NAVBAR = document.getElementById("navbar");
const INTRO_SECTION = document.getElementById("intro");

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
    DARK_STYLE_LINK.setAttribute("href", "assets/css/mdb-dark.css");
    THEME_TOGGLER.classList.remove("mdi-weather-night");
    THEME_TOGGLER.classList.add("mdi-white-balance-sunny");
    NAVBAR.classList.remove("bg-light");
    NAVBAR.classList.remove("navbar-light");
    NAVBAR.classList.add("bg-dark");
    NAVBAR.classList.add("navbar-dark");
    INTRO_SECTION.classList.remove("intro-light");
    INTRO_SECTION.classList.add("intro-dark");

}

function disableDarkTheme() {
    DARK_STYLE_LINK.setAttribute("href", DARK_THEME_PATH);
    THEME_TOGGLER.classList.remove("mdi-white-balance-sunny");
    THEME_TOGGLER.classList.add("mdi-weather-night");
    NAVBAR.classList.remove("navbar-dark");
    NAVBAR.classList.remove("bg-dark");
    NAVBAR.classList.add("navbar-light");
    NAVBAR.classList.add("bg-light");
    INTRO_SECTION.classList.remove("intro-dark");
    INTRO_SECTION.classList.add("intro-light");
}