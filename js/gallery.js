'use strict';

(function () {
  window.gallery = {};
  window.gallery.renderAllCards = function (dataCards) {
    // Вставляет циклом карточки в pictures
    let pictures = document.querySelector(`.pictures`);
    let fragment = document.createDocumentFragment();
    dataCards.forEach(function (card) {
      fragment.appendChild(renderCard(card));
    });
    pictures.appendChild(fragment);
  };

  // Заполняет содержимое карточки
  let renderCard = function (card) {
    let picture = document.querySelector(`#picture`).content.querySelector(`.picture`);
    let copiedCard = picture.cloneNode(true);

    copiedCard.querySelector(`.picture__img`).src = card.url;
    copiedCard.querySelector(`.picture__likes`).textContent = card.likes;
    copiedCard.querySelector(`.picture__comments`).textContent = card.comments.length;

    return copiedCard;
  };
})();
