'use strict';

var PICTURES_AMOUNT = 25;
var LIKES_AMOUNT_MIN = 15;
var LIKES_AMOUNT_MAX = 200;
var MIN_COMMENTS_AMOUNT = 1;
var MAX_COMMENT_AMOUNT = 3;
var MIN_AVATAR_AMOUNT = 1;
var MAX_AVATAR_AMOUNT = 6;
var usersNames = [
  'Саша',
  'Лёлик',
  'Эльвира',
  'Станислав Николаевич',
  'Ольга',
  'Аладдин'
];
var usersComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var photosDescriptions = ['Красота', 'Любимая фотография', 'Потому что жизнь прекрасна!', 'Тестим новую камеру))', 'Самый лучший день!', 'Доброе утро!'];
var picturesList = document.querySelector('.pictures');
var bigPhoto = document.querySelector('.big-picture');
var socialCommentsList = bigPhoto.querySelector('.social__comments');
var socialCommentItem = bigPhoto.querySelector('.social__comment');

document.querySelector('.pictures__title').classList.remove('visually-hidden');

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getComment = function () {
  var randomComment = usersComments[getRandomValue(0, usersComments.length - 1)];
  var comment = {
    avatar: 'img/avatar-' + getRandomValue(MIN_AVATAR_AMOUNT, MAX_AVATAR_AMOUNT) + '.svg',
    message: (getRandomValue(0, 1)) ? randomComment : randomComment += ' ' + randomComment,
    name: usersNames[getRandomValue(0, usersNames.length - 1)]
  };
  return comment;
};

var getComments = function () {
  var commentsArr = [];
  var comments = getRandomValue(MIN_COMMENTS_AMOUNT, MAX_COMMENT_AMOUNT);
  for (var i = 0; i < comments; i++) {
    commentsArr.push(getComment());
  }
  return commentsArr;
};

var getPhotos = function (quantity) {
  var photos = [];
  for (var i = 0; i < quantity; i++) {
    var photo = {
      url: 'photos/' + getRandomValue(1, PICTURES_AMOUNT) + '.jpg',
      description: photosDescriptions[getRandomValue(0, photosDescriptions.length - 1)],
      likes: getRandomValue(LIKES_AMOUNT_MIN, LIKES_AMOUNT_MAX),
      comments: getComments()
    };
    photos.push(photo);
  }
  return photos;
};

var photosData = getPhotos(PICTURES_AMOUNT);

var createPhotoElement = function (data) {
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var photoElement = photoTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = data.url;
  photoElement.querySelector('.picture__comments').textContent = data.comments.length;
  photoElement.querySelector('.picture__likes').textContent = data.likes;
  return photoElement;
};

var photosElements = photosData.map(createPhotoElement);

var renderPhotos = function (elements, place) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(elements[i]);
  }
  place.appendChild(fragment);
};

renderPhotos(photosElements, picturesList);

bigPhoto.classList.remove('hidden');
bigPhoto.querySelector('.social__comment-count').classList.add('hidden');
bigPhoto.querySelector('.comments-loader').classList.add('hidden');
document.querySelector('body').classList.add('modal-open');

var createComment = function (item) {
  var newComment = socialCommentItem.cloneNode(true);
  newComment.querySelector('.social__picture').src = item.avatar;
  newComment.querySelector('.social__picture').alt = item.name;
  newComment.querySelector('.social__text').textContent = item.message;
  return newComment;
};

var renderComments = function (item) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < item.comments.length; i++) {
    fragment.appendChild(createComment(item.comments[i]));
  }
  socialCommentsList.appendChild(fragment);
};

var renderBigPhoto = function (photo) {
  bigPhoto.querySelector('.big-picture__img > img').src = photo.url;
  bigPhoto.querySelector('.likes-count').textContent = photo.likes;
  bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
  bigPhoto.querySelector('.social__caption').textContent = photo.description;
  renderComments(photo);
};

renderBigPhoto(photosData[0]);
