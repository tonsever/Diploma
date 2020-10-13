export class CommitCard {
  constructor(link, img, date, name, message, email) {
    this.link = link; //html_url
    this.img = img; //author.avatar_url.
    this.date = date; //commit.committer.date
    this.name = name; //commit.committer.name
    this.email = email; //commit.committer.email;
    this.message = message; // commit.message;
  }

  createCard = () => {
    const card = document.createElement('a');
    const cardDate = document.createElement('p');
    const cardData = document.createElement('div');
    const cardImage = document.createElement('img');
    const cardParagraps = document.createElement('div');
    const cardAuthor = document.createElement('p');
    const cardMail = document.createElement('p');
    const cardCommentText = document.createElement('p');

    card.classList.add('swiper-slide');
    card.classList.add('swiper-slide-custom');
    card.setAttribute('href', `${this.link}`);
    card.setAttribute('target', `_blank`);
    cardDate.classList.add('git__date');
    cardDate.textContent = this.date;
    cardData.classList.add('git__data');
    cardImage.classList.add('git__image');
    cardImage.setAttribute('src', `${this.img}`);
    cardImage.setAttribute('alt', `аватар комментатора`);
    cardParagraps.classList.add('git__paragraps');
    cardAuthor.classList.add('git__author');
    cardAuthor.textContent = this.name;
    cardMail.classList.add('git__mail');
    cardMail.textContent = this.email;
    cardCommentText.classList.add('git__comment-text');
    cardCommentText.textContent = this.message;

    card.appendChild(cardDate);
    card.appendChild(cardData);
    card.appendChild(cardCommentText);
    cardData.appendChild(cardImage);
    cardData.appendChild(cardParagraps);
    cardParagraps.appendChild(cardAuthor);
    cardParagraps.appendChild(cardMail);
    return card;
  }
}