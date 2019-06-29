'use strict';

(function () {
  window.scale = {};

  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadPreview = document.querySelector('.img-upload__preview');
  var scaleValue = imgUploadOverlay.querySelector('.scale__control--value').value;
  var numericalScaleValue = parseInt(scaleValue, 10);
  var scaleSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
  var scaleBigger = imgUploadOverlay.querySelector('.scale__control--bigger');

  var scaleRange = {
    max: 100,
    min: 25,
    step: 25
  };

  window.scale.onScaleBtnClick = function (evt) {
    if (evt.target === scaleSmaller) {
      if (numericalScaleValue - scaleRange.step < scaleRange.min) {
        numericalScaleValue = scaleRange.min;
        return;
      } else {
        numericalScaleValue -= scaleRange.step;
      }
    } else if (evt.target === scaleBigger) {
      if (numericalScaleValue + scaleRange.step > scaleRange.max) {
        numericalScaleValue = scaleRange.max;
        return;
      } else {
        numericalScaleValue += scaleRange.step;
      }
    }
    scaleValue = numericalScaleValue + '%';
    imgUploadOverlay.querySelector('.scale__control--value').value = scaleValue;
    uploadPreview.style.transform = 'scale(' + (numericalScaleValue / window.utility.MAX_PERCENT) + ')';
  };

  window.scale.resetScale = function () {
    imgUploadOverlay.querySelector('.scale__control--value').value = '100%';
    numericalScaleValue = window.utility.MAX_PERCENT;
  };
})();
