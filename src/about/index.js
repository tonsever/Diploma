import "../vendor/normalize.css";
import "../pages/index.css";
import "swiper/swiper-bundle.css";
import Swiper, { Navigation, Pagination } from 'swiper';
import { config } from '../js/constants/config.js';
import { GithubApi } from '../js/modules/GithubApi.js';
import { prettysDate } from '../js/utils/prettysDate.js';
import { CommitCard } from '../js/components/CommitCard.js';
import { CommitCardList } from '../js/components/CommitCardList.js';

const сommits = document.querySelector('.swiper-wrapper');

const createCard = function (link, img, date, name, message, email) {
  return new CommitCard(link, img, date, name, message, email).createCard();
};

const githubApi = new GithubApi(config);
const сommitList = new CommitCardList(сommits, createCard, prettysDate);


// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

const swiper = new Swiper('.swiper-container', {
  init: false,
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

githubApi.getCommits().then(res => {
  сommitList.loadCards(res);
  swiper.init()
})
  .catch(err => console.log('ошибка', err));
