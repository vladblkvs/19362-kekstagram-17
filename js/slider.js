'use strict';

(function () {
  window.slider = {};

  let imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
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

  window.slider.onSlide = function (evt) {
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

      window.effects.changeLevel(getEffectLevel);
    };

    let onMouseUp = function () {
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };
})();
