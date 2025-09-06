function loadHTML(id, file) {
  // 로드가 끝나면 resolve되는 Promise 반환
  return fetch(file)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
    });
}

function updateHeaderLogin() {
  const loginDataRaw = localStorage.getItem("loginSession");
  if (!loginDataRaw) return;

  try {
    const loginData = JSON.parse(loginDataRaw);
    if (loginData.isLoggedIn) {
      // 헤더 컨테이너 내부에서 찾으면 더 안전
      const headerContainer = document.getElementById("header-container");
      const loginLink = headerContainer?.querySelector("#loginLink");
      if (loginLink) {
        const userLink = document.createElement("a");
        userLink.textContent = loginData.id;
        userLink.href = "/ssafit/frontend/pages/profile.html";
        userLink.className =
          "link-offset-2 link-offset-3-hover link-underline-light link-underline-opacity-0 link-underline-opacity-75-hover text-white fw-bold";
        loginLink.replaceWith(userLink);
      }
    }
  } catch (e) {
    console.error("로그인 데이터 파싱 실패:", e);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 헤더/푸터 로드가 끝난 뒤에 업데이트 실행
  Promise.all([
    loadHTML("header-container", "/ssafit/frontend/partials/header.html"),
    loadHTML("footer-container", "/ssafit/frontend/partials/footer.html"),
  ]).then(() => {
    updateHeaderLogin();
  });
});
