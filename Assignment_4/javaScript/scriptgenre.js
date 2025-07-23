// const observer = new IntersectionObserver((entries)  => {
//     entries.forEach((entry) => {
//         console.log(entry)
//         if (entry.isIntersecting) {
//             entry.target.classList.add('show');
//         } else {
//             entry.target.classList.remove('show');
//         }
//     });
// });

// const hiddenElements = document.querySelectorAll('.hidden-information')
// hiddenElements.forEach((el) => observer.observe(el));
// ------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {

  const elements = document.querySelectorAll('.hidden-information, .hidden-right, .hidden-information2, .hidden');

  window.addEventListener('scroll', () => {
    elements.forEach(el => {
      // To get the position of the element on top
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // If the top is at 2/3 from the windon it appears
      if (elementTop < windowHeight * 0.66) {
        // To add a class which make the element visible
        el.classList.add('visible');
      } else {
        // To remove the class to have the same effect again
        el.classList.remove('visible');
      }
    });
  });
  window.dispatchEvent(new Event('scroll'));
});
//----------------------------------------------------------------------------
//Line to create the carousel 
const carousels = document.querySelectorAll('.adventure-gamecard, .simulation-gamecard, .rpg-gamecard, .sports-gamecard, .horror-gamecard, .strategy-gamecard');

carousels.forEach(carousel => {
    // to duplicate the children and give the effect of an inifinity carousel
    const originalItems = Array.from(carousel.children);
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      carousel.appendChild(clone);
    });

    let scrollAmount = 1;
    let scrolling;

    function startScrolling() {
      scrolling = setInterval(() => {
        carousel.scrollLeft += scrollAmount;

        //When it gets to half it means that go back to the beginning
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        }
      }, 20);
    }

    function stopScrolling() {
      clearInterval(scrolling);
    }

    startScrolling();
    carousel.addEventListener('mouseenter', stopScrolling);
    carousel.addEventListener('mouseleave', startScrolling);
  });

function cloneCarouselItems(carousel) {
  const items = carousel.innerHTML;
  carousel.innerHTML += items; //to duplicate the elements
}