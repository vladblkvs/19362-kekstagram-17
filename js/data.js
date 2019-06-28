'use strict';

(function () {
  window.data = {};

  window.data.CARD_AMOUNT = 25; // Количество карточек с фотками на странице
  window.data.MAX_PERCENT = 100;
  window.data.MIN_LIKES_COUNT = 15;
  window.data.MAX_LIKES_COUNT = 200;
  window.data.MIN_COMMENTS_COUNT = 1;
  window.data.MAX_COMMENTS_COUNT = 4;
  window.data.AVATARS = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];
  window.data.MESSAGES = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  window.data.NAMES = ['Антон', 'Сергей', 'Артём', 'Матвей', 'Кирилл', 'Хуан', 'Отоночё'];

  // Рандомизатор массивов, выдаёт случайный элемент
  window.data.randomizeArrayValue = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // Перемешивание всего массива
  window.data.shuffleArray = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  // Генерирует коммент из одного или двух элементов массива с сообщениями.
  window.data.getMessage = function (messages) {
    var shuffledMessages = window.data.shuffleArray(messages); // Перемешанный массив сообщений
    var message = shuffledMessages.shift(); // Вырезает первый элемент (перемешанного ранее) массива сообщений. Далее бывший второй элемент станет первым
    var isTwoMessages = Math.round(Math.random()) === 1; // Случайным образом задаёт истинность применения двух элементов массива сообщений
    if (isTwoMessages) {
      var messageAdditional = shuffledMessages[0]; // Берёт первый элемент массива сообщений (перемешанного и без вырезанного элемента)
      message += ' ' + messageAdditional;
    }
    return message;
  };

  // Создаёт коммент с генерируемым содержимым
  window.data.comment = {
    avatar: window.data.randomizeArrayValue(window.data.AVATARS),
    message: window.data.getMessage(window.data.MESSAGES),
    name: window.data.randomizeArrayValue(window.data.NAMES)
  };

  // Рандомизирует количество комментов от min до max
  window.data.getNumberInRange = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  };

})();
