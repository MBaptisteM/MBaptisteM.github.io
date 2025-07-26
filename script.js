
/*--------------------
Vars
--------------------*/
let progress = 0 // Changed from 50 to 0
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1
const IsMobile = () => {
  // Détection basée sur la largeur ET le User-Agent
  return window.innerWidth <= 768 || 
         /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};


/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.carousel-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))

  $items.forEach((item, index) => {
    displayItems(item, index, active)
    
    // Reset des classes
    item.classList.remove('active-center')
    
    if(index === active) {
      item.classList.add('active-center')
      item.style.transform = `translate(var(--x), var(--y)) rotate(var(--rot)) scale(1.1)`
      item.style.zIndex = 100
      item.style.filter = 'brightness(1.2)'
      
      // Effet spécial sur le contenu
      const box = item.querySelector('.carousel-box')
      box.style.transform = 'translateZ(30px)'
      box.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
    } else {
      item.style.zIndex = index
      item.style.filter = 'brightness(0.7)'
    }
  })
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
  })
})

/*--------------------
Handlers
--------------------*/




function getScrollPercentage() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Calcule le pourcentage de défilement par rapport à la hauteur défilable totale
    // (hauteur du document moins la hauteur visible de la fenêtre)
    return scrollTop / (documentHeight - windowHeight);
}


const scrollPercentageThreshold = 0.8; //1 = 100%
const handleWheel = e => {
    const currentScrollPercentage = getScrollPercentage();
    console.log(currentScrollPercentage);
    if (currentScrollPercentage < scrollPercentageThreshold){
        toggleClassicScroll(true);
    }
    else{

      const wheelProgress = e.deltaY * speedWheel
      if (wheelProgress < 0 && progress == 0){
          toggleClassicScroll(true);
      }
      else{
          //document.body.style.overflow = 'auto';
          //window.scrollTo(0, 0); //Qu'est ce que je dois mettre ici ?
          toggleClassicScroll(false);
          progress = progress + wheelProgress
          animate()
      }
      
    }

}

function toggleClassicScroll(allow) {
    if (allow) {
        document.body.style.overflow = 'hidden'; // Permet le défilement par défaut
        document.documentElement.style.overflow = 'auto'; // Pour une meilleure compatibilité
    } else {
        document.body.style.overflow = 'hidden'; // Désactive le défilement par défaut
        document.documentElement.style.overflow = 'hidden'; // Pour une meilleure compatibilité
    }
}


const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/

document.addEventListener('mousewheel',handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)


// NOUVEAU : Forcer le défilement en haut de la page au chargement
window.addEventListener('load', () => {
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0); // Défilement vers le haut et la gauche
    // Optionnel : s'assurer que le scroll classique est activé au chargement
    toggleClassicScroll(true);
});



let mouseMoveTimeout;
const resetDelay = 1500; // 1.5 secondes

document.addEventListener('DOMContentLoaded', function() {
  const profileWrapper = document.querySelector('.profile-picture-wrapper');
  const profileImg = document.querySelector('.hero-round');
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const maxTilt = 20; // Degrés maximum d'inclinaison
  const maxPerspective = 8; // Effet de perspective maximum (px)

  document.addEventListener('mousemove', function(e) {
    clearTimeout(mouseMoveTimeout);

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calcul des ratios (-1 à 1)
    const ratioX = (mouseX - centerX) / centerX;
    const ratioY = (mouseY - centerY) / centerY;
    
    // Calcul des transformations
    const tiltX = (ratioY * maxTilt).toFixed(2);
    const tiltY = -(ratioX * maxTilt).toFixed(2);
    const perspectiveX = (ratioX * maxPerspective).toFixed(2);
    const perspectiveY = (ratioY * maxPerspective).toFixed(2);
    
    // Application des transformations
    profileWrapper.style.transform = `
      translateY(-50px)
      rotateX(${tiltX}deg)
      rotateY(${tiltY}deg)
    `;
    
    // Légère déformation de l'image pour l'effet 3D
    profileImg.style.transform = `
      translateX(${perspectiveX}px)
      translateY(${perspectiveY}px)
      scale(1.05)
    `;
    
    // Programme la réinitialisation après 3 secondes
    mouseMoveTimeout = setTimeout(resetProfilePicture, resetDelay);
  });

  // Reset au survol
  profileWrapper.addEventListener('mouseleave', function() {
    profileWrapper.style.transform = 'translateY(-50px) rotateX(0) rotateY(0)';
    profileImg.style.transform = 'translateX(0) translateY(0) scale(1)';
  });
});




