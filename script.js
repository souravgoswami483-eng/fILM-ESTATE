/* ============================================
   THE FILM ESTATE — Premium JavaScript
   Custom Cursor · Preloader · Particles ·
   Hero Slider · Counters · Testimonials · Forms
   ============================================ */

'use strict';

// ─── PRELOADER ────────────────────────────────────
const preloader = document.getElementById('preloader');

window.addEventListener('load', () => {
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 1800);
});

// ─── CUSTOM CURSOR ───────────────────────────────
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;
let rafId;

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  ringX = lerp(ringX, mouseX, 0.1);
  ringY = lerp(ringY, mouseY, 0.1);

  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';

  rafId = requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor hover effect on interactive elements
const hoverTargets = document.querySelectorAll(
  'a, button, .service-card, .gallery-item, .package-card, .feature-pill, .contact-item'
);

hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
});

// ─── FLOATING PARTICLES ──────────────────────────
const particlesContainer = document.getElementById('particlesContainer');
const PARTICLE_COUNT = 25;

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';

  const size = Math.random() * 4 + 1;
  const startX = Math.random() * 100;
  const duration = Math.random() * 15 + 10;
  const delay = Math.random() * 10;
  const opacity = Math.random() * 0.5 + 0.2;

  particle.style.cssText = `
    left: ${startX}%;
    width: ${size}px;
    height: ${size}px;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    opacity: 0;
    background: ${Math.random() > 0.6 ? 'var(--gold)' : 'rgba(201,168,76,0.5)'};
    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
    transform: rotate(45deg);
  `;

  particlesContainer.appendChild(particle);
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  createParticle();
}

// ─── NAVBAR SCROLL EFFECT ───────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── HAMBURGER MENU ─────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  const isOpen = navLinks.classList.contains('open');

  spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
  spans[1].style.opacity = isOpen ? '0' : '';
  spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
});

// Close nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// ─── HERO SLIDER ────────────────────────────────
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let sliderTimer;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startSlider() {
  sliderTimer = setInterval(() => goToSlide(currentSlide + 1), 5500);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(sliderTimer);
    goToSlide(i);
    startSlider();
  });
});

startSlider();

// ─── SCROLL REVEAL OBSERVER ──────────────────────
const revealElements = document.querySelectorAll(
  '.reveal-up, .reveal-left, .reveal-right, .reveal-scale'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ─── STATS COUNTER ANIMATION ─────────────────────
const statNumbers = document.querySelectorAll('.stat-number');

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 2200;
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        el.textContent = Math.floor(easedProgress * target);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target;
        }
      }

      requestAnimationFrame(updateCounter);
      countObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => countObserver.observe(el));

// ─── TESTIMONIALS SLIDER ─────────────────────────
const testimonialTrack = document.getElementById('testimonialTrack');
const testiDots = document.querySelectorAll('.testi-dot');
const testiPrev = document.getElementById('testi-prev');
const testiNext = document.getElementById('testi-next');
let currentTesti = 0;
const totalTestis = testiDots.length;
let testiTimer;

function goToTesti(index) {
  testiDots[currentTesti].classList.remove('active');
  currentTesti = (index + totalTestis) % totalTestis;
  testimonialTrack.style.transform = `translateX(-${currentTesti * 100}%)`;
  testiDots[currentTesti].classList.add('active');
}

function startTestiSlider() {
  testiTimer = setInterval(() => goToTesti(currentTesti + 1), 6000);
}

testiNext.addEventListener('click', () => {
  clearInterval(testiTimer);
  goToTesti(currentTesti + 1);
  startTestiSlider();
});

testiPrev.addEventListener('click', () => {
  clearInterval(testiTimer);
  goToTesti(currentTesti - 1);
  startTestiSlider();
});

testiDots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(testiTimer);
    goToTesti(i);
    startTestiSlider();
  });
});

startTestiSlider();

// Touch / swipe support for testimonials
let touchStartX = 0;

testimonialTrack.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

testimonialTrack.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 50) {
    clearInterval(testiTimer);
    goToTesti(diff > 0 ? currentTesti + 1 : currentTesti - 1);
    startTestiSlider();
  }
}, { passive: true });

