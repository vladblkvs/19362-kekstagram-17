'use strict';

(function () {

  // Загрузка данных с сервера
  var onError = function () {};
  var onSuccess = function (data) {
    window.gallery.renderAllCards(data);
    window.sort.activateSortBlock(data);
    window.picture.activateBigPictureHandler(data);
  };
  window.connection.load(onSuccess, onError);

  // Отправка данных формы
  var imgUploadForm = document.querySelector('.img-upload__form');
  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var main = document.querySelector('main');

  var success = successTemplate.cloneNode(true);
  var successButton = success.querySelector('.success__button');
  var onPostSuccess = function () {
    window.popup.closePopup();
    main.appendChild(success);

    successButton.addEventListener('click', onSuccessButtonClick);
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onResultBackgroundClick);
  };

  var onSuccessButtonClick = function () {
    hideResultForm(success, removeSuccessEventListeners);
  };
  var onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.utility.ESC_KEYCODE) {
      hideResultForm(success, removeSuccessEventListeners);
    }
  };
  var removeSuccessEventListeners = function () {
    document.removeEventListener('click', onResultBackgroundClick);
    document.removeEventListener('keydown', onSuccessEscPress);
    successButton.removeEventListener('click', onSuccessButtonClick);
  };

  var onResultBackgroundClick = function (event) {
    if (event.target === success || event.target === error) {
      hideResultForm(event.target, removeSuccessEventListeners);
    }
  };

  var error = errorTemplate.cloneNode(true);
  var errorButton = error.querySelectorAll('.error__button');
  var onPostError = function () {
    window.popup.closePopup();
    main.appendChild(error);

    var onErrorButtonClick = function (radioButtons) {
      radioButtons.addEventListener('click', function () {
        hideResultForm(error, removeErrorEventListeners);
      });
    };
    errorButton.forEach(function (item) {
      onErrorButtonClick(item);
    });

    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onResultBackgroundClick);
  };

  var onErrorEscPress = function (evt) {
    if (evt.keyCode === window.utility.ESC_KEYCODE) {
      hideResultForm(error, removeErrorEventListeners);
    }
  };
  var removeErrorEventListeners = function () {
    document.removeEventListener('click', onResultBackgroundClick);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.connection.upload(
        new FormData(imgUploadForm),
        onPostSuccess,
        onPostError
    );
  });

  var hideResultForm = function (result, removeEventListeners) {
    removeEventListeners();
    result.classList.add('hidden');
    if (main === result.parentNode) {
      main.removeChild(result);
    }
  };
})();
