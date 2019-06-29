'use strict';

(function () {
  window.gallery = {};

  // Поиск шаблона
  var picture = document.querySelector('#picture').content.querySelector('.picture');

  // Заполняет содержимое карточки
  var renderCard = function (card) {
    var cardElement = picture.cloneNode(true);

    cardElement.querySelector('.picture__img').src = card.url;
    cardElement.querySelector('.picture__likes').textContent = card.likes;
    cardElement.querySelector('.picture__comments').textContent = window.utility.getNumberInRange(window.data.MIN_COMMENTS_COUNT, window.data.MAX_COMMENTS_COUNT);

    return cardElement;
  };

  // Вставляет циклом карточки в место, определённое переменной pictureListElement
  var pictureListElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.data.CARD_AMOUNT; i++) {
    fragment.appendChild(renderCard(window.data.renderCards()[i]));
  }
  pictureListElement.appendChild(fragment);
})();
