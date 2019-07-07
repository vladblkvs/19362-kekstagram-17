'use strict';

(function () {
  window.sort = {};

  var imageFilters = document.querySelector('.img-filters');
  var filterButtons = imageFilters.querySelectorAll('.img-filters__button');
  var filterPopular = imageFilters.querySelector('#filter-popular');
  var filterNew = imageFilters.querySelector('#filter-new');
  var filterDiscussed = imageFilters.querySelector('#filter-discussed');

  var updateCards = function (currentCards) {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (picture) {
      picture.remove();
    });
    window.gallery.renderAllCards(currentCards);
  };

  var makeFilterBtnActive = function (btn) {
    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
      btn.classList.add('img-filters__button--active');
    }
  };

  var cards = [];
  var onFilterBtnClick = window.debounce(function (evt) {
    makeFilterBtnActive(evt.target);
    var slicedCards = cards.slice();
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
    imageFilters.classList.remove('img-filters--inactive');
    cards = data;
    filterPopular.addEventListener('click', onFilterBtnClick);
    filterNew.addEventListener('click', onFilterBtnClick);
    filterDiscussed.addEventListener('click', onFilterBtnClick);
  };
})();
