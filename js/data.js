'use strict';

(function () {
  // Загрузка данных с сервера
  var onError = function () {};
  var onSuccess = function (data) {
    window.gallery.renderAllCards(data);

    var imageFilters = document.querySelector('.img-filters');
    imageFilters.classList.remove('img-filters--inactive');
  };
  window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);
})();
