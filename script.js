// عناصر صفحه
const nav = document.getElementById('nav');
const header = document.querySelector('.header');
const themeButton = document.getElementById('theme');
const glow = document.querySelector('.cursor-glow');
const root = document.documentElement;

// بستن منوی موبایل پس از انتخاب لینک
if (nav) {
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

// تغییر ظاهر هدر هنگام اسکرول
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// تغییر تم با یک ویژگی واحد روی ریشه صفحه
function setTheme(mode) {
  const isLight = mode === 'light';
  root.dataset.theme = isLight ? 'light' : 'dark';
  if (themeButton) {
    themeButton.textContent = isLight ? '☾' : '☼';
    themeButton.setAttribute('aria-label', isLight ? 'فعال کردن حالت تاریک' : 'فعال کردن حالت روشن');
    themeButton.setAttribute('aria-pressed', String(isLight));
  }
}

if (themeButton) {
  themeButton.addEventListener('click', () => {
    setTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
  });
}
setTheme('dark');

// نور دنبال‌کننده نشانگر ماوس
if (glow) {
  document.addEventListener('mousemove', event => {
    glow.style.left = event.clientX + 'px';
    glow.style.top = event.clientY + 'px';
  });
}

// نمایش تدریجی بخش‌ها هنگام ورود به صفحه
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = Math.min(index * 40, 280) + 'ms';
  observer.observe(element);
});
