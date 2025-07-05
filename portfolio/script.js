// Simple script to handle contact form submission
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
  });
});

// Dark mode toggle (support for all pages)
window.addEventListener('DOMContentLoaded', () => {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const mainBg = document.querySelector('.main-bg-gradient');
  // Restore dark mode from localStorage
  if(localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    mainBg?.classList.add('dark-mode');
    if(darkModeToggle) darkModeToggle.textContent = '☀️';
  }
  if(darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      mainBg?.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }
  // Animate skill bars on load (if present)
  document.querySelectorAll('.bar-fill').forEach(bar => {
    const percent = bar.style.getPropertyValue('--percent') || '0%';
    bar.style.width = percent;
  });
});

// Back to Top button
window.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});

// Project Modal logic
window.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDetails = document.getElementById('modal-details');
  const modalExtra = document.getElementById('modal-extra');
  const modalClose = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  const projectCards = document.querySelectorAll('.project-item-pro');

  function openModal(card) {
    modalTitle.textContent = card.dataset.title;
    modalDetails.textContent = card.dataset.details;
    modalExtra.innerHTML = `
      <li><strong>Platform:</strong> ${card.dataset.platform}</li>
      <li><strong>Role:</strong> ${card.dataset.role}</li>
      <li><strong>Result:</strong> ${card.dataset.result}</li>
      <li><strong>Learnings:</strong> ${card.dataset.learnings}</li>
    `;
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal-content').focus();
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  projectCards.forEach(card => {
    card.addEventListener('click', () => openModal(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });
  modalClose?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);
  window.addEventListener('keydown', e => {
    if (modal.style.display === 'block' && e.key === 'Escape') closeModal();
  });
});
