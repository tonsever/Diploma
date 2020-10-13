import "./vendor/normalize.css";
import "./pages/index.css";
import { NewsApi } from './js/modules/NewsApi.js';
import { DataStorage } from './js/modules/DataStorage.js';
import { NewsCard } from './js/components/NewsCard.js';
import { NewsCardList } from './js/components/NewsCardList.js';
import { SearchInput } from './js/components/SearchInput.js';
import { prettysDate } from './js/utils/prettysDate.js';

const startPage = document.querySelector('.start-page');
const formSearch = startPage.querySelector('.search__form');
const cards = startPage.querySelector('.cards');
const showMoreButton = startPage.querySelector('.button_simple');
let firstCard = 0;
let thirdCard = 3;

const createCard = function (link, img, date, title, des, sourse) {
  return new NewsCard(link, img, date, title, des, sourse).createCard();
};

const checkUrlToImage = function (urlToImage) {
  if (urlToImage === null) {
    return urlToImage = "./images/not-found.png";
  }
  else {
    return urlToImage
  }
}

const dataStorage = new DataStorage('keyWord', 'news', 'day');
const date = new Date();
const cardList = new NewsCardList(cards, createCard, prettysDate, checkUrlToImage);
const searchInput = new SearchInput(formSearch);

function checkSubmit() {
  switch (true) {
    case (dataStorage.getNews() === null):
      break;
    case (dataStorage.getNews().articles.length != 0):
      renderSection('no-result', false);
      renderSection('error', false);
      renderSection('result-background', true);
      formSearch.elements.keyWord.value = dataStorage.getKeyWord();
      formSearch.querySelector('.button_submit').classList.add('button_active');
      cardList.loadCards(dataStorage.getNews().articles.slice(0, 3));
      break;
  }
}

function renderSection(element, isLoading) {
  const section = startPage.querySelector(`.${element}`);
  const style = `${element}_is-visible`;
  if (isLoading) {
    section.classList.add(style);
  }
  else {
    section.classList.remove(style);
  }
}

function daysLater(date, days) {
  let dateCopy = new Date(date);
  dateCopy.setDate(date.getDate() - days);
  return dateCopy = `${dateCopy.getFullYear()}-${dateCopy.getMonth() + 1}-${dateCopy.getDate()}`;
}

function removeNews() {
  while (cards.firstChild) {
    cards.removeChild(cards.firstChild);
  }
}

function checkBrokenLinks() {
  const images = startPage.querySelectorAll('.cards__image');
  images.forEach(img => {
    img.onerror = function (event) {
      event.target.setAttribute('src', `./images/not-found.png`);
    }
  });
}

function showMore() {
  firstCard += 3;
  thirdCard += 3;
  cardList.loadCards(dataStorage.getNews().articles.slice(firstCard, thirdCard));
  checkBrokenLinks();
  if (cards.childNodes.length-1 == dataStorage.getNews().articles.length) {
    showMoreButton.classList.remove('button_simple');
    showMoreButton.classList.add('button_disabled');
  }
}

function checkNumberCards() {
  if (cards.childNodes.length-1 == dataStorage.getNews().articles.length) {
    showMoreButton.classList.remove('button_simple');
    showMoreButton.classList.add('button_disabled');
  }
  else {
    showMoreButton.classList.add('button_simple');
  }
}

function getNews(event) {
  event.preventDefault();
  firstCard = 0;
  thirdCard = 3;
  removeNews();
  renderSection('no-result', false);
  renderSection('result-background', false);
  renderSection('loader', true);
  searchInput.lockButton();
  const keyWord = formSearch.elements.keyWord.value;
  const newsApi = new NewsApi(keyWord, daysLater(date, 6));
  newsApi.getNews().then(res => {
    dataStorage.clearStorage();
    dataStorage.putKeyWord(keyWord);
    dataStorage.putNews(res);
    dataStorage.putDay(daysLater(date, 6))
  })
    .catch(() => {
      renderSection('result-background', false);
      renderSection('no-result', false);
      renderSection('loader', false);
      renderSection('error', true)
      searchInput.unlockButton();
    })

    .finally(() => {
      renderSection('loader', false);
      searchInput.unlockButton();
      if (dataStorage.getNews().articles.length == 0) {
        renderSection('result-background', false);
        renderSection('error', false)
        renderSection('no-result', true);
      }
      else {
        renderSection('error', false)
        renderSection('no-result', false);
        renderSection('result-background', true);
        cardList.loadCards(dataStorage.getNews().articles.slice(0, 3));
        checkNumberCards()
        checkBrokenLinks();
      }
    });
}

formSearch.addEventListener('submit', getNews);
showMoreButton.addEventListener('click', showMore);
document.addEventListener('DOMContentLoaded', checkSubmit);

