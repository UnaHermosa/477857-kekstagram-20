'use strict';
(function () {
  var getRequest = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === window.variables.SUCCESS_STATUS_CODE) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.variables.TIMEOUT;
    return xhr;
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = getRequest(onSuccess, onError);
      xhr.open('GET', window.variables.LOAD);
      xhr.send();
    },
    save: function (data, onSuccess, onError) {
      var xhr = getRequest(onSuccess, onError);
      xhr.open('POST', window.variables.SAVE);
      xhr.send(data);
    }
  };
})();
