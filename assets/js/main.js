/* ===== TYPING EFFECT ===== */
const typingPhrases = [
  'responsive websites.',
  'modern user interfaces.',
  'sites that convert.',
  'brands that stand out.',
  'digital experiences.',
];

const typingEl = document.getElementById('typingText');
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const current = typingPhrases[phraseIndex];

  if (isDeleting) {
    typingEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000; // Pause at end
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    speed = 400; // Pause before next word
  }

  setTimeout(typeEffect, speed);
}

typeEffect();

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== MOBILE NAV TOGGLE ===== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ===== SCROLL REVEAL ===== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the reveal for siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        const siblingIndex = Array.from(siblings).indexOf(entry.target);
        const delay = siblingIndex * 100;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

/* ===== COUNTER ANIMATION ===== */
const counterElements = document.querySelectorAll('.highlight-number');

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

counterElements.forEach(el => counterObserver.observe(el));

function animateCounter(el, target) {
  let current = 0;
  const duration = 1500;
  const steps = 40;
  const increment = target / steps;
  const stepTime = duration / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.round(current);
  }, stepTime);
}

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all required fields.';
    formStatus.className = 'form-status error';
    return;
  }

  // Build mailto link as a simple solution (no backend needed)
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nService: ${document.getElementById('service').value || 'Not specified'}\n\nMessage:\n${message}`
  );
  window.location.href = `mailto:curtisstephensjr@gmail.com?subject=${subject}&body=${body}`;

  formStatus.textContent = 'Opening your email client...';
  formStatus.className = 'form-status success';

  // Reset form after brief delay
  setTimeout(() => {
    contactForm.reset();
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }, 3000);
});

/* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
