/**
 * INTERNLINK — "TOUCH THE FUTURE" INTERACTION ENGINE
 * 
 * 1. Cursor Spotlight Reveal & Typographic Constellation Interaction
 * 2. Magnetic Individual Character Attraction (<100px proximity)
 * 3. 1-Second Hold-to-Discover Easter Egg ("THIS ISN'T JUST AN UPDATE. IT'S A REBUILD.")
 * 4. CTA Cinematic Response: Signal Beam -> Hero Lift -> NEXT Reveal -> CONNECTED Morph
 * 5. Subtle Mouse Velocity Reactivity (0.4px displacement)
 * 6. Signature Particle Dissolve Status Cycler & Quiet Moments
 * 7. Mobile Tap Reveal Interaction
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initCinematicScanBeam(prefersReducedMotion);
  initTypographicConstellation(prefersReducedMotion);
  initMagneticCharacters(prefersReducedMotion);
  initHoldToDiscoverEgg(prefersReducedMotion);
  initCinematicCTAResponse(prefersReducedMotion);
  initMouseVelocityReactivity(prefersReducedMotion);
  initStatusTransformation(prefersReducedMotion);
  initMobileTapConstellation();
});

/* --------------------------------------------------------------------------
   1. Initial Full-Viewport Scanning Light Beam
   -------------------------------------------------------------------------- */
function initCinematicScanBeam(reducedMotion) {
  if (reducedMotion) return;

  const beam = document.getElementById('cinematic-scan-beam');
  if (!beam) return;

  setTimeout(() => {
    beam.classList.add('run-beam');

    const targets = [
      { id: 'header-reveal', delay: 100 },
      { id: 'eyebrow-reveal', delay: 350 },
      { id: 'main-headline', delay: 550 },
      { id: 'supporting-copy', delay: 750 },
      { id: 'status-reveal', delay: 950 },
      { id: 'cta-reveal', delay: 1150 }
    ];

    targets.forEach(item => {
      setTimeout(() => {
        const el = document.getElementById(item.id);
        if (el) {
          el.classList.add('beam-lit');
          setTimeout(() => el.classList.remove('beam-lit'), 350);
        }
      }, item.delay);
    });
  }, 2100);
}

/* --------------------------------------------------------------------------
   2. Cursor Spotlight Reveal & Typographic Constellation
   -------------------------------------------------------------------------- */
function initTypographicConstellation(reducedMotion) {
  if (reducedMotion || window.matchMedia('(hover: none)').matches) return;

  const words = document.querySelectorAll('.constellation-word');
  const cursorLight = document.getElementById('cursor-light');
  if (!words.length) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isMoving && cursorLight) {
      isMoving = true;
      cursorLight.style.opacity = '1';
    }

    // Evaluate proximity to each constellation word
    words.forEach(wordEl => {
      const rect = wordEl.getBoundingClientRect();
      const wordCenterX = rect.left + rect.width / 2;
      const wordCenterY = rect.top + rect.height / 2;

      const dx = mouseX - wordCenterX;
      const dy = mouseY - wordCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Spotlight proximity (< 220px)
      if (dist < 220) {
        const proximityAlpha = 0.016 + (1 - dist / 220) * 0.12;
        wordEl.style.opacity = proximityAlpha.toFixed(3);
        wordEl.style.filter = `blur(${Math.max(0, (dist / 220) * 2).toFixed(1)}px)`;

        // Very close hover response (< 75px)
        if (dist < 75) {
          const shiftForce = (1 - dist / 75) * 4.0;
          // Move toward center of screen
          const screenCenterX = window.innerWidth / 2;
          const screenCenterY = window.innerHeight / 2;
          const toCenterX = screenCenterX - wordCenterX;
          const toCenterY = screenCenterY - wordCenterY;
          const toCenterDist = Math.hypot(toCenterX, toCenterY) || 1;

          wordEl.classList.add('hover-focused');
          wordEl.style.transform = `translate(${(toCenterX / toCenterDist) * shiftForce}px, ${(toCenterY / toCenterDist) * shiftForce}px)`;
        } else {
          wordEl.classList.remove('hover-focused');
          wordEl.style.transform = '';
        }
      } else {
        wordEl.style.opacity = '';
        wordEl.style.filter = '';
        wordEl.style.transform = '';
        wordEl.classList.remove('hover-focused');
      }
    });
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    isMoving = false;
    if (cursorLight) cursorLight.style.opacity = '0';
    words.forEach(w => {
      w.style.opacity = '';
      w.style.filter = '';
      w.style.transform = '';
      w.classList.remove('hover-focused');
    });
  });

  function updateCursor() {
    if (isMoving && cursorLight) {
      curX += (mouseX - curX) * 0.06;
      curY += (mouseY - curY) * 0.06;
      cursorLight.style.transform = `translate3d(${curX - 220}px, ${curY - 220}px, 0)`;
    }
    requestAnimationFrame(updateCursor);
  }

  requestAnimationFrame(updateCursor);
}

