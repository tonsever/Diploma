export class NewsCard {
  constructor(link, img, date, title, des, sourse) {
    this.link = link;
    this.img = img;
    this.date = date;
    this.title = title;
    this.des = des;
    this.sourse = sourse;
  }

  createCard = () => {
    const card = document.createElement('a');
    const cardImage = document.createElement('img');
    const cardDate = document.createElement('p');
    const cardTitle = document.createElement('h3');
    const cardDes = document.createElement('p');
    const cardSource = document.createElement('p');

    card.classList.add('cards__item');
    card.setAttribute('href', `${this.link}`);
    card.setAttribute('target', `_blank`);
    cardImage.classList.add('cards__image');
    cardImage.setAttribute('src', `${this.img}`);
    cardImage.setAttribute('alt', `изображение по теме новости`);
    cardDate.classList.add('cards__date');
    cardDate.textContent = this.date;
    cardTitle.classList.add('cards__title');
    cardTitle.textContent = this.title;
    cardDes.classList.add('cards__description');
    cardDes.textContent = this.des;
    cardSource.classList.add('cards__source');
    cardSource.textContent = this.sourse;

    card.appendChild(cardImage);
    card.appendChild(cardDate);
    card.appendChild(cardTitle);
    card.appendChild(cardDes);
    card.appendChild(cardSource);
    return card;
  }
}