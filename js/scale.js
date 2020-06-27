'use strict';
(function () {
  var Scale = {
    STEP: 25,
    MIN: 25,
    MAX: 100,
    INITIAL: 100
  };
  var currentScaleValue = Scale.INITIAL;

  var resizePhoto = function () {
    scaleControlInput.value = currentScaleValue + '%';
    imgUploadPreview.style.transform = 'scale(' + currentScaleValue * 0.01 + ')';
  };

  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlInput = imgUploadScale.querySelector('.scale__control--value');

  var onScaleControlSmallerPress = function () {
    if (currentScaleValue <= Scale.INITIAL && currentScaleValue > Scale.MIN) {
      currentScaleValue -= Scale.STEP;
      scaleControlInput.value = currentScaleValue + '%';
      imgUploadPreview.style.transform = 'scale(' + currentScaleValue * 0.01 + ')';
    }
  };

  var onScaleControlBiggerPress = function () {
    if (currentScaleValue >= Scale.MIN && currentScaleValue < Scale.INITIAL) {
      currentScaleValue += Scale.STEP;
      scaleControlInput.value = currentScaleValue + '%';
      imgUploadPreview.style.transform = 'scale(' + currentScaleValue * 0.01 + ')';
    }
  };

  window.scale = {
    onScaleControlBiggerPress: onScaleControlBiggerPress,
    onScaleControlSmallerPress: onScaleControlSmallerPress,
    resizePhoto: resizePhoto
  };
}());
