const baseUrl = 'https://restcountries.eu/rest/v2/';

export default {
  query: 'ukr',

  fetchCountries() {
    const urlRequestNameParams = `name/${this.query}`;
    return fetch(baseUrl + urlRequestNameParams).then(response =>
      response.json(),
    );
  },

  get searchQuery() {
    return this.query;
  },

  set searchQuery(string) {
    this.query = string;
  },
};
