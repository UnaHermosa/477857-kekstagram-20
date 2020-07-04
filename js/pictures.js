
'use strict';
(function () {
  var picturesList = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');
  var fragment = document.createDocumentFragment();

  var createPhotoElement = function (data) {
    var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
    var photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = data.url;
    photoElement.querySelector('.picture__comments').textContent = data.comments.length;
    photoElement.querySelector('.picture__likes').textContent = data.likes;
    return photoElement;
  };

  var renderPhoto = function (data) {
    data.forEach(function (item) {
      fragment.appendChild(createPhotoElement(item));
    });
    picturesList.appendChild(fragment);
  };

  var loadedData = [];
  var getLoadedData = function () {
    return loadedData;
  };

  var successHandler = function (data) {
    loadedData = data;
    renderPhoto(loadedData);
    imgFilters.classList.remove('img-filters--inactive');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.pictures = {
    fragment: fragment,
    photo: createPhotoElement,
    getLoadedData: getLoadedData,
    renderPhoto: renderPhoto
  };
}());
