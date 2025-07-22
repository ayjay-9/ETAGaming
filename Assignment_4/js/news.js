document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  const carousel = document.querySelector('.carousel'); // get the whole carousel container
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  let currentIndex = 0;
  const totalSlides = slides.length;



  hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      hamburger.classList.toggle('active');
  });

  function updateSlides() {
    slides.forEach((slide, i) => {
      slide.className = 'slide'; // Reset classes

      let pos = (i - currentIndex + totalSlides) % totalSlides;

      if (pos === 0) slide.classList.add('active');
      else if (pos === 1) slide.classList.add('right');
      else if (pos === 2) slide.classList.add('far-right');
      else if (pos === totalSlides - 1) slide.classList.add('left');
      else if (pos === totalSlides - 2) slide.classList.add('far-left');
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlides();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlides();
  }

  rightArrow.addEventListener('click', nextSlide);
  leftArrow.addEventListener('click', prevSlide);

  // Start autoplay
  let autoPlay = setInterval(nextSlide, 3000);

  // Pause on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoPlay);
  });

  // Resume on leave
  carousel.addEventListener('mouseleave', () => {
    autoPlay = setInterval(nextSlide, 3000);
  });

  // Initialize
  updateSlides();
});
