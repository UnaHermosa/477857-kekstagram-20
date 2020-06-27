'use strict';
(function () {
  var HASHTAGS_MAX = 5;
  var HASHTAGS_MAX_LENGTH = 20;
  var TEXTAREA_MAX_LENGTH = 140;
  var hashTagsRegExp = /^#[a-zа-яA-ZА-Я0-9]*$/;

  var textareaDescription = document.querySelector('.text__description');

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
      if (hashtags[i].length > HASHTAGS_MAX_LENGTH) {
        return 'Хэштег не может быть длинее 20 символов, включая #!';
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
