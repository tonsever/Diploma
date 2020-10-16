export class CommitCardList {
  constructor(placesList, callbackCard, callbackDate) {
    this.placesList = placesList;
    this.callbackCard = callbackCard;
    this.callbackDate = callbackDate;
  }

  _addCardInList(link, img, date, name, message, email) {
    const instance = this.callbackCard(link, img, date, name, message, email);
    this.placesList.appendChild(instance);
  }

  loadCards(arrCards) {
    for (let i = 0; i < arrCards.slice(0, 20).length; i += 1) {
      this._addCardInList(arrCards[i].html_url, arrCards[i].author.avatar_url, this.callbackDate(arrCards[i].commit.committer.date), arrCards[i].commit.committer.name, arrCards[i].commit.message, arrCards[i].commit.committer.email);
    }
  }
}