function loadHTML(id, file) {
  fetch(file)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header-container", "/ssafit/frontend/partials/header.html");
  loadHTML("footer-container", "/ssafit/frontend/partials/footer.html");
});
