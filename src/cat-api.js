// Constants
const api_key =
  'live_n2ND2q7UjmqCtzYqN0M9RY9AeEzLxLRhEVGqjnzVrmKV3FgoycYwhhnphz2KTV3x';

// Fetch breeds from the Cat API
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
    console.error('Error fetching breeds:', error);
    throw error; // Re-throw the error to let the caller handle it
  }
}
