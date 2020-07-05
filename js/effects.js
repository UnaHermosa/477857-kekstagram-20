'use strict';
(function () {
  var constants = window.constants;

  var currentEffect = constants.Filter.ORIGIN;

  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelPin = document.querySelector('.effect-level__pin');

  var selectEffect = function (value) {
    switch (currentEffect) {
      case constants.Filter.CHROME :
        return 'grayscale(' + value + ')';
      case constants.Filter.SEPIA:
        return 'sepia(' + value + ')';
      case constants.Filter.MARVIN:
        return 'invert(' + value * constants.MARVIN_MAX + '%)';
      case constants.Filter.PHOBOS:
        return 'blur(' + constants.PHOBOS_MAX * value + 'px)';
      case constants.Filter.HEAT:
        return 'brightness(' + constants.HEAT_MAX * value + ')';
      default:
        return 'none';
    }
  };

  var onEffectChange = function (evt) {
    resetSliderValue();
    currentEffect = evt.target.value;
    imgUploadPreview.className = '';
    imgUploadPreview.style.filter = constants.Filter.ORIGIN;
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
    effectLevelPin.style.left = constants.DEFAULT_EFFECT_PIN;
    effectLevelDepth.style.width = constants.DEFAULT_EFFECT_DEPTH;
    imgUploadPreview.style.filter = '';
  };

  window.effects = {
    onEffectChange: onEffectChange,
    onSaturationChange: onSaturationChange,
    moveSetup: moveSetup,
  };
}());
