'use strict';

///////////////////////////////////////
//LECTURES
//gia na kanoyme select olo to document
// console.log(document.documentElement);
// console.log(document.body);
// console.log(document.head);
// const allSections = document.querySelectorAll('.section');
// const allbtns = document.getElementsByTagName('button');

//CREATING,INSTERTINg, DELETING COOKIE MESSAGE
// const footer = document.querySelector('footer');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML =
//   '<p>We use cookies for improved functionality and analytics.</p><button class="btn--text btn--close--cookie">Allow</button>';
// footer.after(message);
// //removing element after click
// document.querySelector('.btn--close--cookie').addEventListener('click', () => {
//   message.remove();
// });

//STYLING THE ELEMENT OF COOKIE MESSAGE
// message.style.padding = '20px';
// message.style.backgroundColor = 'bisque';
// message.style.color = 'black';
// console.log(getComputedStyle(message)); //to see (readOnly) the attributes and values of the css.

//if we have premade some css variables and set some elements to a specific variable,the way below sets a new value of our liking.
// document.documentElement.style.setProperty('--color-primary', 'red');

//SELECTING ATTRIBUTES OF AN ELEMENT

// const logo = document.querySelector('.nav__logo');
//it will exist after we declare it but again will be undefined
// logo.setAttribute('company', 'bankist');
// console.log(logo.getAttribute('company'));

//DATA ATTRIBUTES
// const DataNum = logo.dataset.versionNumber;
// Number(DataNum).toFixed(2, 0);

//listen to  more Events with another way
//mouseOver
// const h1 = document.querySelector('h1');

// const alertH1 = function (e) {
//   alert('you are reading the heading');

//   h1.removeEventListener('mouseover', alertH1);
// };
// h1.addEventListener('mouseover', alertH1);

//random color
// const randomColor = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColors = () =>
//   `rgb(${randomColor(0, 255)},${randomColor(0, 255)},${randomColor(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColors();
//   console.log(e.target);
//   console.log(e.currentTarget);
//   e.stopPropagation
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColors();
//   console.log(e.target);
//   console.log(e.currentTarget);
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColors();
//   console.log(e.target);
//   console.log(e.currentTarget);
// });

//DOM TRAVERSING
// const h1 = document.querySelector('h1');
// //going downwards :selecting child elements
// console.log(h1.querySelectorAll('.highlight'))

/////////END OF LECTURES////////////////////////////

//WEBSITE OF BANKINST
// Modal window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const instantTransfersTab = document.querySelector('.operations__tab--1');
const instantLoansTab = document.querySelector('.operations__tab--2');
const instantClosingTab = document.querySelector('.operations__tab--3');
const operationsHeader = document.querySelector('.operations__header');
const navContainer = document.querySelector('.nav');
const GoToApp = document.getElementById('go-to-app-page');
const tabs = document.querySelectorAll('.operations__tab'); //parent componenet
const tabsContainer = document.querySelector('.operations__tab-container'); //children
const tabsContent = document.querySelectorAll('.operations__content'); //siblings;

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
//for each call to action button open the modal to create account.
btnsOpenModal.forEach((btn, i) => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//TABBED COMPONENTS

tabsContainer.addEventListener('click', e => {
  const Btnclicked = e.target.closest('.operations__tab'); //shows us the specific element which was clicked

  //Guard clause
  if (!Btnclicked) return;

  //removing the active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  //activate tab
  Btnclicked.classList.add('operations__tab--active');
  //if the operations content tab value is the same with opeations content active
  //then show the content of operations content

  document
    .querySelector(`.operations__content--${Btnclicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//TOP NAVIGATIONS FADE ALL LINKS BUT ONE ON HOVER
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
navContainer.addEventListener('mouseover', handleHover.bind(0.5));
navContainer.addEventListener('mouseout', handleHover.bind(1));

//sticky navigation header bar
const header = document.querySelector('.header');
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    navContainer.classList.add('sticky');
  } else {
    navContainer.classList.remove('sticky');
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});
headerObserver.observe(header);

//REVEALING SECTIONS WHEN WE SCROLL CLOSE TO THEM
const allSections = document.querySelectorAll('.section');
const sectionReveal = function (entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove('section--hidden');
  }
};
const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//REMOVING THE BLUR FROM THE IMAGE OF EVERY SECTION

const images = document.querySelectorAll('img[data-src]');
const revealImages = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  //Replace the src attribute with data--src
  entry.target.src = entry.target.dataset.src;
  //remove blur
  entry.target.classList.remove('lazy-img');

  entry.target.addEventListener('load', function () {});
};

const imageObserver = new IntersectionObserver(revealImages, {
  root: null,
  threshhold: 0.2,
});

images.forEach(img => {
  imageObserver.observe(img);
  img.classList.add('lazy-img');
});
///////////////////////////////////////
// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
// /CREATING,INSERTING, DELETING COOKIE MESSAGE
const footer = document.querySelector('footer');
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  '<p>We use cookies for improved functionality and analytics.</p><button class="btn--text btn--close--cookie">Allow</button>';
footer.after(message);
//removing element after click
document.querySelector('.btn--close--cookie').addEventListener('click', () => {
  message.remove();
});

// STYLING THE ELEMENT OF COOKIE MESSAGE
message.style.padding = '20px';
message.style.backgroundColor = 'bisque';
message.style.color = 'black';
// console.log(getComputedStyle(message)); //to see (readOnly) the attributes and values of the css.
