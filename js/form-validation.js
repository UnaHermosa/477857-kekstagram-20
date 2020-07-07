'use strict';
(function () {
  var constants = window.constants;

  var validateHashtags = function (value) {
    var hashtags = value.toLowerCase().trim().split(/\s+/);
    var errors = [];
    if (hashtags.length > constants.HASHTAGS_MAX) {
      errors.push(constants.Errors.TOO_MUCH);
    }
    hashtags.forEach(function (item) {
      if (item[0] !== '#') {
        errors.push(constants.Errors.LOST_HASH);
      }
      if (item === '#') {
        errors.push(constants.Errors.ONLY_HASH);
      }
      if (item.lastIndexOf('#') !== 0) {
        errors.push(constants.Errors.WHITE_SPACE);
      }
      if (!constants.hashTagsRegExp.test(item)) {
        errors.push(constants.Errors.FORBIDDEN_CHARACTERS);
      }
      if (item.length > constants.HASHTAGS_MAX_LENGTH) {
        errors.push(constants.Errors.TOO_LONG);
      }
      if (hashtags.indexOf(item) !== hashtags.lastIndexOf(item)) {
        errors.push(constants.Errors.DUPLICATE);
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
