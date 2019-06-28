'use strict';

(function () {
  window.scale = {};

  var scaleValue = window.gallery.imgUploadOverlay.querySelector('.scale__control--value').value;
  window.scale.numericalScaleValue = parseInt(scaleValue, 10);
  window.scale.scaleSmaller = window.gallery.imgUploadOverlay.querySelector('.scale__control--smaller');
  window.scale.scaleBigger = window.gallery.imgUploadOverlay.querySelector('.scale__control--bigger');

  var scaleRange = {
    max: 100,
    min: 25,
    step: 25
  };

  window.scale.onScaleBtnClick = function (evt) {
    if (evt.target === window.scale.scaleSmaller) {
      if (window.scale.numericalScaleValue - scaleRange.step < scaleRange.min) {
        window.scale.numericalScaleValue = scaleRange.min;
        return;
      } else {
        window.scale.numericalScaleValue -= scaleRange.step;
      }
    } else if (evt.target === window.scale.scaleBigger) {
      if (window.scale.numericalScaleValue + scaleRange.step > scaleRange.max) {
        window.scale.numericalScaleValue = scaleRange.max;
        return;
      } else {
        window.scale.numericalScaleValue += scaleRange.step;
      }
    }
    scaleValue = window.scale.numericalScaleValue + '%';
    window.gallery.imgUploadOverlay.querySelector('.scale__control--value').value = scaleValue;
    window.filters.uploadPreview.style.transform = 'scale(' + (window.scale.numericalScaleValue / window.data.MAX_PERCENT) + ')';
  };
})();
