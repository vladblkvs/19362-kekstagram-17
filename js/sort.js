'use strict';

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

/* ТАК ТОЖЕ НЕ РАБОТАЛО =(
var cards = [];
var onFilterNewClick = window.debounce(function () {
  makeFilterBtnActive(filterNew);
  var slicedCards = cards.slice();
  slicedCards = window.utility.shuffleArray(slicedCards);
  updateCards(slicedCards.slice(0, 9));
}); */

window.sort.activateSortBlock = function (data) {
  imageFilters.classList.remove('img-filters--inactive');

  filterPopular.addEventListener('click', window.debounce(function () {
    makeFilterBtnActive(filterPopular);
    updateCards(data);
  }));

  filterNew.addEventListener('click', window.debounce(function () {
    makeFilterBtnActive(filterNew);
    var slicedCards = data.slice();
    slicedCards = window.utility.shuffleArray(slicedCards);
    updateCards(slicedCards.slice(0, 9));
  }));

  filterDiscussed.addEventListener('click', window.debounce(function () {
    makeFilterBtnActive(filterDiscussed);
    var sortedCards = data.slice();
    sortedCards.sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
    updateCards(sortedCards);
  }));
};
