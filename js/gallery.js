'use strict';

(function () {
  window.gallery = {};
  window.gallery.renderAllCards = function (dataCards) {
    // Вставляет циклом карточки в место, определённое переменной pictureListElement
    var pictureListElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < dataCards.length; i++) {
      fragment.appendChild(renderCard(dataCards[i]));
    }
    pictureListElement.appendChild(fragment);
  };

  // Заполняет содержимое карточки
  var renderCard = function (card) {
    var picture = document.querySelector('#picture').content.querySelector('.picture');
    var cardElement = picture.cloneNode(true);

    cardElement.querySelector('.picture__img').src = card.url;
    cardElement.querySelector('.picture__likes').textContent = card.likes;
    cardElement.querySelector('.picture__comments').textContent = card.comments.length;

    return cardElement;
  };
})();
