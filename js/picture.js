'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var likesCount = bigPicture.querySelector('.likes-count');
  var description = bigPicture.querySelector('.social__caption');

  window.picture.activateBigPictureHandler = function (cardsArr) {
    var pictures = document.querySelectorAll('.picture');

    for (var i = 0; i < pictures.length; i++) {
      onPictureClick(pictures[i], cardsArr[i]);
    }
  };

  var onPictureClick = function (element, card) {
    element.addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('img').src = card.url;
      likesCount.textContent = card.likes;
      description.textContent = card.description;
      showComments(card.comments);

      bigPictureCancel.addEventListener('click', closeBigPicture);
      document.addEventListener('keydown', onPopupEscPress);

      var commentCount = bigPicture.querySelector('.social__comment-count');
      var commentsLoader = bigPicture.querySelector('.comments-loader');
      commentCount.classList.add('visually-hidden');
      commentsLoader.classList.add('visually-hidden');
    });
  };

  var commentBlock = document.querySelector('.social__comments');
  var showComments = function (comments) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(renderComment(comments[i]));
    }
    commentBlock.innerHTML = '';
    commentBlock.appendChild(fragment);
  };

  var renderComment = function (commentElement) {
    var comment = commentBlock.querySelector('.social__comment').cloneNode(true);
    comment.querySelector('.social__picture').src = commentElement.avatar;
    comment.querySelector('.social__text').textContent = commentElement.message;

    return comment;
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var commentField = document.querySelector('.social__footer-text');
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utility.ESC_KEYCODE && commentField !== document.activeElement) {
      evt.preventDefault();
      closeBigPicture();
    }
  };
})();
