import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './css/stylle.css';

const body = document.querySelector('body');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const div = document.querySelector('.cat-info');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const breeds = await fetchBreeds();

    new SlimSelect({
      select: '.breed-select',
      placeholder: 'Select a breed',
      allowDeselect: true,
      onChange: async info => {
        const selectedBreedId = info.value();
        const catData = await fetchCatByBreed(selectedBreedId);

        div.innerHTML = `
          <img src="${catData.url}" alt="Cat Image">
          <p>Breed: ${catData.breeds[0].name}</p>
          <p>Description: ${catData.breeds[0].description}</p>
          <p>Temperament: ${catData.breeds[0].temperament}</p>
        `;
      },
    });

    breeds.forEach(breed => {
      select.appendChild(new Option(breed.name, breed.id));
    });
  } catch (error) {
    console.error('Error fetching breeds:', error);
    Notify.failure('Failed to fetch breeds', {
      position: 'center-center',
      timeout: 5000,
      width: '600px',
      fontSize: '34px',
    });
  }
});
