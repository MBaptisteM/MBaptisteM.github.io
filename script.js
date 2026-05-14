/* ===== GLOBAL CONFIG ===== */
const IsMobileView = window.innerWidth / window.innerHeight < 1 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

let progress = 0;
let startX = 0;
let active = 0;
let isDown = false;

const SPEED_WHEEL = 0.02;
const SPEED_DRAG = -0.1;
const SCROLL_THRESHOLD = 0.8;

let particlesCreated = false;
let starsCreated = false;
let nebulasCreated = false;

/* ===== LANGUAGE SYSTEM ===== */
let currentLanguage = localStorage.getItem('language') || 'fr';

const translations = {
  "en": {
    "page_title": "Baptiste's Dashboard",
    "portfolio_title": "Baptiste Mahe's Portfolio",
    "journey": "Journey",
    "skills": "Skills",
    "hire_me": "Hire Me",
    "hackathon1": "In late 2025, I had the opportunity to participate in my first hackathon at the Grand Palais - <a href='https://www.agorize.com/fr/challenges/drone-defense-hackathon' target='_blank'>Drone Defense Hackathon</a> - where I coded in C an algorithm calculating optimized paths for batch drone deliveries.",
    "vinci_stage": "In 2025, I completed a two-month internship in the AI department of <a href='https://www.vinci-energies.com/' target='_blank'>Vinci Energies</a>, where I developed my AI agent and traveled to Nantes and Austria to participate in internal Vinci conferences on AI.",
    "epita": "After obtaining my high school diploma, I joined <a href='https://www.epita.fr/' target='_blank'>EPITA</a> to become a computer engineer through a 5-year training program at this computer science school.",
    "bac": "In 2024 I obtained my high school diploma with honors in Mathematics, Computer Science, and Physics-Chemistry. It was also the year I participated in my first international programming competition with over 12,000 participants - the <a href='https://www.nuitducode.net/' target='_blank'>Night of Code</a> 2024 in Python, which I won.",
    "languages": "I speak English fluently. I completed an exchange semester in Japan where I followed an English-language curriculum. I also passed the TOEIC and TOEFL with a score of 90 certified C1 in oral and written comprehension as well as written expression.",
    "presentation": "I am comfortable speaking in front of an audience and giving presentations, and I particularly master the Office suite. I also participated in an internship and an eloquence competition. I am also a teacher at my school and give computer science lessons to younger students.",
    "teamwork": "During my internships and various projects, I learned to work as a team to successfully complete projects. During my personal projects, I also learned to find solutions to problems on my own, as was the case during the development of my game to be able to publish it without major flaws and ensure its maintenance.",
    "contact_text": "You can contact me via:<br>Email: <a href='mailto:mahebaptiste.99@gmail.com'>mahebaptiste.99@gmail.com</a><br><br>You can also click on the <a href='https://www.linkedin.com/in/baptiste-mahé-84199a2a6/' target='_blank'>LinkedIn</a> or <a href='https://github.com/mbaptistem' target='_blank'>Github</a> icons to access my various networks.",
    "cv_text": "For more information, you can consult my <a href='CV.pdf' target='_blank'>CV</a> most recent.<br>(Last CV update: 04/14/2026)"
  },
  "fr": {
    "page_title": "Baptiste's Dashboard",
    "portfolio_title": "Portfolio de Baptiste Mahé",
    "journey": "Parcours",
    "skills": "Compétences",
    "hire_me": "Me recruter",
    "hackathon1": "En fin 2025 j'ai eu l'occasion de faire mon premier hackaton au grand palais <a href='https://www.agorize.com/fr/challenges/drone-defense-hackathon' target='_blank'>Drone défense hackaton</a> durant lequel j'ai codé en C un algorithme calculant les chemins les plus optimisés lors de livraisons groupées par des drones.",
    "vinci_stage": "En 2025 j'ai fait un stage de deux mois dans le pôle IA de <a href='https://www.vinci-energies.com/' target='_blank'>Vinci Energies</a> durant lequel j'ai développé mon agent IA et voyagé à Nantes et en Autriche afin de participer à des conférences internes à Vinci concernant l'IA.",
    "epita": "Une fois mon bac obtenu j'ai intégré l'<a href='https://www.epita.fr/' target='_blank'>EPITA</a> afin de devenir ingénieur en informatique à la suite d'une formation de 5 ans dans cette école d'informatique.",
    "bac": "En 2024 j'ai obtenu mon bac avec mention Très bien en spécialité Maths, NSI, Physique Chimie. C'est aussi l'année durant laquelle j'ai fait mon premier concours de programmation international avec plus de 12000 participants la <a href='https://www.nuitducode.net/' target='_blank'>Nuit du code</a> édition 2024 en python que j'ai remporté.",
    "languages": "Je parle couramment anglais, j'ai fais un échange durant un semestre au Japon durant lequel j'ai suivi un cursus anglophone. J'ai également passé le TOEIC et le TOEFL avec un score de 90 certifié C1 en compréhension orale et écrite ainsi qu'en expression écrite.",
    "presentation": "J'ai l'habitude de parler devant un public et de faire des présentation, de plus je maîtrise particulièrement bien la suite Office. Aussi j'ai participé à un stage et un concours d'éloquence. Je suis également professeur pour mon école et je donne cours d'informatique à des élèves plus jeunes que moi.",
    "teamwork": "Durant mes stages et durant les différents projets que j'ai réalisé j'ai appris à travailler en équipe afin de mener un projet à bien. Durant mes projets personnels j'ai également appris à trouver des solutions aux problèmes que je rencontre par moi même comme cela a été le cas lors du développement de mon jeu afin de pouvoir le publier sans faille majeure et assurer sa maintenance.",
    "contact_text": "Vous pouvez me contacter via :<br>Email: <a href='mailto:mahebaptiste.99@gmail.com'>mahebaptiste.99@gmail.com</a><br><br>Vous pouvez également cliquer sur les icones <a href='https://www.linkedin.com/in/baptiste-mahé-84199a2a6/' target='_blank'>Linkedin</a> ou <a href='https://github.com/mbaptistem' target='_blank'>Github</a> afin d'accéder à mes différents réseaux.",
    "cv_text": "Pour plus d'informations vous pouvez consulter mon <a href='CV.pdf' target='_blank'>CV</a> le plus récent.<br>(Dernière mise à jour du CV : 14/04/2026)"
  }
};

