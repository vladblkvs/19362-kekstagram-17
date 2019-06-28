'use strict';

(function () {
  window.saturation = {};

  var effectLevelBlock = window.gallery.imgUploadOverlay.querySelector('.effect-level');
  window.saturation.effectLevelValue = effectLevelBlock.querySelector('.effect-level__value').value; // Значение насыщенности фильтра

  window.saturation.hideLevelBlock = function () {
    effectLevelBlock.classList.add('hidden');
  };

  window.saturation.showLevelBlock = function () {
    effectLevelBlock.classList.remove('hidden');
  };

  var getLevelLineLength = function () {
    return effectLevelBlock.querySelector('.effect-level__line').offsetWidth;
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

      var currentPinPosition = window.filters.effectLevelPin.offsetLeft - shiftRange.x;
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (currentPinPosition >= shiftRange.min && currentPinPosition <= shiftRange.max) {
        window.filters.effectLevelPin.style.left = currentPinPosition + 'px';
        window.filters.effectLevelDepth.style.width = window.filters.effectLevelPin.style.left;
      }

      var getEffectLevel = function (effectRange) {
        var effectLevel = Math.round((currentPinPosition * (effectRange.max - effectRange.min) / getLevelLineLength()) * window.data.MAX_PERCENT) / window.data.MAX_PERCENT + effectRange.min;
        if (effectLevel < effectRange.min) {
          effectLevel = effectRange.min;
        } else if (effectLevel > effectRange.max) {
          effectLevel = effectRange.max;
        }
        return effectLevel;
      };

      var changeEffectLevelStyle = function () {
        switch (true) {
          case window.filters.uploadPreview.classList.contains('effects__preview--chrome'):
            window.filters.uploadPreview.style.filter = window.filters.effects['effect-chrome'].cssStyle + '(' + getEffectLevel(window.filters.effects['effect-chrome']) + ')';
            break;
          case window.filters.uploadPreview.classList.contains('effects__preview--sepia'):
            window.filters.uploadPreview.style.filter = window.filters.effects['effect-sepia'].cssStyle + '(' + getEffectLevel(window.filters.effects['effect-sepia']) + ')';
            break;
          case window.filters.uploadPreview.classList.contains('effects__preview--marvin'):
            window.filters.uploadPreview.style.filter = window.filters.effects['effect-marvin'].cssStyle + '(' + getEffectLevel(window.filters.effects['effect-marvin']) + '%)';
            break;
          case window.filters.uploadPreview.classList.contains('effects__preview--phobos'):
            window.filters.uploadPreview.style.filter = window.filters.effects['effect-phobos'].cssStyle + '(' + getEffectLevel(window.filters.effects['effect-phobos']) + 'px)';
            break;
          case window.filters.uploadPreview.classList.contains('effects__preview--heat'):
            window.filters.uploadPreview.style.filter = window.filters.effects['effect-heat'].cssStyle + '(' + getEffectLevel(window.filters.effects['effect-heat']) + ')';
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
