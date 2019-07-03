'use strict';

(function () {
  // Загрузка данных с сервера
  var onError = function () {};
  var onSuccess = function (data) {
    window.gallery.renderAllCards(data);
  };
  window.load('https://js.dump.academy/kekstagram/data', onSuccess, onError);
})();
