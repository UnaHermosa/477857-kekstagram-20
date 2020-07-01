'use strict';
(function () {
  var VARIABLES = window.variables;
  var textareaDescription = document.querySelector('.text__description');

  var validateHashtags = function (value) {
    var hashtags = value.toLowerCase().trim().split(/\s+/);
    var errors = hashtags.map(function (hashtag) {
      if (hashtag[0] !== '#') {
        return VARIABLES.Errors.LOST_HASH;
      }
      if (hashtag === '#') {
        return VARIABLES.Errors.ONLY_HASH;
      }
      if (hashtag.lastIndexOf('#') !== 0) {
        return VARIABLES.Errors.WHITE_SPACE;
      }
      if (!VARIABLES.hashTagsRegExp.test(hashtag)) {
        return VARIABLES.Errors.FORBIDDEN_CHARACTERS;
      }
      if (hashtag.length > VARIABLES.HASHTAGS_MAX_LENGTH) {
        return VARIABLES.Errors.TOO_LONG;
      }
      var findDuplicateHashtags = hashtags.filter(function (item) {
        return (hashtag === item);
      });
      if (findDuplicateHashtags.length > 1) {
        return VARIABLES.Errors.DUPLICATE;
      }
      return '';
    });
    if (hashtags.length > VARIABLES.HASHTAGS_MAX) {
      return VARIABLES.Errors.TOO_MUCH;
    }
    return errors;
  };


  var validateTextarea = function () {
    var message = '';
    if (textareaDescription.value.length > VARIABLES.TEXTAREA_MAX_LENGTH) {
      message = 'Длина комментария не может составлять больше 140 символов! Необходимо удалить ' + (textareaDescription.value.length - VARIABLES.TEXTAREA_MAX_LENGTH) + ' символа(ов)';
    }
    return message;
  };

  window.formValidation = {
    validateHashtags: validateHashtags,
    validateTextarea: validateTextarea
  };
}());
