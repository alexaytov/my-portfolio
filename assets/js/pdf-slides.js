const viewers = document.querySelectorAll('[data-pdf-slides]');

async function initializeViewer(viewer) {
  const stage = viewer.querySelector('.talk-slides-stage');
  const canvas = stage.querySelector('canvas');
  const status = viewer.querySelector('.talk-slides-status');
  const counter = viewer.querySelector('.talk-slides-counter');
  const previous = viewer.querySelector('[data-slide-prev]');
  const next = viewer.querySelector('[data-slide-next]');
  const text = viewer.querySelector('.talk-slides-text');
  let pdf;
  let pageNumber = 1;
  let rendering = false;
  let pending = false;
  let failed = false;

  function showError(error) {
    failed = true;
    status.textContent = 'The slide viewer could not load this presentation. Use “Open PDF in a new tab” above to read it.';
    status.hidden = false;
    counter.textContent = 'Viewer unavailable';
    previous.disabled = true;
    next.disabled = true;
    canvas.hidden = true;
    text.hidden = true;
    stage.setAttribute('aria-busy', 'false');
    console.error('PDF slide viewer:', error);
  }

  // Serialize canvas renders and keep the most recent navigation or resize request.
  async function renderPage() {
    if (!pdf || failed) return;
    pending = true;
    if (rendering) return;
    rendering = true;
    stage.setAttribute('aria-busy', 'true');
    try {
      while (pending) {
        pending = false;
        const current = pageNumber;
        const page = await pdf.getPage(current);
        const original = page.getViewport({ scale: 1 });
        const width = Math.max(1, stage.clientWidth);
        const viewport = page.getViewport({ scale: width / original.width });
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        // Render offscreen so the previous slide remains visible until the next is ready.
        const buffer = document.createElement('canvas');
        buffer.width = Math.floor(viewport.width * pixelRatio);
        buffer.height = Math.floor(viewport.height * pixelRatio);
        await page.render({
          canvasContext: buffer.getContext('2d'),
          viewport,
          transform: pixelRatio === 1 ? null : [pixelRatio, 0, 0, pixelRatio, 0, 0]
        }).promise;
        if (pending) continue;

        canvas.width = buffer.width;
        canvas.height = buffer.height;
        canvas.getContext('2d').drawImage(buffer, 0, 0);
        stage.style.aspectRatio = `${original.width} / ${original.height}`;
        canvas.setAttribute('aria-label', `Slide ${current} of ${pdf.numPages}. A text version is available below the navigation.`);
        canvas.hidden = false;
        status.hidden = true;
        counter.textContent = `Slide ${current} of ${pdf.numPages}`;
        previous.disabled = current === 1;
        next.disabled = current === pdf.numPages;

        try {
          const content = await page.getTextContent();
          if (!pending) {
            text.querySelector('p').textContent = content.items
              .filter(item => typeof item.str === 'string')
              .map(item => item.str + (item.hasEOL ? '\n' : ' ')).join('').trim() || 'This slide contains no extractable text. Open the PDF to explore its visual content.';
            text.hidden = false;
          }
        } catch {
          text.hidden = true;
        }
      }
    } catch (error) {
      showError(error);
    } finally {
      rendering = false;
      stage.setAttribute('aria-busy', 'false');
    }
  }

  function moveTo(number) {
    if (!pdf || failed) return;
    const target = Math.max(1, Math.min(pdf.numPages, number));
    if (target === pageNumber) return;
    pageNumber = target;
    renderPage();
  }

  previous.addEventListener('click', () => moveTo(pageNumber - 1));
  next.addEventListener('click', () => moveTo(pageNumber + 1));
  viewer.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target.closest('details, input, textarea, select, [contenteditable]')) return;
    const target = { ArrowLeft: pageNumber - 1, ArrowRight: pageNumber + 1, Home: 1, End: pdf?.numPages }[event.key];
    if (target === undefined) return;
    event.preventDefault();
    moveTo(target);
  });

  try {
    const pdfjs = await import('../vendor/pdfjs/build/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('../vendor/pdfjs/build/pdf.worker.min.mjs', import.meta.url).href;
    pdf = await pdfjs.getDocument({
      url: viewer.dataset.pdfUrl,
      standardFontDataUrl: new URL('../vendor/pdfjs/standard_fonts/', import.meta.url).href,
      // Draw font outlines directly, compatible with the site's self-only font policy.
      disableFontFace: true,
      useWasm: false
    }).promise;
    await renderPage();
    let previousWidth = stage.clientWidth;
    let resizeTimer;
    new ResizeObserver(() => {
      if (stage.clientWidth === previousWidth) return;
      previousWidth = stage.clientWidth;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(renderPage, 150);
    }).observe(stage);
  } catch (error) {
    showError(error);
  }
}

// Load the PDF and its renderer only when the viewer approaches the viewport.
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      initializeViewer(entry.target);
    });
  }, { rootMargin: '300px' });
  viewers.forEach(viewer => observer.observe(viewer));
} else {
  viewers.forEach(initializeViewer);
}
