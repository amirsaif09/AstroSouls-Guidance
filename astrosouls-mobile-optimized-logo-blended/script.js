// AstroSouls Guidance — responsive navigation, reveal motion and enquiry handling.
// Add confirmed business contact details before launch.
const ASTROSOULS_CONFIG = {
  whatsappNumber: "17327894743", // +1 (732) 789-4743
  enquiryEmail: "astrosoulsguidance@gmail.com"
};

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(element => revealObserver.observe(element));
} else {
  revealItems.forEach(element => element.classList.add("is-visible"));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector("#enquiry-form");
const formNote = document.querySelector("#form-note");

form?.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const message = [
    "Hello AstroSouls Guidance, I'd like to enquire about a session.",
    "",
    `Name: ${data.get("name")}`,
    `WhatsApp: ${data.get("phone")}`,
    `Email: ${data.get("email")}`,
    `Interested in: ${data.get("interest")}`,
    "",
    `Message: ${data.get("message") || "Not provided"}`
  ].join("\\n");

  if (!ASTROSOULS_CONFIG.whatsappNumber) {
    if (formNote) {
      formNote.textContent = "WhatsApp contact is not configured yet. Please contact us by email.";
      formNote.classList.add("form-warning");
    }
    return;
  }

  const whatsappURL = `https://wa.me/${ASTROSOULS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