function setLanguage(lang) {
  if (!translations[lang]) return;
  
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  
  // Update document language
  document.documentElement.lang = lang;
  
  // Update page title
  document.title = translations[lang].page_title;
  
  // Update all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });
  
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) {
    langBtn.classList.toggle('lang-fr', lang === 'fr');
    langBtn.classList.toggle('lang-en', lang === 'en');
  }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', async function() {
  setLanguage(currentLanguage);
  
  // Add language toggle button event listener
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', function() {
      const newLang = currentLanguage === 'fr' ? 'en' : 'fr';
      setLanguage(newLang);
    });
  }
});

/* ===== CAROUSEL SETUP ===== */
const $items = document.querySelectorAll('.carousel-item');
const $cursors = document.querySelectorAll('.cursor');

const getZindex = (array, index) => array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i));

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index];
  item.style.setProperty('--zIndex', zIndex);
  item.style.setProperty('--active', (index - active) / $items.length);
};

const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.floor(progress / 100 * ($items.length - 1));

  $items.forEach((item, index) => {
    displayItems(item, index, active);
    item.classList.remove('active-center');
    
    if (index === active) {
      item.classList.add('active-center');
      item.style.transform = `translate(var(--x), var(--y)) rotate(var(--rot)) scale(1.1)`;
      item.style.zIndex = 100;
      item.style.filter = 'brightness(1.2)';
    } else {
      item.style.zIndex = index;
      item.style.filter = 'brightness(0.7)';
    }
  });
};

animate();

/* ===== CAROUSEL EVENTS ===== */
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i / $items.length) * 100 + 10;
    animate();
  });
});

document.querySelectorAll('.carousel-link').forEach(link => {
  link.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });
});

