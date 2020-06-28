'use strict';
(function () {
  var picturesList = document.querySelector('.pictures');

  var createPhotoElement = function (data) {
    var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = data.url;
    photoElement.querySelector('.picture__comments').textContent = data.comments.length;
    photoElement.querySelector('.picture__likes').textContent = data.likes;
    return photoElement;
  };

  var photosElements = window.data.photos.map(createPhotoElement);

  var renderPhotos = function (elements, place) {
    var fragment = document.createDocumentFragment();
    elements.forEach(function (item) {
      fragment.appendChild(item);
    });
    place.appendChild(fragment);
  };

  renderPhotos(photosElements, picturesList);
}());
