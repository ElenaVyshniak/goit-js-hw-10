import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_n2ND2q7UjmqCtzYqN0M9RY9AeEzLxLRhEVGqjnzVrmKV3FgoycYwhhnphz2KTV3x';
const apiUrl = 'https://api.thecatapi.com/v1/breeds';

export function fetchBreeds() {
  return axios
    .get(apiUrl)
    .then(response => {
      return response.data.map(breed => ({
        id: breed.id,
        name: breed.name,
      }));
    })
    .catch(error => {
      console.error('Failed to fetch breeds:', error);
      throw error; // Ретранслювати помилку, щоб обробити її викликаючим кодом
    });
}
