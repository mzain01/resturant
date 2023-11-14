'use strict';

const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
});

const addEventOnElement = function (elements, eventType, callback) {
    if (!elements) return;

    if (!elements.length) {
        elements = [elements];
    }

    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
};

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function() {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
};

addEventOnElement(navTogglers, "click", toggleNavbar);


const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;
const hideHeader = function(){    
    const isScrollBottom = lastScrollPos < window.scrollY;
    if(isScrollBottom){
        header.classList.add("hide");
    }
    else{
        header.classList.remove("hide");
    }
    
    lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function(){
    if (window.scrollY >= 50){
        header.classList.add("active");
        backTopBtn.classList.add("active");
        hideHeader();
    }
    else{
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
})


const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];
const updateSlidePos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSlidePos();
};
heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSlidePos();
};
heroSliderPrevBtn.addEventListener("click", slidePrev);

let autoslideInterval;
const autoSlide = function () {
  autoslideInterval = setInterval(function () {
    slideNext();
  }, 7000);
};

[heroSliderNextBtn, heroSliderPrevBtn].forEach((btn) => {
  btn.addEventListener("mouseover", function () {
    clearInterval(autoslideInterval);
  });
  btn.addEventListener("mouseout", autoSlide);
});

window.addEventListener("load", autoSlide);


const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;

window.addEventListener("mousemove", function(event) {
  x = (event.clientX / window.innerWidth) * 10 - 5;
  y = (event.clientY / window.innerHeight) * 10 - 5;

  x = x - x * 2;
  y = y - y * 2;

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    const speed = Number(parallaxItems[i].dataset.parallaxSpeed);
    const translateX = x * speed;
    const translateY = y * speed;
    parallaxItems[i].style.transform = `translate3d(${translateX}px, ${translateY}px, 0px)`;
  }
});





