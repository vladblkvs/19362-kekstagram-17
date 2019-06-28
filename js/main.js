'use strict';

// Количество карточек с фотками на странице
var CARD_AMOUNT = 25;
var MAX_PERCENT = 100;

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
var picture = document.querySelector('#picture').content.querySelector('.picture');

// Заполняет содержимое карточки
var renderCard = function (card) {
  var cardElement = picture.cloneNode(true);

  cardElement.querySelector('.picture__img').src = card.url;
  cardElement.querySelector('.picture__likes').textContent = card.likes;
  cardElement.querySelector('.picture__comments').textContent = getNumberInRange(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT);

  return cardElement;
};

// Вставляет циклом карточки в место, определённое переменной pictureListElement
var pictureListElement = document.querySelector('.pictures');
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
  imgUploadOverlay.querySelector('.scale__control--value').value = '100%';
  numericalScaleValue = 100;
  document.addEventListener('keydown', onPopupEscPress);
  scaleSmaller.addEventListener('click', onScaleBtnClick);
  scaleBigger.addEventListener('click', onScaleBtnClick);
  effectLevelPin.addEventListener('mousedown', onLevelPinUse);
  hideLevelBlock();
};

imgUploadInput.addEventListener('change', openPopup);

// Закрытие окна загрузки изображения
var closePopup = function () {
  imgUploadOverlay.classList.add('hidden');
  resetEffectAttributes(uploadPreview, 'effects__preview--none');
  document.removeEventListener('keydown', onPopupEscPress);
  scaleSmaller.removeEventListener('click', onScaleBtnClick);
  scaleBigger.removeEventListener('click', onScaleBtnClick);
  effectLevelPin.removeEventListener('mousedown', onLevelPinUse);
};

var commentField = imgUploadOverlay.querySelector('.text__description');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && commentField !== document.activeElement) {
    evt.preventDefault();
    closePopup();
    imgUploadForm.reset(); // Сброс значения выбора файла
  }
};

uploadCancel.addEventListener('click', closePopup);

// Сброс классов и стилей эффектов
var resetEffectAttributes = function (element, effect) {
  imgUploadOverlay.querySelector('.scale__control--value').value = '100%';
  numericalScaleValue = 100;
  element.removeAttribute('style');
  element.classList = '';
  element.classList.add('img-upload__preview', effect);
};

// Наложение фильтров
var thumbnails = document.querySelectorAll('.effects__radio');
var uploadPreview = document.querySelector('.img-upload__preview');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');

var effects = {
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

var effectLevelBlock = imgUploadOverlay.querySelector('.effect-level');
var effectLevelValue = effectLevelBlock.querySelector('.effect-level__value').value; // Значение насыщенности фильтра

var hideLevelBlock = function () {
  effectLevelBlock.classList.add('hidden');
};

var showLevelBlock = function () {
  effectLevelBlock.classList.remove('hidden');
};

var onThumbnailClick = function (thumbnail, effect) {
  thumbnail.addEventListener('click', function () {
    resetEffectAttributes(uploadPreview, effect.class);
    if (uploadPreview.classList.contains('effects__preview--none')) {
      hideLevelBlock();
    } else {
      showLevelBlock();
      effectLevelPin.style.left = effectLevelValue + '%'; // Сброс позиции пина
      effectLevelDepth.style.width = effectLevelPin.style.left;
    }
  });
};

for (var j = 0; j < thumbnails.length; j++) {
  onThumbnailClick(thumbnails[j], effects[thumbnails[j].id]);
}

// Ползунок регулировки насыщенности эффектов
var getLevelLineLength = function () {
  return effectLevelBlock.querySelector('.effect-level__line').offsetWidth;
};

var onLevelPinUse = function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shiftRange = {
      x: startCoords.x - moveEvt.clientX,
      min: 0,
      max: getLevelLineLength()
    };

    var currentPinPosition = effectLevelPin.offsetLeft - shiftRange.x;
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };
    if (currentPinPosition >= shiftRange.min && currentPinPosition <= shiftRange.max) {
      effectLevelPin.style.left = currentPinPosition + 'px';
      effectLevelDepth.style.width = effectLevelPin.style.left;
    }

    var getEffectLevel = function (effectRange) {
      var effectLevel = Math.round((currentPinPosition * (effectRange.max - effectRange.min) / getLevelLineLength()) * MAX_PERCENT) / MAX_PERCENT + effectRange.min;
      if (effectLevel < effectRange.min) {
        effectLevel = effectRange.min;
      } else if (effectLevel > effectRange.max) {
        effectLevel = effectRange.max;
      }
      return effectLevel;
    };

    var changeEffectLevelStyle = function () {
      switch (true) {
        case uploadPreview.classList.contains('effects__preview--chrome'):
          uploadPreview.style.filter = effects['effect-chrome'].cssStyle + '(' + getEffectLevel(effects['effect-chrome']) + ')';
          break;
        case uploadPreview.classList.contains('effects__preview--sepia'):
          uploadPreview.style.filter = effects['effect-sepia'].cssStyle + '(' + getEffectLevel(effects['effect-sepia']) + ')';
          break;
        case uploadPreview.classList.contains('effects__preview--marvin'):
          uploadPreview.style.filter = effects['effect-marvin'].cssStyle + '(' + getEffectLevel(effects['effect-marvin']) + '%)';
          break;
        case uploadPreview.classList.contains('effects__preview--phobos'):
          uploadPreview.style.filter = effects['effect-phobos'].cssStyle + '(' + getEffectLevel(effects['effect-phobos']) + 'px)';
          break;
        case uploadPreview.classList.contains('effects__preview--heat'):
          uploadPreview.style.filter = effects['effect-heat'].cssStyle + '(' + getEffectLevel(effects['effect-heat']) + ')';
          break;
      }
    };
    changeEffectLevelStyle();
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

// Масштабирование картинки
var scaleValue = imgUploadOverlay.querySelector('.scale__control--value').value;
var numericalScaleValue = parseInt(scaleValue, 10);
var scaleSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
var scaleBigger = imgUploadOverlay.querySelector('.scale__control--bigger');

var scaleRange = {
  max: 100,
  min: 25,
  step: 25
};

var onScaleBtnClick = function (evt) {
  if (evt.target === scaleSmaller) {
    if (numericalScaleValue - scaleRange.step < scaleRange.min) {
      numericalScaleValue = scaleRange.min;
      return;
    } else {
      numericalScaleValue -= scaleRange.step;
    }
  } else if (evt.target === scaleBigger) {
    if (numericalScaleValue + scaleRange.step > scaleRange.max) {
      numericalScaleValue = scaleRange.max;
      return;
    } else {
      numericalScaleValue += scaleRange.step;
    }
  }
  scaleValue = numericalScaleValue + '%';
  imgUploadOverlay.querySelector('.scale__control--value').value = scaleValue;
  uploadPreview.style.transform = 'scale(' + (numericalScaleValue / MAX_PERCENT) + ')';
};