/* --------------------------------------------------------------------------
   3. Main Headline Magnetic Characters (<100px Proximity)
   -------------------------------------------------------------------------- */
function initMagneticCharacters(reducedMotion) {
  if (reducedMotion || window.matchMedia('(hover: none)').matches) return;

  const chars = document.querySelectorAll('.char-span');
  if (!chars.length) return;

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    chars.forEach(charEl => {
      const rect = charEl.getBoundingClientRect();
      const charCenterX = rect.left + rect.width / 2;
      const charCenterY = rect.top + rect.height / 2;

      const dx = mouseX - charCenterX;
      const dy = mouseY - charCenterY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        const force = (1 - dist / 100) * 2.8;
        const shiftX = (dx / dist) * force;
        const shiftY = (dy / dist) * force;
        charEl.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;
        charEl.style.filter = `brightness(${1 + force * 0.07})`;
      } else {
        charEl.style.transform = '';
        charEl.style.filter = '';
      }
    });
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    chars.forEach(c => {
      c.style.transform = '';
      c.style.filter = '';
    });
  });
}

/* --------------------------------------------------------------------------
   4. Hold-to-Discover Easter Egg (1s Hold near Hero Center)
   -------------------------------------------------------------------------- */
function initHoldToDiscoverEgg(reducedMotion) {
  if (reducedMotion || window.matchMedia('(hover: none)').matches) return;

  const eggContainer = document.getElementById('hold-egg-container');
  const heroInner = document.getElementById('hero-inner');
  if (!eggContainer || !heroInner) return;

  let holdTimer = null;
  let cooldown = false;

  window.addEventListener('mousemove', (e) => {
    if (cooldown) return;

    const rect = heroInner.getBoundingClientRect();
    const heroCenterX = rect.left + rect.width / 2;
    const heroCenterY = rect.top + rect.height / 2;

    const dist = Math.hypot(e.clientX - heroCenterX, e.clientY - heroCenterY);

    if (dist < 80) {
      if (!holdTimer) {
        holdTimer = setTimeout(() => {
          triggerEgg();
        }, 1000); // 1.0 second continuous hover
      }
    } else {
      if (holdTimer) {
        clearTimeout(holdTimer);
        holdTimer = null;
      }
    }
  }, { passive: true });

  function triggerEgg() {
    cooldown = true;
    eggContainer.classList.add('egg-active');

    setTimeout(() => {
      eggContainer.classList.remove('egg-active');
      // Enforce 8s cooldown
      setTimeout(() => {
        cooldown = false;
      }, 8000);
    }, 1500); // Hold for 1.5 seconds
  }
}

/* --------------------------------------------------------------------------
   5. CTA Cinematic Response: Signal Beam -> Hero Lift -> NEXT -> CONNECTED
   -------------------------------------------------------------------------- */
function initCinematicCTAResponse(reducedMotion) {
  const btn = document.getElementById('stay-connected-btn');
  const lightTrail = document.getElementById('btn-light-trail');
  const signalBeam = document.getElementById('cta-signal-beam');
  const nextText = document.getElementById('bg-next-text');
  const heroInner = document.getElementById('hero-inner');
  if (!btn) return;

  // Single light trail pass on hover enter
  btn.addEventListener('mouseenter', () => {
    if (lightTrail && !reducedMotion) {
      lightTrail.classList.remove('trail-active');
      void lightTrail.offsetWidth;
      lightTrail.classList.add('trail-active');
    }
  });

  // Magnetic attraction (Desktop only)
  if (!reducedMotion && window.matchMedia('(hover: hover)').matches) {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - btnCenterX) * 0.16;
      const deltaY = (e.clientY - btnCenterY) * 0.16;

      btn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  }

  // Click Sequence
  let isExecuting = false;

  btn.addEventListener('click', () => {
    if (isExecuting) return;
    isExecuting = true;

    if (reducedMotion) {
      btn.classList.add('morphed');
      setTimeout(() => {
        btn.classList.remove('morphed');
        isExecuting = false;
      }, 1500);
      return;
    }

    // Step 1: Button compresses slightly
    btn.style.transform = 'scale(0.96)';

    // Step 2: Signal line shoots upward
    if (signalBeam) {
      signalBeam.classList.add('beam-fire');
      setTimeout(() => signalBeam.classList.remove('beam-fire'), 700);
    }

    // Step 3: Hero lifts 4px & NEXT reveals in background
    setTimeout(() => {
      if (heroInner) heroInner.classList.add('hero-cta-lift');
      if (nextText) nextText.classList.add('next-reveal');
    }, 200);

    // Step 4: Hero settles & button morphs to CONNECTED ✓
    setTimeout(() => {
      if (heroInner) heroInner.classList.remove('hero-cta-lift');
      btn.style.transform = '';
      btn.classList.add('morphed');
      btn.setAttribute('aria-label', 'Status: Connected');
    }, 850);

    // Step 5: Restore STAY CONNECTED
    setTimeout(() => {
      if (nextText) nextText.classList.remove('next-reveal');
      btn.classList.remove('morphed');
      btn.setAttribute('aria-label', 'Stay connected for updates');
      isExecuting = false;
    }, 2350);
  });
}

