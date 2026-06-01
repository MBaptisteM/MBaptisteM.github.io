/* ============================================================
   JARVIS — MAIN.JS
   Reads JARVIS_CONFIG and renders all dynamic content.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const C = JARVIS_CONFIG;

  // ── GITHUB LINKS ──────────────────────────────────────────
  const githubUrl = C.meta.github;
  ['navGithub', 'footerGithub'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = githubUrl;
  });

  // ── NAV SCROLL STATE ─────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── MOBILE BURGER ────────────────────────────────────────
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  burger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // ── TERMINAL TYPEWRITER ──────────────────────────────────
  const typedEl = document.getElementById('typedText');
  if (typedEl) {
    let lineIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pauseTimer = null;

    const TYPING_SPEED = 70;
    const DELETE_SPEED  = 30;
    const PAUSE_AFTER   = 2000;
    const PAUSE_BEFORE  = 400;

    function type() {
      const lines = C.terminalLines;
      const current = lines[lineIdx];

      if (!deleting) {
        typedEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
          deleting = true;
          pauseTimer = setTimeout(type, PAUSE_AFTER);
          return;
        }
      } else {
        typedEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          lineIdx = (lineIdx + 1) % lines.length;
          pauseTimer = setTimeout(type, PAUSE_BEFORE);
          return;
        }
      }
      setTimeout(type, deleting ? DELETE_SPEED : TYPING_SPEED);
    }
    setTimeout(type, 800);
  }

  // ── OVERVIEW CARDS ───────────────────────────────────────
  const overviewEl = document.getElementById('overviewCards');
  if (overviewEl) {
    overviewEl.innerHTML = C.overviewCards.map(card => `
      <div class="overview-card reveal">
        <span class="overview-card__icon">${card.icon}</span>
        <h3 class="overview-card__title">${card.title}</h3>
        <p class="overview-card__desc">${card.desc}</p>
      </div>
    `).join('');
  }

  // ── FEATURES ─────────────────────────────────────────────
  const featuresEl = document.getElementById('featuresList');
  if (featuresEl) {
    featuresEl.innerHTML = C.features.map(f => `
      <div class="feature reveal">
        <div class="feature__info">
          <span class="feature__number">${f.number}</span>
          <h3 class="feature__title">${f.title}</h3>
          <p class="feature__desc">${f.desc}</p>
        </div>
        <ul class="feature__bullets">
          ${f.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  // ── TREE ─────────────────────────────────────────────────
  const treeEl = document.getElementById('treeCode');
  if (treeEl) {
    // Colorize specific parts of the tree
    const colored = C.treeDisplay
      .replace(/(TPs\/)/g, '<span class="cyan">$1</span>')
      .replace(/(S\d\/|B\d\/)/g, '<span class="cyan">$1</span>');
    treeEl.innerHTML = colored;
  }

  const treeListEl = document.getElementById('treeList');
  if (treeListEl) {
    treeListEl.innerHTML = C.treeClassifiers.map(c => `<li>${c}</li>`).join('');
  }

  // ── COMMANDS ─────────────────────────────────────────────
  const commandsEl = document.getElementById('commandsList');
  if (commandsEl) {
    commandsEl.innerHTML = C.commands.map(cmd => `
      <div class="command-card reveal">
        <div class="command-card__header">
          <span class="command-card__name">jarvis ${cmd.name}</span>
          <code class="command-card__usage">${cmd.usage}</code>
        </div>
        <div class="command-card__body">
          <p class="command-card__desc">${cmd.desc}</p>
          <ol class="command-card__steps">
            ${cmd.steps.map((step, i) => `
              <li>
                <span class="command-card__step-num">${String(i + 1).padStart(2, '0')}.</span>
                ${step}
              </li>
            `).join('')}
          </ol>
          ${cmd.example ? `
            <div class="command-card__example">
              <code>$ ${cmd.example}</code>
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');
  }

  // ── FOOTER ───────────────────────────────────────────────
  const footerCopy = document.getElementById('footerCopy');
  if (footerCopy) {
    footerCopy.textContent = `© ${C.meta.year} ${C.meta.author}. ${C.meta.license}`;
  }

  // ── SCROLL REVEAL ─────────────────────────────────────────
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Observe both pre-existing and dynamically added .reveal elements
  function observeReveal() {
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }
  // Initial observe
  observeReveal();
  // Re-observe after a tick (dynamic content just rendered)
  setTimeout(observeReveal, 50);

  // ── ACTIVE NAV LINK ───────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('[data-nav]');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${e.target.id}`
            ? 'var(--cyan)'
            : '';
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

});
