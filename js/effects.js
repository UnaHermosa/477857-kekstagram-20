'use strict';
(function () {
  var variables = window.variables;

  var currentEffect = variables.Filter.ORIGIN;

  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelPin = document.querySelector('.effect-level__pin');

  var selectEffect = function (value) {
    switch (currentEffect) {
      case variables.Filter.CHROME :
        return 'grayscale(' + value + ')';
      case variables.Filter.SEPIA:
        return 'sepia(' + value + ')';
      case variables.Filter.MARVIN:
        return 'invert(' + value * variables.MARVIN_MAX + '%)';
      case variables.Filter.PHOBOS:
        return 'blur(' + variables.PHOBOS_MAX * value + 'px)';
      case variables.Filter.HEAT:
        return 'brightness(' + variables.HEAT_MAX * value + ')';
      default:
        return 'none';
    }
  };

  var onEffectChange = function (evt) {
    resetSliderValue();
    currentEffect = evt.target.value;
    imgUploadPreview.className = '';
    imgUploadPreview.style.filter = variables.Filter.ORIGIN;
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
    effectLevelPin.style.left = window.variables.DEFAULT_EFFECT_PIN;
    effectLevelDepth.style.width = window.variables.DEFAULT_EFFECT_DEPTH;
    imgUploadPreview.style.filter = '';
  };

  window.effects = {
    onEffectChange: onEffectChange,
    onSaturationChange: onSaturationChange,
    moveSetup: moveSetup,
  };
}());