const cursorElements = document.querySelectorAll('.cursor, .cursor2');
const setCursorActive = (active) => {
  cursorElements.forEach(cursor => cursor.classList.toggle('cursor-active', active));
};

const interactiveSelectors = 'a, button, .tab-btn, .carousel-link';

document.querySelectorAll(interactiveSelectors).forEach(el => {
  el.addEventListener('mouseenter', () => setCursorActive(true));
  el.addEventListener('mouseleave', () => setCursorActive(false));
});

document.addEventListener('mousedown', () => {
  document.querySelectorAll('.cursor').forEach(cursor => {
    cursor.classList.add('shockwave');
    setTimeout(() => cursor.classList.remove('shockwave'), 400);
  });
});

/* ===== SCROLL HANDLING ===== */
function getScrollPercentage() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  return scrollTop / (documentHeight - windowHeight);
}

function toggleClassicScroll(allow) {
  document.body.style.overflow = allow ? 'hidden' : 'hidden';
  document.documentElement.style.overflow = allow ? 'auto' : 'hidden';
}

const handleWheel = (e) => {
  const currentScrollPercentage = getScrollPercentage();
  if (currentScrollPercentage < SCROLL_THRESHOLD) {
    toggleClassicScroll(true);
  } else {
    const wheelProgress = e.deltaY * SPEED_WHEEL;
    if (wheelProgress < 0 && progress === 0) {
      toggleClassicScroll(true);
    } else {
      toggleClassicScroll(false);
      progress += wheelProgress;
      animate();
    }
  }
};

const handleMouseMove = (e) => {
  if (e.type === 'mousemove' || e.type === 'touchmove') {
    $cursors.forEach(($cursor) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const y = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      $cursor.style.left = `${x}px`;
      $cursor.style.top = `${y}px`;
    });
  }

  if (!isDown) return;
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0;
  const mouseProgress = (x - startX) * SPEED_DRAG;
  progress += mouseProgress;
  startX = x;
  animate();
};

const handleMouseDown = (e) => {
  isDown = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
};

const handleMouseUp = () => {
  isDown = false;
};

document.addEventListener('mousewheel', handleWheel);
document.addEventListener('mousedown', handleMouseDown);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('touchstart', handleMouseDown);
document.addEventListener('touchmove', handleMouseMove);
document.addEventListener('touchend', handleMouseUp);

/* ===== PROFILE PICTURE 3D ===== */
let mouseMoveTimeout;
const resetDelay = 1500;

