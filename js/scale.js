'use strict';
(function () {
  var constants = window.constants;
  var currentScaleValue = constants.Scale.INITIAL;

  var resizePhoto = function () {
    scaleControlInput.value = currentScaleValue + '%';
    imgUploadPreview.style.transform = 'scale(' + currentScaleValue * constants.PERCENT + ')';
  };

  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlInput = imgUploadScale.querySelector('.scale__control--value');

  var onScaleControlSmallerPress = function () {
    if (currentScaleValue <= constants.Scale.INITIAL && currentScaleValue > constants.Scale.MIN) {
      currentScaleValue -= constants.Scale.STEP;
      scaleControlInput.value = currentScaleValue + '%';
      imgUploadPreview.style.transform = 'scale(' + currentScaleValue * constants.PERCENT + ')';
    }
  };

  var onScaleControlBiggerPress = function () {
    if (currentScaleValue >= constants.Scale.MIN && currentScaleValue < constants.Scale.INITIAL) {
      currentScaleValue += constants.Scale.STEP;
      scaleControlInput.value = currentScaleValue + '%';
      imgUploadPreview.style.transform = 'scale(' + currentScaleValue * constants.PERCENT + ')';
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
