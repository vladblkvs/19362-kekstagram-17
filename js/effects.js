'use strict';

(function () {
  window.effects = {
    'effect-none': {
      class: `effects__preview--none`,
      cssStyle: `none`
    },
    'effect-chrome': {
      class: `effects__preview--chrome`,
      cssStyle: `grayscale`,
      min: 0,
      max: 1
    },
    'effect-sepia': {
      class: `effects__preview--sepia`,
      cssStyle: `sepia`,
      min: 0,
      max: 1
    },
    'effect-marvin': {
      class: `effects__preview--marvin`,
      cssStyle: `invert`,
      min: 0,
      max: 100
    },
    'effect-phobos': {
      class: `effects__preview--phobos`,
      cssStyle: `blur`,
      min: 0,
      max: 3
    },
    'effect-heat': {
      class: `effects__preview--heat`,
      cssStyle: `brightness`,
      min: 1,
      max: 3
    }
  };

  let thumbnails = document.querySelectorAll(`.effects__radio`);
  let effectLevelBlock = document.querySelector(`.effect-level`);
  let uploadPreview = document.querySelector(`.img-upload__preview`);

  let onThumbnailClick = function (thumbnail, effect) {
    thumbnail.addEventListener(`click`, function () {
      window.popup.resetEffectAttributes(uploadPreview, effect.class);
      if (uploadPreview.classList.contains(`effects__preview--none`)) {
        effectLevelBlock.classList.add(`hidden`);
      } else {
        effectLevelBlock.classList.remove(`hidden`);
        window.saturation.resetPinPosition();
      }
    });
  };

  thumbnails.forEach(function (thumbnail) {
    onThumbnailClick(thumbnail, window.effects[thumbnail.id]);
  });
})();
