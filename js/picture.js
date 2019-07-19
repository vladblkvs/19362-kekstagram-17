'use strict';

(function () {
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

  var onPictureClick = function (picture, card) {
    picture.addEventListener('click', function () {
      bigPicture.classList.remove('hidden');
      commentAmount = 5;
      bigPicture.querySelector('img').src = card.url;
      likesCount.textContent = card.likes;
      description.textContent = card.description;
      showComments(card.comments);

      bigPictureCancel.addEventListener('click', closeBigPicture);
      document.addEventListener('keydown', onPopupEscPress);

      hideCommentCountBlock();
    });
  };

  var hideCommentCountBlock = function () {
    var commentCount = bigPicture.querySelector('.social__comment-count');
    commentCount.classList.add('visually-hidden');
  };

  var commentBlock = document.querySelector('.social__comments');
  var showComments = function (comments) {
    var fragment = document.createDocumentFragment();
    comments.forEach(function (commentElement) {
      fragment.appendChild(renderComment(commentElement));
    });
    commentBlock.textContent = '';
    commentBlock.appendChild(fragment);
    hideExtraComments();
  };


  var hideExtraComments = function () {
    var commentArr = commentBlock.querySelectorAll('.social__comment');
    for (var i = 5; i < commentArr.length; i++) {
      commentArr[i].style.display = 'none';
    }
  };
  var commentAmount = 5;
  var commentsLoader = bigPicture.querySelector('.comments-loader');
  commentsLoader.addEventListener('click', function () {
    commentAmount += 5;
    var commentArr = commentBlock.querySelectorAll('.social__comment');
    for (var i = 0; i < commentAmount; i++) {
      commentArr[i].style.display = 'flex';
    }
    if (commentAmount >= 18) {
      commentsLoader.classList.add('visually-hidden');
    }
  });

  var renderComment = function (commentElement) {
    var comment = commentBlock.querySelector('.social__comment').cloneNode(true);
    comment.querySelector('.social__picture').src = commentElement.avatar;
    comment.querySelector('.social__picture').alt = commentElement.name;
    comment.querySelector('.social__text').textContent = commentElement.message;

    return comment;
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    bigPictureCancel.removeEventListener('click', closeBigPicture);
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
