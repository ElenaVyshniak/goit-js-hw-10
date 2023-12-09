import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './css/style.css';

// const body = document.querySelector('body');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');
const div = document.querySelector('.cat-info');
select.classList.add('is-hidden');

select.addEventListener('change', onSelect);

fetchBreeds()
  .then(data => {
    optionMarkup(data);
    select.classList.remove('is-hidden');
  })
  .catch(() => {
    select.classList.add('is-hidden');
    Notify.failure(' Oops! Something went wrong! Try reloading the page!');
  })
  .finally(() => loader.classList.add('is-hidden'));

function optionMarkup(breeds) {
  const markup = breeds.map(
    ({ id, name }) => ` <option value="${id}">${name}</option>`
  );
  select.innerHTML = markup.join('');
}

function onSelect(event) {
  div.innerHTML = '';
  loader.classList.remove('is-hidden');
  fetchCatByBreed(event.target.value)
    .then(data => {
      catMarkup(data);
    })
    .catch(() => {
      select.classList.add('is-hidden');
      Notify.failure(' Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => loader.classList.add('is-hidden'));
}

function catMarkup(cat) {
  const photo = cat[0].url;
  const { name, description, temperament } = cat[0].breeds[0];
  const markup = `<img src="${photo}" alt="${name}"><div><h1>${name}</h1><p>${description}</p><p><b>Temperament: </b>${temperament}</p></div>`;
  div.innerHTML = markup;
}
