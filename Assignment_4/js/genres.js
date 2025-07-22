const slidesData = [
  {
    title: 'SCI-FI',
    image: '../images/callofduty.jpg',
    sectionId: '#sci-fi-section'
  },
  {
    title: 'ACTION',
    image: '../images/Batman.webp',
    sectionId: '#action-section'
  },
  {
    title: 'ADVENTURE',
    image: '../images/zelda.jpg',
    sectionId: '#adventure-section'
  },
  {
    title: 'HORROR',
    image: '../images/freddy.jpeg',
    sectionId: '#horror-section'
  },
  {
    title: 'RACING',
    image: '../images/forza.jpg',
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

// Auto-scroll mini galleries (optional and simple)
document.querySelectorAll('.gallery-track').forEach(track => {
  const images = track.querySelectorAll('img');
  let index = 0;

  setInterval(() => {
    index = (index + 1) % images.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  }, 3000); // 3 seconds per image
});




// Auto-slide
setInterval(nextSlide, 5000);

updateCarousel();
