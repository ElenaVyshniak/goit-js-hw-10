import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_n2ND2q7UjmqCtzYqN0M9RY9AeEzLxLRhEVGqjnzVrmKV3FgoycYwhhnphz2KTV3x';
const url = 'https://api.thecatapi.com/v1/breeds';
// const api_key =
//   'live_n2ND2q7UjmqCtzYqN0M9RY9AeEzLxLRhEVGqjnzVrmKV3FgoycYwhhnphz2KTV3x';

export function fetchBreeds() {
  const apiUrl = 'https://api.thecatapi.com/v1/breeds';

  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Failed to fetch breeds. Status: ${response.status} - ${response.statusText}`
        );
      }
      return response.json();
    })
    .then(breeds => {
      return breeds.map(breed => ({
        id: breed.id,
        name: breed.name,
      }));
    });
}
