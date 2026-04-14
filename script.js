/* ================================================================
   AMINO LOOP — script.js
================================================================ */

// ----------------------------------------------------------------
// NAV: Add shadow on scroll
// ----------------------------------------------------------------
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


// ----------------------------------------------------------------
// NAV: Mobile menu toggle
// ----------------------------------------------------------------
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu   = document.getElementById('mobileMenu');

mobileToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  mobileToggle.classList.toggle('open', isOpen);
  mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close mobile menu when any nav link is clicked
document.querySelectorAll('.nav__mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    mobileToggle.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
    mobileToggle.classList.remove('open');
    mobileToggle.setAttribute('aria-expanded', 'false');
  }
});


// ----------------------------------------------------------------
// SCROLL ENTRANCE ANIMATIONS
// ----------------------------------------------------------------
const animatedEls = document.querySelectorAll('.animate-up');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // fire once
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

animatedEls.forEach(el => observer.observe(el));


// ----------------------------------------------------------------
// SMOOTH SCROLL: offset for fixed nav
// ----------------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


// ----------------------------------------------------------------
// CONTACT FORM: placeholder submission handler
// NOTE: Replace this with Formspree, Netlify Forms, or your API
//
//   Formspree example:
//     <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
//   Or use fetch() below with your own endpoint.
// ----------------------------------------------------------------
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    // Basic validation
    const name    = contactForm.querySelector('#name').value.trim();
    const email   = contactForm.querySelector('#email').value.trim();
    const interest = contactForm.querySelector('#interest').value;
    const message = contactForm.querySelector('#message').value.trim();

    if (!name || !email || !interest || !message) {
      showFormError(btn, 'Please fill out all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      showFormError(btn, 'Please enter a valid email address.');
      return;
    }

    // Simulate async submission
    btn.textContent = 'Sending\u2026';
    btn.disabled = true;
    btn.style.background = 'var(--text-muted)';

    setTimeout(() => {
      btn.textContent = 'Message Sent \u2014 We\u2019ll Be in Touch';
      btn.style.background = 'var(--sage)';
      contactForm.reset();

      // Re-enable after delay so user can submit again if needed
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
      }, 6000);
    }, 900);
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormError(btn, message) {
  const originalText = btn.textContent;
  btn.textContent = message;
  btn.style.background = '#8B3A1F';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
  }, 3000);
}
