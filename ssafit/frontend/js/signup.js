document.addEventListener("DOMContentLoaded", function () {
  const passwordInputs = document.querySelectorAll("#inputPassword4");
  const form = document.querySelector("form");
  const idInput = document.querySelector("#inputId4");
  const heightInput = document.querySelector("#inputHeight");
  const weightInput = document.querySelector("#inputWeight");

  function showError(input, message) {
    // input 바로 아래에 에러 메시지 div가 없으면 생성
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

  form.addEventListener("submit", function (e) {
    let valid = true;
    const password = passwordInputs[0].value;
    const confirmPassword = passwordInputs[1].value;
    const idValue = idInput.value.trim();
    const heightValue = Number(heightInput.value);
    const weightValue = Number(weightInput.value);

    // 아이디 유효성 검사
    clearError(idInput);
    if (!idValue) {
      showError(idInput, "아이디를 입력하세요");
      valid = false;
    }

    // 비밀번호 유효성 검사
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,16}$/;

    clearError(passwordInputs[0]);
    clearError(passwordInputs[1]);

    if (!regex.test(password)) {
      showError(
        passwordInputs[0],
        "비밀번호는 8~16자, 대문자/소문자/숫자/특수문자를 각각 1개 이상 포함해야 합니다."
      );
      valid = false;
    }

    if (password !== confirmPassword) {
      showError(passwordInputs[1], "비밀번호가 일치하지 않습니다.");
      valid = false;
    }

    // 키 유효성 검사
    clearError(heightInput);
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

    if (!valid) {
      e.preventDefault();
    }
  });

  passwordInputs.forEach((input) => {
    input.addEventListener("input", () => clearError(input));
  });
  idInput.addEventListener("input", () => clearError(idInput));
  heightInput.addEventListener("input", () => clearError(heightInput));
  weightInput.addEventListener("input", () => clearError(weightInput));
});
