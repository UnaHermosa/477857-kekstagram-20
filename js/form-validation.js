'use strict';
(function () {
  var HASHTAGS_MAX = 5;
  var HASHTAGS_MAX_LENGTH = 20;
  var TEXTAREA_MAX_LENGTH = 140;
  var hashTagsRegExp = /^#[a-zа-яA-ZА-Я0-9]*$/;
  var Errors = {
    LOST_HASH: 'Хэштег должен начинаться с #!',
    ONLY_HASH: 'Хэштег не может быть только #!',
    WHITE_SPACE: 'Между хэштегами должен быть пробел!',
    FORBIDDEN_CHARACTERS: 'После # должны быть только буквы и числа. Нельзя использовать пробел, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.!',
    TOO_LONG: 'Хэштег не может быть длинее 20 символов, включая #!',
    DUPLICATE: 'Один и тот же хэштег не может быть использован дважды!',
    TOO_MUCH: 'Нельзя указать больше пяти хэштегов!'
  };

  var textareaDescription = document.querySelector('.text__description');

  var validateHashtags = function (value) {
    var hashtags = value.toLowerCase().trim().split(/\s+/);
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        return Errors.LOST_HASH;
      }
      if (hashtags.length === 1 && hashtags[i] === '#') {
        return Errors.ONLY_HASH;
      }
      if (hashtags[i].lastIndexOf('#') !== 0) {
        return Errors.WHITE_SPACE;
      }
      if (!hashTagsRegExp.test(hashtags[i])) {
        return Errors.FORBIDDEN_CHARACTERS;
      }
      if (hashtags[i].length > HASHTAGS_MAX_LENGTH) {
        return Errors.TOO_LONG;
      }
      var findDuplicateHashtags = hashtags.filter(function (item) {
        return item === hashtags[i];
      });
      if (findDuplicateHashtags.length > 1) {
        return Errors.DUPLICATE;
      }
    }
    if (hashtags.length > HASHTAGS_MAX) {
      return Errors.TOO_MUCH;
    }
    return '';
  };

  var validateTextarea = function () {
    if (textareaDescription.value.length > TEXTAREA_MAX_LENGTH) {
      textareaDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов! Необходимо удалить ' + (textareaDescription.value.length - TEXTAREA_MAX_LENGTH) + ' символа(ов).');
    } else {
      textareaDescription.setCustomValidity('');
    }
  };

  window.formValidation = {
    validateHashtags: validateHashtags,
    validateTextarea: validateTextarea
  };
}());