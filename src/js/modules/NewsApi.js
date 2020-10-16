export class NewsApi {
  constructor(keyWord, date) {
    this.url = `https://nomoreparties.co/news/v2/everything?q=${keyWord}&from=${date}&apiKey=3259f10846ea44cdb1cf32e07964f721&pageSize=100`;
  }

  getNews() {
    return fetch(this.url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Произошла ошибка");
      })
  }
}