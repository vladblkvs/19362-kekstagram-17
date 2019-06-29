'use strict';

(function () {
  window.popup = {};

  // Форма загрузки изображения
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadPreview = document.querySelector('.img-upload__preview');
  var effectLevelBlock = imgUploadOverlay.querySelector('.effect-level');
  var imgUploadInput = document.querySelector('.img-upload__input');
  var uploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');

  // Загрузка изображения
  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    window.scale.resetScale();
    uploadPreview.classList.add('effects__preview--none');
    document.addEventListener('keydown', onPopupEscPress);
    imgUploadOverlay.querySelector('.scale__control--smaller').addEventListener('click', window.scale.onScaleBtnClick);
    imgUploadOverlay.querySelector('.scale__control--bigger').addEventListener('click', window.scale.onScaleBtnClick);
    imgUploadOverlay.querySelector('.effect-level__pin').addEventListener('mousedown', window.saturation.onLevelPinUse);
    effectLevelBlock.classList.add('hidden');
  };

  imgUploadInput.addEventListener('change', openPopup);

  // Закрытие окна загрузки изображения
  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    window.popup.resetEffectAttributes(uploadPreview, 'effects__preview--none');
    document.removeEventListener('keydown', onPopupEscPress);
    imgUploadOverlay.querySelector('.scale__control--smaller').removeEventListener('click', window.scale.onScaleBtnClick);
    imgUploadOverlay.querySelector('.scale__control--bigger').removeEventListener('click', window.scale.onScaleBtnClick);
    imgUploadOverlay.querySelector('.effect-level__pin').removeEventListener('mousedown', window.saturation.onLevelPinUse);
  };

  var commentField = imgUploadOverlay.querySelector('.text__description');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utility.ESC_KEYCODE && commentField !== document.activeElement) {
      evt.preventDefault();
      closePopup();
      imgUploadForm.reset(); // Сброс значения выбора файла
    }
  };

  uploadCancel.addEventListener('click', closePopup);

  // Сброс классов и стилей эффектов
  window.popup.resetEffectAttributes = function (element, effect) {
    window.scale.resetScale();
    element.removeAttribute('style');
    element.classList = '';
    element.classList.add('img-upload__preview', effect);
  };

})();
