const sectionMap = { '3d': 'section-3d', '2d': 'section-2d', 'uxui': 'section-uxui' };

function updateSlider(navEl) {
  let slider = navEl.querySelector('.slider');
  if (!slider) {
    slider = document.createElement('div');
    slider.className = 'slider';
    navEl.prepend(slider);
  }

  const activePill = navEl.querySelector('.nav-pill.nav-active');
  if (!activePill) return;

  const navLeft = navEl.getBoundingClientRect().left;
  const pillRect = activePill.getBoundingClientRect();

  slider.style.width = pillRect.width + 'px';
  slider.style.transform = `translateX(${pillRect.left - navLeft - 7}px)`;;
}

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

  requestAnimationFrame(() => {
    document.querySelectorAll('.nav-pills').forEach(nav => updateSlider(nav));
  });
}

document.querySelectorAll('.nav-pill').forEach(pill => {
  pill.addEventListener('click', e => {
    e.preventDefault();
    switchSection(pill.dataset.target);
  });
});

switchSection('3d');
