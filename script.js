/* ══════════════════════════════════════════
   CONFIGURAÇÃO DAS FOTOS
══════════════════════════════════════════ */
const PHOTOS = [
  'img/photo1.jpg',
  'img/photo2.jpg',
  'img/photo3.jpg',
  'img/photo4.jpg',
  'img/photo5.jpg',
  'img/photo6.jpg',
  'img/photo7.jpg',
  'img/photo8.jpg',
  'img/photo9.jpg'
];

const SLIDE_INTERVAL = 4000;

/* ══════════════════════════════════════════
   PÉTALAS (Criadas dinamicamente)
══════════════════════════════════════════ */
function createPetals() {
  const container = document.getElementById('petals');
  const symbols = ['✿', '❀', '♥', '❋', '✾'];
  const colors  = ['#c0395a', '#e05070', '#9b3050', '#f08090', '#d06070'];

  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = symbols[i % symbols.length];
    el.style.cssText = [
      `left: ${Math.random() * 100}vw`,
      `font-size: ${13 + Math.random() * 16}px`,
      `color: ${colors[i % colors.length]}`,
      `animation-duration: ${7 + Math.random() * 12}s`,
      `animation-delay: ${Math.random() * 14}s`,
      `opacity: ${0.4 + Math.random() * 0.4}`,
    ].join(';');
    container.appendChild(el);
  }
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* ══════════════════════════════════════════
   SLIDESHOW
══════════════════════════════════════════ */
let currentSlide = 0;
let autoTimer    = null;

function buildSlides() {
  const wrap  = document.getElementById('slides-wrap');
  const dotsEl = document.getElementById('dots');

  PHOTOS.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'slide';
    div.id = `slide-${i}`;
    const img = document.createElement('img');
    img.src = src;
    img.alt = `nossa foto ${i + 1}`;
    div.appendChild(img);
    wrap.appendChild(div);

    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });
}

function showSlide(n) {
  document.querySelectorAll('.slide').forEach(s => s.classList.remove('visible'));
  document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));

  const slide = document.getElementById(`slide-${n}`);
  const dots  = document.querySelectorAll('.dot');

  if (slide)   slide.classList.add('visible');
  if (dots[n]) dots[n].classList.add('active');

  currentSlide = n;
}

function goTo(n) {
  clearTimeout(autoTimer);

  if (n >= PHOTOS.length) {
    showScreen('screen-final');
    return;
  }
  
  if (n < 0) n = PHOTOS.length - 1;

  showSlide(n);
  autoTimer = setTimeout(() => goTo(currentSlide + 1), SLIDE_INTERVAL);
}

/* ══════════════════════════════════════════
   INICIALIZAÇÃO & EVENTOS
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  createPetals();
  buildSlides();

  const bgMusic = document.getElementById('bg-music');
  if (bgMusic) {
      bgMusic.volume = 0.6; // Volume perfeito para ser de fundo
  }

  // Clicou no botão iniciar (Toca a música!)
  document.getElementById('btn-start').addEventListener('click', () => {
    if(bgMusic) {
        bgMusic.load(); // Garante o carregamento
        bgMusic.play().catch(e => console.log("Erro ao tocar áudio.", e));
    }
    showScreen('screen-poem');
  });

  document.getElementById('btn-photos').addEventListener('click', () => {
    showScreen('screen-slides');
    goTo(0);
  });

  document.getElementById('btn-prev').addEventListener('click', () => {
    goTo(currentSlide - 1);
  });
  document.getElementById('btn-next').addEventListener('click', () => {
    goTo(currentSlide + 1);
  });

  // TELA FINAL -> REINICIAR DO COMEÇO
  document.getElementById('btn-restart').addEventListener('click', () => {
    showScreen('screen-intro');
    clearTimeout(autoTimer);
    // As linhas que pausavam a música foram removidas! A música continua tocando.
  });

  // Arrastar pelo celular
  let touchStartX = 0;
  document.getElementById('screen-slides').addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  document.getElementById('screen-slides').addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goTo(currentSlide + 1) : goTo(currentSlide - 1);
    }
  }, { passive: true });
});