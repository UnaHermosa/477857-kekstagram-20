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
      var findDuplicateHashtags = hashtags.filter(function (hashtag) {
        return (hashtag === item);
      });
      if (findDuplicateHashtags.length > 1) {
        errors.push(VARIABLES.Errors.DUPLICATE);
      }
    });
    var sortingErrorsArr = function (arr) {
      var sortedArr = [];
      arr.forEach(function (item) {
        if (!sortedArr.includes(item)) {
          sortedArr.push(item);
        }
      });
      return sortedArr;
    };
    var message;
    if (errors.length === 0) {
      message = '';
    } else {
      message = sortingErrorsArr(errors).join(' \n');
    }
    return message;
  };

  var validateTextarea = function () {
    var message = '';
    if (textareaDescription.value.length > VARIABLES.TEXTAREA_MAX_LENGTH) {
      message = 'Длина комментария не может составлять больше 140 символов! Необходимо удалить ' + (textareaDescription.value.length - VARIABLES.TEXTAREA_MAX_LENGTH) + ' символа(ов).';
    }
    return message;
  };

  window.formValidation = {
    validateHashtags: validateHashtags,
    validateTextarea: validateTextarea
  };
}());
