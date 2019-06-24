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

// Рандомизирует количество комментов от min до max
var getNumberInRange = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var MIN_LIKES_COUNT = 15;
var MAX_LIKES_COUNT = 200;

var MIN_COMMENTS_COUNT = 1;
var MAX_COMMENTS_COUNT = 4;

// Создаёт массив объектов с данными карточек
var renderCards = function () {
  var arrCards = [];
  for (var i = 0; i < CARD_AMOUNT; i++) {
    var card = {};
    card.url = 'photos/' + (i + 1) + '.jpg';
    card.likes = getNumberInRange(MIN_LIKES_COUNT, MAX_LIKES_COUNT);
    card.comments = [];
    for (var j = 0; j < getNumberInRange(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT); j++) {
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
  cardElement.querySelector('.picture__comments').textContent = getNumberInRange(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);

  return cardElement;
};

// Вставляет циклом карточки в место, определённое переменной pictureListElement
var fragment = document.createDocumentFragment();
for (var i = 0; i < CARD_AMOUNT; i++) {
  fragment.appendChild(renderCard(cards[i]));
}
pictureListElement.appendChild(fragment);

// Форма загрузки изображения
var imgUploadForm = document.querySelector('.img-upload__form');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadInput = document.querySelector('.img-upload__input');
var uploadCancel = imgUploadOverlay.querySelector('.img-upload__cancel');
var ESC_KEYCODE = 27;

// Загрузка изображения
var openPopup = function () {
  imgUploadOverlay.classList.remove('hidden');
  uploadPreview.classList.add('effects__preview--none');
  document.addEventListener('keydown', onPopupEscPress);
  hideLevelBlock();
};

imgUploadInput.addEventListener('change', openPopup);

// Закрытие окна загрузки изображения
var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  resetEffectAttributes(uploadPreview, 'effects__preview--none');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.preventDefault();
    closePopup();
    imgUploadForm.reset(); // Сброс значения выбора файла
  }
};

uploadCancel.addEventListener('click', closePopup);

// Сброс классов и стилей эффектов
var resetEffectAttributes = function (element, effect) {
  element.removeAttribute('style');
  element.className = '';
  element.classList.add('img-upload__preview', effect);
};

// Наложение фильтров
var effects = [
  'effects__preview--none',
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--phobos',
  'effects__preview--heat'
];

var effectStyles = [
  'none',
  'grayscale(0.3)',
  'sepia(0.3)',
  'invert(30%)',
  'blur(1px)',
  'brightness(1)'
];

var thumbnails = document.querySelectorAll('.effects__radio');
var uploadPreview = document.querySelector('.img-upload__preview');
var effectLevelPin = document.querySelector('.effect-level__pin');


var effectLevelBlock = imgUploadOverlay.querySelector('.effect-level');

var hideLevelBlock = function () {
  effectLevelBlock.classList.add('hidden');
};

var showLevelBlock = function () {
  effectLevelBlock.classList.remove('hidden');
};

var onThumbnailClick = function (thumbnail, effect, index) {
  thumbnail.addEventListener('click', function () {
    resetEffectAttributes(uploadPreview, effect);
    if (index !== 0) {
      showLevelBlock();
    } else {
      hideLevelBlock();
    }
  });
};

var onPinMouseUp = function (effect) {
  effectLevelPin.addEventListener('mouseup', function () {
    uploadPreview.style.filter = effect;
  });
};

for (var j = 0; j < thumbnails.length; j++) {
  var thumbnailsIndex = j;
  onThumbnailClick(thumbnails[j], effects[j], thumbnailsIndex);
}

onPinMouseUp(effectStyles[0]); // Тестовое значение
