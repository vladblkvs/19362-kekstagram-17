'use strict';

// Количество карточек с фотками на странице
var CARD_AMOUNT = 25;

// Рандомизатор массивов, выдаёт случайный элемент
var randomizeArrayValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var AVATARS = ['img/avatar-1.svg', 'img/avatar-2.svg', 'img/avatar-3.svg', 'img/avatar-4.svg', 'img/avatar-5.svg', 'img/avatar-6.svg'];
var MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var NAMES = ['Антон', 'Сергей', 'Артём', 'Матвей', 'Кирилл', 'Хуан', 'Отоночё'];

// Перемешивание всего массива
var shuffleArray = function (arr) {
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
var getMessage = function (messages) {
  var shuffledMessages = shuffleArray(messages); // Перемешанный массив сообщений
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
  avatar: randomizeArrayValue(AVATARS),
  message: getMessage(MESSAGES),
  name: randomizeArrayValue(NAMES)
};

// Получалось бы просто 25 комментов
/* var getComments = function (amount) {
  var commentArr = [];
  for (var i = 0; i < amount; i++) {
    var comment = {
      avatar: randomizeArrayValue(AVATARS),
      message: randomizeArrayValue(MESSAGES),
      name: randomizeArrayValue(NAMES)
    };
    commentArr[i] = comment;
  }
  return commentArr;
}; */

// Рандомизирует количество комментов от 1 до 4 (собственный случайный выбор)
var getCommentAmount = function () {
  return Math.round(Math.random() * (4 - 1) + 1);
};

var getLikeAmount = function () {
  return Math.floor(Math.random() * (200 - 15) + 15);
};

// Создаёт массив объектов с данными карточек
var renderCards = function () {
  var arrCards = [];
  for (var i = 0; i < CARD_AMOUNT; i++) {
    var card = {};
    card.url = 'photos/' + (i + 1) + '.jpg';
    card.likes = getLikeAmount();
    card.comments = [];
    for (var j = 0; j < getCommentAmount(); j++) {
      card.comments[j] = comment;
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
