export class NewsCardList {
  constructor(placesList, callbackCard, callbackDate, checkUrlToImage) {
    this.placesList = placesList;
    this.callbackCard = callbackCard;
    this.callbackDate = callbackDate;
    this.checkUrlToImage = checkUrlToImage;
  }

  _addCardInList(link, img, date, title, des, sourse) {
    const instance = this.callbackCard(link, img, date, title, des, sourse);
    this.placesList.appendChild(instance);
  }

  loadCards(arrCards) {
    for (let i = 0; i < arrCards.length; i += 1) {
      this._addCardInList(arrCards[i].url, this.checkUrlToImage(arrCards[i].urlToImage), this.callbackDate(arrCards[i].publishedAt), arrCards[i].title, arrCards[i].description, arrCards[i].source['name']);
    }
  }
}