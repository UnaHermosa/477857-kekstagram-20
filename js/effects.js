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

  var DEFAULT_EFFECT_DEPTH = 100 + '%';
  var DEFAULT_EFFECT_PIN = 100 + '%';

  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelPin = document.querySelector('.effect-level__pin');

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

  var getSaturationValue = function () {
    return (effectLevelPin.offsetLeft / effectLevelLine.offsetWidth).toFixed(2);
  };

  var onSaturationChange = function (evt) {
    var value = getSaturationValue(evt);
    imgUploadPreview.style.filter = selectEffect(value);
  };

  var moveSetup = function (evt) {
    var startCoordsX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;

      var newCoordX = effectLevelPin.offsetLeft - shiftX;
      if (newCoordX >= 0 && newCoordX <= effectLevelLine.clientWidth) {
        effectLevelPin.style.left = newCoordX + 'px';
        effectLevelDepth.style.width = newCoordX + 'px';
        onSaturationChange();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var resetSliderValue = function () {
    effectLevelPin.style.left = DEFAULT_EFFECT_PIN;
    effectLevelDepth.style.width = DEFAULT_EFFECT_DEPTH;
    imgUploadPreview.style.filter = '';
    imgUploadPreview.style.transform = '';
  };

  window.effects = {
    onEffectChange: onEffectChange,
    onSaturationChange: onSaturationChange,
    moveSetup: moveSetup,
    resetSliderValue: resetSliderValue
  };
}());
