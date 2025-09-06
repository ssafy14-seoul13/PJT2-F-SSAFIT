document.addEventListener("DOMContentLoaded", function () {
  // 올바른 id/class 선택자 사용
  const idInput = document.querySelector("#inputId");
  const passwordInput = document.querySelector("#inputPassword");
  const confirmPasswordInput = document.querySelector("#confirmPassword");
  const emailInput = document.querySelector("#inputEmail");
  const heightInput = document.querySelector("#inputHeight");
  const weightInput = document.querySelector("#inputWeight");
  const genderInputs = document.querySelectorAll('input[name="gender"]');
  const form = document.querySelector("form");

  function showError(input, message) {
    let error = input.nextElementSibling;
    if (!error || !error.classList.contains("invalid-feedback")) {
      error = document.createElement("div");
      error.className = "invalid-feedback";
      input.parentNode.insertBefore(error, input.nextSibling);
    }
    error.textContent = message;
    input.classList.add("is-invalid");
  }

  function clearError(input) {
    let error = input.nextElementSibling;
    if (error && error.classList.contains("invalid-feedback")) {
      error.textContent = "";
    }
    input.classList.remove("is-invalid");
  }

  // 성별 에러 메시지 표시
  function showGenderError(message) {
    const genderContainer = genderInputs[0].closest(".col-md-12");
    let error = genderContainer.querySelector(".invalid-feedback");
    if (!error) {
      error = document.createElement("div");
      error.className = "invalid-feedback";
      genderContainer.appendChild(error);
    }
    error.textContent = message;
  }
  function clearGenderError() {
    const genderContainer = genderInputs[0].closest(".col-md-12");
    let error = genderContainer.querySelector(".invalid-feedback");
    if (error) error.textContent = "";
  }

  form.addEventListener("submit", function (e) {
    let valid = true;

    // 아이디 유효성 검사
    clearError(idInput);
    if (!idInput.value.trim()) {
      showError(idInput, "아이디를 입력하세요");
      valid = false;
    }

    // 비밀번호 유효성 검사
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

    clearError(passwordInput);
    clearError(confirmPasswordInput);

    if (!regex.test(password)) {
      showError(
        passwordInput,
        "비밀번호는 8~16자, 대문자/소문자/숫자/특수문자를 각각 1개 이상 포함해야 합니다."
      );
      valid = false;
    }

    if (password !== confirmPassword) {
      showError(confirmPasswordInput, "비밀번호가 일치하지 않습니다.");
      valid = false;
    }

    // 키 유효성 검사
    clearError(heightInput);
    const heightValue = Number(heightInput.value);
    if (
      heightInput.value === "" ||
      heightValue < Number(heightInput.min) ||
      heightValue > Number(heightInput.max)
    ) {
      showError(
        heightInput,
        `키는 ${heightInput.min}~${heightInput.max} 사이여야 합니다.`
      );
      valid = false;
    }

    // 몸무게 유효성 검사
    clearError(weightInput);
    const weightValue = Number(weightInput.value);
    if (
      weightInput.value === "" ||
      weightValue < Number(weightInput.min) ||
      weightValue > Number(weightInput.max)
    ) {
      showError(
        weightInput,
        `몸무게는 ${weightInput.min}~${weightInput.max} 사이여야 합니다.`
      );
      valid = false;
    }

    // 성별 유효성 검사
    clearGenderError();
    const genderChecked = Array.from(genderInputs).some(
      (input) => input.checked
    );
    if (!genderChecked) {
      showGenderError("성별을 선택하세요");
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
      return;
    }

    // 유효성 통과 시 JSON 저장
    const userData = {
      id: idInput.value.trim(),
      password: passwordInput.value,
      email: emailInput.value.trim(),
      gender:
        document.querySelector('input[name="gender"]:checked')?.value || "",
      height: heightInput.value,
      weight: weightInput.value,
      birth: {
        year: document.querySelector("#inputYear")?.value || "",
        month: document.querySelector("#inputMonth")?.value || "",
        date: document.querySelector("#inputDate")?.value || "",
      },
    };
    localStorage.setItem("signupUser", JSON.stringify(userData));
    // alert("회원가입 데이터가 저장되었습니다!");
  });

  // 입력 시 에러 메시지 제거
  idInput.addEventListener("input", () => clearError(idInput));
  passwordInput.addEventListener("input", () => clearError(passwordInput));
  confirmPasswordInput.addEventListener("input", () =>
    clearError(confirmPasswordInput)
  );
  heightInput.addEventListener("input", () => clearError(heightInput));
  weightInput.addEventListener("input", () => clearError(weightInput));
  genderInputs.forEach((input) => {
    input.addEventListener("change", clearGenderError);
  });
});
