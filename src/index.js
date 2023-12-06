import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './css/stylle.css';

import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const div = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

document.addEventListener('DOMContentLoaded', async () => {
  const breeds = await fetchBreeds();
  const breedSelect = document.getElementById('breedSelect');
  const catInfoDiv = document.getElementById('catInfo');

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });

  breedSelect.addEventListener('change', async () => {
    const selectedBreedId = breedSelect.value;
    const catData = await fetchCatByBreed(selectedBreedId);

    catInfoDiv.innerHTML = `
            <img src="${catData.url}" alt="Cat Image">
            <p>Breed: ${catData.breeds[0].name}</p>
            <p>Description: ${catData.breeds[0].description}</p>
            <p>Temperament: ${catData.breeds[0].temperament}</p>
        `;
  });
});
const breedId = event.target.value;
fetchCatByBreed(breedId)
  .then(data => {
    info.innerHTML = '';
    const { url, breeds } = data[0];
    const markup = `
        <div class="box-img">
        <img src="${url}" alt="${breeds[0].name}" width="400"/>
        </div><div class="box">
        <h1>${breeds[0].name}</h1>
        <p>${breeds[0].description}</p>
        <p>
        <b>Temperament:</b>
        ${breeds[0].temperament}</p>
        </div>`;
    info.insertAdjacentHTML('beforeend', markup);
  })
  .catch(onFetchError);

function onFetchError() {
  setLoadingState(true);
  Notify.failure(errorMessage.textContent, {
    position: 'center-center',
    timeout: 5000,
    width: '600px',
    fontSize: '34px',
  });
}

const breedAndFetch = () => {
  fetchBreeds()
    .then(breeds => renderOptions(breeds))
    .catch(error => err());
};

breedAndFetch();
