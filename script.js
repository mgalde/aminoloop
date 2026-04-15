/* AminoLoop -- script.js */

/* Nav shadow on scroll */
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });
}

/* Mobile nav toggle */
const toggle = document.getElementById('navToggle');
const drawer = document.getElementById('navDrawer');

function openDrawer() {
  toggle.classList.add('open');
  toggle.setAttribute('aria-expanded', 'true');
  toggle.setAttribute('aria-label', 'Close navigation menu');
  drawer.removeAttribute('hidden');
}

function closeDrawer() {
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation menu');
  drawer.setAttribute('hidden', '');
}

if (toggle && drawer) {
  toggle.addEventListener('click', () => {
    if (toggle.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('click', (e) => {
    if (nav && !nav.contains(e.target)) {
      closeDrawer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
  });
}

/* Smooth scroll with nav offset for hash links on same page */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href');
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = nav ? nav.offsetHeight + 12 : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
