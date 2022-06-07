import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
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
