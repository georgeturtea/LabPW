const yearElement = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const revealElements = document.querySelectorAll(".reveal");
const themeToggleBtn = document.getElementById("themeToggleBtn");

const stats = [
  { elementId: "stat1", target: 12, suffix: "+" },
  { elementId: "stat2", target: 8, suffix: "+" },
  { elementId: "stat3", target: 1, suffix: " mare" },
];

yearElement.textContent = new Date().getFullYear();

const setTheme = (theme) => {
  const isLightTheme = theme === "light";
  document.body.classList.toggle("light-theme", isLightTheme);

  if (themeToggleBtn) {
    themeToggleBtn.textContent = isLightTheme ? "Dark theme" : "White theme";
  }
};

const savedTheme = localStorage.getItem("themePreference");
setTheme(savedTheme === "light" ? "light" : "dark");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
    setTheme(nextTheme);
    localStorage.setItem("themePreference", nextTheme);
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") {
      return;
    }

    const targetElement = document.querySelector(targetId);
    if (!targetElement) {
      return;
    }

    event.preventDefault();
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const onReveal = () => {
  revealElements.forEach((element) => {
    const { top } = element.getBoundingClientRect();
    if (top < window.innerHeight - 80) {
      element.classList.add("visible");
    }
  });
};

const animateCounter = (elementId, target, suffix) => {
  const element = document.getElementById(elementId);
  if (!element) {
    return;
  }

  let current = 0;
  const step = Math.max(1, Math.ceil(target / 35));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = `${current}${suffix}`;
  }, 30);
};

let statsStarted = false;
const triggerStats = () => {
  const statsContainer = document.querySelector(".stats");
  if (!statsContainer || statsStarted) {
    return;
  }

  const { top } = statsContainer.getBoundingClientRect();
  if (top < window.innerHeight - 60) {
    statsStarted = true;
    stats.forEach((stat) => {
      animateCounter(stat.elementId, stat.target, stat.suffix);
    });
  }
};

const onScroll = () => {
  onReveal();
  triggerStats();

  if (window.scrollY > 350) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
};

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formStatus.classList.remove("success", "error");

  if (!name || !email || !message) {
    formStatus.textContent = "Te rog completează toate câmpurile obligatorii.";
    formStatus.classList.add("error");
    return;
  }

  if (!emailPattern.test(email)) {
    formStatus.textContent = "Introdu o adresă de email validă.";
    formStatus.classList.add("error");
    return;
  }

  formStatus.textContent = `Mulțumesc, ${name}! Mesajul tău a fost trimis.`;
  formStatus.classList.add("success");
  contactForm.reset();
});

window.addEventListener("scroll", onScroll);
window.addEventListener("load", () => {
  onReveal();
  triggerStats();
});
