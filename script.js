// ============================
// SLIDING INDICATOR
// ============================
function initSlider(navEl) {
  const pills = navEl.querySelectorAll('.nav-pill');
  let slider = navEl.querySelector('.slider');
  if (!slider) {
    slider = document.createElement('div');
    slider.className = 'slider';
    navEl.insertBefore(slider, navEl.firstChild);
  }

  function moveSlider(activePill) {
    const navRect = navEl.getBoundingClientRect();
    const pillRect = activePill.getBoundingClientRect();
    slider.style.width = pillRect.width + 'px';
    slider.style.transform = `translateX(${pillRect.left - navRect.left - 7}px)`;
  }

  // Init position
  const activePill = navEl.querySelector('.nav-pill.nav-active');
  if (activePill) {
    // No transition on first render
    slider.style.transition = 'none';
    moveSlider(activePill);
    setTimeout(() => {
      slider.style.transition = '';
    }, 50);
  }

  return moveSlider;
}

// ============================
// SECTION SWITCHING
// ============================
const sectionMap = { '3d': 'section-3d', '2d': 'section-2d', 'uxui': 'section-uxui' };

function switchSection(target) {
  // Hide all
  document.querySelectorAll('.portfolio-section').forEach(s => s.classList.remove('active'));

  // Show target
  const el = document.getElementById(sectionMap[target]);
  if (el) {
    el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Update all nav pills
  document.querySelectorAll('.nav-pill').forEach(p => {
    p.classList.toggle('nav-active', p.dataset.target === target);
    if (p.classList.contains('nav-active')) {
      p.style.color = '';
    }
  });

  // Move all sliders
  document.querySelectorAll('.nav-pills').forEach(nav => {
    const active = nav.querySelector('.nav-pill.nav-active');
    if (active) initSlider(nav)(active);
  });
}

// Attach click events
document.querySelectorAll('.nav-pill').forEach(pill => {
  pill.addEventListener('click', e => {
    e.preventDefault();
    switchSection(pill.dataset.target);
  });
});

// Init on load
switchSection('3d');
