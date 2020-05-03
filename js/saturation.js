'use strict';

(function () {
  window.saturation = {};

  let imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  let uploadPreview = document.querySelector(`.img-upload__preview`);
  let effectLevelBlock = imgUploadOverlay.querySelector(`.effect-level`);
  let effectLevelPin = imgUploadOverlay.querySelector(`.effect-level__pin`);
  let effectLevelDepth = imgUploadOverlay.querySelector(`.effect-level__depth`);
  let effectLevelValue = effectLevelBlock.querySelector(`.effect-level__value`).value; // Значение насыщенности фильтра

  let getLevelLineLength = function () {
    return effectLevelBlock.querySelector(`.effect-level__line`).offsetWidth;
  };

  class Coordinate {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  window.saturation.resetPinPosition = function () {
    effectLevelPin.style.left = `${window.utility.MAX_PERCENT}%`; // Сброс позиции пина
    effectLevelDepth.style.width = effectLevelPin.style.left;
  };

  window.saturation.onSliderLevelChange = function (evt) {
    evt.preventDefault();

    let startCoords = new Coordinate(evt.clientX, evt.clientY);

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      let shiftRange = new Coordinate((startCoords.x - moveEvt.clientX), (startCoords.y - moveEvt.clientY));
      shiftRange.min = 0;
      shiftRange.max = getLevelLineLength();

      let currentPinPosition = effectLevelPin.offsetLeft - shiftRange.x;
      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);
      if (currentPinPosition >= shiftRange.min && currentPinPosition <= shiftRange.max) {
        effectLevelPin.style.left = `${currentPinPosition}px`;
        effectLevelDepth.style.width = effectLevelPin.style.left;
      }

      let getEffectLevel = function (effectRange) {
        effectLevelValue = Math.round(currentPinPosition / getLevelLineLength() * window.utility.MAX_PERCENT);
        return effectLevelValue / window.utility.MAX_PERCENT * (effectRange.max - effectRange.min) + effectRange.min;
      };

      let changeEffectLevelStyle = function () {
        switch (true) {
          case uploadPreview.classList.contains(`effects__preview--chrome`):
            uploadPreview.style.filter = `${window.effects[`effect-chrome`].cssStyle}(${getEffectLevel(window.effects[`effect-chrome`])})`;
            break;
          case uploadPreview.classList.contains(`effects__preview--sepia`):
            uploadPreview.style.filter = `${window.effects[`effect-sepia`].cssStyle}(${getEffectLevel(window.effects[`effect-sepia`])})`;
            break;
          case uploadPreview.classList.contains(`effects__preview--marvin`):
            uploadPreview.style.filter = `${window.effects[`effect-marvin`].cssStyle}(${getEffectLevel(window.effects[`effect-marvin`])}%)`;
            break;
          case uploadPreview.classList.contains(`effects__preview--phobos`):
            uploadPreview.style.filter = `${window.effects[`effect-phobos`].cssStyle}(${getEffectLevel(window.effects[`effect-phobos`])}px)`;
            break;
          case uploadPreview.classList.contains(`effects__preview--heat`):
            uploadPreview.style.filter = `${window.effects[`effect-heat`].cssStyle}(${getEffectLevel(window.effects[`effect-heat`])})`;
            break;
        }
      };
      changeEffectLevelStyle();
    };

    let onMouseUp = function () {
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };
})();