function resetProfilePicture() {
  const profileWrapper = document.querySelector('.profile-picture-wrapper');
  const profileImg = document.querySelector('.hero-round');
  if (profileWrapper && profileImg) {
    profileWrapper.style.transform = 'translateY(-50px) rotateX(0) rotateY(0)';
    profileImg.style.transform = 'translateX(0) translateY(0) scale(1)';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const profileWrapper = document.querySelector('.profile-picture-wrapper');
  const profileImg = document.querySelector('.hero-round');
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const maxTilt = 20;
  const maxPerspective = 8;

  if (!IsMobileView && profileWrapper && profileImg) {
    document.addEventListener('mousemove', function(e) {
      clearTimeout(mouseMoveTimeout);

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const ratioX = (mouseX - centerX) / centerX;
      const ratioY = (mouseY - centerY) / centerY;
      const tiltX = (ratioY * maxTilt).toFixed(2);
      const tiltY = -(ratioX * maxTilt).toFixed(2);
      const perspectiveX = (ratioX * maxPerspective).toFixed(2);
      const perspectiveY = (ratioY * maxPerspective).toFixed(2);

      profileWrapper.style.transform = `translateY(-50px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      profileImg.style.transform = `translateX(${perspectiveX}px) translateY(${perspectiveY}px) scale(1.05)`;

      mouseMoveTimeout = setTimeout(resetProfilePicture, resetDelay);
    });

    profileWrapper.addEventListener('mouseleave', resetProfilePicture);
  }

  resetProfilePicture();
});

/* ===== CARD 3D TILT ===== */
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
const tiltSensitivity = 0.03;

function getCenterCard() {
  const cards = document.querySelectorAll('.carousel-item');
  let centerCard = null;
  let minDistance = Infinity;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const distanceToCenter = Math.abs(cardCenterX - window.innerWidth / 2);

    if (distanceToCenter < minDistance) {
      minDistance = distanceToCenter;
      centerCard = card;
    }
  });

  return centerCard;
}

function updateCardTilt() {
  const centerCard = getCenterCard();
  if (!centerCard) return;

  const cardRect = centerCard.getBoundingClientRect();
  const cardCenterY = cardRect.top + cardRect.height / 2;
  const cardCenterX = cardRect.left + cardRect.width / 2;

  const tiltX = (mouseY - cardCenterY) * tiltSensitivity;
  const tiltY = -(mouseX - cardCenterX) * tiltSensitivity;

  centerCard.style.transform = `translate(var(--x), var(--y)) rotate(var(--rot)) rotateX(${tiltX}deg) rotateY(${tiltY}deg) perspective(1000px)`;

  requestAnimationFrame(updateCardTilt);
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

if (!IsMobileView) updateCardTilt();

/* ===== PARALLAX ON HOVER ===== */
$items.forEach(item => {
  if (IsMobileView) return;

  item.addEventListener('mousemove', (e) => {
    if (!item.classList.contains('active-center')) return;

    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;

    item.querySelector('.carousel-box').style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(20px)`;
  });

  item.addEventListener('mouseleave', () => {
    item.querySelector('.carousel-box').style.transform = 'translateZ(20px)';
  });
});

/* ===== PARTICLES & ANIMATIONS ===== */
function createParticles() {
  if (particlesCreated) return;
  const container = document.querySelector('.particles-container');
  if (!container) return;
  container.innerHTML = '';

  const particleCount = 30;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.bottom = `-10px`;

    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    particle.style.animation = `float-up ${duration}s linear ${delay}s infinite`;

    container.appendChild(particle);
  }

  particlesCreated = true;
}

function createNebulas() {
  if (nebulasCreated) return;
  const colors = ['#9c27b0', '#3f51b5', '#2196f3'];
  const container = document.querySelector('.galaxy-edges');
  if (!container) return;

  colors.forEach((color, i) => {
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    nebula.style.background = color;
    nebula.style.left = `${i * 30}%`;
    nebula.style.top = `${Math.random() * 100}%`;
    nebula.style.animationDuration = `${20 + Math.random() * 40}s`;
    container.appendChild(nebula);
  });

  nebulasCreated = true;
}

/* ===== STARS SYSTEM ===== */
const STAR_COUNT = IsMobileView ? 50 : 150;
const MOUSE_RADIUS = 150;
const stars = [];
let mouseX2 = window.innerWidth / 2;
let mouseY2 = window.innerHeight / 2;

function createStars() {
  if (starsCreated) return;
  const container = document.querySelector('.stars-container');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    const sizes = ['tiny', 'small', 'medium'];
    const colors = ['blue', 'purple', 'white'];
    star.classList.add(sizes[Math.floor(Math.random() * sizes.length)], colors[Math.floor(Math.random() * colors.length)]);

    const side = Math.random() > 0.5 ? 1 : -1;
    star.baseX = window.innerWidth / 2 + side * window.innerWidth / 2 * Math.random();
    star.baseY = window.innerHeight * Math.random();

    star.x = star.baseX;
    star.y = star.baseY;
    star.vx = 0;
    star.vy = 0;

    star.style.left = `${star.x}px`;
    star.style.top = `${star.y}px`;

    container.appendChild(star);
    stars.push(star);
  }

  starsCreated = true;
}

function animateStars() {
  if (IsMobileView) return;

  stars.forEach(star => {
    const dx = mouseX2 - star.x;
    const dy = mouseY2 - star.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < MOUSE_RADIUS) {
      const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
      const angle = Math.atan2(dy, dx);
      star.vx = -Math.cos(angle) * force * 20;
      star.vy = -Math.sin(angle) * force * 20;
    } else {
      star.vx += (star.baseX - star.x) * 0.02;
      star.vy += (star.baseY - star.y) * 0.02;
      star.vx *= 0.9;
      star.vy *= 0.9;
    }

    star.x += star.vx;
    star.y += star.vy;

    star.style.left = `${star.x}px`;
    star.style.top = `${star.y}px`;

    const isMoving = Math.abs(star.vx) > 0.1 || Math.abs(star.vy) > 0.1;
    star.classList.toggle('moving', isMoving);

    const speed = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
    star.style.setProperty('--trail-opacity', Math.min(speed * 0.05, 0.4));
  });

  requestAnimationFrame(animateStars);
}

