export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => data.map(breed => ({ id: breed.id, name: breed.name })))
    .catch(error => {
      handleError(error);
      return [];
    });
}

const apiKey =
  'live_KD3Qg85JVSQJMBA9BMVGDq438pK9w8vjkBhJvHx3PLcS6o8jxMQlcKOdUSQ3y8nt';

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${apiKey}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => data[0])
    .catch(error => {
      handleError(error);
      return null;
    });
}
