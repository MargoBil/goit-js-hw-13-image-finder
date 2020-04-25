import '../styles/styles.css';
import getApiRequest from './apiService';
import templateListImages from '../templates/list-images-tamplate.hbs';
const debounce = require ('lodash.debounce');
const userKey = '13157109-fcd6eded5baca4880d7f5c7a8';

const refs = {
  listOfImages: document.querySelector ('.list__images'),
  input: document.querySelector ('input[name="query"]'),
  button: document.querySelector ('.button-loader'),
  body: document.querySelector ('body'),
};

let numberOfPage = 1;
let keyWord;

refs.input.addEventListener ('input', debounce (handlerSearchingImages, 1000));
refs.button.addEventListener ('click', handlerNexPagesOfImages);

function renderListOfImages () {
  getApiRequest (keyWord, numberOfPage, userKey).then (data => {
    const markup = templateListImages (data);
    refs.listOfImages.insertAdjacentHTML ('beforeend', markup);
  });
}

function handlerSearchingImages (event) {
  if (event.data === '' || event.data === null) {
    refs.button.classList.remove ('visible');
    return;
  }
  refs.button.classList.remove ('visible');
  refs.listOfImages.innerHTML = '';
  numberOfPage = 1;
  keyWord = event.target.value;
  renderListOfImages ();
  setTimeout (() => {
    refs.button.classList.add ('visible');
  }, 2000);
}

function handlerNexPagesOfImages (event) {
  event.preventDefault ();
  let scroll = document.documentElement.offsetHeight;
  numberOfPage += 1;
  renderListOfImages ();
  setTimeout (() => {
    window.scrollTo ({
      top: scroll,
      behavior: 'smooth',
    });
  }, 1000);
}
