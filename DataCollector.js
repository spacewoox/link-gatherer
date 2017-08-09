import fetch from 'node-fetch';

class DataCollector {
  constructor() {
    this.baseUrl = 'https://api.apidomain.info/list';
    this.variables = {
      sort: { name: 'sort', value: '' },
      quality: { name: 'quality', value: '' },
      seed: { name: 'cb', value: '' },
      page: { name: 'page', value: '' }
    }
    this.results = [];
  }

  //private
  _load_(url) {
    console.log(url);
    return fetch(url)
    .then(data => data.json())
    .then((response) => {
      this.results.push(response);
      return response;
    });
  }

  _build_url_() {
    return Object.keys(this.variables).reduce((sum, key) => {
      return `${sum}&${this.variables[key].name}=${this.variables[key].value}`; 
    }, `${this.baseUrl}?`);
  }

  _load_until_(stopConditionFn, iterateFn) {
    iterateFn();
    return new Promise((resolve, reject) => {
        this._load_(this._build_url_())
        .then((response) => {
          if (!stopConditionFn(response)) {
            this._load_until_(stopConditionFn, iterateFn)
            .then(() => {
              resolve();
            });
          }
          else {
            resolve();
          }
        })
    });
  }

  //public
  setVariable(name, value) {
    this.variables[name].value = value;
    return this;
  }

  getVariable(name) {
    return this.variables[name].value;
  }

  flush() {
    this.results = [];
  }

  load() {
    return this._load_(this._build_url_());
  }

  paginate(fn, untilPageN) {
    untilPageN -= 1;
    this._load_until_((response) => {
      if (untilPageN) {
        return this.variables.page.value > untilPageN;
      }
      return response['MovieList'].length == 0; 
    }, () => {
      this.setVariable('page', Number(this.getVariable('page') + 1));
    }).then(() => {
      this.results.forEach((item) => {
        fn(item);
      });
    });
  }
}

module.exports = DataCollector;
