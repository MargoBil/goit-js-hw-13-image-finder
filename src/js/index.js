import '../styles/styles.css';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';
import getApiRequest from './apiService';
import templateListImages from '../templates/list-images-tamplate.hbs';
import * as basicLightbox from 'basiclightbox';
const debounce = require ('lodash.debounce');
const userKey = '13157109-fcd6eded5baca4880d7f5c7a8';

const refs = {
  listOfImages: document.querySelector ('.list__images'),
  input: document.querySelector ('input[name="query"]'),
  button: document.querySelector ('.button-loader'),
  body: document.querySelector ('body'),
  modalCard: document.querySelector ('.list__images'),
};

let numberOfPage = 1;
let keyWord;

refs.input.addEventListener ('input', debounce (handlerSearchingImages, 1000));
refs.button.addEventListener ('click', handlerNexPagesOfImages);
refs.modalCard.addEventListener ('click', openModalWindow);

function handlerSearchingImages (event) {
  if (event.data === '' || event.data === null) {
    refs.button.classList.remove ('visible');
    return;
  }
  refs.button.classList.remove ('visible');
  refs.listOfImages.innerHTML = '';
  numberOfPage = 1;
  keyWord = event.target.value;
  getApiRequest (keyWord, numberOfPage, userKey).then (data => {
    const markup = templateListImages (data);
    refs.listOfImages.insertAdjacentHTML ('beforeend', markup);
    refs.button.classList.add ('visible');
  });
}

function handlerNexPagesOfImages (event) {
  event.preventDefault ();
  numberOfPage += 1;
  const pageHeight = document.documentElement.offsetHeight - 35;
  getApiRequest (keyWord, numberOfPage, userKey).then (data => {
    const markup = templateListImages (data);
    refs.listOfImages.insertAdjacentHTML ('beforeend', markup);
    window.scrollTo ({
      top: pageHeight,
      behavior: 'smooth',
    });
  });
}

function openModalWindow (event) {
  const instance = basicLightbox.create (`<img src= ${event.target.srcset}>`);
  instance.show ();
}
