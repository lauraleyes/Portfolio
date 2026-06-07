const sectionMap = { '3d': 'section-3d', '2d': 'section-2d', 'uxui': 'section-uxui' };

// ============================
// SLIDING INDICATOR
// ============================
function updateSlider(navEl) {
  let slider = navEl.querySelector('.slider');
  if (!slider) {
    slider = document.createElement('div');
    slider.className = 'slider';
    navEl.prepend(slider);
  }
  const activePill = navEl.querySelector('.nav-pill.nav-active');
  if (!activePill) return;
  const navRect = navEl.getBoundingClientRect();
  const pillRect = activePill.getBoundingClientRect();
  slider.style.width = pillRect.width + 'px';
  slider.style.transform = `translateX(${pillRect.left - navRect.left - 7}px)`;
}

// ============================
// SECTION SWITCHING
// ============================
function switchSection(target) {
  document.querySelectorAll('.portfolio-section').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(sectionMap[target]);
  if (el) {
    el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  document.querySelectorAll('.nav-pill').forEach(p => {
    p.classList.toggle('nav-active', p.dataset.target === target);
  });
  setTimeout(() => {
    document.querySelectorAll('.nav-pills').forEach(nav => updateSlider(nav));
  }, 50);
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
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showPrev();
  if (e.key === 'ArrowRight') showNext();
});

// Attach click to grid images
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
// INIT
// ============================
switchSection('3d');
initGridLightbox();
