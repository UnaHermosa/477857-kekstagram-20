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
var photosDescriptions = ['Красота', 'Любимая фотография', 'Так себе фотка.', 'Изумительная фотография.', 'Не понятно что.', 'Шедевр.'];

var picturesList = document.querySelector('.pictures');
document.querySelector('.pictures__title').classList.remove('visually-hidden');

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getComment = function () {
  var randomComment = usersComments[getRandomValue(0, usersComments.length - 1)];
  var comment = {
    avatar: 'img/avatar' + getRandomValue(MIN_AVATAR_AMOUNT, MAX_AVATAR_AMOUNT) + '.svg',
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
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = data.url;
  pictureElement.querySelector('.picture__comments').textContent = data.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = data.likes;
  return pictureElement;
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
