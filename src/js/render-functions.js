import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const moreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const createGallery = images => {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
                <a class="gallery-link" href="${largeImageURL}">
                    <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
                </a>
                <ul class="stats">
                    <li class="stats-item">
                        <b>Likes</b>
                        <span>${likes}</span>
                    </li>
                    <li class="stats-item">
                        <b>Views</b>
                        <span>${views}</span>
                    </li>
                    <li class="stats-item">
                        <b>Comments</b>
                        <span>${comments}</span>
                    </li>
                    <li class="stats-item">
                        <b>Downloads</b>
                        <span>${downloads}</span>
                    </li>
                </ul>
            </li>`
    )

    .join('');

  galleryList.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
};

const clearGallery = () => {
  galleryList.innerHTML = '';
};

const showLoader = () => {
  loader.classList.remove('hidden');
};

const hideLoader = () => {
  loader.classList.add('hidden');
};

const showLoadMoreButton = () => {
  moreBtn.classList.remove('is-hidden');
};

const hideLoadMoreButton = () => {
  moreBtn.classList.add('is-hidden');
}

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton
};
