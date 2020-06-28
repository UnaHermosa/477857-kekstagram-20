'use strict';
(function () {
  var imgUploadEffectsContainer = document.querySelector('.img-upload__effects');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var textareaDescription = document.querySelector('.text__description');
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var picturesList = document.querySelector('.pictures');
  var bigPhoto = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPhoto.querySelector('.big-picture__cancel');

  document.querySelector('.pictures__title').classList.remove('visually-hidden');

  var fileUploadInput = document.querySelector('#upload-file');
  var fileCloseModal = document.querySelector('#upload-cancel');
  var fileEditingModal = document.querySelector('.img-upload__overlay');

  var textHashtags = fileEditingModal.querySelector('.text__hashtags');

  var onModalEscapePress = function (evt) {
    if (evt.keyCode === window.util.ESCAPE) {
      closeEditingModal();
      closePreviewWindow();
    }
  };

  var openEditingModal = function () {
    fileEditingModal.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', onModalEscapePress);
    textHashtags.addEventListener('focus', onInputFocus);
    textHashtags.addEventListener('blur', onInputBlur);
    window.scale.resizePhoto();
    scaleControlSmaller.addEventListener('click', window.scale.onScaleControlSmallerPress);
    scaleControlBigger.addEventListener('click', window.scale.onScaleControlBiggerPress);
    imgUploadEffectLevel.classList.add('hidden');
    imgUploadEffectsContainer.addEventListener('change', window.effects.onEffectChange);
    effectLevelPin.addEventListener('mouseup', window.effects.onSaturationChange);
    textHashtags.addEventListener('input', function (evt) {
      textHashtags.setCustomValidity(window.formValidation.validateHashtags(evt.target.value));
    });
    textareaDescription.addEventListener('input', window.formValidation.validationTextarea);
    textareaDescription.addEventListener('focus', onInputFocus);
    textareaDescription.addEventListener('blur', onInputBlur);
    fileCloseModal.addEventListener('click', function () {
      closeEditingModal();
    });
    fileCloseModal.addEventListener('keyDown', function () {
      closeEditingModal();
    });
  };

  var closeEditingModal = function () {
    fileEditingModal.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    textHashtags.removeEventListener('focus', onInputFocus);
    textHashtags.removeEventListener('blur', onInputBlur);
    fileCloseModal.removeEventListener('keydown', onModalEscapePress);
    scaleControlSmaller.removeEventListener('click', window.scale.onScaleControlSmallerPress);
    scaleControlBigger.removeEventListener('click', window.scale.onScaleControlBiggerPress);
    imgUploadEffectsContainer.removeEventListener('change', window.effects.onEffectChange);
    effectLevelPin.removeEventListener('mouseup', window.effects.onSaturationChange);
    picturesList.removeEventListener('click', window.onCustomPhotoClick);
    picturesList.removeEventListener('keydown', window.photoPreview.onPreviewEnterPress);
    textHashtags.removeEventListener('input', function (evt) {
      textHashtags.setCustomValidity(window.formValidation.validateHashtags(evt.target.value));
    });
    textareaDescription.removeEventListener('input', window.formValidation.validateTextarea);
    textareaDescription.removeEventListener('focus', onInputFocus);
    textareaDescription.removeEventListener('blur', onInputBlur);
    fileCloseModal.removeEventListener('click', function () {
      closeEditingModal();
    });
    fileCloseModal.removeEventListener('keyDown', function () {
      closeEditingModal();
    });
    fileUploadInput.value = '';
  };
  function onInputFocus() {
    document.removeEventListener('keydown', onModalEscapePress);
  }

  function onInputBlur() {
    document.addEventListener('keydown', onModalEscapePress);
  }

  var findPhotoData = function (customPhoto) {
    var photos = window.data.photos;
    photos.forEach(function (item) {
      if (customPhoto === item.url) {
        window.photoPreview.bigPhoto(item);
      }
    });
  };

  var onPreviewEnterPress = function (evt) {
    if (evt.keyCode === window.util.ENTER) {
      var customPhoto = evt.target.children[0].getAttribute('src');
      findPhotoData(customPhoto);
      openPreviewWindow();
    }
  };

  var onCustomPhotoClick = function (evt) {
    if (evt.target.className === 'picture__img') {
      var customPhoto = evt.target.getAttribute('src');
      findPhotoData(customPhoto);
      openPreviewWindow();
    }
  };

  var openPreviewWindow = function () {
    document.querySelector('body').classList.add('modal-open');
    bigPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onModalEscapePress);
    bigPictureCloseButton.addEventListener('click', function () {
      closePreviewWindow();
    });
    bigPictureCloseButton.addEventListener('keydown', onModalEscapePress);
  };

  var closePreviewWindow = function () {
    bigPhoto.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onModalEscapePress);
    bigPictureCloseButton.removeEventListener('click', function () {
      closePreviewWindow();
    });
    bigPictureCloseButton.removeEventListener('keydown', onModalEscapePress);
  };

  picturesList.addEventListener('click', onCustomPhotoClick);
  picturesList.addEventListener('keydown', onPreviewEnterPress);
  fileUploadInput.addEventListener('change', function () {
    openEditingModal();
  });
}());
