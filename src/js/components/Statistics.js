export class Statistics {
  constructor(analytics, youSked, keyWord, news, day) {
    this.analytics = analytics;
    this.youSked = youSked;
    this.keyWord = keyWord;
    this.news = news;
    this.day = day;
  }

  _daysLater(date, days) {
    const dateCopy = new Date(date);
    dateCopy.setDate(date.getDate() + days);
    return dateCopy;
  }

  _datesLastWeek() {
    const datesLastWeek = [];
    const date = new Date(this.day);
    for (let i = 0; i < 7; i += 1) {
      datesLastWeek.push(this._daysLater(date, i));
    }
    return datesLastWeek;
  }

  _getWeekDay(date) {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
    return {
      'weekday': days[date.getDay()],
      'date': date.getDate(),
    };
  }

  _datesWithDaysWeek() {
    const datesWithDaysWeek = this._datesLastWeek().map(date => { return this._getWeekDay(date) });
    return datesWithDaysWeek;
  }

  setWeekdays() {
    const weekdays = this.analytics.querySelectorAll('.analytics__weekday');
    weekdays.forEach((weekday, index) =>
      weekday.textContent = `${this._datesWithDaysWeek()[index].date}, ${this._datesWithDaysWeek()[index].weekday}`
    )
  }

  _findTotalArticles() {
    const regex = new RegExp(`${this.keyWord}`, 'i');
    return this.news.articles.filter((article) => regex.test(article.title) || regex.test(article.description));
  }

  _findKeyWord() {
    const regex = new RegExp(`${this.keyWord}`, 'i');
    return this.news.articles.filter((article) => regex.test(article.title));
  }

  setYouSkedFields() {
    const inTitle = this.youSked.querySelector('#inTitle');
    const newForWeek = this.youSked.querySelector('#newForWeek');
    const keyWord = this.youSked.querySelector('#keyWord');
    inTitle.textContent = `Упоминаний в загаловках: ${this._findKeyWord().length}`;
    newForWeek.textContent = `Новостей за неделю: ${this.news.totalResults}`;
    keyWord.textContent = `Вы спросили: «${this.keyWord}»`;
  }

  setMonth() {
    const month = this.analytics.querySelector('#month');
    month.textContent = `Дата (${new Date().toLocaleString('ru', {
      month: 'long'
    })})`;
  }

  _createArrayDates() {
    return this._findTotalArticles().map(function (article) {
      return article.publishedAt.substr(0, 10);
    });
  }

  _sortDates() {
    return this._createArrayDates().sort(function (a, b) {
      return new Date(a) - new Date(b);
    });
  }

  _datesToNumber() {
    return this._sortDates().map(date => {return new Date(date).getDate()});
  }

  _countArticlesByDates() {
    return this._datesToNumber().reduce(function (prevDate, date) {
      if (!prevDate[date]) {
        prevDate[date] = 1;
      } else {
        prevDate[date] += 1;
      }
      return prevDate;
    }, {});
  }

  setScale() {
    const graphs = this.analytics.querySelectorAll('.analytics__graph');
    let countNewsPercent = 0;
    this._datesWithDaysWeek().forEach((day, index)=> {
      if (this._countArticlesByDates().hasOwnProperty(`${day.date}`)) {
        countNewsPercent = Math.round((this._countArticlesByDates()[`${day.date}`]/this._findTotalArticles().length)*100);
        graphs[index].textContent = countNewsPercent;
        graphs[index].setAttribute('style', `width: ${countNewsPercent}%;`);
      }
    });
  }
}

