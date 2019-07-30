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

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  window.saturation.resetPinPosition = function () {
    effectLevelPin.style.left = window.utility.MAX_PERCENT + '%'; // Сброс позиции пина
    effectLevelDepth.style.width = effectLevelPin.style.left;
  };

  window.saturation.onSliderLevelChange = function (evt) {
    evt.preventDefault();

    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftRange = new Coordinate((startCoords.x - moveEvt.clientX), (startCoords.y - moveEvt.clientY));
      shiftRange.min = 0;
      shiftRange.max = getLevelLineLength();

      var currentPinPosition = effectLevelPin.offsetLeft - shiftRange.x;
      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);
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
            uploadPreview.style.filter = window.effects['effect-chrome'].cssStyle + '(' + getEffectLevel(window.effects['effect-chrome']) + ')';
            break;
          case uploadPreview.classList.contains('effects__preview--sepia'):
            uploadPreview.style.filter = window.effects['effect-sepia'].cssStyle + '(' + getEffectLevel(window.effects['effect-sepia']) + ')';
            break;
          case uploadPreview.classList.contains('effects__preview--marvin'):
            uploadPreview.style.filter = window.effects['effect-marvin'].cssStyle + '(' + getEffectLevel(window.effects['effect-marvin']) + '%)';
            break;
          case uploadPreview.classList.contains('effects__preview--phobos'):
            uploadPreview.style.filter = window.effects['effect-phobos'].cssStyle + '(' + getEffectLevel(window.effects['effect-phobos']) + 'px)';
            break;
          case uploadPreview.classList.contains('effects__preview--heat'):
            uploadPreview.style.filter = window.effects['effect-heat'].cssStyle + '(' + getEffectLevel(window.effects['effect-heat']) + ')';
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
