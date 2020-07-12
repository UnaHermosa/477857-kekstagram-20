'use strict';
(function () {
  var uploadFile = document.querySelector('.img-upload__input');
  var imgPreview = document.querySelector('.img-upload__preview img');
  var fileTypes = ['jpg', 'jpeg', 'png'];

  uploadFile.addEventListener('change', function () {
    window.main.openEditingModal();
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();
    var matches = fileTypes.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        imgPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
}());
