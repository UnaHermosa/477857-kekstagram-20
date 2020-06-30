'use strict';
(function () {
  var bigPhoto = document.querySelector('.big-picture');
  var socialCommentsList = bigPhoto.querySelector('.social__comments');
  var socialCommentItem = bigPhoto.querySelector('.social__comment');

  document.querySelector('.pictures__title').classList.add('visually-hidden');
  bigPhoto.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

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
    });
    socialCommentsList.textContent = '';
    socialCommentsList.appendChild(window.pictures.fragment);
  };

  var renderBigPhoto = function (photo) {
    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.social__caption').textContent = photo.description;
    renderComments(photo);
  };

  window.photoPreview = {
    bigPhoto: renderBigPhoto
  };
}());