// Variables
let mouseX = window.innerWidth/2;
let mouseY = window.innerHeight/2;
const tiltSensitivity = 0.03; // Réglage subtil

// Détection de la carte centrale
function getCenterCard() {
  const cards = document.querySelectorAll('.carousel-item');
  let centerCard = null;
  let minDistance = Infinity;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width/2;
    const cardCenterY = rect.top + rect.height/2;
    const distanceToCenter = Math.abs(cardCenterX - window.innerWidth/2);

    if (distanceToCenter < minDistance) {
      minDistance = distanceToCenter;
      centerCard = card;
    }
  });

  return centerCard;
}

// Appliquer l'effet 3D
function updateCardTilt() {
  const centerCard = getCenterCard();
  if (!centerCard) return;

  // Calculer l'angle basé sur la position de la souris
  const cardRect = centerCard.getBoundingClientRect();
  const cardCenterX = cardRect.left + cardRect.width/2;
  const cardCenterY = cardRect.top + cardRect.height/2;
  
  const tiltX = (mouseY - cardCenterY) * tiltSensitivity;
  const tiltY = -(mouseX - cardCenterX) * tiltSensitivity;

  // Appliquer seulement à la carte centrale
  centerCard.style.transform = `
    translate(var(--x), var(--y))
    rotate(var(--rot))
    rotateX(${tiltX}deg)
    rotateY(${tiltY}deg)
    perspective(1000px)
  `;

  requestAnimationFrame(updateCardTilt);
}

// Écouter les mouvements de souris
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Démarrer l'animation
updateCardTilt();









// Désactive le drag sur les liens
document.querySelectorAll('.carousel-link').forEach(link => {
  link.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });
});







window.addEventListener('load', () => {
  // Force l'affichage initial
  $items.forEach(item => {
    item.style.opacity = 1;
    const img = item.querySelector('img');
    if (img) {
      img.style.opacity = 1;
      img.onerror = function() {
        this.style.display = 'none';
      };
    }
  });
  
  // Réinitialise le carrousel
  animate();
});






// Créez les particules flottantes
function createParticles() {
  const container = document.querySelector('.particles-container');
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Taille aléatoire entre 2px et 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Position aléatoire
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.bottom = `-10px`;
    
    // Animation avec durée et délai aléatoires
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 10;
    particle.style.animation = `float-up ${duration}s linear ${delay}s infinite`;
    
    container.appendChild(particle);
  }
}

// Lancez la création des particules au chargement
window.addEventListener('load', () => {
  createParticles();
  
  // Recréez les particules périodiquement pour varier les motifs
  setInterval(() => {
    document.querySelector('.particles-container').innerHTML = '';
    createParticles();
  }, 20000);
});




// Système d'onglets
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
    
    // Reset all
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Activate clicked
    button.classList.add('active');
    document.getElementById(tabId).classList.add('active');
    
    // Reset auto rotation
    resetAutoRotation();
  });
});
// Rotation automatique
let rotationInterval;
let rotationTimeout; // Nouvelle variable pour le délai
const tabs = ['about', 'project', 'contact'];
let currentTabIndex = 0;
const ROTATION_DELAY = 5000; // 5 secondes

function rotateTabs() {
  currentTabIndex = (currentTabIndex + 1) % tabs.length;
  const nextTab = tabs[currentTabIndex];
  
  changeTab(nextTab);
  
  // Déclenchement avec vérification
  setTimeout(() => {
    try {
      triggerShockwave();
    } catch (error) {
      console.warn("Animation non déclenchée:", error);
      // Solution de repli
      document.querySelectorAll('.social-icon').forEach(icon => {
        icon.classList.add('pulse');
        setTimeout(() => icon.classList.remove('pulse'), 1000);
      });
    }
  }, 100);
}

