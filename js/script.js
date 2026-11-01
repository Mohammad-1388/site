const nav = document.querySelector('#nav');
const menu = document.querySelector('#menu');
const theme = document.querySelector('#theme');
const header = document.querySelector('.header');
const glow = document.querySelector('.cursor-glow');
const root = document.documentElement;

menu.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(isOpen));
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  });
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

theme.addEventListener('click', () => {
  const isLight = root.dataset.theme !== 'light';
  if (isLight) {
    root.dataset.theme = 'light';
  } else {
    delete root.dataset.theme;
  }

  theme.textContent = isLight ? '☾' : '☼';
  theme.setAttribute('aria-label', isLight ? 'فعال‌کردن حالت تاریک' : 'فعال‌کردن حالت روشن');

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute('content', isLight ? '#f5f7fb' : '#070a12');
  }
});

if (glow && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (event) => {
    glow.style.left = event.clientX + 'px';
    glow.style.top = event.clientY + 'px';
  });
}

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = Math.min(index * 40, 280) + 'ms';
    observer.observe(element);
  });
} else {
  // Keep content visible in older browsers that do not support IntersectionObserver.
  revealElements.forEach((element) => element.classList.add('show'));
}
