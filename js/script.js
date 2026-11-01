document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || reduceMotion) {
    items.forEach((item) => item.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("reveal-pending");
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    items.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 65, 325)}ms`;
      item.classList.add("reveal-pending");
      observer.observe(item);
    });
  }

  const nav = document.getElementById("nav");
  const menuButton = document.getElementById("menu");
  if (nav && menuButton) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "بستن منو" : "باز کردن منو");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "باز کردن منو");
      });
    });

    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  const themeButton = document.getElementById("theme");
  if (themeButton) {
    themeButton.addEventListener("click", () => {
      const light = document.body.classList.toggle("light");
      themeButton.textContent = light ? "☾" : "☼";
      themeButton.setAttribute("aria-label", light ? "فعال‌کردن حالت تاریک" : "فعال‌کردن حالت روشن");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const id = link.getAttribute("href").slice(1);
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    });
  });
});
