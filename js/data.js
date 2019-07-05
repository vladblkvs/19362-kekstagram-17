'use strict';

(function () {

  // Загрузка данных с сервера
  var URL = 'https://js.dump.academy/kekstagram/data';
  var onError = function () {};
  var onSuccess = function (data) {
    window.gallery.renderAllCards(data);
    window.sort.activateSortBlock(data);
  };
  window.load(URL, onSuccess, onError);
})();
