'use strict';
(function () {
  var VARIABLES = window.variables;
  var currentScaleValue = VARIABLES.Scale.INITIAL;

  var resizePhoto = function () {
    scaleControlInput.value = currentScaleValue + '%';
    imgUploadPreview.style.transform = 'scale(' + currentScaleValue * VARIABLES.PERCENT + ')';
  };

  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlInput = imgUploadScale.querySelector('.scale__control--value');

  var onScaleControlSmallerPress = function () {
    if (currentScaleValue <= VARIABLES.Scale.INITIAL && currentScaleValue > VARIABLES.Scale.MIN) {
      currentScaleValue -= VARIABLES.Scale.STEP;
      scaleControlInput.value = currentScaleValue + '%';
      console.log(scaleControlInput.value);
      imgUploadPreview.style.transform = 'scale(' + currentScaleValue * VARIABLES.PERCENT + ')';
    }
  };

  var onScaleControlBiggerPress = function () {
    if (currentScaleValue >= VARIABLES.Scale.MIN && currentScaleValue < VARIABLES.Scale.INITIAL) {
      currentScaleValue += VARIABLES.Scale.STEP;
      scaleControlInput.value = currentScaleValue + '%';
      console.log(scaleControlInput.value);
      imgUploadPreview.style.transform = 'scale(' + currentScaleValue * VARIABLES.PERCENT + ')';
    }
  };

  window.scale = {
    onScaleControlBiggerPress: onScaleControlBiggerPress,
    onScaleControlSmallerPress: onScaleControlSmallerPress,
    resizePhoto: resizePhoto,
    scaleControlInput: scaleControlInput,
    currentScaleValue: currentScaleValue
  };
}());
