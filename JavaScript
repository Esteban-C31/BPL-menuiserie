(function () {
  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const toggle = document.querySelector('.nav__toggle');
  const menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.style.display = 'grid';
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.gallery__item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-full');
      const alt = btn.getAttribute('data-alt');
      if (src) openLightbox(src, alt);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  const devisForm = document.getElementById('devisForm');
  if (devisForm) {
    devisForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = new FormData(devisForm);
      const nom = String(data.get('nom') || '').trim();
      const tel = String(data.get('tel') || '').trim();
      const cp = String(data.get('cp') || '').trim();
      const projet = String(data.get('projet') || '').trim();
      const message = String(data.get('message') || '').trim();

      if (!nom || !tel || !cp || !projet || !message) return;

      // Option simple: ouvre le client mail
      const subject = encodeURIComponent(`Demande de devis BPL Menuiserie - ${projet}`);
      const body = encodeURIComponent(
        `Nom: ${nom}\nTéléphone: ${tel}\nCode postal: ${cp}\nProjet: ${projet}\n\nDétails:\n${message}\n`
      );

      // Remplace par le vrai mail
      const email = 'contact@bpl-menuiserie.fr';
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

      // Option "vrai formulaire" (recommandé): Formspree
      // 1) créer un endpoint Formspree
      // 2) remplacer le code ci dessous pour faire un fetch POST
    });
  }
})();
