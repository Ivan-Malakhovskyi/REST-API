import axios from 'axios';
import {
  serviceFetchBreeds,
  createMarkup,
  createMarkupCats,
  onError,
} from './cat-api.js';
import { getSelectors } from './get-selectors.js';
// import SlimSelect from 'slim-select';

const selectors = getSelectors();

serviceFetchBreeds()
  .then(breeds => {
    createMarkup(breeds);

    // const select = new SlimSelect({
    //   select: selectors.select,
    // });

    hideSpinner();
  })
  .catch(onError)
  .finally(hideSpinner);

selectors.select.addEventListener('change', handlerSearchSelect);
selectors.error.classList.add('is-hidden');

function handlerSearchSelect(evt) {
  const breedId = evt.currentTarget.value;

  fetchCatByBreed(breedId);
}

function fetchCatByBreed(breedId) {
  const BASE_URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  showSpinner();

  return axios
    .get(BASE_URL)
    .then(response => response.data[0])
    .then(cat => {
      createMarkupCats(cat);
      hideSpinner();
    })
    .catch(onError)
    .finally(hideSpinner);
}

function showSpinner() {
  selectors.loader.classList.remove('is-hidden');
  selectors.select.classList.add('is-hidden');
  selectors.div.classList.add('is-hidden');
}

function hideSpinner() {
  selectors.loader.classList.add('is-hidden');
  selectors.select.classList.remove('is-hidden');
  selectors.div.classList.remove('is-hidden');
}
