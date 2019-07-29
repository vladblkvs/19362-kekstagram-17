'use strict';

(function () {
  window.utility = {
    MAX_PERCENT: 100,
    ESC_KEYCODE: 27
  };

  // Перемешивание всего массива
  window.utility.shuffleArray = function (arr) {
    var j;
    var temp;
    arr.forEach(function (element, index) {
      j = Math.floor(Math.random() * (index + 1));
      temp = arr[j];
      arr[j] = element;
      element = temp;
    });
    return arr;
  };

  // Устранение дребезга
  var DEBOUNCE_INTERVAL = 500;

  window.utility.debounce = function (callBack) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callBack.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
