// const api_key =
//   'live_n2ND2q7UjmqCtzYqN0M9RY9AeEzLxLRhEVGqjnzVrmKV3FgoycYwhhnphz2KTV3x';

// export function fetchBreeds() {
//   const apiUrl = 'https://api.thecatapi.com/v1/breeds';

//   return fetch(apiUrl)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(
//           `Failed to fetch breeds. Status: ${response.status} - ${response.statusText}`
//         );
//       }
//       return response.json();
//     })
//     .then(breeds => {
//       return breeds.map(breed => ({
//         id: breed.id,
//         name: breed.name,
//       }));
//     });
// }

const apiKey =
  'live_n2ND2q7UjmqCtzYqN0M9RY9AeEzLxLRhEVGqjnzVrmKV3FgoycYwhhnphz2KTV3x';

export async function fetchBreeds() {
  const apiUrl = 'https://api.thecatapi.com/v1/breeds';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch breeds. Status: ${response.status} - ${response.statusText}`
      );
    }

    const breeds = await response.json();
    return breeds.map(breed => ({
      id: breed.id,
      name: breed.name,
    }));
  } catch (error) {
    throw error;
  }
}

export async function fetchCatByBreed(breedId) {
  const apiUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch cat by breed. Status: ${response.status} - ${response.statusText}`
      );
    }

    const catData = await response.json();
    return catData[0];
  } catch (error) {
    throw error;
  }
}
