'use strict';
(function () {
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

  var getComment = function () {
    var randomComment = usersComments[window.util.getRandomValue(0, usersComments.length - 1)];
    var comment = {
      avatar: 'img/avatar-' + window.util.getRandomValue(AvatarAmount.MIN, AvatarAmount.MAX) + '.svg',
      message: (window.util.getRandomValue(0, 1)) ? randomComment : randomComment += ' ' + randomComment,
      name: usersNames[window.util.getRandomValue(0, usersNames.length - 1)]
    };
    return comment;
  };

  var getComments = function () {
    var commentsArr = [];
    var comments = window.util.getRandomValue(CommentsAmount.MIN, CommentsAmount.MAX);
    for (var i = 0; i < comments; i++) {
      commentsArr.push(getComment());
    }
    return commentsArr;
  };

  var getPhotos = function (quantity) {
    var photos = [];
    for (var i = 1; i <= quantity; i++) {
      var photo = {
        url: 'photos/' + i + '.jpg',
        description: photosDescriptions[window.util.getRandomValue(0, photosDescriptions.length - 1)],
        likes: window.util.getRandomValue(LikesAmount.MIN, LikesAmount.MAX),
        comments: getComments(),
        index: i
      };
      photos.push(photo);
    }
    return photos;
  };

  var photosData = getPhotos(PICTURES_AMOUNT);

  window.data = {
    photos: photosData
  };
}());