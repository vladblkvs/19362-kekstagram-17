'use strict';

(function () {
  window.utility = {
    MAX_PERCENT: 100,
    ESC_KEYCODE: 27
  };

  // Перемешивание всего массива
  window.utility.shuffleArray = function (arr) {
    let j;
    let temp;
    arr.forEach(function (element, index) {
      j = Math.floor(Math.random() * (index + 1));
      temp = arr[j];
      arr[j] = element;
      element = temp;
    });
    return arr;
  };

  // Устранение дребезга
  const DEBOUNCE_INTERVAL = 250;

  window.utility.debounce = function (callBack) {
    let lastTimeout = null;

    return function (...args) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callBack(...args);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
