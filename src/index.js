import './css/styles.css';


const DEBOUNCE_DELAY = 300;


import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const searchBox = document.querySelector("#search-box")
const list = document.querySelector(".country-list")
const info = document.querySelector(".country-info")

searchBox.addEventListener('input', debounce(searchInfo, DEBOUNCE_DELAY))

function searchInfo(evt) {
    evt.preventDefault();
    const targetValue = searchBox.value.trim()

    if (targetValue === "") {
            clearMarkup()
    }
    
    fetchCountries(targetValue)
        .then(data => {
            clearMarkup()
            if (data.length > 10) {
                tooMatchPoints();
            }
            else if (data.length === 1) {
                info.insertAdjacentHTML("beforeend", createSecondMarkUp(data))
                }
            else {
                list.insertAdjacentHTML("beforeend", createFirstMarkUp(data))
            }
        }).catch(errorMessage)
}

function createFirstMarkUp(data) {
    const info = data.map(({flags, name}) => {
        const item = `<li class="country-list__item"><img class="country-list__img" src="${flags.png}" alt="The flag of ${name.official}" height="25px" width="55px"><p class="country-list__name">${name.official}</p></P></li>`
        return item
    }).join(' ')
    console.log(info);

    return info
}

function createSecondMarkUp(data) {
    const largeInfo = data.map(({flags, name, capital, population, languages}) => {
        const box = `<ul class="country-info__list"><li class="country-info__item"><img src="${flags.png}"alt="The flag of ${name.official}" class="country-info__img" height="30px" width="60px"><h2 class="country-info__top-text">${name.official}</h2></li>
        <li class="country-info__item">Capital: <i>${capital}</i></li>
        <li class="country-info__item">Population: <i>${population}</i></li>
        <li class="country-info__item">Languages: <i>${Object.values(languages)}</i></li></ul>`
        return box
    }).join(' ')
    console.log(largeInfo);
    return largeInfo
}

function clearMarkup() {
    list.innerHTML = ""
    info.innerHTML = ""
}

function errorMessage() {
    Notiflix.Notify.failure('Oops, there is no country with that name')
}

function tooMatchPoints() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}