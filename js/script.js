document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".reveal");
  const prefersReducedMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
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
      item.style.transitionDelay = `${Math.min(index * 70, 350)}ms`;
      item.classList.add("reveal-pending");
      observer.observe(item);
    });
  }

  const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const href = link.getAttribute("href");
    if (href === "#") {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: scrollBehavior });
      });
      return;
    }
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      target.scrollIntoView({ behavior: scrollBehavior, block: "start" });
    });
  });
});
