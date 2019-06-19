'use strict';

// Количество карточек с фотками на странице
var CARD_AMOUNT = 25;

// Рандомизатор массивов
var randomizeArrayValue = function (arr) {
  var randomValue = arr[Math.floor(Math.random() * arr.length)];
  return randomValue;
};

var AVATARS = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];
var MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Антон', 'Сергей', 'Артём', 'Матвей', 'Кирилл', 'Хуан', 'Отоночё'];

// Генерирует коммент из одного или двух элементов массива с со общениями.
var getMessage = function (text) {
  var pNumber = Math.round(Math.random()); // Количество абзацев. Не вышло округлить "1 или 2", сделано как "0 или 1"
  var message = randomizeArrayValue(text); // Если рандомизатор выдал 0, то используем 1 элемент массива
  if (pNumber === 1) { // Если выпала 1, то используем 2 элемента массива
    var messageAdditional = randomizeArrayValue(text);
    if (messageAdditional !== message) {
      message = message + ' ' + messageAdditional;
    } else {
      getMessage(MESSAGES); // Если выпали одинаковые сообщения, то запускаем функцию заново изнутри (так вообще можно?)
    }
  }
  return message;
};

// Создаёт коммент с генерируемым содержимым
var COMMENT = {
  avatar: randomizeArrayValue(AVATARS),
  message: getMessage(MESSAGES),
  name: randomizeArrayValue(NAMES)
};

// Получалось бы просто 25 комментов
/* var getComments = function (amount) {
  var commentArr = [];
  for (var i = 0; i < amount; i++) {
    var COMMENT = {
      avatar: randomizeArrayValue(AVATARS),
      message: randomizeArrayValue(MESSAGES),
      name: randomizeArrayValue(NAMES)
    };
    commentArr[i] = COMMENT;
  }
  return commentArr;
}; */

// Рандомизирует количество комментов от 1 до 4 (собственный случайный выбор)
var getCommentAmount = function () {
  return Math.round(Math.random() * (4 - 1) + 1);
};

// Создаёт массив объектов с данными карточек
var renderCards = function () {
  var arrCards = [];
  for (var i = 0; i < CARD_AMOUNT; i++) {
    var card = {};
    card.url = 'photos/' + (i + 1) + '.jpg';
    card.likes = Math.floor(Math.random() * (200 - 15) + 15);
    card.comments = [];
    for (var j = 0; j < getCommentAmount(); j++) {
      card.comments[j] = COMMENT;
    }
    arrCards[i] = card;
  }
  return arrCards;
};
var cards = renderCards(); // Массив, принимающий значение функции создания объектов карточек

// Поиск шаблона
var picture = document.querySelector('#picture')
.content
.querySelector('.picture');

var pictureListElement = document.querySelector('.pictures'); // Определяет место вставки блока из шаблона

// Заполняет содержимое карточки
var renderCard = function (card) {
  var cardElement = picture.cloneNode(true);

  cardElement.querySelector('.picture__img').src = card.url;
  cardElement.querySelector('.picture__likes').textContent = card.likes;
  cardElement.querySelector('.picture__comments').textContent = getCommentAmount();

  return cardElement;
};

// Вставляет циклом карточки в место, определённое переменной pictureListElement
var fragment = document.createDocumentFragment();
for (var i = 0; i < CARD_AMOUNT; i++) {
  fragment.appendChild(renderCard(cards[i]));
}
pictureListElement.appendChild(fragment);
