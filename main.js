/* ==========================================
   INTERNLINK - PREMIUM STARTUP INTERACTIONS
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Menu Toggling
  initMobileMenu();

  // Navigation Highlights
  highlightActiveLink();

  // Waitlist Subscription Form
  initWaitlistForm();

  // Contact Form Submission
  initContactForm();
});

/**
 * Mobile Hamburger Menu Controller
 */
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/**
 * Highlight active link in navbar based on current filename
 */
function highlightActiveLink() {
  const currentPath = window.location.pathname;
  const navItems = document.querySelectorAll('.nav-links a');

  let matched = false;
  navItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    if (href && href !== '#' && href !== 'index.html#home') {
      if (currentPath.endsWith(href)) {
        item.classList.add('active');
        matched = true;
      }
    }
  });

  // Default fallback to Home if no subpage matches
  if (!matched && navItems.length > 0) {
    const homeLink = Array.from(navItems).find(item => item.getAttribute('href').includes('index.html'));
    if (homeLink) homeLink.classList.add('active');
  }
}

/**
 * Intercept and process waitlist subscriptions
 */
function initWaitlistForm() {
  const waitlistForm = document.getElementById('waitlist-form');
  if (!waitlistForm) return;

  waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = waitlistForm.querySelector('.waitlist-input');
    if (!emailInput) return;

    const email = emailInput.value.trim();
    const btn = waitlistForm.querySelector('.waitlist-btn');

    if (!validateEmail(email)) {
      showToast('❌ Please enter a valid email address.', 'error');
      return;
    }

    // Simulate Network Request
    if (btn) {
      btn.textContent = 'Processing...';
      btn.disabled = true;
    }

    setTimeout(() => {
      localStorage.setItem('internlink_subscriber', email);
      showToast(' Welcome to InternLink! We\'ll keep you updated.', 'success');
      emailInput.value = '';
      if (btn) {
        btn.textContent = 'Welcome!';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.disabled = false;
        }, 2000);
      }
    }, 1200);
  });
}

/**
 * Intercept and process contact page feedback
 */
function initContactForm() {
  const contactForm = document.getElementById('premium-contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameEl = document.getElementById('contact-name');
    const emailEl = document.getElementById('contact-email');
    const messageEl = document.getElementById('contact-message');
    const btn = contactForm.querySelector('.btn-primary');

    if (!nameEl || !emailEl || !messageEl) return;

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const message = messageEl.value.trim();

    if (!name || !validateEmail(email) || !message) {
      showToast('❌ Please fill out all fields correctly.', 'error');
      return;
    }

    // Simulate Network Request
    if (btn) {
      btn.textContent = 'Sending Message...';
      btn.disabled = true;
    }

    setTimeout(() => {
      showToast('✉️ Message sent successfully! We\'ll get back to you within 24 hours.', 'success');
      contactForm.reset();
      if (btn) {
        btn.textContent = 'Send Message';
        btn.disabled = false;
      }
    }, 1200);
  });
}

/**
 * Helper to validate email formats
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Creates and displays an animated toast message
 */
function showToast(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';

  const icon = type === 'success' ? '✨' : '⚠️';
  if (type === 'error') {
    toast.style.borderColor = '#ef4444';
    toast.style.boxShadow = '0 8px 32px rgba(239, 68, 68, 0.15)';
  }

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger entering animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 50);

  // Remove toast after delay
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}
