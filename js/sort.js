'use strict';

(function () {
  window.sort = {};

  let imageFilters = document.querySelector(`.img-filters`);
  let filterButtons = imageFilters.querySelectorAll(`.img-filters__button`);
  let filterPopular = imageFilters.querySelector(`#filter-popular`);
  let filterNew = imageFilters.querySelector(`#filter-new`);
  let filterDiscussed = imageFilters.querySelector(`#filter-discussed`);

  let updateCards = function (currentCards) {
    let pictures = document.querySelectorAll(`.picture`);
    pictures.forEach(function (picture) {
      picture.remove();
    });
    window.gallery.renderAllCards(currentCards);
  };

  let makeFilterBtnActive = function (btn) {
    filterButtons.forEach(function (filterButton) {
      filterButton.classList.remove(`img-filters__button--active`);
    });
    btn.classList.add(`img-filters__button--active`);
  };

  let cards = [];
  let onFilterBtnClick = window.utility.debounce(function (evt) {
    makeFilterBtnActive(evt.target);
    let slicedCards = cards.slice();
    if (evt.target === filterNew) {
      slicedCards = window.utility.shuffleArray(slicedCards).slice(0, 10);
    } else if (evt.target === filterDiscussed) {
      slicedCards.sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
    }
    updateCards(slicedCards);
    window.picture.activateBigPictureHandler(slicedCards);
  });

  window.sort.activateSortBlock = function (data) {
    imageFilters.classList.remove(`img-filters--inactive`);
    cards = data;
    filterPopular.addEventListener(`click`, onFilterBtnClick);
    filterNew.addEventListener(`click`, onFilterBtnClick);
    filterDiscussed.addEventListener(`click`, onFilterBtnClick);
  };
})();
