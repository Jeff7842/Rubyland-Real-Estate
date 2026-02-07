export function initAdminAuth() {
  // Guard: only run in browser
  if (typeof window === "undefined") return;

  const toggleBtn = document.querySelector<HTMLButtonElement>(".toggle-password");
  const passwordInput = document.getElementById("adminPassword") as HTMLInputElement | null;
  const form = document.getElementById("adminLoginForm") as HTMLFormElement | null;

  // Guard against missing elements
  if (!toggleBtn || !passwordInput || !form) {
    console.warn("Admin auth elements not found");
    return;
  }

  // Toggle password visibility
  toggleBtn.addEventListener("click", () => {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";

    toggleBtn.innerHTML = isPassword
      ? '<i class="fas fa-eye-slash"></i>'
      : '<i class="fas fa-eye"></i>';
  });

  // Handle login submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = (form.querySelector('input[name="email"]') as HTMLInputElement)?.value;
    const password = passwordInput.value;

    if (!email || !password) {
      console.warn("Missing credentials");
      return;
    }

    // 🔐 Replace with real auth:
    // - Supabase auth
    // - API route (/api/admin/login)
    // - JWT flow

    console.log("Admin login submitted", { email });

    // Example redirect after success:
    // window.location.href = "/admin/dashboard";
  });
}