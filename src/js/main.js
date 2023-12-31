// slider
new Swiper('.hero-swiper', {
  navigation: {
    nextEl: '.hero-swiper-button-next',
    prevEl: '.hero-swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
});

new Swiper('.reviews-swiper', {
  navigation: {
    nextEl: '.reviews-swiper-button-next',
    prevEl: '.reviews-swiper-button-prev',
  },
  spaceBetween: 24,
  breakpoints: {
    320: {
      slidesPerView: 'auto',
    },
    1351: {
      slidesPerView: 2,
    },
  }
});

new Swiper('.lawyers-swiper', {
  spaceBetween: 24,
  breakpoints: {
    320: {
      slidesPerView: 'auto',
    },
    1351: {
      slidesPerView: 4,
    },
  }
});

new Swiper('.materials-swiper', {
  spaceBetween: 24,
  breakpoints: {
    320: {
      slidesPerView: 'auto',
    },
    1351: {
      slidesPerView: 3,
    },
  }
});

const slider = document.querySelector('.services-swiper');
const mediaQuery = window.matchMedia('(max-width:726px)');
let mySwiper;

function mobileSlider(e) {
  if (e && slider.dataset.mobile == 'false') {
    mySwiper = new Swiper(slider, {
      slidesPerView: 'auto',
      spaceBetween: 24,
      keyboard: true
    });

    slider.dataset.mobile = 'true';
  } else {
    slider.dataset.mobile = 'false';
    if (slider.classList.contains('swiper-initialized')) {
      mySwiper.destroy();
    }
  }
}

if (slider) {
  mobileSlider(mediaQuery.matches);
  mediaQuery.addEventListener('change', function(e) {
    mobileSlider(e.matches);
  });
}

// burger-menu
let burger = document.querySelector('.burger');
let menu = document.querySelector('.header-nav');
let menuLink = document.querySelectorAll('.nav-link');

burger.addEventListener('click', () => {
  burger.classList.toggle('burger--active');
  menu.classList.toggle('header-nav--active');
  document.body.classList.toggle('stop-scroll');
});

menuLink.forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('burger--active');
    menu.classList.remove('header-nav--active');
    document.body.classList.remove('stop-scroll');
  });
});

document.addEventListener('click', (el) => {
  const target = el.target;
  const itsMenu = target == menu || menu.contains(target);
  const itsBurger = target == burger || burger.contains(target);
  if (!itsMenu && !itsBurger && menu.classList.contains('header-nav--active')) {
    burger.classList.remove('burger--active');
    menu.classList.remove('header-nav--active');
    document.body.classList.remove('stop-scroll');
  }
});

// mask
const inputPhone = document.querySelector('input[type="tel"]');
const mask = new IMask(inputPhone, {
  mask: '+{7} (000) 000-00-00',
});

// modal window
const orderCall = document.querySelector('.order-call');
const modal = document.querySelector('.modal');
const modalBody = document.querySelector('.modal-body');
const modalClose = document.querySelector('.modal-close');
const modalBtn = document.querySelector('.modal-form-btn');
const body = document.body;
const inputName = document.querySelector('input[name="name"]');

orderCall.addEventListener('click', (btn) => {
  mask.updateValue();
  modal.classList.add('modal-open');
  body.classList.add('stop-scroll');
  setTimeout(() => {
    inputName.focus();
  }, 500);
});

modal.addEventListener('click', (el) => {
  const target = el.target;
  const itsModalBody = target == modalBody || modalBody.contains(target);
  const itsModalClose = target == modalClose || modalClose.contains(target);
  const itsModalBtn = target == modalBtn;

  if ((itsModalClose && modal.classList.contains('modal-open')) ||
    (!itsModalBody && modal.classList.contains('modal-open')) ||
    (itsModalBtn && modal.classList.contains('modal-open'))) {
    modal.classList.remove('modal-open');
    body.classList.remove('stop-scroll');
    inputPhone.value = '';
    inputName.value = '';
  }
});
