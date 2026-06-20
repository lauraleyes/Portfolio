const sectionMap = { '3d': 'section-3d', '2d': 'section-2d', 'uxui': 'section-uxui' };

// ============================
// SECTION SWITCHING
// ============================
function switchSection(target, scrollTop = true) {
  document.querySelectorAll('.portfolio-section').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(sectionMap[target]);
  if (el) {
    el.classList.add('active');
    if (scrollTop) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }
  document.querySelectorAll('.nav-pill').forEach(p => {
    p.classList.toggle('nav-active', p.dataset.target === target);
  });
  localStorage.setItem('lastSection', target);
}

document.querySelectorAll('.nav-pill').forEach(pill => {
  pill.addEventListener('click', e => {
    e.preventDefault();
    switchSection(pill.dataset.target);
  });
});

// ============================
// LIGHTBOX
// ============================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentImages = [];
let currentIndex = 0;

function openLightbox(images, index) {
  currentImages = images;
  currentIndex = index;
  lightboxImg.src = images[index];
  lightbox.classList.add('open');
  lightbox.classList.remove('zoomed');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open', 'zoomed');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
  lightbox.classList.remove('zoomed');
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
  lightbox.classList.remove('zoomed');
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Zoom toggle
lightboxImg.addEventListener('click', e => {
  e.stopPropagation();
  lightbox.classList.toggle('zoomed');
  // Scroll to top when zooming in
  if (lightbox.classList.contains('zoomed')) {
    lightbox.scrollTo(0, 0);
  }
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

function initGridLightbox() {
  document.querySelectorAll('.images-grid').forEach(grid => {
    const items = Array.from(grid.querySelectorAll('.image-item img'));
    const srcs = items.map(img => img.src);
    items.forEach((img, i) => {
      img.parentElement.addEventListener('click', () => openLightbox(srcs, i));
    });
  });
}

// ============================
// BACK TO TOP — solo mobile
// ============================
const backToTop = document.getElementById('back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================
// INIT
// ============================
const savedSection = localStorage.getItem('lastSection');
const validSection = sectionMap[savedSection] ? savedSection : '3d';
switchSection(validSection, false);
initGridLightbox();
