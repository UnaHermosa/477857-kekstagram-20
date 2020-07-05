'use strict';
(function () {
  var fileUploadInput = document.querySelector('#upload-file');
  var fileCloseModal = document.querySelector('#upload-cancel');
  var fileEditingModal = document.querySelector('.img-upload__overlay');

  var picturesList = document.querySelector('.pictures');
  var bigPhoto = document.querySelector('.big-picture');
  var bigPictureCloseButton = bigPhoto.querySelector('.big-picture__cancel');

  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var imgUploadEffectsContainer = document.querySelector('.img-upload__effects');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

  var textareaDescription = document.querySelector('.text__description');

  var imgUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');

  var textHashtags = fileEditingModal.querySelector('.text__hashtags');

  var form = document.querySelector('.img-upload__form');
  var formSubmitButton = form.querySelector('.img-upload__submit');

  var main = document.querySelector('main');
  var fragment = document.createDocumentFragment();
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var commentsLoaderButton = bigPhoto.querySelector('.comments-loader');

  var currentEffect = window.variables.Filter.ORIGIN;

  document.querySelector('.pictures__title').classList.add('visually-hidden');
  bigPhoto.classList.add('hidden');

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
    imgUploadPreview.style.filter = currentEffect;
    scaleControlSmaller.addEventListener('click', window.scale.onScaleControlSmallerPress);
    scaleControlBigger.addEventListener('click', window.scale.onScaleControlBiggerPress);
    imgUploadEffectLevel.classList.add('hidden');
    imgUploadEffectsContainer.addEventListener('change', window.effects.onEffectChange);
    effectLevelPin.addEventListener('mousedown', window.effects.moveSetup);
    textHashtags.addEventListener('input', function (evt) {
      textHashtags.setCustomValidity(window.formValidation.validateHashtags(evt.target.value));
      form.reportValidity();
    });
    textareaDescription.addEventListener('focus', onInputFocus);
    textareaDescription.addEventListener('blur', onInputBlur);
    fileCloseModal.addEventListener('click', function () {
      closeEditingModal();
    });
    fileCloseModal.addEventListener('keyDown', function () {
      closeEditingModal();
    });
    formSubmitButton.addEventListener('click', onFormSubmitButtonClick);
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
    effectLevelPin.removeEventListener('mousedown', window.effects.moveSetup);
    picturesList.removeEventListener('click', onCustomPhotoClick);
    picturesList.removeEventListener('keydown', window.photoPreview.onPreviewEnterPress);
    textHashtags.removeEventListener('input', function (evt) {
      textHashtags.setCustomValidity(window.formValidation.validateHashtags(evt.target.value));
      form.reportValidity();
    });
    textareaDescription.removeEventListener('focus', onInputFocus);
    textareaDescription.removeEventListener('blur', onInputBlur);
    fileCloseModal.removeEventListener('click', function () {
      closeEditingModal();
    });
    fileCloseModal.removeEventListener('keyDown', function () {
      closeEditingModal();
    });
    resetFormValue();
  };
  function onInputFocus() {
    document.removeEventListener('keydown', onModalEscapePress);
  }

  function onInputBlur() {
    document.addEventListener('keydown', onModalEscapePress);
  }

  var findPhotoData = function (customPhoto) {
    var photos = window.pictures.getLoadedData();
    photos.forEach(function (item) {
      if (customPhoto === item.url) {
        window.photoPreview.bigPhoto(item);
        window.photoPreview.showComments(item.comments);
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
    commentsLoaderButton.classList.remove('hidden');
    bigPhoto.classList.remove('hidden');
    document.addEventListener('keydown', onModalEscapePress);
    bigPictureCloseButton.addEventListener('click', function () {
      closePreviewWindow();
    });
    bigPictureCloseButton.addEventListener('keydown', onModalEscapePress);
    commentsLoaderButton.addEventListener('click', window.photoPreview.onCommentsLoaderClick);
  };

  var closePreviewWindow = function () {
    bigPhoto.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', onModalEscapePress);
    bigPictureCloseButton.removeEventListener('click', function () {
      closePreviewWindow();
    });
    bigPictureCloseButton.removeEventListener('keydown', onModalEscapePress);
    commentsLoaderButton.removeEventListener('click', window.photoPreview.onCommentsLoaderClick);
  };

  var onFormSubmitButtonClick = function (evt) {
    evt.preventDefault();
    if (!textHashtags.validity.valid) {
      textHashtags.classList.add('text__invalid');
    } else {
      window.backend.save(new FormData(form), uploadSuccessHandler, uploadErrorHandler);
      textHashtags.classList.remove('text__invalid');
    }
  };

  var uploadSuccessHandler = function () {
    var newSuccess = successTemplate.cloneNode(true);
    fragment.appendChild(newSuccess);
    main.appendChild(fragment);
    document.addEventListener('keydown', onSuccessModalEscPress);
    document.addEventListener('click', onSuccessModalClick);
    closeEditingModal();
  };

  var closeSuccessModal = function () {
    var success = document.querySelector('.success');
    document.removeEventListener('keydown', onSuccessModalEscPress);
    document.removeEventListener('click', onSuccessModalClick);
    success.parentNode.removeChild(success);
  };

  var onSuccessModalEscPress = function (evt) {
    if (evt.keyCode === window.util.ESCAPE) {
      closeSuccessModal();
    }
  };

  var onSuccessModalClick = function (evt) {
    if (!evt.target.classList.contains('success__inner')
    && !evt.target.classList.contains('success__title')) {
      closeSuccessModal();
    }
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var uploadErrorHandler = function (errorMessage) {
    var newError = errorTemplate.cloneNode(true);
    newError.querySelector('.error__title').textContent = errorMessage;
    fragment.appendChild(newError);
    main.appendChild(fragment);
    document.addEventListener('keydown', onErrorModalEscPress);
    document.addEventListener('click', onErrorModalClick);
    closeEditingModal();
  };

  var closeErrorModal = function () {
    var error = document.querySelector('.error');
    document.removeEventListener('keydown', onErrorModalEscPress);
    document.removeEventListener('click', onErrorModalClick);
    error.parentNode.removeChild(error);
    resetFormValue();

  };

  var onErrorModalEscPress = function (evt) {
    if (evt.keyCode === window.util.ESCAPE) {
      closeErrorModal();
    }
  };

  var onErrorModalClick = function (evt) {
    if (!evt.target.classList.contains('error__inner')
     && !evt.target.classList.contains('error__title')) {
      closeErrorModal();
    }
  };

  var resetFormValue = function () {
    fileUploadInput.value = '';
    textHashtags.value = '';
    textareaDescription.value = '';
    window.scale.scaleControlInput.value = window.scale.currentScaleValue;
    imgUploadPreview.style.filter = currentEffect;
    textHashtags.classList.remove('text__invalid');
  };

  picturesList.addEventListener('click', onCustomPhotoClick);
  picturesList.addEventListener('keydown', onPreviewEnterPress);
  fileUploadInput.addEventListener('change', function () {
    openEditingModal();
  });

  window.main = {
    openPreviewWindow: openPreviewWindow
  };
}());
