// import Swiper JS
import Swiper, { Navigation, Pagination } from 'swiper';

// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  slidesPerGroup: 3,
  //setWrapperSize: true,
  //virtualTranslate: true,
  //slidesPerGroupSkip: 2,
  centeredSlides: true,
  centeredSlidesBounds: true,
  loop: true,
  //loopFillGroupWithBlank: true,
  //loopedSlides: 5, 
  //loopFillGroupWithBlank: true,
  //resistanceRatio: 1,
  //watchSlidesProgress: true,
  //slidesOffsetBefore: 16,
  //slidesOffsetAfter: 300,
  //centerInsufficientSlides: true,
  //freeMode: true,
  //width: 1440,
  //height: 288,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
  navigation: {
    //nextEl: '.swiper-button-next',
    //prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next-custom',
    prevEl: '.swiper-button-prev-custom',
  },
  breakpoints: {
    1024: {
      centeredSlides: true,
      centeredSlidesBounds: true,
      slidesOffsetBefore: 0,
      spaceBetween: 16,
      loop: true,
      slidesPerGroup: 3,
    },
    
		768: {
      centeredSlides: false,
      centeredSlidesBounds: false,
      slidesOffsetBefore: 40,
      spaceBetween: 8,
      loop: false,
      slidesPerGroup: 2,
		},
		320: {
      slidesPerView: 'auto',
      slidesOffsetBefore: 16,
      spaceBetween: 8,
      slidesPerGroup: 1,
      loop: false,
      centeredSlides: false,
      centeredSlidesBounds: false,
    }
  }
})
