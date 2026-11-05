document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.getElementById('navbar-menu');
  const navbar = document.getElementById('navbar');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function closeMenu() {
    burger.classList.remove('is-active');
    menu.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open navigation');
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      const open = burger.getAttribute('aria-expanded') !== 'true';
      burger.classList.toggle('is-active', open);
      menu.classList.toggle('is-active', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        burger.focus();
      }
    });
    document.addEventListener('click', function (event) {
      if (!navbar.contains(event.target)) closeMenu();
    });
    window.matchMedia('(min-width: 1024px)').addEventListener('change', closeMenu);
  }

  // Give the shared skip link a destination on every layout.
  if (!document.getElementById('main-content')) {
    const content = document.querySelector('main, body > section');
    if (content) content.id = content.id || 'main-content';
    if (content && content.id !== 'main-content') {
      document.querySelector('.skip-link').href = '#' + content.id;
    }
  }

  const work = document.querySelector('.work-showcase');
  if (work) {
    const tabs = Array.from(work.querySelectorAll('[role="tab"]'));
    const tablist = work.querySelector('.work-tabs');
    const panels = Array.from(work.querySelectorAll('.work-panel'));
    const compact = window.matchMedia('(max-width: 1023px)');
    let selectedCategory = 'projects';
    const carousels = new Map();

    panels.forEach(panel => {
      const viewport = panel.querySelector('.work-viewport');
      if (!viewport) return;
      const slides = Array.from(viewport.querySelectorAll('.work-slide'));
      const controls = panel.querySelector('.work-controls');
      const dotButtons = Array.from(controls.querySelectorAll('[data-work-step]'));
      const currentDot = controls.querySelector('.work-current');
      const progressFill = controls.querySelector('.work-progress-fill');
      const status = panel.querySelector('.work-status');
      const slideDuration = 7000;
      let current = 0;
      let width = 0;
      let progress = null;
      let inView = false;
      let hovered = false;
      let keyboardFocus = false;
      let pressed = false;
      let scrolling = false;
      let settleTimer;
      let gesture = null;
      let suppressClick = false;
      let suppressTimer;

      controls.hidden = slides.length < 2;
      function canPlay() {
        return slides.length > 1 && !reduceMotion.matches && inView && !panel.hidden &&
          !document.hidden && !hovered && !keyboardFocus && !pressed && !scrolling && !gesture;
      }
      function syncPlayback() {
        if (!progress) return;
        if (canPlay()) progress.play();
        else progress.pause();
      }
      function resetProgress() {
        if (progress) progress.cancel();
        progress = null;
        progressFill.style.transform = `scaleX(${reduceMotion.matches ? 1 : 0})`;
        if (slides.length < 2 || reduceMotion.matches) return;
        progress = progressFill.animate([
          {transform: 'scaleX(0)'}, {transform: 'scaleX(1)'}
        ], {duration: slideDuration, easing: 'linear', fill: 'forwards'});
        progress.pause();
        progress.onfinish = () => {
          if (canPlay()) goTo((current + 1) % slides.length, {automatic: true, instant: current === slides.length - 1});
        };
        syncPlayback();
      }
      function update() {
        currentDot.setAttribute('aria-label', `Current ${panel.dataset.workCategory} item: ${current + 1} of ${slides.length}, ${slides[current].querySelector('.work-card-title').textContent}`);
        dotButtons.forEach(button => {
          const direction = Number(button.dataset.workStep);
          const destination = (current + direction + slides.length) % slides.length;
          button.setAttribute('aria-label', `${direction < 0 ? 'Previous' : 'Next'} ${panel.dataset.workCategory} item: ${destination + 1} of ${slides.length}, ${slides[destination].querySelector('.work-card-title').textContent}`);
        });
        slides.forEach((slide, index) => { slide.inert = index !== current; });
      }
      function announce() {
        status.textContent = `${current + 1} of ${slides.length}: ${slides[current].querySelector('.work-card-title').textContent}`;
      }
      function goTo(index, {instant = false, automatic = false} = {}) {
        current = Math.max(0, Math.min(index, slides.length - 1));
        update();
        resetProgress();
        if (!automatic) announce();
        viewport.scrollTo({left: current * viewport.clientWidth,
          behavior: instant || reduceMotion.matches ? 'instant' : 'smooth'});
      }
      function align() {
        if (viewport.clientWidth) {
          width = viewport.clientWidth;
          viewport.scrollTo({left: current * width, behavior: 'instant'});
        }
        syncPlayback();
      }
      carousels.set(panel, align);
      update();
      resetProgress();
      function step(direction) {
        const destination = (current + direction + slides.length) % slides.length;
        goTo(destination, {instant: current + direction < 0 || current + direction >= slides.length});
      }
      dotButtons.forEach(button => button.addEventListener('click', () => step(Number(button.dataset.workStep))));
      controls.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') step(event.key === 'ArrowLeft' ? -1 : 1);
        else goTo(event.key === 'Home' ? 0 : slides.length - 1, {instant: true});
      });
      viewport.addEventListener('keydown', event => {
        const destinations = {ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: slides.length - 1};
        if (!(event.key in destinations)) return;
        event.preventDefault();
        // Keep focus on the carousel when a key hides the focused card.
        viewport.focus({preventScroll: true});
        goTo(destinations[event.key]);
      });
      viewport.addEventListener('scroll', () => {
        scrolling = true;
        syncPlayback();
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
          scrolling = false;
          if (viewport.clientWidth && !gesture) {
            const nearest = Math.max(0, Math.min(Math.round(viewport.scrollLeft / viewport.clientWidth), slides.length - 1));
            if (nearest !== current) {
              current = nearest;
              update();
              resetProgress();
              announce();
            }
          }
          syncPlayback();
        }, 150);
      }, {passive: true});
      new ResizeObserver(() => {
        if (viewport.clientWidth && viewport.clientWidth !== width) align();
      }).observe(viewport);
      new IntersectionObserver(entries => {
        inView = entries[0].isIntersecting && entries[0].intersectionRatio >= 0.35;
        syncPlayback();
      }, {threshold: [0, 0.35]}).observe(viewport);
      panel.addEventListener('pointerenter', event => {
        if (event.pointerType === 'mouse') { hovered = true; syncPlayback(); }
      });
      panel.addEventListener('pointerleave', event => {
        if (event.pointerType === 'mouse') { hovered = false; syncPlayback(); }
      });
      panel.addEventListener('focusin', () => {
        keyboardFocus = document.activeElement.matches(':focus-visible');
        syncPlayback();
      });
      panel.addEventListener('focusout', () => {
        queueMicrotask(() => {
          keyboardFocus = panel.contains(document.activeElement) && document.activeElement.matches(':focus-visible');
          syncPlayback();
        });
      });
      panel.addEventListener('keydown', () => { keyboardFocus = true; syncPlayback(); });
      panel.addEventListener('pointerdown', () => { keyboardFocus = false; syncPlayback(); });
      document.addEventListener('visibilitychange', syncPlayback);
      reduceMotion.addEventListener('change', resetProgress);

      // Touch and trackpads use native scrolling; mouse dragging follows the pointer.
      viewport.addEventListener('pointerdown', event => {
        if (!event.isPrimary || event.button !== 0) return;
        pressed = true;
        syncPlayback();
        if (event.pointerType !== 'mouse') return;
        clearTimeout(suppressTimer);
        suppressClick = false;
        gesture = {id: event.pointerId, x: event.clientX, y: event.clientY, scroll: viewport.scrollLeft, dragged: false};
      });
      viewport.addEventListener('pointermove', event => {
        if (!gesture || gesture.id !== event.pointerId) return;
        const dx = event.clientX - gesture.x;
        if (!gesture.dragged) {
          if (Math.abs(dx) < 6 || Math.abs(dx) <= Math.abs(event.clientY - gesture.y)) return;
          gesture.dragged = true;
          viewport.classList.add('is-dragging');
          viewport.setPointerCapture(event.pointerId);
        }
        event.preventDefault();
        viewport.scrollLeft = gesture.scroll - dx;
      });
      function endDrag(event) {
        pressed = false;
        if (!gesture || (event.pointerId !== undefined && event.pointerId !== gesture.id)) {
          syncPlayback();
          return;
        }
        const {id, dragged} = gesture;
        gesture = null;
        suppressClick = dragged;
        const nearest = Math.round(viewport.scrollLeft / viewport.clientWidth);
        viewport.classList.remove('is-dragging');
        if (viewport.hasPointerCapture(id)) viewport.releasePointerCapture(id);
        if (dragged) goTo(nearest);
        suppressTimer = setTimeout(() => { suppressClick = false; }, 300);
        syncPlayback();
      }
      window.addEventListener('pointerup', endDrag);
      window.addEventListener('pointercancel', endDrag);
      window.addEventListener('blur', endDrag);
      viewport.addEventListener('lostpointercapture', endDrag);
      viewport.addEventListener('dragstart', event => event.preventDefault());
      viewport.addEventListener('click', event => {
        if (suppressClick && event.detail > 0) {
          event.preventDefault();
          event.stopPropagation();
        }
        suppressClick = false;
      }, true);
    });

    function showCategory(category, focusTab = false) {
      selectedCategory = category;
      tabs.forEach(tab => {
        const active = tab.id === `work-tab-${category}`;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
        if (active && focusTab) tab.focus({preventScroll: true});
      });
      panels.forEach(panel => {
        const key = panel.dataset.workCategory;
        const hide = compact.matches && key !== category;
        if (hide && panel.contains(document.activeElement)) {
          work.querySelector(`#work-tab-${category}`).focus({preventScroll: true});
        }
        panel.hidden = hide;
        panel.setAttribute('role', compact.matches ? 'tabpanel' : 'region');
        panel.setAttribute('aria-labelledby', compact.matches ? `work-tab-${key}` : `work-heading-${key}`);
        carousels.get(panel)?.();
      });
    }
    function updateLayout() {
      tablist.hidden = !compact.matches;
      if (!compact.matches && tablist.contains(document.activeElement)) {
        work.querySelector(`#work-${selectedCategory} .work-viewport`)?.focus({preventScroll: true});
      }
      showCategory(selectedCategory);
    }
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => showCategory(panels[index].dataset.workCategory));
      tab.addEventListener('keydown', event => {
        let nextIndex;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = tabs.length - 1;
        else return;
        event.preventDefault();
        showCategory(panels[nextIndex].dataset.workCategory, true);
      });
    });
    work.classList.add('is-enhanced');
    compact.addEventListener('change', updateLayout);
    updateLayout();

    // Keep previously shared homepage section links useful after consolidation.
    function followWorkHash() {
      const category = { '#university': 'university', '#talks': 'talks' }[window.location.hash];
      if (!category) return;
      showCategory(category);
      work.scrollIntoView({behavior: 'instant', block: 'start'});
    }
    window.addEventListener('hashchange', followWorkHash);
    followWorkHash();
  }

  document.querySelectorAll('.back-to-top').forEach(button => {
    button.addEventListener('click', function () {
      window.scrollTo({top: 0, behavior: reduceMotion.matches ? 'instant' : 'smooth'});
      const brand = document.querySelector('.navbar-brand a');
      if (brand) brand.focus({preventScroll: true});
    });
  });
});
