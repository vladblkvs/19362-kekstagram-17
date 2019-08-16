'use strict';

(function () {
  window.popup = {};

  var MAX_HASHTAGS = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var HashtagErrorText = {
    HASHTAG_BEGINNING: 'Хэш-тег должен начинаться с символа # (решётка).',
    ALONE_HASH_SYMBOL: 'Хэш-тег не может состоять только из одной решётки.',
    SEPARATOR: 'Хэш-теги разделяются пробелами. ',
    HASHTAG_REDUPLICATION: 'Один и тот же хэш-тег не может быть использован дважды.',
    HASHTAG_AMOUNT: 'Не более пяти хэш-тегов. ',
    HASHTAG_MAX_LENGTH: 'Максимальная длина одного хэш-тега 20 символов.'
  };

  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadPreview = document.querySelector('.img-upload__preview');
  var effectLevelBlock = imgUploadOverlay.querySelector('.effect-level');
  var imgUploadInput = document.querySelector('.img-upload__input');
  var uploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var scaleSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
  var preview = document.querySelector('.img-upload__preview img');

  var openPopup = function () {
    imgUploadOverlay.classList.remove('hidden');
    window.scale.resetScale();
    uploadPreview.classList.add('effects__preview--none');
    imgUploadInput.removeEventListener('change', openPopup);
    uploadCancel.addEventListener('click', window.popup.closePopup);
    document.addEventListener('keydown', onPopupEscPress);
    scaleSmaller.addEventListener('click', window.scale.onScaleBtnClick);
    scaleBigger.addEventListener('click', window.scale.onScaleBtnClick);
    effectLevelPin.addEventListener('mousedown', window.saturation.onSliderLevelChange);
    effectLevelBlock.classList.add('hidden');
  };

  // Закрытие окна загрузки изображения
  window.popup.closePopup = function () {
    imgUploadOverlay.classList.add('hidden');
    window.popup.resetEffectAttributes(uploadPreview, 'effects__preview--none');
    imgUploadInput.addEventListener('change', openPopup);
    uploadCancel.removeEventListener('click', window.popup.closePopup);
    document.removeEventListener('keydown', onPopupEscPress);
    scaleSmaller.removeEventListener('click', window.scale.onScaleBtnClick);
    scaleBigger.removeEventListener('click', window.scale.onScaleBtnClick);
    effectLevelPin.removeEventListener('mousedown', window.saturation.onSliderLevelChange);
    imgUploadForm.reset(); // Сброс значения выбора файла
  };

  var loadFile = function (fileSource) {
    var file = fileSource;
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    var reader = new FileReader();
    if (matches) {
      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  // Drag-n-Drop файла для загрузки
  imgUploadForm.ondragover = function (evt) {
    evt.preventDefault();
  };

  imgUploadForm.ondragenter = function (evt) {
    evt.preventDefault();
    this.style = 'background-image: none;';
  };

  imgUploadForm.ondragleave = function (evt) {
    evt.preventDefault();
    this.removeAttribute('style');
  };

  imgUploadForm.ondrop = function (evt) {
    evt.preventDefault();
    this.removeAttribute('style');
    loadFile(evt.dataTransfer.files[0]);
    openPopup();
  };

  var onUploadInputPress = function () {
    loadFile(imgUploadInput.files[0]);
    openPopup();
  };
  imgUploadInput.addEventListener('change', onUploadInputPress);

  var commentField = imgUploadOverlay.querySelector('.text__description');
  var hashTagField = imgUploadOverlay.querySelector('.text__hashtags');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utility.ESC_KEYCODE && commentField !== document.activeElement && hashTagField !== document.activeElement) {
      evt.preventDefault();
      window.popup.closePopup();
    }
  };

  // Сброс классов и стилей эффектов
  window.popup.resetEffectAttributes = function (element, effect) {
    window.scale.resetScale();
    element.removeAttribute('style');
    element.classList = '';
    element.classList.add('img-upload__preview', effect);
  };

  var checkHashtagAmount = function (arr) {
    if (arr.length > MAX_HASHTAGS) {
      return HashtagErrorText.HASHTAG_AMOUNT;
    }
    return '';
  };

  var checkAloneHashSymbol = function (arr) {
    var result = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === '#') {
        result = HashtagErrorText.ALONE_HASH_SYMBOL;
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
          result = HashtagErrorText.SEPARATOR;
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
        result = HashtagErrorText.HASHTAG_BEGINNING;
        break;
      }
    }
    return result;
  };

  var checkHashtagMaxLength = function (arr) {
    var result = '';
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > MAX_HASHTAG_LENGTH) {
        result = HashtagErrorText.HASHTAG_MAX_LENGTH;
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
          result = HashtagErrorText.HASHTAG_REDUPLICATION;
          flag = true;
          break;
        }
        result = '';
      }
    }
    return result;
  };

  var getHashtagMistakes = function (arrHashtags) {
    return [
      checkHashtagAmount(arrHashtags),
      checkAloneHashSymbol(arrHashtags),
      checkSeparator(arrHashtags),
      checkHashtagBeginning(arrHashtags),
      checkHashtagMaxLength(arrHashtags),
      checkHashtagReduplication(arrHashtags)
    ];
  };

  var onHashtagInput = function () {
    var hashTags = hashTagField.value.trim().split(' ');
    hashTagField.setCustomValidity(getHashtagMistakes(hashTags).join(' '));
  };
  hashTagField.addEventListener('change', onHashtagInput);
})();