function changeTab(tabId) {
  // Désactivez tous les onglets
  tabContents.forEach(content => {
    content.classList.remove('active');
    content.style.opacity = '0';
  });
  
  // Activez le nouvel onglet avec animation
  const activeContent = document.getElementById(tabId);
  activeContent.classList.add('active');
  activeContent.style.opacity = '1';
  
  // Animez les boutons
  tabButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.style.transform = 'scale(1)';
  });
  
  document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
}

function resetRotationTimeout() {
  // Annuler le timeout existant
  if (rotationTimeout) {
    clearTimeout(rotationTimeout);
  }
  
  // Démarrer un nouveau timeout
  rotationTimeout = setTimeout(() => {
    rotateTabs();
  }, ROTATION_DELAY);
}

function startAutoRotation() {
  // Démarrer immédiatement le premier timeout
  resetRotationTimeout();
}

function resetAutoRotation() {
  // Annuler l'intervalle et le timeout
  if (rotationInterval) {
    clearInterval(rotationInterval);
  }
  if (rotationTimeout) {
    clearTimeout(rotationTimeout);
  }
  
  // Redémarrer le cycle
  startAutoRotation();
  
  // Mettre à jour l'index courant
  currentTabIndex = tabs.indexOf(
    document.querySelector('.tab-content.active').id
  );
}

// Modification des écouteurs d'événements des boutons
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const tabId = button.getAttribute('data-tab');
    changeTab(tabId);
    resetAutoRotation(); // Réinitialise complètement le timer
    triggerShockwave();
  });
});

// Démarrer la rotation au chargement
document.addEventListener('DOMContentLoaded', () => {
  startAutoRotation();
  
  // Pause au survol
  const infoSection = document.querySelector('.info-section');
  infoSection.addEventListener('mouseenter', () => {
    if (rotationTimeout) {
      clearTimeout(rotationTimeout);
    }
  });
  
  infoSection.addEventListener('mouseleave', () => {
    resetAutoRotation(); // Redémarre le timer quand la souris quitte
  });
});

if (IsMobile) {
    console.log("phone mode activated");
  }


// Animation au clic
document.querySelectorAll('.custom-social').forEach(link => {
  if (IsMobile) {
    return; // Sortie anticipée
  }
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const pulse = this.querySelector('.social-pulse');
    
    // Effet de clic
    pulse.style.transition = 'none';
    pulse.style.transform = 'scale(0)';
    pulse.style.opacity = '1';
    pulse.style.background = 'rgba(255, 255, 255, 0.6)';
    
    void pulse.offsetWidth; // Trigger reflow
    
    pulse.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.5)';
    pulse.style.transform = 'scale(2)';
    pulse.style.opacity = '0';
    
    // Ouvre le lien après l'animation
    setTimeout(() => {
      window.open(this.href, '_blank');
    }, 300);
  });
});



// Fonction de réinitialisation
function resetProfilePicture() {
  const profileWrapper = document.querySelector('.profile-picture-wrapper');
  const profileImg = document.querySelector('.hero-round');
  
  profileWrapper.style.transform = 'translateY(-50px) rotateX(0) rotateY(0)';
  profileImg.style.transform = 'translateX(0) translateY(0) scale(1)';
}

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', function() {
  // Déclenche une première réinitialisation
  resetProfilePicture();
  setupProfileReset();
});


function setupProfileReset() {
  let touchTimeout;
  
  document.addEventListener('touchmove', () => {
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(resetProfilePicture, resetDelay);
  });
}





function debugSocialStructure() {
  console.log("Structure des réseaux sociaux:");
  document.querySelectorAll('a[href*="linkedin"], a[href*="github"]').forEach(el => {
    console.log(el.outerHTML);
  });
}
debugSocialStructure();



