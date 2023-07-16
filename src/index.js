import { serviceFetchBreeds, fetchCatByBreed } from './cat-api.js';
import { Notify } from 'notiflix';
import { getSelectors } from './get-selectors.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectors = getSelectors();

selectors.select.classList.add('is-hidden');
selectors.loader.classList.remove('is-hidden');
selectors.error.classList.add('is-hidden');

serviceFetchBreeds()
  .then(breeds => {
    createMarkup(breeds);
    new SlimSelect({
      select: selectors.select,
    });

    selectors.loader.classList.add('is-hidden');
    hideSpinner();
  })
  .catch(onError)
  .finally(hideSpinner);

selectors.select.classList.add('is-hidden');

selectors.select.addEventListener('change', handlerSearchSelect);

function handlerSearchSelect(evt) {
  const breedId = evt.currentTarget.value;

  fetchCatByBreed(breedId);
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
  const oprtionsMarkup = breedsData
    .map(breed => {
      return `<option value="${breed.id}" >${breed.name}</option>`;
    })
    .join('');
  const markupDefault = `<option value="" selected disabled hidden>Please select a cat breed</option>${oprtionsMarkup}`;
  selectors.select.innerHTML = markupDefault;
}

function onError() {
  selectors.error.classList.remove('is-hidden');
  selectors.select.classList.remove('is-hidden');
  selectors.div.innerHTML = '';
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}

function showSpinner() {
  selectors.loader.classList.remove('is-hidden');
  selectors.error.classList.add('is-hidden');
  selectors.select.classList.add('is-hidden');
  selectors.div.classList.add('is-hidden');
}

function hideSpinner() {
  selectors.loader.classList.add('is-hidden');
  selectors.select.classList.remove('is-hidden');
  selectors.div.classList.remove('is-hidden');
}

export { onError, hideSpinner, showSpinner, createMarkupCats };

// createMarkup(breeds);

// return breeds.map(breed => ({
//   id: breed.id,
//   name: breed.name,
//   temperament: breed.temperament,
// }));