// ─── FORM VALIDATION HELPERS & SUBMISSION ──────────
function showError(input, message) {
  const formGroup = input.closest('.form-group');
  if (!formGroup) return;
  formGroup.classList.add('error');
  let errorEl = formGroup.querySelector('.error-message');
  if (!errorEl) {
    errorEl = document.createElement('span');
    errorEl.className = 'error-message';
    formGroup.appendChild(errorEl);
  }
  errorEl.textContent = message;
}

function clearError(input) {
  const formGroup = input.closest('.form-group');
  if (!formGroup) return;
  formGroup.classList.remove('error');
  const errorEl = formGroup.querySelector('.error-message');
  if (errorEl) {
    errorEl.textContent = '';
  }
}

function validateForm(form) {
  let isValid = true;

  // 1. Name validation
  const nameInput = form.querySelector('input[name="fullName"]');
  if (nameInput) {
    const value = nameInput.value.trim();
    if (value === '') {
      showError(nameInput, 'Name is required');
      isValid = false;
    } else if (value.length < 3) {
      showError(nameInput, 'Name must be at least 3 characters');
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(value)) {
      showError(nameInput, 'Name should contain only letters and spaces');
      isValid = false;
    } else {
      clearError(nameInput);
    }
  }

  // 2. Email validation
  const emailInput = form.querySelector('input[name="email"]');
  if (emailInput) {
    const value = emailInput.value.trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value === '') {
      showError(emailInput, 'Email address is required');
      isValid = false;
    } else if (!emailRegex.test(value)) {
      showError(emailInput, 'Please enter a valid email address');
      isValid = false;
    } else {
      clearError(emailInput);
    }
  }

  // 3. Phone validation
  const phoneInput = form.querySelector('input[name="phone"]');
  if (phoneInput) {
    const value = phoneInput.value.trim();
    const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
    if (value === '') {
      showError(phoneInput, 'Phone number is required');
      isValid = false;
    } else if (!phoneRegex.test(value.replace(/\s+/g, ''))) {
      showError(phoneInput, 'Please enter a valid phone number (at least 10 digits)');
      isValid = false;
    } else {
      clearError(phoneInput);
    }
  }

  // 4. Wedding Date validation
  const dateInput = form.querySelector('input[name="weddingDate"]');
  if (dateInput && dateInput.value) {
    const selectedDate = new Date(dateInput.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      showError(dateInput, 'Wedding date cannot be in the past');
      isValid = false;
    } else {
      clearError(dateInput);
    }
  } else if (dateInput) {
    clearError(dateInput);
  }

  return isValid;
}

function setupRealtimeValidation(form) {
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const formGroup = input.closest('.form-group');
      if (formGroup && formGroup.classList.contains('error')) {
        if (input.name === 'fullName') {
          const val = input.value.trim();
          if (val.length >= 3 && /^[a-zA-Z\s]+$/.test(val)) clearError(input);
        } else if (input.name === 'email') {
          const val = input.value.trim();
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (emailRegex.test(val)) clearError(input);
        } else if (input.name === 'phone') {
          const val = input.value.trim().replace(/\s+/g, '');
          if (/^\+?[0-9\s-]{10,15}$/.test(val)) clearError(input);
        } else if (input.name === 'weddingDate') {
          const selectedDate = new Date(input.value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate >= today) clearError(input);
        }
      }
    });
  });
}

// ─── CONTACT FORM SUBMISSION ──────────────────────
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  setupRealtimeValidation(contactForm);
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm(contactForm)) {
      return;
    }

    const btn = document.getElementById('submit-form-btn');
    const btnText = btn ? btn.querySelector('span:first-child') : null;
    const originalText = btnText ? btnText.textContent : 'Send Enquiry';
    
    if (btnText) btnText.textContent = 'Sending…';
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = '0.7';
    }

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    data['_subject'] = 'New Wedding Enquiry — The Film Estate';

    fetch('https://formsubmit.co/ajax/thefilmestates@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      if (btnText) btnText.textContent = originalText;
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '';
      }
      window.location.href = 'thankyou.html';
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      if (btnText) btnText.textContent = originalText;
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '';
      }
      window.location.href = 'thankyou.html';
    });
  });
}

// ─── SMOOTH ACTIVE NAV LINK HIGHLIGHT ────────────
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.classList.remove('active-nav');
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--gold-light)';
        }
      });
    }
  });
}, {
  threshold: 0.3,
  rootMargin: '-80px 0px -80px 0px'
});