function triggerShockwave() {
  // Sélection plus flexible
  const socialLinks = document.querySelectorAll('a[href*="linkedin"], a[href*="github"]');
  
  socialLinks.forEach(link => {
    // Crée l'effet visuel
    const effect = document.createElement('div');
    effect.className = 'social-effect';
    
    // Style dynamique
    if (link.href.includes('linkedin')) {
      effect.style.borderColor = 'rgba(200, 200, 200, 0.5)';
    } else {
      effect.style.borderColor = 'rgba(200, 200, 200, 0.5)';
    }
    
    // Insertion et nettoyage
    link.appendChild(effect);
    setTimeout(() => effect.remove(), 800);
  });
}






// Effet de clic amélioré
document.querySelectorAll('.tab-btn').forEach(button => {
  button.addEventListener('click', function(e) {
    // Création de l'effet de vague
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    
    // Positionnement
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size/2}px`;
    ripple.style.top = `${e.clientY - rect.top - size/2}px`;
    
    // Ajout au DOM
    this.appendChild(ripple);
    
    // Suppression après animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Animation du bouton parent
    this.classList.add('active-click');
    setTimeout(() => {
      this.classList.remove('active-click');
    }, 300);
  });
});






// Animation au survol
document.addEventListener('mousemove', (e) => {
  if (IsMobile) {
    return;
  }
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;
  
  document.querySelector('.left-galaxy').style.background = 
    `radial-gradient(ellipse at ${x * 50}% ${y * 50}%, 
     rgba(138, 43, 226, 0.3) 0%, 
     rgba(0, 0, 0, 0) 70%)`;
  
  document.querySelector('.right-galaxy').style.background = 
    `radial-gradient(ellipse at ${100 - x * 50}% ${y * 50}%, 
     rgba(75, 0, 130, 0.3) 0%, 
     rgba(0, 0, 0, 0) 70%)`;
});

// Initialisation
window.addEventListener('load', () => {
  createStars();
});




/* Ajoutez ce JS */
function createNebulas() {
  const colors = ['#9c27b0', '#3f51b5', '#2196f3'];
  const container = document.querySelector('.galaxy-edges');
  
  colors.forEach((color, i) => {
    const nebula = document.createElement('div');
    nebula.className = 'nebula';
    nebula.style.background = color;
    nebula.style.left = `${i * 30}%`;
    nebula.style.top = `${Math.random() * 100}%`;
    nebula.style.animationDuration = `${20 + Math.random() * 40}s`;
    container.appendChild(nebula);
  });
}




window.addEventListener('load', () => {
  createStars();
  createNebulas();
  
  // Interaction profonde
  document.body.addEventListener('mousemove', (e) => {
    const stars = document.querySelectorAll('.particle-star');
    stars.forEach(star => {
      const dist = distance(e, star);
      if (dist < 100) {
        star.style.transform = `scale(${2 - dist/100})`;
      }
    });
  });
});

function distance(e, element) {
  const rect = element.getBoundingClientRect();
  return Math.sqrt(
    Math.pow(e.clientX - (rect.left + rect.width/2), 2) + 
    Math.pow(e.clientY - (rect.top + rect.height/2), 2)
  );
}





// Configuration
const STAR_COUNT = IsMobile ? 150 : 50;
const MOUSE_RADIUS = 150;
const CENTER_AVOIDANCE = 0.8; // 0-1 (1 = pas d'étoiles au centre)

// État global
const stars = [];
let mouseX2 = window.innerWidth / 2;
let mouseY2 = window.innerHeight / 2;

// Création des étoiles (plus denses sur les bords)
function createStars() {
  const container = document.querySelector('.stars-container');
  container.innerHTML = '';

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Taille et couleur aléatoire
    const sizes = ['tiny', 'small', 'medium'];
    const colors = ['blue', 'purple', 'white'];
    star.classList.add(
      sizes[Math.floor(Math.random() * sizes.length)],
      colors[Math.floor(Math.random() * colors.length)]
    );
    
    // Position initiale - biais vers les bords
    const edgeFactor = Math.pow(Math.random(), 2); // Valeur entre 0-1 biaisée vers 0
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
}

// Animation des étoiles avec traînée
function animateStars() {
  stars.forEach(star => {
    // Calcul distance à la souris
    const dx = mouseX2 - star.x;
    const dy = mouseY2 - star.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Force de répulsion
    if (distance < MOUSE_RADIUS) {
      const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
      const angle = Math.atan2(dy, dx);
      
      star.vx = -Math.cos(angle) * force * 20;
      star.vy = -Math.sin(angle) * force * 20;
    } else {
      // Retour vers position de base
      star.vx += (star.baseX - star.x) * 0.02;
      star.vy += (star.baseY - star.y) * 0.02;
      
      // Limite la vitesse
      star.vx *= 0.9;
      star.vy *= 0.9;
    }
    if (IsMobile) {
      return; // Sortie anticipée
    }
    
    // Mise à jour position
    star.x += star.vx;
    star.y += star.vy;
    
    // Application visuelle
    star.style.left = `${star.x}px`;
    star.style.top = `${star.y}px`;
    
    // Activation traînée si mouvement
    const isMoving = Math.abs(star.vx) > 0.1 || Math.abs(star.vy) > 0.1;
    star.classList.toggle('moving', isMoving);
    
    // Ajustement opacité traînée selon vitesse
    const speed = Math.sqrt(star.vx * star.vx + star.vy * star.vy);
    star.style.setProperty('--trail-opacity', Math.min(speed * 0.05, 0.4));
  });
  
  requestAnimationFrame(animateStars);
}

// Écouteurs
document.addEventListener('mousemove', (e) => {
  mouseX2 = e.clientX;
  mouseY2 = e.clientY;
});

window.addEventListener('resize', createStars);

// Initialisation
window.addEventListener('load', () => {
  createStars();
  animateStars();
});










// Effet de rebond lors du clic sur une carte
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 10
    animate()
    
    // Animation de rebond
    item.style.transform = `translate(var(--x), var(--y)) rotate(var(--rot)) scale(0.95)`
    setTimeout(() => {
      item.style.transform = `translate(var(--x), var(--y)) rotate(var(--rot)) scale(1.05)`
    }, 100)
  })
})

// Effet de parallaxe au survol
$items.forEach(item => {
    if (IsMobile) {
    return; // Sortie anticipée
  }
  item.addEventListener('mousemove', (e) => {
    if(!item.classList.contains('active-center')) return;
    
    const rect = item.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const angleX = (y - centerY) / 20
    const angleY = (centerX - x) / 20
    
    item.querySelector('.carousel-box').style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(20px)`
  })
  
  item.addEventListener('mouseleave', () => {
    item.querySelector('.carousel-box').style.transform = 'translateZ(20px)'
  })
})






