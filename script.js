'use strict';

const btnScrollTo = document.querySelector('.btn-scroll-to');
const section1 = document.querySelector('#about-me');
const tabs = document.querySelectorAll('.projects-tab');
const tabsContainer = document.querySelector('.projects-tab-container');
const tabsContent = document.querySelectorAll('.projects-content');
const nav = document.querySelector('.nav')

btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({behavior:'smooth'}) 
});

document.querySelector('.nav-links').addEventListener('click', function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav-link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  }
})

tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.projects-tab');

  if(!clicked) return;

  tabs.forEach(t => t.classList.remove('projects-tab-active'))
  tabsContent.forEach(c => c.classList.remove('projects-content-active'))
  
  clicked.classList.add('projects-tab-active');
  
  document.querySelector(`.projects-content-${clicked.dataset.tab}`).classList.add('projects-content-active')
})

const handleHover = function(e){
  if(e.target.classList.contains('nav-link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav-link');

    siblings.forEach(el => {
      if(el !== link) el.style.opacity = this;
    })
  }
}

nav.addEventListener('mouseover', handleHover.bind(0.7));
nav.addEventListener('mouseout', handleHover.bind(1));

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section-hidden');
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
})

const imgTargets = document.querySelectorAll('img[data-src]');

imgTargets.forEach(img=> imgObserver.observe(img));


const slider = function() {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider-btn-left');
  const btnRight = document.querySelector('.slider-btn-right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots-dot')
      .forEach(dot => dot.classList.remove('dots-dot-active'));

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add('dots-dot-active');
  };

  const goToSlide = function(slide){
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`) 
  }


  const nextSlide = function(){
    if(curSlide === maxSlide -1){
      curSlide = 0;
    } else {
      curSlide++
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide = function(){
    if(curSlide === 0){
      curSlide = maxSlide -1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide)
    activateDot(curSlide);
  }

  const init = function(){
    goToSlide(0)
    createDots()
    activateDot(0)
  }
  init();
 
  btnRight.addEventListener('click', nextSlide)
  btnLeft.addEventListener('click', prevSlide)

  document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  })

  dotContainer.addEventListener('click', function(e){
    if(e.target.classList.contains('dots-dot')){
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);

    }
  })
}
slider();


  
AOS.init({
  delay: 200,
  duration: 1500,
  once: false,
  mirror: false,
});