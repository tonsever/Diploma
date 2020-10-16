export class DataStorage {
  constructor(keyWord, news, day) {
    this.keyWord = keyWord;
    this.news = news;
    this.day = day;
  }

  putKeyWord(keyWord) {
    localStorage.setItem(this.keyWord, keyWord);
  }

  putNews(news) {
    localStorage.setItem(this.news, JSON.stringify(news));
  }

  putDay(day) {
    localStorage.setItem(this.day, day);
  }

  getKeyWord() {
    return localStorage.getItem(this.keyWord);
  }

  getNews() {
    return JSON.parse(localStorage.getItem(this.news));
  }

  getDay() {
    return localStorage.getItem(this.day);
  }

  clearStorage() {
    localStorage.clear();
  }
}