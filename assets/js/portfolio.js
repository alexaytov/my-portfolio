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

  document.querySelectorAll('.marquee-container').forEach(carousel => {
    const track = carousel.querySelector('.marquee-track');
    let gesture = null;
    let suppressClick = false;

    function motion() {
      const animation = track.getAnimations().find(item =>
        item.animationName === 'marquee-scroll-left' || item.animationName === 'marquee-scroll-right');
      if (!animation) return null;
      return {
        animation,
        time: Number(animation.currentTime),
        duration: Number(animation.effect.getTiming().duration),
        distance: (track.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap)) / 2,
        direction: animation.animationName === 'marquee-scroll-left' ? -1 : 1
      };
    }

    // Scrub the existing loop so dragging starts exactly where the cards are.
    function moveLoop(loop, pixels) {
      const time = loop.time + loop.direction * pixels / loop.distance * loop.duration;
      loop.animation.currentTime = ((time % loop.duration) + loop.duration) % loop.duration;
    }

    carousel.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0) return;
      suppressClick = false;
      const loop = motion();
      // Scrollable mobile/reduced-motion rows retain native touch scrolling.
      if (event.pointerType === 'touch' && !loop) return;
      carousel.classList.add('is-dragging');
      gesture = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        scroll: carousel.scrollLeft,
        loop,
        dragged: false
      };
    });

    window.addEventListener('pointermove', event => {
      if (!gesture || event.pointerId !== gesture.id) return;
      const deltaX = event.clientX - gesture.x;
      const deltaY = event.clientY - gesture.y;
      if (!gesture.dragged) {
        if (Math.abs(deltaX) < 6 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        gesture.dragged = true;
        carousel.setPointerCapture(event.pointerId);
      }
      event.preventDefault();
      if (gesture.loop) moveLoop(gesture.loop, deltaX);
      else carousel.scrollLeft = gesture.scroll - deltaX;
    });

    function endGesture(event) {
      if (!gesture || (event.pointerId !== undefined && event.pointerId !== gesture.id)) return;
      suppressClick = gesture.dragged;
      const pointerId = gesture.id;
      gesture = null;
      carousel.classList.remove('is-dragging');
      if (carousel.hasPointerCapture(pointerId)) carousel.releasePointerCapture(pointerId);
    }
    window.addEventListener('pointerup', endGesture);
    window.addEventListener('pointercancel', endGesture);
    window.addEventListener('blur', endGesture);
    carousel.addEventListener('lostpointercapture', event => {
      if (event.target === carousel) endGesture(event);
    });
    carousel.addEventListener('dragstart', event => event.preventDefault());
    carousel.addEventListener('click', event => {
      if (suppressClick && event.detail > 0) {
        event.preventDefault();
        event.stopPropagation();
      }
      suppressClick = false;
    }, true);

    carousel.addEventListener('wheel', event => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      const loop = motion();
      if (!loop) return;
      event.preventDefault();
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? carousel.clientWidth : 1;
      moveLoop(loop, -event.deltaX * unit);
    }, {passive: false});
  });

  document.querySelectorAll('.back-to-top').forEach(button => {
    button.addEventListener('click', function () {
      window.scrollTo({top: 0, behavior: reduceMotion.matches ? 'instant' : 'smooth'});
      const brand = document.querySelector('.navbar-brand a');
      if (brand) brand.focus({preventScroll: true});
    });
  });

  // Match the active navigation link to the section below the fixed header.
  const home = document.getElementById('hero');
  if (home) {
    const links = Array.from(document.querySelectorAll('.navbar-end a'));
    const sections = ['hero', 'about', 'work', 'university'].map(id => document.getElementById(id)).filter(Boolean);
    let scheduled = false;
    function updateNavigation() {
      const offset = window.scrollY + 160;
      const current = sections.filter(section => section.offsetTop <= offset).pop() || home;
      links.forEach(link => {
        const active = new URL(link.href).hash === '#' + current.id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
      scheduled = false;
    }
    window.addEventListener('scroll', function () {
      if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
    }, {passive: true});
    updateNavigation();
  }
});
