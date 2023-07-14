import axios from 'axios';
// import { serviceFetchBreeds, createMarkup } from './cat-api.js';
// import { getSelectors } from './get-selectors.js';

// const selectors = getSelectors();

// function getSelectors() {
const selectors = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  div: document.querySelector('.cat-info'),
};

//   return selectors;
// }

serviceFetchBreeds()
  .then(breeds => {
    createMarkup(breeds);
    console.log(breeds);
  })
  .catch(onError);

function onError() {
  alert('Something went wrong');
}

selectors.select.addEventListener('change', handlerfetchCatByBreed);

function serviceFetchBreeds() {
  const API_KEY =
    'live_bwUeFmIL58rBT63UvkMLurnSeLwZFJ4OE5hbSuXXgrdE4pRm0zM65YAWCKK53edo';
  axios.defaults.headers.common['x-api-key'] = API_KEY;

  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

  return axios
    .get(BASE_URL, {
      params: {
        'x-api-key': API_KEY,
      },
    })

    .then(response => {
      const breeds = response.data;

      return breeds.map(breed => ({
        id: breed.id,
        name: breed.name,
        temperament: breed.temperament,
      }));
    })

    .catch(error => {
      console.log(error);
      throw new Error('Failed to fetch cat breeds');
    });
}

function createMarkupCats(cat) {
  const { url, name, temperament, description } = cat;
  const markup = ` <li>
    <img src="${url}" alt="${name}" width='400'>
    <h2>${name}</h2>
    <p>${temperament}</p>
    <p>${description}</p>
  </li>  `;

  selectors.div.innerHTML = markup;
}

function handlerfetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1/images/search';

  return axios
    .get(BASE_URL, {
      params: {
        breedIds: breedId,
      },
    })
    .then(response => response.data[0])
    .then(cat => createMarkupCats(cat))
    .catch(onError);
}

function createMarkup(breedsData) {
  const markup = breedsData
    .map(breed => {
      return `<option value="${breed.id}">${breed.name}</option>`;
    })
    .join('');
  selectors.select.innerHTML = markup;
}
