document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-area-middle");
  if (!loginForm) return;

  const idInput = document.getElementById("floatingInput");
  const passwordInput = document.getElementById("floatingPassword");

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // 기본 제출 막기

    const inputId = idInput.value.trim();
    const inputPassword = passwordInput.value;

    // 로컬 스토리지에서 회원 정보 불러오기
    let storedUser = null;
    try {
      const raw = localStorage.getItem("signupUser");
      if (raw) storedUser = JSON.parse(raw);
    } catch (e) {
      console.error("저장된 사용자 데이터 파싱 실패:", e);
    }

    if (!storedUser) {
      alert("회원가입된 정보가 없습니다.");
      return;
    }

    // 아이디/비밀번호 검증
    if (storedUser.id === inputId && storedUser.password === inputPassword) {
      alert("로그인 성공!");

      // 로그인 상태 저장
      localStorage.setItem(
        "loginSession",
        JSON.stringify({ id: storedUser.id, isLoggedIn: true })
      );

      // 로그인 후 페이지 이동 (필요시 수정)
      window.location.href = "/ssafit/frontend/index.html";
    } else {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  });
});