sections.forEach(section => sectionObserver.observe(section));

// ─── PARALLAX HERO EFFECT ─────────────────────────
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrolled = window.scrollY;
      const heroSlides = document.querySelectorAll('.hero-slide');
      heroSlides.forEach(slide => {
        slide.style.transform = `translateY(${scrolled * 0.25}px)`;
      });
      ticking = false;
    });
    ticking = true;
  }
});

// ─── GALLERY ITEM Z-INDEX HOVER ───────────────────
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', () => item.style.zIndex = '10');
  item.addEventListener('mouseleave', () => item.style.zIndex = '');
});

// ─── PACKAGE CARD 3D TILT EFFECT ─────────────────
document.querySelectorAll('.package-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tiltX = -(y / rect.height) * 8;
    const tiltY = (x / rect.width) * 8;

    if (card.classList.contains('featured')) {
      card.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-24px)`;
    } else {
      card.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-12px)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = card.classList.contains('featured')
      ? 'perspective(1200px) rotateX(0) rotateY(0) translateY(-16px)'
      : 'perspective(1200px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ─── SERVICE CARD MAGNETIC EFFECT ────────────────
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

// ─── STEP NUMBER HOVER PING STAGGER ─────────────
document.querySelectorAll('.process-step').forEach((step, i) => {
  step.style.setProperty('--step-delay', `${i * 0.15}s`);
});

// ─── SMOOTH SCROLL FOR ANCHORS ─────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ─── FEATURE PILL HOVER ANIMATION ───────────────
document.querySelectorAll('.feature-pill').forEach((pill, i) => {
  pill.addEventListener('mouseenter', () => {
    pill.style.transitionDelay = '0s';
  });
});

// ─── GALLERY IMAGES LOADED FADE ─────────────────
document.querySelectorAll('.gallery-item img').forEach(img => {
  if (img.complete) {
    img.style.opacity = '1';
  } else {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.6s ease';
    img.addEventListener('load', () => { img.style.opacity = '1'; });
  }
});

// ─── FOOTER YEAR AUTO-UPDATE ─────────────────────
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
  footerYear.innerHTML = footerYear.innerHTML.replace(
    /© \d{4}/,
    `© ${new Date().getFullYear()}`
  );
}

// ─── PACKAGE TABS ──────────────────────────────────
const pkgTabs = document.querySelectorAll('.pkg-tab');
const pkgPanels = document.querySelectorAll('.pkg-panel');

pkgTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-pkg');

    // Remove active from all tabs and panels
    pkgTabs.forEach(t => t.classList.remove('active'));
    pkgPanels.forEach(p => p.classList.remove('active'));

    // Activate clicked tab and matching panel
    tab.classList.add('active');
    const targetPanel = document.getElementById('panel-' + target);
    if (targetPanel) {
      targetPanel.classList.add('active');
      // Trigger list item stagger animation
      const listItems = targetPanel.querySelectorAll('.pkg-deliverables-col li, .pkg-other-row');
      listItems.forEach((li, i) => {
        li.style.opacity = '0';
        li.style.transform = 'translateX(-12px)';
        li.style.transition = `opacity 0.4s ease ${i * 0.07}s, transform 0.4s ease ${i * 0.07}s`;
        // Force reflow
        void li.offsetWidth;
        li.style.opacity = '1';
        li.style.transform = 'translateX(0)';
      });
    }
  });
});

// ─── PRICE BUTTON CLICK HIGHLIGHT ────────────────
document.querySelectorAll('.pkg-pricing-row').forEach(row => {
  const btns = row.querySelectorAll('.pkg-price-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active-price'));
      btn.classList.add('active-price');
    });
  });
});

// ─── KEYBOARD NAV FOR TABS ───────────────────────
const tabsContainer = document.getElementById('pkgTabs');
if (tabsContainer) {
  tabsContainer.addEventListener('keydown', (e) => {
    const current = tabsContainer.querySelector('.pkg-tab.active');
    const allTabs = [...tabsContainer.querySelectorAll('.pkg-tab')];
    const idx = allTabs.indexOf(current);

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = allTabs[(idx + 1) % allTabs.length];
      next.click();
      next.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = allTabs[(idx - 1 + allTabs.length) % allTabs.length];
      prev.click();
      prev.focus();
    }
  });

  // Make tabs focusable
  pkgTabs.forEach(tab => tab.setAttribute('tabindex', '0'));
}

// ─── OTHER PACKAGE ROW HOVER STAGGER ────────────
const otherPanel = document.getElementById('panel-other');
if (otherPanel) {
  const rows = otherPanel.querySelectorAll('.pkg-other-row');
  rows.forEach((row, i) => {
    row.style.animationDelay = `${i * 0.08}s`;
  });
}

// ─── POPUP ENQUIRY MODAL LOGIC ───────────────────
const enquiryModal = document.getElementById('enquiryModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalContactForm = document.getElementById('modalContactForm');
const modalFormSuccess = document.getElementById('modalFormSuccess');
const modalPackageSelect = document.getElementById('modal-package-select');

// Open Modal function
function openEnquiryModal(preselectedPkg = '') {
  if (!enquiryModal) return;
  enquiryModal.classList.add('active');
  document.body.classList.add('modal-open');
  
  if (preselectedPkg && modalPackageSelect) {
    modalPackageSelect.value = preselectedPkg;
  } else if (modalPackageSelect) {
    modalPackageSelect.value = ''; // Reset to default
  }
}

// Close Modal function
function closeEnquiryModal() {
  if (!enquiryModal) return;
  enquiryModal.classList.remove('active');
  document.body.classList.remove('modal-open');
  if (modalFormSuccess) {
    modalFormSuccess.style.display = 'none';
  }
}

// Connect CTA triggers
// 1. Header CTA
const headerCta = document.querySelector('.nav-cta-link');
if (headerCta) {
  headerCta.addEventListener('click', (e) => {
    e.preventDefault();
    openEnquiryModal();
  });
}

// 2. About CTA
const aboutCta = document.getElementById('about-contact-btn');
if (aboutCta) {
  aboutCta.addEventListener('click', (e) => {
    e.preventDefault();
    openEnquiryModal();
  });
}

// 3. Package booking buttons
const bookBtns = document.querySelectorAll('.pkg-book-btn');
bookBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const pkgType = btn.getAttribute('data-pkg');
    openEnquiryModal(pkgType);
  });
});

// Close event listeners
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeEnquiryModal);
}

// Close on clicking modal backdrop/overlay
if (enquiryModal) {
  enquiryModal.addEventListener('click', (e) => {
    if (e.target === enquiryModal) {
      closeEnquiryModal();
    }
  });
}

// Close on Escape key press
document.addEventListener('keydown', (e) => {
  if (enquiryModal && e.key === 'Escape' && enquiryModal.classList.contains('active')) {
    closeEnquiryModal();
  }
});

// Modal Form Submission Handling
if (modalContactForm) {
  setupRealtimeValidation(modalContactForm);

  modalContactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validateForm(modalContactForm)) {
      return;
    }

    const submitBtn = document.getElementById('modal-submit-btn');
    if (!submitBtn) return;
    const submitBtnText = submitBtn.querySelector('span:first-child');
    const originalText = submitBtnText ? submitBtnText.textContent : 'Send Enquiry';
    
    if (submitBtnText) submitBtnText.textContent = 'Sending…';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    const formData = new FormData(modalContactForm);
    const data = Object.fromEntries(formData);
    data['_subject'] = 'New Modal Enquiry — The Film Estate';

    fetch('https://formsubmit.co/ajax/thefilmestates@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
      if (submitBtnText) submitBtnText.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '';
      
      closeEnquiryModal();
      window.location.href = 'thankyou.html';
    })
    .catch(error => {
      console.error('Error submitting form:', error);
      if (submitBtnText) submitBtnText.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '';
      
      closeEnquiryModal();
      window.location.href = 'thankyou.html';
    });
  });
}

// Footer packages links integration
document.querySelectorAll('.footer-pkg-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const pkgType = link.getAttribute('data-pkg');
    const matchingTab = document.querySelector(`.pkg-tab[data-pkg="${pkgType}"]`);
    if (matchingTab) {
      matchingTab.click();
      const target = document.getElementById('packages');
      if (target) {
        const navHeight = navbar.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    }
  });
});
