document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profileForm");
  const editBtn = document.getElementById("editBtn");
  const submitBtn = document.getElementById("submitBtn");

  const genderDisplay = document.getElementById("genderDisplay");

  const editableInputs = [
    "inputPassword",
    "inputEmail",
    "inputHeight",
    "inputWeight",
  ];

  // 유틸: 성별 매핑
  const genderToText = (g) =>
    g === "female" ? "여성" : g === "male" ? "남성" : "-";

  function getStoredUser() {
    let user = null;
    try {
      const rawSignup = localStorage.getItem("signupUser");
      if (rawSignup) user = JSON.parse(rawSignup);
      if (!user) {
        const rawLogged = localStorage.getItem("loggedInUser");
        if (rawLogged) user = JSON.parse(rawLogged);
      }
    } catch (e) {
      console.error("저장된 사용자 파싱 실패:", e);
    }
    return user;
  }

  function setStoredUser(updated) {
    if (localStorage.getItem("signupUser")) {
      localStorage.setItem("signupUser", JSON.stringify(updated));
    } else {
      localStorage.setItem("loggedInUser", JSON.stringify(updated));
    }
  }

  // 1) 데이터 로드 & 뷰 모드
  function loadUserProfile() {
    const storedUser = getStoredUser();
    if (!storedUser) return;

    document.getElementById("inputId").value = storedUser.id ?? "";
    document.getElementById("inputPassword").value = storedUser.password ?? "";
    document.getElementById("inputEmail").value = storedUser.email ?? "";
    document.getElementById("inputHeight").value = storedUser.height ?? "";
    document.getElementById("inputWeight").value = storedUser.weight ?? "";

    const birth = storedUser.birth ?? {};
    document.getElementById("inputYear").value = birth.year ?? "";
    document.getElementById("inputMonth").value = birth.month ?? "";
    document.getElementById("inputDate").value = birth.date ?? "";

    // 성별 텍스트 표시
    genderDisplay.textContent = genderToText(storedUser.gender);

    setViewMode();
  }

  function setViewMode() {
    profileForm
      .querySelectorAll("input")
      .forEach((el) => el.setAttribute("readonly", true));
    editBtn.style.display = "inline-block";
    submitBtn.style.display = "none";
  }

  function setEditMode() {
    editableInputs.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.removeAttribute("readonly");
    });

    editBtn.style.display = "none";
    submitBtn.style.display = "inline-block";
  }

  editBtn.addEventListener("click", setEditMode);

  profileForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("inputPassword").value;
    const newEmail = document.getElementById("inputEmail").value;
    const newHeight = document.getElementById("inputHeight").value;
    const newWeight = document.getElementById("inputWeight").value;

    const storedUser = getStoredUser();
    if (!storedUser) return;

    const updatedUser = {
      ...storedUser,
      password: newPassword,
      email: newEmail,
      height: newHeight,
      weight: newWeight,
      birth: storedUser.birth,
    };

    setStoredUser(updatedUser);
    alert("회원정보가 성공적으로 수정되었습니다.");
    loadUserProfile();
  });

  loadUserProfile();
});
