document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('is-open');
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll-in animations
const animatedItems = document.querySelectorAll('.service-card, .step-card, .info-card, .about-visual, .hero-visual');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animatedItems.forEach(item => observer.observe(item));
} else {
  animatedItems.forEach(item => item.classList.add('in-view'));
}

// Contact form submission (Netlify Forms via fetch)
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data).toString()
  })
    .then(() => {
      note.textContent = 'הפנייה נשלחה בהצלחה! נחזור אליך בקרוב.';
      form.reset();
    })
    .catch(() => {
      note.textContent = 'משהו לא הסתדר - אפשר גם להתקשר ל-050-534-5601.';
    });
});
