'use strict';

(function () {

  // Загрузка данных с сервера
  let onError = function () {};
  let onSuccess = function (data) {
    window.gallery.renderAllCards(data);
    window.sort.activateSortBlock(data);
    window.picture.activateBigPictureHandler(data);
  };
  window.connection.load(onSuccess, onError);

  // Отправка данных формы
  let imgUploadForm = document.querySelector(`.img-upload__form`);
  let successTemplate = document.querySelector(`#success`)
  .content
  .querySelector(`.success`);

  let errorTemplate = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);
  let main = document.querySelector(`main`);

  let success = successTemplate.cloneNode(true);
  let successButton = success.querySelector(`.success__button`);
  let onPostSuccess = function () {
    window.popup.closePopup();
    main.appendChild(success);

    successButton.addEventListener(`click`, onSuccessButtonClick);
    document.addEventListener(`keydown`, onSuccessEscPress);
    document.addEventListener(`click`, onResultBackgroundClick);
  };

  let onSuccessButtonClick = function () {
    hideResultForm(success, removeSuccessEventListeners);
  };
  let onSuccessEscPress = function (evt) {
    if (evt.keyCode === window.utility.ESC_KEYCODE) {
      hideResultForm(success, removeSuccessEventListeners);
    }
  };
  let removeSuccessEventListeners = function () {
    document.removeEventListener(`click`, onResultBackgroundClick);
    document.removeEventListener(`keydown`, onSuccessEscPress);
    successButton.removeEventListener(`click`, onSuccessButtonClick);
  };

  let onResultBackgroundClick = function (event) {
    if (event.target === success || event.target === error) {
      hideResultForm(event.target, removeSuccessEventListeners);
    }
  };

  let error = errorTemplate.cloneNode(true);
  let errorButton = error.querySelectorAll(`.error__button`);
  let onPostError = function () {
    window.popup.closePopup();
    main.appendChild(error);

    let onErrorButtonClick = function (radioButtons) {
      radioButtons.addEventListener(`click`, function () {
        hideResultForm(error, removeErrorEventListeners);
      });
    };
    errorButton.forEach(function (item) {
      onErrorButtonClick(item);
    });

    document.addEventListener(`keydown`, onErrorEscPress);
    document.addEventListener(`click`, onResultBackgroundClick);
  };

  let onErrorEscPress = function (evt) {
    if (evt.keyCode === window.utility.ESC_KEYCODE) {
      hideResultForm(error, removeErrorEventListeners);
    }
  };
  let removeErrorEventListeners = function () {
    document.removeEventListener(`click`, onResultBackgroundClick);
    document.removeEventListener(`keydown`, onErrorEscPress);
  };

  imgUploadForm.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.connection.upload(
        new FormData(imgUploadForm),
        onPostSuccess,
        onPostError
    );
  });

  let hideResultForm = function (result, removeEventListeners) {
    removeEventListeners();
    result.classList.add(`hidden`);
    if (main === result.parentNode) {
      main.removeChild(result);
    }
  };
})();
