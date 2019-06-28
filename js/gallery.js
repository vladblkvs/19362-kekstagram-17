'use strict';

(function () {
  window.gallery = {};

  // Создаёт массив объектов с данными карточек
  var renderCards = function () {
    var arrCards = [];
    for (var i = 0; i < window.data.CARD_AMOUNT; i++) {
      var card = {};
      card.url = 'photos/' + (i + 1) + '.jpg';
      card.likes = window.data.getNumberInRange(window.data.MIN_LIKES_COUNT, window.data.MAX_LIKES_COUNT);
      card.comments = [];
      for (var j = 0; j < window.data.getNumberInRange(window.data.MIN_COMMENTS_COUNT, window.data.MAX_COMMENTS_COUNT); j++) {
        card.comments[j] = window.data.comment;
      }
      arrCards[i] = card;
    }
    return arrCards;
  };

  // Поиск шаблона
  var picture = document.querySelector('#picture').content.querySelector('.picture');

  // Заполняет содержимое карточки
  var renderCard = function (card) {
    var cardElement = picture.cloneNode(true);

    cardElement.querySelector('.picture__img').src = card.url;
    cardElement.querySelector('.picture__likes').textContent = card.likes;
    cardElement.querySelector('.picture__comments').textContent = window.data.getNumberInRange(window.data.MIN_COMMENTS_COUNT, window.data.MAX_COMMENTS_COUNT);

    return cardElement;
  };

  // Вставляет циклом карточки в место, определённое переменной pictureListElement
  var pictureListElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.data.CARD_AMOUNT; i++) {
    fragment.appendChild(renderCard(renderCards()[i]));
  }
  pictureListElement.appendChild(fragment);

  // Форма загрузки изображения
  var imgUploadForm = document.querySelector('.img-upload__form');
  window.gallery.imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadInput = document.querySelector('.img-upload__input');
  var uploadCancel = window.gallery.imgUploadOverlay.querySelector('.img-upload__cancel');
  var ESC_KEYCODE = 27;

  // Загрузка изображения
  var openPopup = function () {
    window.gallery.imgUploadOverlay.classList.remove('hidden');
    window.filters.uploadPreview.classList.add('effects__preview--none');
    window.gallery.imgUploadOverlay.querySelector('.scale__control--value').value = '100%';
    window.scale.numericalScaleValue = window.data.MAX_PERCENT;
    document.addEventListener('keydown', onPopupEscPress);
    window.scale.scaleSmaller.addEventListener('click', window.scale.onScaleBtnClick);
    window.scale.scaleBigger.addEventListener('click', window.scale.onScaleBtnClick);
    window.filters.effectLevelPin.addEventListener('mousedown', window.saturation.onLevelPinUse);
    window.saturation.hideLevelBlock();
  };

  imgUploadInput.addEventListener('change', openPopup);

  // Закрытие окна загрузки изображения
  var closePopup = function () {
    window.gallery.imgUploadOverlay.classList.add('hidden');
    window.gallery.resetEffectAttributes(window.filters.uploadPreview, 'effects__preview--none');
    document.removeEventListener('keydown', onPopupEscPress);
    window.scale.scaleSmaller.removeEventListener('click', window.scale.onScaleBtnClick);
    window.scale.scaleBigger.removeEventListener('click', window.scale.onScaleBtnClick);
    window.filters.effectLevelPin.removeEventListener('mousedown', window.saturation.onLevelPinUse);
  };

  var commentField = window.gallery.imgUploadOverlay.querySelector('.text__description');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && commentField !== document.activeElement) {
      evt.preventDefault();
      closePopup();
      imgUploadForm.reset(); // Сброс значения выбора файла
    }
  };

  uploadCancel.addEventListener('click', closePopup);

  // Сброс классов и стилей эффектов
  window.gallery.resetEffectAttributes = function (element, effect) {
    window.gallery.imgUploadOverlay.querySelector('.scale__control--value').value = '100%';
    window.scale.numericalScaleValue = window.data.MAX_PERCENT;
    element.removeAttribute('style');
    element.classList = '';
    element.classList.add('img-upload__preview', effect);
  };

})();
