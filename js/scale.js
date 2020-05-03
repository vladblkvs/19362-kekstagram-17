'use strict';

(function () {
  window.scale = {};

  let imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  let uploadPreview = document.querySelector(`.img-upload__preview`);
  let scaleValue = imgUploadOverlay.querySelector(`.scale__control--value`).value;
  let numericalScaleValue = parseInt(scaleValue, 10);
  let scaleSmaller = imgUploadOverlay.querySelector(`.scale__control--smaller`);
  let scaleBigger = imgUploadOverlay.querySelector(`.scale__control--bigger`);

  let scaleRange = {
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
    scaleValue = `${numericalScaleValue}%`;
    imgUploadOverlay.querySelector(`.scale__control--value`).value = scaleValue;
    uploadPreview.style.transform = `scale(${(numericalScaleValue / window.utility.MAX_PERCENT)})`;
  };

  window.scale.resetScale = function () {
    imgUploadOverlay.querySelector(`.scale__control--value`).value = `100%`;
    numericalScaleValue = window.utility.MAX_PERCENT;
  };
})();
