const toggle = document.getElementById('navToggle');
const nav = document.getElementById('navLinks');
function closeMenu() { nav?.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); toggle?.classList.remove('active'); }
toggle?.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); toggle.classList.toggle('active', open); toggle.setAttribute('aria-expanded', String(open)); });
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
const sections = [...document.querySelectorAll('section[id]')];
function updateNav() { document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 30); let current = 'home'; sections.forEach(s => { if (s.getBoundingClientRect().top <= 150) current = s.id; }); document.querySelectorAll('.nav-link').forEach(a => { const active = a.hash === '#' + current; a.classList.toggle('active', active); if (active) a.setAttribute('aria-current','location'); else a.removeAttribute('aria-current'); }); }
window.addEventListener('scroll', updateNav, { passive:true }); updateNav();
const configuredUrl = window.LUCY_CONFIG?.readingAppUrl?.trim();
if (configuredUrl) { try { const url = new URL(configuredUrl); if (url.protocol === 'https:') { document.querySelectorAll('[data-app-launch],#reading-app-link').forEach(a => { a.href = url.href; a.textContent = '打开阅读 App ↗'; }); document.querySelectorAll('[data-app-status],#app-status').forEach(el => el.textContent = '阅读 App 已开放，欢迎一起读故事。'); document.querySelectorAll('.status').forEach(el => el.textContent = '儿童阅读 App · 已上线'); document.querySelector('[data-pending-faq]')?.remove(); } } catch {} }

const subButtons = [...document.querySelectorAll('.sub-toggle')];
function closeSubmenus(except) { subButtons.forEach(button => { if (button !== except) { button.setAttribute('aria-expanded','false'); document.getElementById(button.getAttribute('aria-controls')).hidden = true; } }); }
subButtons.forEach(button => button.addEventListener('click', () => { const open = button.getAttribute('aria-expanded') !== 'true'; closeSubmenus(); button.setAttribute('aria-expanded', String(open)); document.getElementById(button.getAttribute('aria-controls')).hidden = !open; }));
document.addEventListener('click', e => { if (!e.target.closest('.nav-group')) closeSubmenus(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { const open = subButtons.find(b => b.getAttribute('aria-expanded') === 'true'); if (open) { closeSubmenus(); open.focus(); } } });
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { closeSubmenus(); const target = document.getElementById(a.hash.slice(1)); if (target?.hasAttribute('tabindex')) target.focus({preventScroll:true}); }));
window.addEventListener('resize', () => closeSubmenus());
