// ===== SIDEBAR TOGGLE FUNCTIONALITY =====
const sidebar = document.querySelector(".sidebar");
const toggleButton = document.getElementById("sidebarToggle");
let overlay = document.getElementById("overlay");

// ✅ If overlay doesn't exist, create it dynamically
if (!overlay) {
  overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);
}

// Toggle sidebar (mobile)
if (toggleButton) {
  toggleButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  });
}

// Close sidebar when clicking overlay (mobile)
overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});

// ===== CURRENT TIME (for Profile Card) =====
const timeDisplay = document.querySelector("[data-testid='test-user-time']");
if (timeDisplay) {
  function updateTime() {
    const now = new Date();
    timeDisplay.textContent = now.toLocaleTimeString();
  }
  updateTime();
  setInterval(updateTime, 1000);
}

// ===== CONTACT FORM VALIDATION =====
const form = document.getElementById("contactForm");
if (form) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const messageInput = document.getElementById("message");
  const successMsg = document.getElementById("success-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Helper functions
    const showError = (input, message) => {
      const errorField = document.getElementById(`error-${input.id}`);
      if (errorField) errorField.textContent = message;
      input.setAttribute("aria-invalid", "true");
      isValid = false;
    };

    const clearError = (input) => {
      const errorField = document.getElementById(`error-${input.id}`);
      if (errorField) errorField.textContent = "";
      input.removeAttribute("aria-invalid");
    };

    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput, "Full name is required.");
    } else {
      clearError(nameInput);
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
      showError(emailInput, "Email is required.");
    } else if (!emailPattern.test(emailInput.value)) {
      showError(emailInput, "Enter a valid email address.");
    } else {
      clearError(emailInput);
    }

    // Validate Subject
    if (!subjectInput.value.trim()) {
      showError(subjectInput, "Subject is required.");
    } else {
      clearError(subjectInput);
    }

    // Validate Message
    if (!messageInput.value.trim()) {
      showError(messageInput, "Message is required.");
    } else if (messageInput.value.trim().length < 10) {
      showError(messageInput, "Message must be at least 10 characters.");
    } else {
      clearError(messageInput);
    }

    // Show success message
    if (isValid) {
      successMsg.hidden = false;
      form.reset();
      setTimeout(() => (successMsg.hidden = true), 4000);
    } else {
      successMsg.hidden = true;
    }
  });
}