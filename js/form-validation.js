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
    var errors = [];
    hashtags.forEach(function (item) {
      if (item[0] !== '#') {
        errors.push(Errors.LOST_HASH);
      }
      if (item === '#') {
        errors.push(Errors.ONLY_HASH);
      }
      if (!item.lastIndexOf('#')) {
        errors.push(Errors.WHITE_SPACE);
      }
      if (!hashTagsRegExp.test(item)) {
        errors.push(Errors.FORBIDDEN_CHARACTERS);
      }
      if (item.length > HASHTAGS_MAX_LENGTH) {
        errors.push(Errors.TOO_LONG);
      }
      var findDuplicateHashtags = hashtags.filter(function (hashtag) {
        return (hashtag === item);
      });
      if (findDuplicateHashtags.length > 1) {
        errors.push(Errors.DUPLICATE);
      }
      if (hashtags.length > HASHTAGS_MAX) {
        errors.push(Errors.TOO_MUCH);
      }
    });
    return errors;
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
