import axios from 'axios';
import { Notify } from 'notiflix';
import { getSelectors } from './get-selectors';

const selectors = getSelectors();

function serviceFetchBreeds() {
  const API_KEY =
    'live_bwUeFmIL58rBT63UvkMLurnSeLwZFJ4OE5hbSuXXgrdE4pRm0zM65YAWCKK53edo';
  axios.defaults.headers.common['x-api-key'] = API_KEY;

  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

  return axios.get(BASE_URL).then(response => {
    const breeds = response.data;

    createMarkup(breeds);

    return breeds.map(breed => ({
      id: breed.id,
      name: breed.name,
      temperament: breed.temperament,
    }));
  });
}

function createMarkupCats(cat) {
  const breed = cat.breeds[0];

  const markup = ` <li>
    <img src="${cat.url}" alt="${breed.name}" width='400' height="auto">
    <h2>Name: ${breed.name}</h2>
    <h3>Temperament: ${breed.temperament}</h3>
    <p>Descriprion: ${breed.description}</p>
  </li>  `;

  selectors.div.innerHTML = markup;
}

function createMarkup(breedsData) {
  const markup = breedsData
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');

  selectors.select.innerHTML = markup;
}

function onError() {
  selectors.error.classList.remove('is-hidden');
  selectors.select.style.display = 'none';
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

export { serviceFetchBreeds, createMarkup, createMarkupCats, onError };

// error location.href = './error.html'
// IntersectionObserver

// const options = {
//   root: null, // слідкуй за всім портом
//   rootMargin: '300px', // коли буде 300 до елемента то
//   treshold: 0, // скільки відсотків елемента повинний перетнути
//   // порт, 0 - коли торкнеться верхнього краю елемнта
// };
