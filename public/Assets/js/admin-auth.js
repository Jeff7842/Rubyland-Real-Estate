document.addEventListener("DOMContentLoaded", () => {

  const toggleBtn = document.querySelector(".toggle-password");
  const passwordInput = document.getElementById("adminPassword");

  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleBtn.innerHTML = isPassword
      ? '<i class="fas fa-eye-slash"></i>'
      : '<i class="fas fa-eye"></i>';
  });

  document.getElementById("adminLoginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    // 🔐 Placeholder for real auth
    // Replace with:
    // - PHP session login
    // - Supabase auth
    // - JWT / API call

    console.log("Admin login submitted");

    // window.location.href = "admin-dashboard.html";
  });

});
