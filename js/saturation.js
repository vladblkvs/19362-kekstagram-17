'use strict';

(function () {
  window.saturation = {};

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadPreview = document.querySelector('.img-upload__preview');
  var effectLevelBlock = imgUploadOverlay.querySelector('.effect-level');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var effectLevelValue = effectLevelBlock.querySelector('.effect-level__value').value; // Значение насыщенности фильтра

  var getLevelLineLength = function () {
    return effectLevelBlock.querySelector('.effect-level__line').offsetWidth;
  };

  window.saturation.resetPinPosition = function () {
    effectLevelPin.style.left = window.utility.MAX_PERCENT + '%'; // Сброс позиции пина
    effectLevelDepth.style.width = effectLevelPin.style.left;
  };

  window.saturation.onLevelPinUse = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftRange = {
        x: startCoords.x - moveEvt.clientX,
        min: 0,
        max: getLevelLineLength()
      };

      var currentPinPosition = effectLevelPin.offsetLeft - shiftRange.x;
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (currentPinPosition >= shiftRange.min && currentPinPosition <= shiftRange.max) {
        effectLevelPin.style.left = currentPinPosition + 'px';
        effectLevelDepth.style.width = effectLevelPin.style.left;
      }

      var getEffectLevel = function (effectRange) {
        effectLevelValue = Math.round(currentPinPosition / getLevelLineLength() * window.utility.MAX_PERCENT);
        return effectLevelValue / window.utility.MAX_PERCENT * (effectRange.max - effectRange.min) + effectRange.min;
      };

      var changeEffectLevelStyle = function () {
        switch (true) {
          case uploadPreview.classList.contains('effects__preview--chrome'):
            uploadPreview.style.filter = window.filters.effects['effect-chrome'].cssStyle + '(' + getEffectLevel(window.filters.effects['effect-chrome']) + ')';
            break;
          case uploadPreview.classList.contains('effects__preview--sepia'):
            uploadPreview.style.filter = window.filters.effects['effect-sepia'].cssStyle + '(' + getEffectLevel(window.filters.effects['effect-sepia']) + ')';
            break;
          case uploadPreview.classList.contains('effects__preview--marvin'):
            uploadPreview.style.filter = window.filters.effects['effect-marvin'].cssStyle + '(' + getEffectLevel(window.filters.effects['effect-marvin']) + '%)';
            break;
          case uploadPreview.classList.contains('effects__preview--phobos'):
            uploadPreview.style.filter = window.filters.effects['effect-phobos'].cssStyle + '(' + getEffectLevel(window.filters.effects['effect-phobos']) + 'px)';
            break;
          case uploadPreview.classList.contains('effects__preview--heat'):
            uploadPreview.style.filter = window.filters.effects['effect-heat'].cssStyle + '(' + getEffectLevel(window.filters.effects['effect-heat']) + ')';
            break;
        }
      };
      changeEffectLevelStyle();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
})();
