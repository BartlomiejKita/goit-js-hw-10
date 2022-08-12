'use strict';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const fetchCountriesInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const searchCountry = () => {
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
};

const renderCountriesList = countries => {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    resetList();
  } else if (countries.length <= 10 && countries.length >= 2) {
    resetList();
    const markup = countries
      .map(({ name, flags }) => {
        return `<li class="list-countries"><img class="list-flag" src="${flags.svg}"><h2> ${name}</h2></li>`;
      })
      .join('');
    countryList.innerHTML = markup;
  } else if (countries.length === 1) {
    resetList();
    const markup = countries
      .map(({ name, flags, capital, population, languages }) => {
        return `<div class="header"><img class="div-flag" src="${
          flags.svg
        }"><h1> ${name}</h1></div>
            <li class="list-countries">  <p><b>Capital</b>: ${capital}</p></li>
            <li class="list-countries"> <p><b>Population</b>: ${population}</p></li>
            <li class="list-countries">  <p><b>Languages</b>: ${languages.map(
              ({ name }) => ' ' + name
            )}</p></li>`;
      })
      .join('');
    countryInfo.innerHTML = markup;
  }
};

fetchCountriesInput.addEventListener(
  'input',
  debounce(searchCountry, DEBOUNCE_DELAY)
);

const resetList = () => {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
};
