// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a:not(.mobile-dropdown a)').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});
// Mobile Accordion-Dropdowns
mobileMenu.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('open');
    // Alle anderen schließen
    mobileMenu.querySelectorAll('.mobile-dropdown-toggle').forEach(t => {
      t.classList.remove('open');
      t.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      toggle.classList.add('open');
      toggle.nextElementSibling.classList.add('open');
    }
  });
});
// Untermenü-Links schließen das Menü
mobileMenu.querySelectorAll('.mobile-dropdown a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// Dropdown: auf Mobile/Touch per Klick öffnen
document.querySelectorAll('.has-dropdown > a').forEach(link => {
  link.addEventListener('click', (e) => {
    const parent = link.parentElement;
    const isOpen = parent.classList.contains('open');
    // Alle anderen schließen
    document.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open'));
    if (!isOpen) {
      e.preventDefault();
      parent.classList.add('open');
    }
  });
});
// Klick außerhalb schließt Dropdowns
document.addEventListener('click', (e) => {
  if (!e.target.closest('.has-dropdown')) {
    document.querySelectorAll('.has-dropdown').forEach(d => d.classList.remove('open'));
  }
});

// Search tabs
let activeTab = 'kaufen';
document.querySelectorAll('.search-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    activeTab = tab.dataset.tab;
  });
});

// Hero Suchformular → suche.html
const heroForm = document.getElementById('heroSearchForm');
if (heroForm) {
  heroForm.addEventListener('submit', e => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('vorhaben', activeTab);
    const ort = document.getElementById('hero-ort').value;
    const typ = document.getElementById('hero-typ').value;
    const preis = document.getElementById('hero-preis').value;
    if (ort) params.set('ort', ort);
    if (typ) params.set('typ', typ);
    if (preis) params.set('preis', preis);
    window.location.href = 'suche.html?' + params.toString();
  });
}

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .listing-card, .testimonial, .prozess-step, .kontakt-item').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// Contact form
document.getElementById('kontaktForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = '✓ Nachricht gesendet!';
  btn.style.background = '#4caf82';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Nachricht senden';
    btn.style.background = '';
    btn.disabled = false;
    e.target.reset();
  }, 4000);
});

// Favorite button toggle
document.querySelectorAll('.listing-fav').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = btn.textContent === '♡' ? '♥' : '♡';
    btn.style.color = btn.textContent === '♥' ? '#e05c5c' : '';
  });
});

// Smooth nav link scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
