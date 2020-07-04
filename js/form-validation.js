'use strict';
(function () {
  var variables = window.variables;

  var validateHashtags = function (value) {
    var hashtags = value.toLowerCase().trim().split(/\s+/);
    var errors = [];
    if (hashtags.length > variables.HASHTAGS_MAX) {
      errors.push(variables.Errors.TOO_MUCH);
    }
    hashtags.forEach(function (item) {
      if (item[0] !== '#') {
        errors.push(variables.Errors.LOST_HASH);
      }
      if (item === '#') {
        errors.push(variables.Errors.ONLY_HASH);
      }
      if (item.lastIndexOf('#') !== 0) {
        errors.push(variables.Errors.WHITE_SPACE);
      }
      if (!variables.hashTagsRegExp.test(item)) {
        errors.push(variables.Errors.FORBIDDEN_CHARACTERS);
      }
      if (item.length > variables.HASHTAGS_MAX_LENGTH) {
        errors.push(variables.Errors.TOO_LONG);
      }
      if (hashtags.indexOf(item) !== hashtags.lastIndexOf(item)) {
        errors.push(variables.Errors.DUPLICATE);
      }
    });

    var filteredErrors = errors.filter(function (item, i) {
      return errors.indexOf(item) === i;
    });

    return filteredErrors.join(' \n');
  };

  window.formValidation = {
    validateHashtags: validateHashtags
  };
}());
