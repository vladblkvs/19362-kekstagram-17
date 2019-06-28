'use strict';

(function () {
  window.filters = {};

  var thumbnails = document.querySelectorAll('.effects__radio');
  window.filters.uploadPreview = document.querySelector('.img-upload__preview');
  window.filters.effectLevelPin = document.querySelector('.effect-level__pin');
  window.filters.effectLevelDepth = window.gallery.imgUploadOverlay.querySelector('.effect-level__depth');

  window.filters.effects = {
    'effect-none': {
      class: 'effects__preview--none',
      cssStyle: 'none'
    },
    'effect-chrome': {
      class: 'effects__preview--chrome',
      cssStyle: 'grayscale',
      min: 0,
      max: 1
    },
    'effect-sepia': {
      class: 'effects__preview--sepia',
      cssStyle: 'sepia',
      min: 0,
      max: 1
    },
    'effect-marvin': {
      class: 'effects__preview--marvin',
      cssStyle: 'invert',
      min: 0,
      max: 100
    },
    'effect-phobos': {
      class: 'effects__preview--phobos',
      cssStyle: 'blur',
      min: 0,
      max: 3
    },
    'effect-heat': {
      class: 'effects__preview--heat',
      cssStyle: 'brightness',
      min: 1,
      max: 3
    }
  };

  var onThumbnailClick = function (thumbnail, effect) {
    thumbnail.addEventListener('click', function () {
      window.gallery.resetEffectAttributes(window.filters.uploadPreview, effect.class);
      if (window.filters.uploadPreview.classList.contains('effects__preview--none')) {
        window.saturation.hideLevelBlock();
      } else {
        window.saturation.showLevelBlock();
        window.filters.effectLevelPin.style.left = window.saturation.effectLevelValue + '%'; // Сброс позиции пина
        window.filters.effectLevelDepth.style.width = window.filters.effectLevelPin.style.left;
      }
    });
  };

  for (var j = 0; j < thumbnails.length; j++) {
    onThumbnailClick(thumbnails[j], window.filters.effects[thumbnails[j].id]);
  }
})();
