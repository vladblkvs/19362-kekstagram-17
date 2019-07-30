'use strict';

(function () {
  var BASE_COMMENTS = 5;
  var additionalCommentsCount = 0;

  var pageBody = document.querySelector('body');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var likesCount = bigPicture.querySelector('.likes-count');
  var description = bigPicture.querySelector('.social__caption');

  window.picture.activateBigPictureHandler = function (cardsData) {
    var pictures = document.querySelectorAll('.picture');

    pictures.forEach(function (picture, index) {
      onPictureClick(picture, cardsData[index]);
    });
  };
  var cardComments = [];
  var onPictureClick = function (picture, card) {
    picture.addEventListener('click', function (evt) {
      evt.preventDefault();
      pageBody.classList.add('modal-open');
      bigPicture.classList.remove('hidden');
      bigPicture.querySelector('img').src = card.url;
      likesCount.textContent = card.likes;
      description.textContent = card.description;
      showComments(card.comments);

      bigPictureCancel.addEventListener('click', closeBigPicture);
      document.addEventListener('keydown', onPopupEscPress);

      hideCommentCountBlock();
      commentsLoader.classList.remove('hidden');
      cardComments = card.comments;
      commentsLoader.addEventListener('click', onCommentsLoaderClick);
    });
  };

  var onCommentsLoaderClick = function () {
    showComments(cardComments);
  };

  var hideCommentCountBlock = function () {
    var commentCount = bigPicture.querySelector('.social__comment-count');
    commentCount.classList.add('visually-hidden');
  };

  var commentBlock = document.querySelector('.social__comments');
  var showComments = function (comments) {
    var fragment = document.createDocumentFragment();
    comments.slice(0, BASE_COMMENTS + additionalCommentsCount).forEach(function (comment) {
      fragment.appendChild(renderComment(comment));
    });
    commentBlock.textContent = '';
    commentBlock.appendChild(fragment);
    additionalCommentsCount += BASE_COMMENTS;
    if (additionalCommentsCount >= comments.length) {
      additionalCommentsCount = comments.length;
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    }
  };
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  var renderComment = function (commentElement) {
    var comment = commentBlock.querySelector('.social__comment').cloneNode(true);
    comment.querySelector('.social__picture').src = commentElement.avatar;
    comment.querySelector('.social__picture').alt = commentElement.name;
    comment.querySelector('.social__text').textContent = commentElement.message;

    return comment;
  };

  var closeBigPicture = function () {
    pageBody.removeAttribute('class');
    bigPicture.classList.add('hidden');
    bigPictureCancel.removeEventListener('click', closeBigPicture);
    document.removeEventListener('keydown', onPopupEscPress);
    additionalCommentsCount = 0;
  };

  var commentField = document.querySelector('.social__footer-text');
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utility.ESC_KEYCODE && commentField !== document.activeElement) {
      evt.preventDefault();
      closeBigPicture();
    }
  };
})();
