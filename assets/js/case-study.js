/**
 * Case Study JavaScript Interactions
 * Code snippet copying, image lightbox zoom, and toast
 */

document.addEventListener('DOMContentLoaded', () => {
  initCodeCopy();
  initImageZoom();
});

function initCodeCopy() {
  const copyButtons = document.querySelectorAll('.btn-copy-code');
  const toast = document.getElementById('toast-msg');

  function showToast(text) {
    if (!toast) return;
    toast.textContent = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const codeElement = document.getElementById(targetId);
      if (!codeElement) return;

      const codeText = codeElement.textContent;
      navigator.clipboard.writeText(codeText).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        btn.style.borderColor = 'var(--color-orange)';
        btn.style.color = 'var(--color-orange)';
        showToast('Code copied to clipboard!');
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2000);
      }).catch(() => {
        showToast('Unable to copy code');
      });
    });
  });
}

function initImageZoom() {
  const viewerImg = document.querySelector('.viewer-image');
  const modal = document.getElementById('dashboard-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (!viewerImg || !modal || !modalImg) return;

  viewerImg.addEventListener('click', () => {
    modalImg.src = viewerImg.src;
    modalImg.alt = viewerImg.alt;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    if (closeBtn) closeBtn.focus();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}
