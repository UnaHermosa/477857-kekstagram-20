'use strict';
(function () {
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
  var currentEffect = Filter.ORIGIN;

  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadEffectsContainer = document.querySelector('.img-upload__effects');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelLine = document.querySelector('.effect-level__line');

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

  window.effects = {
    onEffectChange: onEffectChange,
    onSaturationChange: onSaturationChange
  };
}());
