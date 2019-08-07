'use strict';

(function () {
  window.connection = {};

  var NORMAL_RESPONSE_CODE = 200;
  var TIMEOUT = 10000;
  var Url = {
    DOWNLOAD: 'https://js.dump.academy/kekstagram/data',
    UPLOAD: 'https://js.dump.academy/kekstagram'
  };
  var Request = {
    DOWNLOAD: 'GET',
    UPLOAD: 'POST'
  };
  var ErrorText = {
    RESPONSE_STATUS: 'Cтатус ответа: ',
    CONNECTION_ERROR: 'Произошла ошибка соединения',
    TIMEOUT_TEXT: 'Запрос не успел выполниться за '
  };

  var createRequest = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === NORMAL_RESPONSE_CODE) {
        onSuccess(xhr.response);
      } else {
        onError(ErrorText.RESPONSE_STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ErrorText.CONNECTION_ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(ErrorText.TIMEOUT_TEXT + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
  };

  // Загрузка данных
  window.connection.load = function (onLoadSuccess, onLoadError) {
    var xhr = new XMLHttpRequest();
    createRequest(xhr, onLoadSuccess, onLoadError);

    xhr.open(Request.DOWNLOAD, Url.DOWNLOAD);
    xhr.send();
  };

  // Отправка данных
  window.connection.upload = function (data, onUploadSuccess, onUploadError) {
    var xhr = new XMLHttpRequest();
    createRequest(xhr, onUploadSuccess, onUploadError);

    xhr.open(Request.UPLOAD, Url.UPLOAD);
    xhr.send(data);
  };
})();