'use strict';

(function () {
  window.gallery = {};
  window.gallery.renderAllCards = function (dataCards) {
    // Вставляет циклом карточки в pictures
    var pictures = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    dataCards.forEach(function (card) {
      fragment.appendChild(renderCard(card));
    });
    pictures.appendChild(fragment);
  };

  // Заполняет содержимое карточки
  var renderCard = function (card) {
    var picture = document.querySelector('#picture').content.querySelector('.picture');
    var copiedCard = picture.cloneNode(true);

    copiedCard.querySelector('.picture__img').src = card.url;
    copiedCard.querySelector('.picture__likes').textContent = card.likes;
    copiedCard.querySelector('.picture__comments').textContent = card.comments.length;

    return copiedCard;
  };
})();
