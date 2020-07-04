'use strict';
(function () {
  var variables = window.variables;
  var currentScaleValue = variables.Scale.INITIAL;

  var resizePhoto = function () {
    scaleControlInput.value = currentScaleValue + '%';
    imgUploadPreview.style.transform = 'scale(' + currentScaleValue * variables.PERCENT + ')';
  };

  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlInput = imgUploadScale.querySelector('.scale__control--value');

  var onScaleControlSmallerPress = function () {
    if (currentScaleValue <= variables.Scale.INITIAL && currentScaleValue > variables.Scale.MIN) {
      currentScaleValue -= variables.Scale.STEP;
      scaleControlInput.value = currentScaleValue + '%';
      imgUploadPreview.style.transform = 'scale(' + currentScaleValue * variables.PERCENT + ')';
    }
  };

  var onScaleControlBiggerPress = function () {
    if (currentScaleValue >= variables.Scale.MIN && currentScaleValue < variables.Scale.INITIAL) {
      currentScaleValue += variables.Scale.STEP;
      scaleControlInput.value = currentScaleValue + '%';
      imgUploadPreview.style.transform = 'scale(' + currentScaleValue * variables.PERCENT + ')';
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
