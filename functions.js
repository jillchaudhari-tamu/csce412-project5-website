// functions.js — FINAL

function load_style() {
  // Use saved theme or default to Style 1
  let page_style = localStorage.getItem("page_stylesheet_name");
  if (!page_style) page_style = "styling_1.css";

  // Swap stylesheet on themed pages (AI page has no #page_style, that's fine)
  const link = document.getElementById("page_style");
  if (link) link.setAttribute("href", page_style);

  // Highlight active link
  const path = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav a, .site-nav a").forEach(a => {
    if (a.getAttribute("href") === path) a.classList.add("active");
    else a.classList.remove("active");
  });

  // Update both toggle button labels (top nav & sidebar)
  const label = page_style.includes("style_2.css") ? "Switch to Style 1" : "Switch to Style 2";
  ["theme-toggle", "theme-toggle-s2"].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.textContent = label;
  });
}

function set_style1() {
  localStorage.setItem("page_stylesheet_name", "styling_1.css");
  load_style();
}

function set_style2() {
  localStorage.setItem("page_stylesheet_name", "style_2.css"); // underscore!
  load_style();
}

function bindToggles() {
  const switchTheme = () => {
    const saved = localStorage.getItem("page_stylesheet_name") || "styling_1.css";
    const using2 = saved.includes("style_2.css");
    using2 ? set_style1() : set_style2();
  };

  ["theme-toggle", "theme-toggle-s2"].forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.dataset.bound) {
      el.addEventListener("click", switchTheme);
      el.dataset.bound = "1";
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  load_style();
  bindToggles();
});
