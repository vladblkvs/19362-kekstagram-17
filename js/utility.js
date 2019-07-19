'use strict';

(function () {
  window.utility = {
    MAX_PERCENT: 100,
    ESC_KEYCODE: 27
  };

  // Рандомизирует количество комментов от min до max
  window.utility.getNumberInRange = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

  // Рандомизатор массивов, выдаёт случайный элемент
  window.utility.randomizeArrayValue = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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
})();
