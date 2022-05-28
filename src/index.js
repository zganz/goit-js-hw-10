import './css/styles.css';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.5.min.css";
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries';
import countryListTpl from './countryListElement.hbs';
import countryInfoTpl from './countryInfo.hbs';

const DEBOUNCE_DELAY = 300;


const searchForm = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo =  document.querySelector('.country-info');



searchForm.addEventListener('input', debounce(inputSearch, DEBOUNCE_DELAY));



function inputSearch(evt) {
    const search = evt.target.value.trim();
    if (!search) {
        clearMarckup();
        return;
    };




fetchCountries(search)
        .then(country => {
            if (country.length > 10) {
                clearMarckup()
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            };
            if (2 <= country.length && country.length <= 10) {
                clearMarckup()
                countryList.insertAdjacentHTML('afterbegin', countryListTpl(country));                                      
            }
            else {
                clearMarckup();                            
                countryInfo.insertAdjacentHTML('afterbegin', countryInfoTpl(country));                                      
            };
        })
        .catch(error => {
            clearMarckup();
            return Notiflix.Notify.failure("Oops, there is no country with that name");
        });

    }

function clearMarckup() {
    countryInfo.innerHTML = ' ';
    countryList.innerHTML = ' ';   
  }