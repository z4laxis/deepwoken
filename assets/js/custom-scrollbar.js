(function () {
  const targets = document.querySelectorAll('[data-custom-scroll]');
  if (!targets.length) return;

  const instances = [];

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function setup(target) {
    target.classList.add('dw-scroll-host');

    const overlay = document.createElement('div');
    overlay.className = 'dw-scroll-overlay';
    document.body.appendChild(overlay);

    const track = document.createElement('div');
    track.className = 'dw-scroll-track';

    const thumb = document.createElement('div');
    thumb.className = 'dw-scroll-thumb';

    const thumbTop = document.createElement('div');
    thumbTop.className = 'dw-scroll-thumb-top';
    const thumbMiddle = document.createElement('div');
    thumbMiddle.className = 'dw-scroll-thumb-middle';
    const thumbBottom = document.createElement('div');
    thumbBottom.className = 'dw-scroll-thumb-bottom';

    thumb.appendChild(thumbTop);
    thumb.appendChild(thumbMiddle);
    thumb.appendChild(thumbBottom);

    track.appendChild(thumb);
    overlay.appendChild(track);

    const state = {
      target,
      overlay,
      track,
      thumb,
      dragging: false,
      startY: 0,
      startTop: 0,
      maxThumbTop: 0,
      maxScrollTop: 0
    };

    function recalc() {
      const rect = target.getBoundingClientRect();
      const hidden = rect.width <= 0 || rect.height <= 0 || getComputedStyle(target).display === 'none';

      if (hidden) {
        overlay.style.display = 'none';
        return;
      }

      overlay.style.display = 'block';
      overlay.style.left = `${Math.round(rect.right + 6)}px`;
      overlay.style.top = `${Math.round(rect.top)}px`;
      overlay.style.height = `${Math.round(rect.height)}px`;

      const viewport = target.clientHeight;
      const total = target.scrollHeight;
      const maxScrollTop = Math.max(0, total - viewport);

      state.maxScrollTop = maxScrollTop;

      if (maxScrollTop <= 0 || viewport <= 0) {
        overlay.style.display = 'none';
        return;
      }

      const thumbHeight = Math.max(24, Math.round((viewport * viewport) / total));
      state.maxThumbTop = Math.max(0, viewport - thumbHeight);

      thumb.style.height = `${thumbHeight}px`;

      const thumbTop = state.maxScrollTop === 0
        ? 0
        : (target.scrollTop / state.maxScrollTop) * state.maxThumbTop;

      thumb.style.top = `${thumbTop}px`;
    }

    function startDrag(event) {
      event.preventDefault();
      state.dragging = true;
      state.startY = event.clientY;
      state.startTop = parseFloat(thumb.style.top) || 0;
    }

    function onMove(event) {
      if (!state.dragging) return;
      const delta = event.clientY - state.startY;
      const nextTop = clamp(state.startTop + delta, 0, state.maxThumbTop);

      if (state.maxThumbTop > 0) {
        target.scrollTop = (nextTop / state.maxThumbTop) * state.maxScrollTop;
      }
    }

    function stopDrag() {
      state.dragging = false;
    }

    target.addEventListener('scroll', recalc);
    window.addEventListener('resize', recalc);
    window.addEventListener('scroll', recalc, true);
    thumb.addEventListener('mousedown', startDrag);

    track.addEventListener('mousedown', event => {
      if (event.target === thumb) return;

      const rect = track.getBoundingClientRect();
      const clickY = event.clientY - rect.top;
      const thumbHeight = thumb.offsetHeight;
      const nextTop = clamp(clickY - thumbHeight / 2, 0, state.maxThumbTop);

      if (state.maxThumbTop > 0) {
        target.scrollTop = (nextTop / state.maxThumbTop) * state.maxScrollTop;
      }
    });

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', stopDrag);

    if (window.ResizeObserver) {
      const ro = new ResizeObserver(recalc);
      ro.observe(target);
    }

    instances.push(recalc);
    recalc();
  }

  targets.forEach(setup);

  function refreshLoop() {
    instances.forEach(fn => fn());
    requestAnimationFrame(refreshLoop);
  }

  requestAnimationFrame(refreshLoop);
})();
