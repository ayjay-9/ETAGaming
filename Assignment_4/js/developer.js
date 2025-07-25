const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('show');
  hamburger.classList.toggle('active');
});

const toggledStates = {
  austine: false,
  emmanuel: false,
  thiago: false
};

window.changeCardContent = function (character) {
  const card = document.getElementById(`${character}-card`);
  const image = card.querySelector('img');
  const paragraph = card.querySelector('p');

  if (!toggledStates[character]) {
    if (character === 'austine') {
      image.src = '/images/developers/austine/austin-yasuo.png';
      paragraph.textContent = 'Austine loves the art of games. Since childhood, playing was a joy from his heart, and now the time is joyful like a night in the winds. He is skilled and praises his games, for giving joy that can be seen like the shaping of the world.';
    } else if (character === 'emmanuel') {
      image.src = '/images/developers/emmanuel/emmanuel-player.png';
      paragraph.textContent = 'Emmanuel has always been passionate about games, with a special love for sports. From a young age in Nigeria, he found joy and excitement on the playing field, whether it was football, basketball, or athletics. Sports fuel his competitive spirit and bring people together, inspiring him to push his limits and foster teamwork wherever he plays.';
    } else if (character === 'thiago') {
      image.src = '/images/developers/thiago/thiago-mage.png';
      paragraph.textContent = 'Thiago is deeply passionate about games, with a special love for role-playing games (RPGs). He enjoys immersing himself in rich stories and complex worlds where imagination and strategy come alive. For Thiago, RPGs are more than just games—they’re a way to explore different characters, build friendships, and experience epic adventures beyond the ordinary.';
    }
  } else {
    if (character === 'austine') {
      image.src = '/images/developers/austine/austin.jpeg';
      paragraph.textContent = 'A man born in the land of Eldamar. He is a dreamer and a beloved from the depths of the heart. His coming was in a bright moment, like stars shining. He is a brave and faithful man, who leaves the good to seek love in all darkness.';
    } else if (character === 'emmanuel') {
      image.src = '/images/developers/emmanuel/emmanuel.jpeg';
      paragraph.textContent = 'Emmanuel is a young man from Nigeria, known for his warm spirit and strong determination. Growing up surrounded by vibrant culture and rich traditions, he carries with him a deep sense of pride and resilience. Passionate about learning and connecting with others, Emmanuel strives to make a positive impact wherever he goes.';
    } else if (character === 'thiago') {
      image.src = '/images/developers/thiago/thiago.jpeg';
      paragraph.textContent = 'Thiago is a vibrant young man from Brazil, full of energy and creativity. Growing up amidst Brazil’s lively culture and beautiful landscapes, he developed a deep appreciation for music, football, and community. With a warm heart and a curious mind, Thiago embraces life with enthusiasm and a passion for new experiences';
    }
  }

  toggledStates[character] = !toggledStates[character];
}
//---------------------------------------------------------------------------------------------------------------------