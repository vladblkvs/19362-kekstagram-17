'use strict';

(function () {
  window.effects = {};

  let effects = {
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

  let effectLevelBlock = document.querySelector(`.effect-level`);
  let uploadPreview = document.querySelector(`.img-upload__preview`);
  let effectLevelPin = document.querySelector(`.effect-level__pin`);
  let effectLevelDepth = document.querySelector(`.effect-level__depth`);

  let resetSaturation = function () {
    effectLevelPin.style.left = `${window.utility.MAX_PERCENT}%`; // Сброс позиции пина
    effectLevelDepth.style.width = effectLevelPin.style.left;
  };

  window.effects.onThumbnailClick = function (evt) {
    if (evt.target.classList.contains(`effects__radio`)) {
      let effect = effects[evt.target.id];
      window.popup.resetEffectAttributes(uploadPreview, effect.class);
      if (uploadPreview.classList.contains(`effects__preview--none`)) {
        effectLevelBlock.classList.add(`hidden`);
      } else {
        effectLevelBlock.classList.remove(`hidden`);
        resetSaturation();
      }
    }
  };

  window.effects.changeLevel = function (action) {
    switch (true) {
      case uploadPreview.classList.contains(`effects__preview--chrome`):
        uploadPreview.style.filter = `${effects[`effect-chrome`].cssStyle}(${action(effects[`effect-chrome`])})`;
        break;
      case uploadPreview.classList.contains(`effects__preview--sepia`):
        uploadPreview.style.filter = `${effects[`effect-sepia`].cssStyle}(${action(effects[`effect-sepia`])})`;
        break;
      case uploadPreview.classList.contains(`effects__preview--marvin`):
        uploadPreview.style.filter = `${effects[`effect-marvin`].cssStyle}(${action(effects[`effect-marvin`])}%)`;
        break;
      case uploadPreview.classList.contains(`effects__preview--phobos`):
        uploadPreview.style.filter = `${effects[`effect-phobos`].cssStyle}(${action(effects[`effect-phobos`])}px)`;
        break;
      case uploadPreview.classList.contains(`effects__preview--heat`):
        uploadPreview.style.filter = `${effects[`effect-heat`].cssStyle}(${action(effects[`effect-heat`])})`;
        break;
    }
  };
})();
