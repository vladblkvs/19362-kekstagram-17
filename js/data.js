'use strict';

(function () {
  window.data = {
    CARD_AMOUNT: 25, // Количество карточек с фотками на странице
    MIN_COMMENTS_COUNT: 1,
    MAX_COMMENTS_COUNT: 4
  };

  var MIN_LIKES_COUNT = 15;
  var MAX_LIKES_COUNT = 200;
  var AVATARS = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];
  var MESSAGES = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var NAMES = ['Антон', 'Сергей', 'Артём', 'Матвей', 'Кирилл', 'Хуан', 'Отоночё'];

  // Генерирует коммент из одного или двух элементов массива с сообщениями.
  var getMessage = function (messages) {
    var shuffledMessages = window.utility.shuffleArray(messages); // Перемешанный массив сообщений
    var message = shuffledMessages.shift(); // Вырезает первый элемент (перемешанного ранее) массива сообщений. Далее бывший второй элемент станет первым
    var isTwoMessages = Math.round(Math.random()) === 1; // Случайным образом задаёт истинность применения двух элементов массива сообщений
    if (isTwoMessages) {
      var messageAdditional = shuffledMessages[0]; // Берёт первый элемент массива сообщений (перемешанного и без вырезанного элемента)
      message += ' ' + messageAdditional;
    }
    return message;
  };

  // Создаёт коммент с генерируемым содержимым
  var comment = {
    avatar: window.utility.randomizeArrayValue(AVATARS),
    message: getMessage(MESSAGES),
    name: window.utility.randomizeArrayValue(NAMES)
  };

  // Создаёт массив объектов с данными карточек
  window.data.renderCards = function () {
    var arrCards = [];
    for (var i = 0; i < this.CARD_AMOUNT; i++) {
      var card = {};
      card.url = 'photos/' + (i + 1) + '.jpg';
      card.likes = window.utility.getNumberInRange(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
      card.comments = [];
      for (var j = 0; j < window.utility.getNumberInRange(this.MIN_COMMENTS_COUNT, this.MAX_COMMENTS_COUNT); j++) {
        card.comments[j] = comment;
      }
      arrCards[i] = card;
    }
    return arrCards;
  };
})();
