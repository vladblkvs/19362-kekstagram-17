'use strict';

(function () {
  window.connection = {};

  var DOWNLOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var NORMAL_STATUS = 200;
  var TIMEOUT = 10000;
  var errorText = {
    RESPONSE_STATUS: 'Cтатус ответа: ',
    CONNECTION_ERROR: 'Произошла ошибка соединения',
    TIMEOUT_TEXT: 'Запрос не успел выполниться за '
  };

  var createRequest = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === NORMAL_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError(errorText.RESPONSE_STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError(errorText.CONNECTION_ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(errorText.TIMEOUT_TEXT + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
  };

  // Загрузка данных
  window.connection.load = function (onLoadSuccess, onLoadError) {
    var xhr = new XMLHttpRequest();
    createRequest(xhr, onLoadSuccess, onLoadError);

    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };

  // Отправка данных
  window.connection.upload = function (data, onUploadSuccess, onUploadError) {
    var xhr = new XMLHttpRequest();
    createRequest(xhr, onUploadSuccess, onUploadError);

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };
})();
