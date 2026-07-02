// ===== Header scroll state =====
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ===== Mobile nav =====
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const setMenu = (open) => {
  nav.classList.toggle('open', open);
  navToggle.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.classList.toggle('menu-open', open);
};
navToggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => io.observe(el));

// ===== Animated counters =====
const counters = document.querySelectorAll('.stat-num');
const animateCount = (el) => {
  const target = +el.dataset.count;
  const duration = 1600;
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(eased * target).toLocaleString('pt-BR');
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString('pt-BR');
  };
  requestAnimationFrame(step);
};
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
counters.forEach((el) => countObserver.observe(el));

// ===== Contact form -> WhatsApp =====
const form = document.getElementById('contatoForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const assunto = document.getElementById('assunto').value;
  const mensagem = document.getElementById('mensagem').value.trim();
  const texto =
    `Olá! Meu nome é ${nome}.%0A` +
    `Assunto: ${assunto}.%0A` +
    (mensagem ? `Mensagem: ${mensagem}.%0A` : '') +
    `Telefone: ${telefone}.`;
  window.open(`https://wa.me/5521964115717?text=${texto}`, '_blank');
});

// ===== Scroll progress bar =====
const progress = document.getElementById('scrollProgress');
const updateProgress = () => {
  const h = document.documentElement;
  const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
  progress.style.width = Math.max(0, Math.min(1, scrolled)) * 100 + '%';
};
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });

// ===== Scrollspy: destaque do menu por seção =====
const navLinks = [...document.querySelectorAll('.nav a')];
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
document.querySelectorAll('section[id]').forEach((s) => spy.observe(s));

// ===== Parallax leve no hero ao rolar =====
const heroContent = document.querySelector('.hero-content');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (heroContent && y < window.innerHeight) {
    heroContent.style.transform = `translateY(${y * 0.14}px)`;
    heroContent.style.opacity = `${Math.max(0, 1 - y / (window.innerHeight * 0.8))}`;
  }
}, { passive: true });

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