document.addEventListener('mousemove', (e) => {
  mouseX2 = e.clientX;
  mouseY2 = e.clientY;
});

/* ===== GALAXY INTERACTION ===== */
document.addEventListener('mousemove', (e) => {
  if (IsMobileView) return;

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  const leftGalaxy = document.querySelector('.left-galaxy');
  const rightGalaxy = document.querySelector('.right-galaxy');

  if (leftGalaxy) {
    leftGalaxy.style.background = `radial-gradient(ellipse at ${x * 50}% ${y * 50}%, rgba(138, 43, 226, 0.3) 0%, rgba(0, 0, 0, 0) 70%)`;
  }

  if (rightGalaxy) {
    rightGalaxy.style.background = `radial-gradient(ellipse at ${100 - x * 50}% ${y * 50}%, rgba(75, 0, 130, 0.3) 0%, rgba(0, 0, 0, 0) 70%)`;
  }
});

/* ===== TABS SYSTEM ===== */
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

function changeTab(tabId) {
  tabContents.forEach(content => {
    content.classList.remove('active');
    content.style.opacity = '0';
  });

  const activeContent = document.getElementById(tabId);
  if (activeContent) {
    activeContent.classList.add('active');
    activeContent.style.opacity = '1';
  }

  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.style.transform = 'scale(1)';
  });

  document.querySelector(`.tab-btn[data-tab="${tabId}"]`)?.classList.add('active');
}

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
    changeTab(tabId);
    triggerShockwave();
  });
});

const infoSection = document.querySelector('.info-section');
if (infoSection) {
  infoSection.addEventListener('mouseenter', () => {});
  infoSection.addEventListener('mouseleave', () => {});
}

/* ===== SHOCKWAVE EFFECT ===== */
function triggerShockwave() {
  const socialLinks = document.querySelectorAll('a[href*="linkedin"], a[href*="github"]');

  socialLinks.forEach(link => {
    const effect = document.createElement('div');
    effect.className = 'social-effect';
    link.appendChild(effect);
    setTimeout(() => effect.remove(), 800);
  });
}

/* ===== TAB BUTTON RIPPLE ===== */
tabButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    this.classList.add('active-click');
    setTimeout(() => this.classList.remove('active-click'), 300);
  });
});

/* ===== INIT ON LOAD ===== */
window.addEventListener('load', () => {
  document.body.style.overflow = 'auto';
  window.scrollTo(0, 0);
  toggleClassicScroll(true);

  $items.forEach(item => {
    item.style.opacity = 1;
    const img = item.querySelector('img');
    if (img) img.style.opacity = 1;
  });

  updateCarouselSize();
  initMobileLayout();
  animate();
  createParticles();
  createStars();
  createNebulas();
  animateStars();
});

window.addEventListener('resize', updateCarouselSize);

function updateCarouselSize() {
  if (IsMobileView) {
    $items.forEach(item => {
      item.style.setProperty('--width', '60vw');
      item.style.setProperty('--height', '50vh');
    });
  } else {
    const heightRatio = window.innerHeight / 100;
    $items.forEach(item => {
      item.style.setProperty('--width', `${heightRatio * 46}px`);
      item.style.setProperty('--height', `${heightRatio * 63}px`);
    });
  }
}

function initMobileLayout() {
  if (!IsMobileView) return;

  const profileRow = document.querySelector('.profile-and-social-row');
  if (profileRow) {
    profileRow.style.gap = '50px';
    profileRow.style.margin = '40px 0 30px 0';
  }

  const profilePic = document.querySelector('.profile-picture-wrapper');
  if (profilePic) profilePic.style.margin = '20px 0';
}





const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.6
});

document.querySelectorAll('.about-step').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});