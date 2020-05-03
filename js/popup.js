'use strict';

(function () {
  window.popup = {};

  const MAX_HASHTAGS = 5;
  const MAX_HASHTAG_LENGTH = 20;
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
  let HashtagErrorText = {
    HASHTAG_BEGINNING: `Хэш-тег должен начинаться с символа # (решётка).`,
    ALONE_HASH_SYMBOL: `Хэш-тег не может состоять только из одной решётки.`,
    SEPARATOR: `Хэш-теги разделяются пробелами. `,
    HASHTAG_REDUPLICATION: `Один и тот же хэш-тег не может быть использован дважды.`,
    HASHTAG_AMOUNT: `Не более пяти хэш-тегов. `,
    HASHTAG_MAX_LENGTH: `Максимальная длина одного хэш-тега 20 символов.`
  };

  let imgUploadForm = document.querySelector(`.img-upload__form`);
  let imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  let uploadPreview = document.querySelector(`.img-upload__preview`);
  let effectLevelBlock = imgUploadOverlay.querySelector(`.effect-level`);
  let imgUploadInput = document.querySelector(`.img-upload__input`);
  let uploadCancel = imgUploadOverlay.querySelector(`.img-upload__cancel`);
  let effectLevelPin = imgUploadOverlay.querySelector(`.effect-level__pin`);
  let scaleSmaller = imgUploadOverlay.querySelector(`.scale__control--smaller`);
  let scaleBigger = imgUploadOverlay.querySelector(`.scale__control--bigger`);
  let preview = document.querySelector(`.img-upload__preview img`);
  let thumbnails = document.querySelector(`.effects__list`);

  let openPopup = function () {
    imgUploadOverlay.classList.remove(`hidden`);
    window.scale.resetScale();
    uploadPreview.classList.add(`effects__preview--none`);
    imgUploadInput.removeEventListener(`change`, openPopup);
    uploadCancel.addEventListener(`click`, window.popup.closePopup);
    document.addEventListener(`keydown`, onPopupEscPress);
    scaleSmaller.addEventListener(`click`, window.scale.onScaleBtnClick);
    scaleBigger.addEventListener(`click`, window.scale.onScaleBtnClick);
    effectLevelPin.addEventListener(`mousedown`, window.slider.onSlide);
    thumbnails.addEventListener(`click`, window.effects.onThumbnailClick);
    effectLevelBlock.classList.add(`hidden`);
  };

  // Закрытие окна загрузки изображения
  window.popup.closePopup = function () {
    imgUploadOverlay.classList.add(`hidden`);
    window.popup.resetEffectAttributes(uploadPreview, `effects__preview--none`);
    imgUploadInput.addEventListener(`change`, openPopup);
    uploadCancel.removeEventListener(`click`, window.popup.closePopup);
    document.removeEventListener(`keydown`, onPopupEscPress);
    scaleSmaller.removeEventListener(`click`, window.scale.onScaleBtnClick);
    scaleBigger.removeEventListener(`click`, window.scale.onScaleBtnClick);
    effectLevelPin.removeEventListener(`mousedown`, window.slider.onSlide);
    thumbnails.removeEventListener(`click`, window.effects.onThumbnailClick);
    imgUploadForm.reset(); // Сброс значения выбора файла
  };

  let loadFile = function (fileSource) {
    let file = fileSource;
    let fileName = file.name.toLowerCase();
    let matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    let reader = new FileReader();
    if (matches) {
      reader.addEventListener(`load`, function () {
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
    this.style = `background-image: none;`;
  };

  imgUploadForm.ondragleave = function (evt) {
    evt.preventDefault();
    this.removeAttribute(`style`);
  };

  imgUploadForm.ondrop = function (evt) {
    evt.preventDefault();
    this.removeAttribute(`style`);
    loadFile(evt.dataTransfer.files[0]);
    openPopup();
  };

  let onUploadInputPress = function () {
    loadFile(imgUploadInput.files[0]);
    openPopup();
  };
  imgUploadInput.addEventListener(`change`, onUploadInputPress);

  let commentField = imgUploadOverlay.querySelector(`.text__description`);
  let hashTagField = imgUploadOverlay.querySelector(`.text__hashtags`);

  let onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utility.ESC_KEYCODE && commentField !== document.activeElement && hashTagField !== document.activeElement) {
      evt.preventDefault();
      window.popup.closePopup();
    }
  };

  // Сброс классов и стилей эффектов
  window.popup.resetEffectAttributes = function (element, effect) {
    window.scale.resetScale();
    element.removeAttribute(`style`);
    element.classList = ``;
    element.classList.add(`img-upload__preview`, effect);
  };

  let checkHashtagAmount = function (arr) {
    if (arr.length > MAX_HASHTAGS) {
      return HashtagErrorText.HASHTAG_AMOUNT;
    }
    return ``;
  };

  let checkAloneHashSymbol = function (arr) {
    let result = ``;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === `#`) {
        result = HashtagErrorText.ALONE_HASH_SYMBOL;
        break;
      }
    }
    return result;
  };

  let checkSeparator = function (arr) {
    let result = ``;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if ((arr[i][j] === `#`) && (!(j === 0))) {
          result = HashtagErrorText.SEPARATOR;
          break;
        }
      }
    }
    return result;
  };

  let checkHashtagBeginning = function (arr) {
    let result = ``;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] !== `#`) {
        result = HashtagErrorText.HASHTAG_BEGINNING;
        break;
      }
    }
    return result;
  };

  let checkHashtagMaxLength = function (arr) {
    let result = ``;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].length > MAX_HASHTAG_LENGTH) {
        result = HashtagErrorText.HASHTAG_MAX_LENGTH;
        break;
      }
    }
    return result;
  };

  let checkHashtagReduplication = function (arr) {
    let result = ``;
    let flag = false;
    for (let i = 0; i < arr.length; i++) {
      if (flag) {
        break;
      }
      for (let j = 0; j < arr.length; j++) {
        if ((arr[i].toUpperCase() === arr[j].toUpperCase()) && (i !== j)) {
          result = HashtagErrorText.HASHTAG_REDUPLICATION;
          flag = true;
          break;
        }
        result = ``;
      }
    }
    return result;
  };

  let getHashtagMistakes = function (arrHashtags) {
    return [
      checkHashtagAmount(arrHashtags),
      checkAloneHashSymbol(arrHashtags),
      checkSeparator(arrHashtags),
      checkHashtagBeginning(arrHashtags),
      checkHashtagMaxLength(arrHashtags),
      checkHashtagReduplication(arrHashtags)
    ];
  };

  let onHashtagInput = function () {
    let hashTags = hashTagField.value.trim().split(` `);
    hashTagField.setCustomValidity(getHashtagMistakes(hashTags).join(` `));
  };
  hashTagField.addEventListener(`change`, onHashtagInput);
})();
