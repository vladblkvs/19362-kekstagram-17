'use strict';

(function () {
  const BASE_COMMENTS = 5;
  let additionalCommentsCount = 0;

  let pageBody = document.querySelector(`body`);
  let bigPicture = document.querySelector(`.big-picture`);
  let bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);
  let likesCount = bigPicture.querySelector(`.likes-count`);
  let description = bigPicture.querySelector(`.social__caption`);

  window.picture.activateBigPictureHandler = function (cardsData) {
    let pictures = document.querySelectorAll(`.picture`);

    pictures.forEach(function (picture, index) {
      onPictureClick(picture, cardsData[index]);
    });
  };
  let cardComments = [];
  let onPictureClick = function (picture, card) {
    picture.addEventListener(`click`, function (evt) {
      evt.preventDefault();
      pageBody.classList.add(`modal-open`);
      bigPicture.classList.remove(`hidden`);
      bigPicture.querySelector(`img`).src = card.url;
      likesCount.textContent = card.likes;
      description.textContent = card.description;

      bigPictureCancel.addEventListener(`click`, closeBigPicture);
      document.addEventListener(`keydown`, onPopupEscPress);

      commentsLoader.classList.remove(`hidden`);
      cardComments = card.comments;
      commentsLoader.addEventListener(`click`, onCommentsLoaderClick);
      showComments(card.comments);
    });
  };

  let onCommentsLoaderClick = function () {
    showComments(cardComments);
  };

  let changeCommentCountIndication = function (loadedComments, totalComments) {
    let commentCount = bigPicture.querySelector(`.social__comment-count`);
    commentCount.style = `color: #818181`;
    if (loadedComments === totalComments || totalComments <= BASE_COMMENTS) {
      commentCount.textContent = `Показаны все комментарии: ` + totalComments;
    } else {
      commentCount.textContent = `Показано комментариев: ` + loadedComments + ` из ` + totalComments;
    }
  };

  let commentBlock = document.querySelector(`.social__comments`);
  let showComments = function (comments) {
    let fragment = document.createDocumentFragment();
    comments.slice(0, BASE_COMMENTS + additionalCommentsCount).forEach(function (comment) {
      fragment.appendChild(renderComment(comment));
    });
    commentBlock.textContent = ``;
    commentBlock.appendChild(fragment);
    additionalCommentsCount += BASE_COMMENTS;
    if (additionalCommentsCount >= comments.length) {
      additionalCommentsCount = comments.length;
      commentsLoader.classList.add(`hidden`);
      commentsLoader.removeEventListener(`click`, onCommentsLoaderClick);
    } else if (comments.length <= BASE_COMMENTS) {
      commentsLoader.classList.add(`hidden`);
      commentsLoader.removeEventListener(`click`, onCommentsLoaderClick);
    }
    changeCommentCountIndication(additionalCommentsCount, comments.length);
  };
  let commentsLoader = bigPicture.querySelector(`.comments-loader`);

  let renderComment = function (commentElement) {
    let comment = commentBlock.querySelector(`.social__comment`).cloneNode(true);
    comment.querySelector(`.social__picture`).src = commentElement.avatar;
    comment.querySelector(`.social__picture`).alt = commentElement.name;
    comment.querySelector(`.social__text`).textContent = commentElement.message;

    return comment;
  };

  let closeBigPicture = function () {
    pageBody.removeAttribute(`class`);
    bigPicture.classList.add(`hidden`);
    bigPictureCancel.removeEventListener(`click`, closeBigPicture);
    document.removeEventListener(`keydown`, onPopupEscPress);
    additionalCommentsCount = 0;
  };

  let commentField = document.querySelector(`.social__footer-text`);
  let onPopupEscPress = function (evt) {
    if (evt.keyCode === window.utility.ESC_KEYCODE && commentField !== document.activeElement) {
      evt.preventDefault();
      closeBigPicture();
    }
  };
})();
