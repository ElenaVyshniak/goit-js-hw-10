import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import './css/style.css';

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
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SlimSelect from 'slim-select';
// import 'slim-select/dist/slimselect.css';
// import './css/style.css';
// import { fetchBreeds, fetchCatByBreed } from './cat-api';

// document.addEventListener('DOMContentLoaded', async () => {
//   const breedSelect = new SlimSelect({
//     select: '.breed-select',
//     placeholder: 'Select a breed',
//     allowDeselect: true,
//     onChange: async info => {
//       const selectedBreedId = info.value();
//       try {
//         showLoader();
//         const catData = await fetchCatByBreed(selectedBreedId);
//         displayCatInfo(catData);
//       } catch (error) {
//         handleError(error);
//       } finally {
//         hideLoader();
//       }
//     },
//   });

//   try {
//     showLoader();
//     const breeds = await fetchBreeds();
//     breeds.forEach(breed => {
//       breedSelect.appendChild(new Option(breed.name, breed.id));
//     });
//   } catch (error) {
//     handleError(error);
//   } finally {
//     hideLoader();
//   }
// });

// function showLoader() {
//   document.querySelector('.loader').style.display = 'block';
//   document.querySelector('.breed-select').style.display = 'none';
//   document.querySelector('.error').style.display = 'none';
// }

// function hideLoader() {
//   document.querySelector('.loader').style.display = 'none';
//   document.querySelector('.breed-select').style.display = 'block';
// }

// function displayCatInfo(catData) {
//   const catInfo = document.querySelector('.cat-info');
//   catInfo.innerHTML = `
//     <img src="${catData.url}" alt="Cat Image">
//     <p>Breed: ${catData.breeds[0].name}</p>
//     <p>Description: ${catData.breeds[0].description}</p>
//     <p>Temperament: ${catData.breeds[0].temperament}</p>
//   `;
// }

// function handleError(error) {
//   console.error('Error:', error);
//   Notify.failure('Failed to fetch data', {
//     position: 'center-center',
//     timeout: 5000,
//     width: '600px',
//     fontSize: '34px',
//   });
//   document.querySelector('.error').style.display = 'block';
// }
