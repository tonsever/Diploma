export class GithubApi {
  constructor(config) {
    this.urlGit = config.urlGit;
  }

  getCommits() {
    return fetch(this.urlGit)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject("Произошла ошибка");
      })
  }
}