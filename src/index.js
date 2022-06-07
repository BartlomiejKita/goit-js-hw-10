import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const fetchCountriesInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

fetchCountriesInput.addEventListener(
  'input',
  debounce(searchCountry, DEBOUNCE_DELAY)
);

function searchCountry() {
  let name = fetchCountriesInput.value;
  if (name === '') {
    Notiflix.Notify.info('Please type a country name');
    resetList();
  } else {
    fetchCountries(name.trim())
      .then(countries => renderCountriesList(countries))
      .catch(() => {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        resetList();
      });
  }
}

function renderCountriesList(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    resetList();
  } else if (countries.length <= 10 && countries.length >= 2) {
    resetList();
    const markup = countries
      .map(({ name, flags }) => {
        return `<h2><img width="100" src="${flags.svg}"> ${name}</h2>`;
      })
      .join('');
    countryInfo.innerHTML = markup;
  } else if (countries.length === 1) {
    resetList();
    const markup = countries
      .map(({ name, flags, capital, population, languages }) => {
        return `<h1><img width="100" src="${flags.svg}"> ${name}</h1>
              <p><b>Capital</b>: ${capital}</p>
              <p><b>Population</b>: ${population}</p>
              <p><b>Languages</b>: ${languages.map(
                ({ name }) => ' ' + name
              )}</p>`;
      })
      .join('');
    countryList.innerHTML = markup;
  }
}

const resetList = () => {
  countryInfo.innerHTML = ' ';
  countryList.innerHTML = ' ';
};
