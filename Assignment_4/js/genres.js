const slidesData = [
  {
    title: 'SCI-FI',
    image: 'https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/capsule_616x353.jpg',
    sectionId: '#sci-fi-section'
  },
  {
    title: 'ACTION',
    image: 'https://upload.wikimedia.org/wikipedia/en/2/2a/Ghost_of_Tsushima.jpg',
    sectionId: '#action-section'
  },
  {
    title: 'ADVENTURE',
    image: 'https://cdn1.epicgames.com/offer/9b8d181f6e2b467caf5ebd6c355c4f3e/EGS_UNCHARTEDLegacyOfThievesCollection_NaughtyDog_S1_2560x1440-1b3e01c3aa754f86ecdbdf46bb2a2b0a',
    sectionId: '#adventure-section'
  },
  {
    title: 'HORROR',
    image: 'https://bethelbearfacts.com/wp-content/uploads/2023/12/06-fnf-dm-mobile-banner-1080x745-n-kr-f01-101923-653b04bb19230-1.jpeg',
    sectionId: '#horror-section'
  },
  {
    title: 'RACING',
    image: 'https://www.godisageek.com/wp-content/uploads/forza-horizon-4-1024x576.jpg',
    sectionId: '#racing-section'
  }
];

const container = document.getElementById('slides-container');
const indicators = document.getElementById('indicators');
let currentIndex = 0;

// Create slides
slidesData.forEach((slide, index) => {
  const slideDiv = document.createElement('div');
  slideDiv.className = 'slide';
  slideDiv.style.backgroundImage = `url(${slide.image})`;

  const content = document.createElement('div');
  content.className = 'slide-content';

  const title = document.createElement('h2');
  title.textContent = slide.title;

  const btn = document.createElement('button');
  btn.textContent = 'MORE INFO';
  btn.onclick = () => {
    if (document.querySelector(slide.sectionId)) {
      document.querySelector(slide.sectionId).scrollIntoView({ behavior: 'smooth' });
    }
  };

  content.appendChild(title);
  content.appendChild(btn);
  slideDiv.appendChild(content);
  container.appendChild(slideDiv);

  // Indicator button
  const dot = document.createElement('button');
  dot.addEventListener('click', () => goToSlide(index));
  indicators.appendChild(dot);
});

function updateCarousel() {
  container.style.transform = `translateX(-${currentIndex * 100}%)`;

  const dots = indicators.querySelectorAll('button');
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[currentIndex]) {
    dots[currentIndex].classList.add('active');
  }
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slidesData.length;
  updateCarousel();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slidesData.length) % slidesData.length;
  updateCarousel();
}

document.getElementById('next').addEventListener('click', nextSlide);
document.getElementById('prev').addEventListener('click', prevSlide);

// Auto-slide
setInterval(nextSlide, 5000);

updateCarousel();