// Effet de particules sur la carte active
function createActiveParticles() {
  const activeItem = document.querySelector('.carousel-item.active-center');
  if (!activeItem) return;

  // Supprime les anciennes particules
  const oldParticles = activeItem.querySelectorAll('.active-particle');
  oldParticles.forEach(p => p.remove());

  // Crée de nouvelles particules (seulement sur desktop)
  if (window.innerWidth > 768) {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div'); // Déclaré avec const
      particle.classList.add('active-particle');
      
      // Configuration de la particule
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      const size = Math.random() * 6 + 3;
      const duration = Math.random() * 3 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Utilisez une des animations prédéfinies
      const animations = ['floatParticle1', 'floatParticle2', 'floatParticle3'];
      particle.style.animation = `${animations[Math.floor(Math.random() * animations.length)]} ${duration}s linear infinite`;
      
      activeItem.appendChild(particle);
    }
  }
}

// Appel régulier pour rafraîchir les particules
setInterval(createActiveParticles, 3000)




window.addEventListener('resize', () => {
  const heightRatio = window.innerHeight / 100;
  $items.forEach(item => {
    item.style.setProperty('--width', `${heightRatio * 30}px`);
    item.style.setProperty('--height', `${heightRatio * 40}px`);
  });
});


if (IsMobile) {
  $items.forEach(item => {
    item.style.setProperty('--width', '80vh');
    item.style.setProperty('--height', '60vh');
  });
}