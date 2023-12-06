import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './css/stylle.css';

// const selectBreed = document.querySelector('.breed-select');
// const container = document.querySelector('.cat-info');
// const loaderAnime = document.querySelector('.loader');
// const body = document.querySelector('body');

// import { fetchBreeds } from './cat-api.js';
// import { fetchCatByBreed } from './cat-api.js';

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

// body.style.backgroundColor = '#5555';

// const options = {
//   position: 'center-bottom',
//   distance: '80px',
//   borderRadius: '50px',
//   opacity: 0.8,
//   timeout: 8000,
//   clickToClose: true,
//   cssAnimationStyle: 'zoom',
// };

// selectBreed.addEventListener('change', event => {
//   loaderAnime.style.display = 'block';
//   container.style.display = 'none';

//   const breedId = event.target.value;
//   fetchCatByBreed(breedId)
//     .then(breeds => renderBreedDesc(breeds))
//     .catch(error => err())
//     .finally(() => {
//       loaderAnime.style.display = 'none';
//       container.style.display = 'block';
//     });
// });

// function err() {
//   Notify.failure(
//     `Oops! Something went wrong! Try reloading the page!`,
//     options
//   );
// }

// const renderOptions = breeds => {
//   const markup = breeds
//     .map(selectBreed => {
//       return `<option value="${selectBreed.id}">${selectBreed.name}</option>`;
//     })
//     .join();
//   selectBreed.insertAdjacentHTML('beforeend', markup);
//   new SlimSelect({
//     select: '#single',
//   });
// };

// const renderBreedDesc = selectBreed => {
//   container.innerHTML = '';

//   const { url } = selectBreed[0];
//   const descriptionBreed = `<div class="image-card"><img class="image" src="${url}" alt="${selectBreed[0].breeds[0].name}"></div>
//          <div class="desc-card"><h2 class="title">${selectBreed[0].breeds[0].name}</h2>
//             <p>${selectBreed[0].breeds[0].description}</p>
//             <p><span class="title">Temperament:</span> ${selectBreed[0].breeds[0].temperament}</p></div>`;

//   container.insertAdjacentHTML('beforeend', descriptionBreed);
// };

// const breedAndFetch = () => {
//   fetchBreeds()
//     .then(breeds => renderOptions(breeds))
//     .catch(error => err());
// };

// breedAndFetch();
