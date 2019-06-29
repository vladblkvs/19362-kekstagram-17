'use strict';

(function () {
  window.filters = {};

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

  var thumbnails = document.querySelectorAll('.effects__radio');
  var effectLevelBlock = document.querySelector('.effect-level');
  var uploadPreview = document.querySelector('.img-upload__preview');

  var onThumbnailClick = function (thumbnail, effect) {
    thumbnail.addEventListener('click', function () {
      window.popup.resetEffectAttributes(uploadPreview, effect.class);
      if (uploadPreview.classList.contains('effects__preview--none')) {
        effectLevelBlock.classList.add('hidden');
      } else {
        effectLevelBlock.classList.remove('hidden');
        window.saturation.resetPinPosition();
      }
    });
  };

  for (var j = 0; j < thumbnails.length; j++) {
    onThumbnailClick(thumbnails[j], window.filters.effects[thumbnails[j].id]);
  }
})();
