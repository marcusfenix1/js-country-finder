import fetchCountriesService from './services/fetch-countries-service';
import listCountries from '../handlebars/list-countries.hbs';
import countryItem from '../handlebars/country-item.hbs';

const PNotify = require('pnotify/dist/umd/PNotify');
const PNotifyStyleMaterial = require('pnotify/dist/umd/PNotifyStyleMaterial.js');
const _debounce = require('lodash.debounce');

PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';
PNotify.defaults.animateSpeed = 'fast';
PNotify.defaults.delay = 4000;

const wrapper = document.querySelector('#wrapper')
const input = document.querySelector('#input');

input.addEventListener('input', _debounce(handleInputEvent, 500));

function handleInputEvent(e) {
  const input = e.target;
  fetchCountriesService.searchQuery = input.value;

  fetchCountries();
}

function fetchCountries() {
  fetchCountriesService
    .fetchCountries()
    .then(countries => {
      clearCountryList();
      insertItems(countries);
    })
    .catch(error => {
      console.warn(error);
    });
}

function insertItems(countries) {
  const listMarkup = listCountries(countries);
  const itemMarkup = countryItem(countries);

  if (countries.length > 1 && countries.length < 10) {
    wrapper.insertAdjacentHTML('beforeend', listMarkup);
  } else if (countries.length > 10) {
    PNotify.alert('Please enter a more specific query!');
  } else if (countries.length === 1) {
    wrapper.insertAdjacentHTML('beforeend', itemMarkup);
  }
}

function clearCountryList() {
  wrapper.innerHTML = '';
}
