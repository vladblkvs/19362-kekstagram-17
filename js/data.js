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
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
  var main = document.querySelector('main');

  var onPostSuccess = function () {
    window.popup.closePopup();
    imgUploadOverlay.classList.add('hidden');
    var success = successTemplate.cloneNode(true);
    main.appendChild(success);
    var successButton = success.querySelector('.success__button');

    var onSuccessButtonClick = function () {
      hideResultForm(success, removeSuccessEventListeners);
    };
    successButton.addEventListener('click', onSuccessButtonClick);

    var onSuccessEscPress = function (evt) {
      if (evt.keyCode === window.utility.ESC_KEYCODE) {
        hideResultForm(success, removeSuccessEventListeners);
      }
    };
    document.addEventListener('keydown', onSuccessEscPress);

    var onSuccessBackgroundClick = function (event) {
      if (event.target === success) {
        hideResultForm(success, removeSuccessEventListeners);
      }
    };
    document.addEventListener('click', onSuccessBackgroundClick);

    var removeSuccessEventListeners = function () {
      document.removeEventListener('click', onSuccessBackgroundClick);
      document.removeEventListener('keydown', onSuccessEscPress);
      successButton.removeEventListener('click', onSuccessButtonClick);
    };
  };

  var onPostError = function () {
    window.popup.closePopup();
    imgUploadOverlay.classList.add('hidden');
    var error = errorTemplate.cloneNode(true);
    main.appendChild(error);
    var errorButton = error.querySelectorAll('.error__button');

    var onErrorButtonClick = function (radioArr) {
      radioArr.addEventListener('click', function () {
        hideResultForm(error, removeErrorEventListeners);
      });
    };
    errorButton.forEach(function (item) {
      onErrorButtonClick(item);
    });

    var onErrorEscPress = function (evt) {
      if (evt.keyCode === window.utility.ESC_KEYCODE) {
        hideResultForm(error, removeErrorEventListeners);
      }
    };
    document.addEventListener('keydown', onErrorEscPress);

    var removeErrorEventListeners = function () {
      document.removeEventListener('keydown', onErrorEscPress);
    };
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
