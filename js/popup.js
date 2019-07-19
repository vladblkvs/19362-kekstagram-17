'use strict';

(function () {
  window.popup = {};

  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadPreview = document.querySelector('.img-upload__preview');
  var effectLevelBlock = imgUploadOverlay.querySelector('.effect-level');
  var imgUploadInput = document.querySelector('.img-upload__input');
  var uploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var scaleSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleBigger = imgUploadOverlay.querySelector('.scale__control--bigger');

  // Открытие окна загрузки изображения
  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    window.scale.resetScale();
    uploadPreview.classList.add('effects__preview--none');
    imgUploadInput.removeEventListener('change', openPopup);
    uploadCancel.addEventListener('click', closePopup);
    document.addEventListener('keydown', onPopupEscPress);
    scaleSmaller.addEventListener('click', window.scale.onScaleBtnClick);
    scaleBigger.addEventListener('click', window.scale.onScaleBtnClick);
    effectLevelPin.addEventListener('mousedown', window.saturation.onSliderLevelChange);
    effectLevelBlock.classList.add('hidden');
  };

  imgUploadInput.addEventListener('change', openPopup);

  // Закрытие окна загрузки изображения
  var closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    window.popup.resetEffectAttributes(uploadPreview, 'effects__preview--none');
    imgUploadInput.addEventListener('change', openPopup);
    uploadCancel.removeEventListener('click', closePopup);
    document.removeEventListener('keydown', onPopupEscPress);
    scaleSmaller.removeEventListener('click', window.scale.onScaleBtnClick);
    scaleBigger.removeEventListener('click', window.scale.onScaleBtnClick);
    effectLevelPin.removeEventListener('mousedown', window.saturation.onSliderLevelChange);
    imgUploadForm.reset(); // Сброс значения выбора файла
  };

  var commentField = imgUploadOverlay.querySelector('.text__description');
  var hashTagField = imgUploadOverlay.querySelector('.text__hashtags');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utility.ESC_KEYCODE && commentField !== document.activeElement && hashTagField !== document.activeElement) {
      evt.preventDefault();
      closePopup();
    }
  };

  // Сброс классов и стилей эффектов
  window.popup.resetEffectAttributes = function (element, effect) {
    window.scale.resetScale();
    element.removeAttribute('style');
    element.classList = '';
    element.classList.add('img-upload__preview', effect);
  };

  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;

  var hashtagErrorText = {
    HASHTAG_BEGINNING: 'Хэш-тег должен начинаться с символа # (решётка)',
    ALONE_HASH_SYMBOL: 'Хэш-тег не может состоять только из одной решётки',
    SEPARATOR: 'Хэш-теги разделяются пробелами',
    HASHTAG_REDUPLICATION: 'Один и тот же хэш-тег не может быть использован дважды',
    HASHTAG_AMOUNT: 'Не более пяти хештегов',
    HASHTAG_MAX_LENGTH: 'Максимальная длина одного хэш-тега 20 символов'
  };

  var checkHashtagAmount = function (arr) {
    if (arr.length > MAX_HASHTAGS) {
      return hashtagErrorText.HASHTAG_AMOUNT;
    }
    return '';
  };

  var checkAloneHashSymbol = function (arr) {
    var result = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === '#') {
        result = hashtagErrorText.ALONE_HASH_SYMBOL;
        break;
      }
    }
    return result;
  };

  var checkSeparator = function (arr) {
    var result = '';
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < arr[i].length; j++) {
        if ((arr[i][j] === '#') && (!(j === 0))) {
          result = hashtagErrorText.SEPARATOR;
          break;
        }
      }
    }
    return result;
  };

  var checkHashtagBeginning = function (arr) {
    var result = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][0] !== '#') {
        result = hashtagErrorText.HASHTAG_BEGINNING;
        break;
      }
    }
    return result;
  };

  var checkHashtagMaxLength = function (arr) {
    var result = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > MAX_HASHTAG_LENGTH) {
        result = hashtagErrorText.HASHTAG_MAX_LENGTH;
        break;
      }
    }
    return result;
  };

  var checkHashtagReduplication = function (arr) {
    var result = '';
    var flag = false;
    for (var i = 0; i < arr.length; i++) {
      if (flag) {
        break;
      }
      for (var j = 0; j < arr.length; j++) {
        if ((arr[i].toUpperCase() === arr[j].toUpperCase()) && (i !== j)) {
          result = hashtagErrorText.HASHTAG_REDUPLICATION;
          flag = true;
          break;
        }
        result = '';
      }
    }
    return result;
  };

  var gethashtagsArrMistakes = function (arrHashtags) {
    var hashtagsArrMistakes = [
      checkHashtagAmount(arrHashtags),
      checkAloneHashSymbol(arrHashtags),
      checkSeparator(arrHashtags),
      checkHashtagBeginning(arrHashtags),
      checkHashtagMaxLength(arrHashtags),
      checkHashtagReduplication(arrHashtags)
    ];
    return hashtagsArrMistakes;
  };

  var onHashtagInput = function () {
    var hashTags = hashTagField.value.trim().split(' ');
    hashTagField.setCustomValidity(gethashtagsArrMistakes(hashTags).join(''));
  };
  hashTagField.addEventListener('change', onHashtagInput);
})();
