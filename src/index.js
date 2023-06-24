import '../src/css/common.css';
import { fetchBreeds, fetchCatByBreed } from '../src/cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import '/node_modules/slim-select/dist/slimselect.css';

const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => {
      const optionEl = document.createElement('option');
      optionEl.value = breed.id;
      optionEl.textContent = breed.name;
      breedSelectEl.appendChild(optionEl);
      loaderEl.classList.add('hidden');
    });
    new SlimSelect({
      select: breedSelectEl,
    });
  })
  .catch(error => {
    handleError(error);
  });

breedSelectEl.addEventListener('change', e => {
  const breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(catData => {
      if (catData) {
        showCatInfo(catData);
      } else {
        catInfoEl.classList.add('hidden');
        loaderEl.classList.add('hidden');
        handleError(error);
      }
    })
    .catch(error => {
      handleError(error);
    });
  loaderEl.classList.remove('hidden');
  catInfoEl.classList.add('hidden');
});

function showCatInfo(catData) {
  catInfoEl.innerHTML = `
    <img src="${catData.url}" alt="Cat Image">
    <h3>${catData.breeds[0].name}</h3>
    <h4>From: ${catData.breeds[0].origin}</h4>
    <p><strong>Description:</strong> ${catData.breeds[0].description}</p>
    <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
  `;

  loaderEl.classList.add('hidden');
  catInfoEl.classList.remove('hidden');
}

const handleError = () => {
  loaderEl.classList.add('hidden');
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
};
