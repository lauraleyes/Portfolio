const sectionMap = { '3d': 'section-3d', '2d': 'section-2d', 'uxui': 'section-uxui' };

// Move slider to active pill
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

function switchSection(target) {
  // Hide all sections
  document.querySelectorAll('.portfolio-section').forEach(s => s.classList.remove('active'));

  // Show target
  const el = document.getElementById(sectionMap[target]);
  if (el) {
    el.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Update pill states
  document.querySelectorAll('.nav-pill').forEach(p => {
    p.classList.toggle('nav-active', p.dataset.target === target);
  });

  // Update all sliders after layout settles
  requestAnimationFrame(() => {
    document.querySelectorAll('.nav-pills').forEach(nav => updateSlider(nav));
  });
}

// Click events
document.querySelectorAll('.nav-pill').forEach(pill => {
  pill.addEventListener('click', e => {
    e.preventDefault();
    switchSection(pill.dataset.target);
  });
});

// Init — disable transition on first render, then enable
document.querySelectorAll('.nav-pills .slider').forEach(s => {
  s.style.transition = 'none';
});

switchSection('3d');

// Re-enable transitions after first paint
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.querySelectorAll('.nav-pills .slider').forEach(s => {
      s.style.transition = '';
    });
  });
});
