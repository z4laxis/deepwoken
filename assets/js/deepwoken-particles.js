(function () {
  if (window.__deepwokenParticlesInitialized) return;
  window.__deepwokenParticlesInitialized = true;

  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  let container = document.querySelector('.orb-container') || document.querySelector('.menu-particles');
  if (!container) {
    container = document.createElement('div');
    container.className = 'menu-particles';
    document.body.prepend(container);
  }

  if (!container.style.position) {
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.overflow = 'hidden';
    container.style.zIndex = '0';
  }

  const useOrbStyle = container.classList.contains('orb-container');
  const particleClass = useOrbStyle ? 'orb' : 'menu-particle';

  const spawnParticle = () => {
    const particle = document.createElement('span');
    particle.className = particleClass;

    const startX = Math.random();
    const angle = randomInt(0, 359) * (Math.PI / 180);
    const deltaX = Math.sin(angle) * 0.2;
    const deltaY = Math.cos(angle) * 0.2 - 1.2;
    const durationMs = randomInt(15, 20) * 1000;
    const sizePx = randomInt(5, 10);

    particle.style.left = `${startX * 100}%`;
    particle.style.width = `${sizePx}px`;
    particle.style.height = `${sizePx}px`;
    particle.style.top = '100%';

    container.appendChild(particle);

    const moveDistanceX = deltaX * window.innerWidth;
    const moveDistanceY = deltaY * window.innerHeight;

    particle.animate(
      [
        { opacity: 0 },
        { opacity: 0.05 }
      ],
      {
        duration: 500,
        fill: 'forwards',
        easing: 'linear'
      }
    );

    const pulseTimeout = setTimeout(() => {
      particle.animate(
        [
          { opacity: 0.05 },
          { opacity: 0.1 },
          { opacity: 0.05 }
        ],
        {
          duration: 2000,
          easing: 'ease-in-out',
          iterations: Infinity
        }
      );
    }, 500);

    particle.animate(
      [
        { transform: 'translate3d(0, 0, 0)' },
        { transform: `translate3d(${moveDistanceX}px, ${moveDistanceY}px, 0)` }
      ],
      {
        duration: durationMs,
        fill: 'forwards',
        easing: 'linear'
      }
    );

    setTimeout(() => {
      clearTimeout(pulseTimeout);
      particle.remove();
    }, durationMs + 1000);
  };

  const spawnLoop = () => {
    spawnParticle();
    setTimeout(spawnLoop, (0.25 + Math.random() * 0.75) * 1000);
  };

  spawnLoop();
})();
