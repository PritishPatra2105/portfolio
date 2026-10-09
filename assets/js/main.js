/**
 * Main JavaScript Controller
 * Pritish Kumar Patra - Data Analyst Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initMobileNavigation();
  initActiveNavOnScroll();
  initSkillsFilter();
  initDashboardLightbox();
  initClipboardAndContact();
});

/* --------------------------------------------------------------------------
   1. Live Clock in Indian Standard Time (IST, UTC+5:30)
   Matches the inspiration screenshot "12:00:01 PM" top indicator
   -------------------------------------------------------------------------- */
function initLiveClock() {
  const clockElement = document.getElementById('live-clock');
  if (!clockElement) return;

  function updateClock() {
    const now = new Date();
    // Format to IST
    const timeOptions = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    try {
      const timeStr = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
      clockElement.textContent = timeStr + ' IST';
    } catch {
      clockElement.textContent = now.toLocaleTimeString();
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/* --------------------------------------------------------------------------
   2. Accessible Mobile Navigation with ARIA, Focus Trap & Escape key
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-drawer .nav-link');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openDrawer() {
    toggleBtn.setAttribute('aria-expanded', 'true');
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus first link in drawer
    if (navLinks.length > 0) {
      setTimeout(() => navLinks[0].focus(), 100);
    }
  }

  function closeDrawer() {
    toggleBtn.setAttribute('aria-expanded', 'false');
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   3. Active Section Indicator on Scroll
   -------------------------------------------------------------------------- */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.site-header .nav-link[href^="#"]');

  if (sections.length === 0 || desktopLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   4. Skills Filter Bar
   -------------------------------------------------------------------------- */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  if (filterBtns.length === 0 || skillCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || (filterValue === 'core' && card.dataset.isCore === 'true')) {
          card.style.display = 'block';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Dashboard Lightbox Modal
   -------------------------------------------------------------------------- */
function initDashboardLightbox() {
  const modal = document.getElementById('dashboard-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const closeBtn = document.querySelector('.modal-close-btn');
  const triggerBtns = document.querySelectorAll('[data-lightbox-src]');

  if (!modal || !modalImg || !closeBtn) return;

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const src = btn.getAttribute('data-lightbox-src');
      const title = btn.getAttribute('data-lightbox-title') || 'Dashboard Preview';
      modalImg.src = src;
      modalImg.alt = title;
      if (modalTitle) modalTitle.textContent = title;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. Copy to Clipboard, Reveal Phone, & Contact Form
   -------------------------------------------------------------------------- */
function initClipboardAndContact() {
  const toast = document.getElementById('toast-msg');

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Copy email button
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'pritishpatra21@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Email: pritishpatra21@gmail.com');
      });
    });
  });

  // Reveal Phone button (PRD: public phone defaults off; retained in content inventory)
  const revealPhoneBtn = document.getElementById('reveal-phone-btn');
  if (revealPhoneBtn) {
    revealPhoneBtn.addEventListener('click', () => {
      revealPhoneBtn.innerHTML = '<strong>Direct Phone:</strong> <a href="tel:+918908320525" style="color:var(--color-orange);text-decoration:none;font-weight:700;">+91 8908320525</a>';
      revealPhoneBtn.style.borderStyle = 'solid';
      revealPhoneBtn.style.borderColor = 'var(--color-orange)';
      showToast('Phone number revealed!');
    });
  }

  // Interactive Contact Form (Drafts email directly to pritishpatra21@gmail.com)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const subject = document.getElementById('form-subject').value.trim() || 'Data Analyst Opportunity / Discussion';
      const message = document.getElementById('form-message').value.trim();

      const body = `Hi Pritish,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;
      const mailtoUrl = `mailto:pritishpatra21@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      window.location.href = mailtoUrl;
      showToast('Opening your email client to send message...');
    });
  }
}
