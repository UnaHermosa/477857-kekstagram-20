'use strict';
(function () {
  var VARIABLES = window.variables;
  var textareaDescription = document.querySelector('.text__description');

  var validateHashtags = function (value) {
    var hashtags = value.toLowerCase().trim().split(/\s+/);
    var errors = [];
    if (hashtags.length > VARIABLES.HASHTAGS_MAX) {
      errors.push(VARIABLES.Errors.TOO_MUCH);
    }
    hashtags.forEach(function (item) {
      if (item[0] !== '#') {
        errors.push(VARIABLES.Errors.LOST_HASH);
      }
      if (item === '#') {
        errors.push(VARIABLES.Errors.ONLY_HASH);
      }
      if (item.lastIndexOf('#') !== 0) {
        errors.push(VARIABLES.Errors.WHITE_SPACE);
      }
      if (!VARIABLES.hashTagsRegExp.test(item)) {
        errors.push(VARIABLES.Errors.FORBIDDEN_CHARACTERS);
      }
      if (item.length > VARIABLES.HASHTAGS_MAX_LENGTH) {
        errors.push(VARIABLES.Errors.TOO_LONG);
      }
      if (hashtags.indexOf(item) !== hashtags.lastIndexOf(item)) {
        errors.push(VARIABLES.Errors.DUPLICATE);
      }
    });

    var filteredErrors = errors.filter(function (item, i) {
      return errors.indexOf(item) === i;
    });

    return filteredErrors.join(' \n');
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
