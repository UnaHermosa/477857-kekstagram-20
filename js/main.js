'use strict';

var PICTURES_AMOUNT = 25;
var LikesAmount = {
  MIN: 15,
  MAX: 200
};
var CommentsAmount = {
  MIN: 1,
  MAX: 3
};
var AvatarAmount = {
  MIN: 1,
  MAX: 6
};
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
    avatar: 'img/avatar-' + getRandomValue(AvatarAmount.MIN, AvatarAmount.MAX) + '.svg',
    message: (getRandomValue(0, 1)) ? randomComment : randomComment += ' ' + randomComment,
    name: usersNames[getRandomValue(0, usersNames.length - 1)]
  };
  return comment;
};

var getComments = function () {
  var commentsArr = [];
  var comments = getRandomValue(CommentsAmount.MIN, CommentsAmount.MAX);
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
      likes: getRandomValue(LikesAmount.MIN, LikesAmount.MAX),
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
document.querySelector('.pictures__title').classList.add('visually-hidden');
bigPhoto.classList.add('hidden');
document.querySelector('body').classList.remove('modal-open');

// module4-task2

var fileUploadInput = document.querySelector('#upload-file');
var fileCloseModal = document.querySelector('#upload-cancel');
var fileEditingModal = document.querySelector('.img-upload__overlay');
var imgUploadScale = fileEditingModal.querySelector('.img-upload__scale');
var KeyCode = {
  ENTER: 13,
  ESCAPE: 27
};

var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
var scaleControlInput = imgUploadScale.querySelector('.scale__control--value');
var imgUploadPreview = fileEditingModal.querySelector('.img-upload__preview img');
var imgUploadEffectsContainer = fileEditingModal.querySelector('.img-upload__effects');
var imgUploadEffectLevel = fileEditingModal.querySelector('.img-upload__effect-level');
var effectLevelPin = fileEditingModal.querySelector('.effect-level__pin');
var effectLevelLine = fileEditingModal.querySelector('.effect-level__line');
var textHashtags = fileEditingModal.querySelector('.text__hashtags');

var Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  INITIAL: 100
};
var currentScaleValue = Scale.INITIAL;

var Filter = {
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
  ORIGIN: 'none'
};

var PHOBOS_MAX = 3;
var MARVIN_MAX = 100;
var HEAT_MAX = 3;

var HASHTAGS_MAX = 5;
var hashTagsRegExp = /^#[a-zа-яA-ZА-Я0-9]*$/;

var currentEffect = Filter.ORIGIN;

var onModalEscapePress = function (evt) {
  if (evt.keyCode === KeyCode.ESCAPE) {
    closeEditingModal();
  }
};

var openEditingModal = function () {
  fileEditingModal.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onModalEscapePress);
  textHashtags.addEventListener('focus', onInputFocus);
  textHashtags.addEventListener('blur', onInputBlur);
  resizePhoto();
  scaleControlSmaller.addEventListener('click', onScaleControlSmallerPress);
  scaleControlBigger.addEventListener('click', onScaleControlBiggerPress);
  imgUploadEffectLevel.classList.add('hidden');
  imgUploadEffectsContainer.addEventListener('change', onEffectChange);
  effectLevelPin.addEventListener('mouseup', onSaturationChange);
  textHashtags.addEventListener('input', function (evt) {
    textHashtags.setCustomValidity(validateHashtags(evt.target.value));
  });
};

var closeEditingModal = function () {
  fileEditingModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  textHashtags.removeEventListener('focus', onInputFocus);
  textHashtags.removeEventListener('blur', onInputBlur);
  fileCloseModal.removeEventListener('keydown', onModalEscapePress);
  scaleControlSmaller.removeEventListener('click', onScaleControlSmallerPress);
  scaleControlBigger.removeEventListener('click', onScaleControlBiggerPress);
  imgUploadEffectsContainer.removeEventListener('change', onEffectChange);
  effectLevelPin.removeEventListener('mouseup', onSaturationChange);
  textHashtags.removeEventListener('input', function (evt) {
    textHashtags.setCustomValidity(validateHashtags(evt.target.value));
  });
  fileUploadInput.value = '';
};

var resizePhoto = function () {
  scaleControlInput.value = currentScaleValue + '%';
  imgUploadPreview.style.transform = 'scale(' + currentScaleValue * 0.01 + ')';
};

var onScaleControlSmallerPress = function () {
  if (currentScaleValue <= Scale.INITIAL && currentScaleValue > Scale.MIN) {
    currentScaleValue -= Scale.STEP;
    resizePhoto();
  }
};

var onScaleControlBiggerPress = function () {
  if (currentScaleValue >= Scale.MIN && currentScaleValue < Scale.INITIAL) {
    currentScaleValue += Scale.STEP;
    resizePhoto();
  }
};

var selectEffect = function (value) {
  switch (currentEffect) {
    case Filter.CHROME :
      return 'grayscale(' + value + ')';
    case Filter.SEPIA:
      return 'sepia(' + value + ')';
    case Filter.MARVIN:
      return 'invert(' + value * MARVIN_MAX + '%)';
    case Filter.PHOBOS:
      return 'blur(' + PHOBOS_MAX * value + 'px)';
    case Filter.HEAT:
      return 'brightness(' + HEAT_MAX * value + ')';
    default:
      return 'none';
  }
};

var onEffectChange = function (evt) {
  currentEffect = evt.target.value;
  imgUploadPreview.className = '';
  imgUploadPreview.style.filter = Filter.ORIGIN;
  imgUploadPreview.classList.add('effects__preview--' + evt.target.value);
  if (evt.target.value !== 'none') {
    imgUploadEffectLevel.classList.remove('hidden');
  } else {
    imgUploadEffectLevel.classList.add('hidden');
  }
  imgUploadPreview.style.filter = selectEffect(1);
};

var getSaturationValue = function (evt) {
  return (evt.target.offsetLeft / effectLevelLine.offsetWidth).toFixed(2);
};

var onSaturationChange = function (evt) {
  var value = getSaturationValue(evt);
  imgUploadPreview.style.filter = selectEffect(value);
};

var validateHashtags = function (value) {
  var hashtags = value.toLowerCase().trim().split(/\s+/);
  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i][0] !== '#') {
      return 'Хэштег должен начинаться с #!';
    }
    if (hashtags.length === 1 && hashtags[i] === '#') {
      return 'Хэштег не может быть только #!';
    }
    if (hashtags[i].lastIndexOf('#') !== 0) {
      return 'Между хэштегами должен быть пробел!';
    }
    if (!hashTagsRegExp.test(hashtags[i])) {
      return 'После # должны быть только буквы и числа. Нельзя использовать пробел, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.!';
    }
    var findDuplicateHashtags = hashtags.filter(function (item) {
      return item === hashtags[i];
    });
    if (findDuplicateHashtags.length > 1) {
      return 'Один и тот же хэштег не может быть использован дважды!';
    }
  }
  if (hashtags.length > HASHTAGS_MAX) {
    return 'Нельзя указать больше пяти хэштегов!';
  }
  return '';
};

function onInputFocus() {
  document.removeEventListener('keydown', onModalEscapePress);
}

function onInputBlur() {
  document.addEventListener('keydown', onModalEscapePress);
}

fileUploadInput.addEventListener('change', function () {
  openEditingModal();
});

fileCloseModal.addEventListener('click', function () {
  closeEditingModal();
});