/* --------------------------------------------------------------------------
   6. Mouse Velocity Reactivity (0.4px Micro-Displacement)
   -------------------------------------------------------------------------- */
function initMouseVelocityReactivity(reducedMotion) {
  if (reducedMotion || window.matchMedia('(hover: none)').matches) return;

  const heroInner = document.getElementById('hero-inner');
  if (!heroInner) return;

  let lastX = 0;
  let lastY = 0;
  let lastTime = performance.now();
  let settleTimeout;

  window.addEventListener('mousemove', (e) => {
    const now = performance.now();
    const dt = Math.max(now - lastTime, 1);
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const speed = Math.sqrt(dx * dx + dy * dy) / dt;

    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = now;

    if (speed > 3.5) {
      heroInner.classList.add('velocity-subtle');
      clearTimeout(settleTimeout);
      settleTimeout = setTimeout(() => {
        heroInner.classList.remove('velocity-subtle');
      }, 120);
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   7. Signature Particle Dissolve Status Cycler & Quiet Moments
   -------------------------------------------------------------------------- */
function initStatusTransformation(reducedMotion) {
  const statusText = document.getElementById('kinetic-status-text');
  const canvas = document.getElementById('status-particle-canvas');
  if (!statusText) return;

  const states = [
    'RETHINKING.',
    'REBUILDING.',
    'REFINING.',
    'REDEFINING.'
  ];

  let currentIdx = 0;
  let completedCycles = 0;
  const cycleInterval = 3800;

  // Particle Canvas
  let ctx = null;
  let particles = [];
  if (canvas && !reducedMotion) {
    ctx = canvas.getContext('2d');
    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      if (ctx) ctx.scale(dpr, dpr);
    }
    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();
  }

  function spawnDissolveParticles() {
    if (!ctx || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    particles = [];

    for (let i = 0; i < 14; i++) {
      particles.push({
        x: rect.width * 0.72 + (Math.random() - 0.5) * 18,
        y: rect.height * 0.48 + (Math.random() - 0.5) * 10,
        vx: Math.random() * 1.6 + 0.4,
        vy: (Math.random() - 0.5) * 1.0,
        alpha: 0.85,
        size: Math.random() * 1.4 + 0.8
      });
    }

    renderParticles();
  }

  function renderParticles() {
    if (!ctx || !canvas || particles.length === 0) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.03;

      if (p.alpha > 0) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.fill();
      }
    }

    particles = particles.filter(p => p.alpha > 0);
    if (particles.length > 0) {
      requestAnimationFrame(renderParticles);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function runCycle() {
    currentIdx = (currentIdx + 1) % states.length;
    completedCycles++;

    // Quiet Moment every 4 cycles (2.2s pause)
    if (completedCycles % 4 === 0 && !reducedMotion) {
      document.body.classList.add('quiet-moment');
      setTimeout(() => {
        document.body.classList.remove('quiet-moment');
      }, 2200);
      return;
    }

    const nextWord = states[currentIdx];

    if (reducedMotion) {
      statusText.textContent = nextWord;
      return;
    }

    statusText.classList.add('dissolve-exit');
    spawnDissolveParticles();

    setTimeout(() => {
      statusText.textContent = nextWord;
      statusText.classList.remove('dissolve-exit');
      statusText.classList.add('dissolve-enter');
      statusText.classList.add('status-blue-shift');

      void statusText.offsetWidth;
      statusText.classList.remove('dissolve-enter');

      setTimeout(() => {
        statusText.classList.remove('status-blue-shift');
      }, 400);
    }, 450);
  }

  setInterval(runCycle, cycleInterval);
}

/* --------------------------------------------------------------------------
   8. Mobile Tap Reveal Interaction
   -------------------------------------------------------------------------- */
function initMobileTapConstellation() {
  if (window.matchMedia('(hover: hover)').matches) return;

  const heroInner = document.getElementById('hero-inner');
  const constellation = document.getElementById('typographic-constellation');
  if (!heroInner || !constellation) return;

  heroInner.addEventListener('click', () => {
    constellation.classList.add('mobile-tapped');
    setTimeout(() => {
      constellation.classList.remove('mobile-tapped');
    }, 1100);
  });
}
