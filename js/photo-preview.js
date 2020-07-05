'use strict';
(function () {
  var bigPhoto = document.querySelector('.big-picture');
  var photoCommentCount = bigPhoto.querySelector('.social__comment-count');
  var socialCommentsList = bigPhoto.querySelector('.social__comments');
  var socialCommentItem = bigPhoto.querySelector('.social__comment');
  var commentsLoaderButton = bigPhoto.querySelector('.comments-loader');
  var commentsCountTotal = photoCommentCount.querySelector('.comments-count');

  var commentsArr = [];
  var countCommentsRender = 0;

  var createComment = function (item) {
    var newComment = socialCommentItem.cloneNode(true);
    newComment.querySelector('.social__picture').src = item.avatar;
    newComment.querySelector('.social__picture').alt = item.name;
    newComment.querySelector('.social__text').textContent = item.message;
    return newComment;
  };

  var renderComments = function (photo) {
    photo.comments.forEach(function (item) {
      window.pictures.fragment.appendChild(createComment(item));
      return commentsArr.push(item);
    });
    socialCommentsList.textContent = '';
    socialCommentsList.appendChild(window.pictures.fragment);
  };

  var clearComments = function () {
    var comments = socialCommentsList.querySelectorAll('.social__comment');
    comments.forEach(function (comment) {
      socialCommentsList.removeChild(comment);
    });
  };

  var addNewComments = function () {
    var fragment = document.createDocumentFragment();
    var fragmentCommentsCount = document.createDocumentFragment();
    var countComments = commentsArr.length > window.variables.COMMENTS_AMOUNT ? window.variables.COMMENTS_AMOUNT : commentsArr.length;
    countCommentsRender = countCommentsRender + countComments;
    for (var i = 0; i < countComments; i++) {
      fragment.appendChild(createComment(commentsArr.shift()));
    }
    socialCommentsList.appendChild(fragment);
    if (commentsArr.length === 0) {
      commentsLoaderButton.classList.add('hidden');
    }
    photoCommentCount.textContent = '';
    fragmentCommentsCount.textContent = countCommentsRender + ' из ';
    fragmentCommentsCount.appendChild(commentsCountTotal);
    fragmentCommentsCount.innerHtml = fragmentCommentsCount.innerHtml + ' комментариев';
    photoCommentCount.appendChild(fragmentCommentsCount);
  };

  var showComments = function (comments) {
    commentsArr = comments.slice();
    countCommentsRender = 0;
    socialCommentsList.textContent = '';
    commentsCountTotal.textContent = comments.length + ' комментариев';

    if (comments.length > window.variables.COUNT_COMMENTS) {
      commentsLoaderButton.classList.remove('hidden');
      photoCommentCount.classList.remove('hidden');
    }
    addNewComments(commentsArr);
  };

  var onCommentsLoaderClick = function () {
    addNewComments();
  };

  var renderBigPhoto = function (photo) {
    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.social__caption').textContent = photo.description;
    renderComments(photo);
    clearComments();
    addNewComments();
  };

  window.photoPreview = {
    bigPhoto: renderBigPhoto,
    onCommentsLoaderClick: onCommentsLoaderClick,
    showComments: showComments
  };
}());
