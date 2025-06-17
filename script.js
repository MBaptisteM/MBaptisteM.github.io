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
    // Reset les transformations au changement de carte active
    if(index === active) {
      item.style.transform = `translate(var(--x), var(--y)) rotate(var(--rot)) scale(1)`
      item.querySelector('.carousel-box').style.transform = 'none'
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
        document.body.style.overflow = 'auto'; // Permet le défilement par défaut
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





document.addEventListener('DOMContentLoaded', function() {
  const profileWrapper = document.querySelector('.profile-picture-wrapper');
  const profileImg = document.querySelector('.hero-round');
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const maxTilt = 20; // Degrés maximum d'inclinaison
  const maxPerspective = 8; // Effet de perspective maximum (px)

  document.addEventListener('mousemove', function(e) {
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