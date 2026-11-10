import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

let page = 1;
let searchQuery;

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const moreBtn = document.querySelector('.load-more');

const loadImages = async () => {
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(searchQuery, page);
    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;

    } else {

      createGallery(data.hits);
      const total = page * 15;

      if (total < data.totalHits) {
        showLoadMoreButton();
      } else {
        iziToast.error({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }

      if (page > 1) {
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();

        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });

      }
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });

    if (page > 1) {
      page = page - 1;
      showLoadMoreButton();
    }
    
  } finally {
    hideLoader();
  }
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const query = formData.get('search-text').trim();

  clearGallery();
  hideLoadMoreButton();

  if (query === '') {
    return;
  }

  searchQuery = query;
  page = 1;
  loadImages();
});
  
moreBtn.addEventListener('click', () => {
  page = page + 1;
  loadImages();
});
