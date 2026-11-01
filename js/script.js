const nav=document.querySelector('#nav'),menu=document.querySelector('#menu'),theme=document.querySelector('#theme'),header=document.querySelector('.header'),glow=document.querySelector('.cursor-glow');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>20));
let light=false;theme.addEventListener('click',()=>{light=!light;document.documentElement.style.setProperty('--bg',light?'#f5f7fb':'#070a12');document.documentElement.style.setProperty('--panel',light?'#ffffff':'#0d1220');document.documentElement.style.setProperty('--text',light?'#111522':'#f4f6fb');document.documentElement.style.setProperty('--muted',light?'#596273':'#8e98aa');document.documentElement.style.setProperty('--line',light?'rgba(15,20,35,.12)':'rgba(255,255,255,.09)');theme.textContent=light?'☾':'☼';});
document.addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
const io=new IntersectionObserver(entries=>entries.forEach(e=>e.isIntersecting&&e.target.classList.add('show')),{threshold:.12});document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=Math.min(i*40,280)+'ms';io.observe(el)});
