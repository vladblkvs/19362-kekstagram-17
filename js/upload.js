'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  var errorText = {
    RESPONSE_STATUS: 'Cтатус ответа: ',
    CONNECTION_ERROR: 'Произошла ошибка соединения',
    TIMEOUT_TEXT: 'Запрос не успел выполниться за '
  };
  var NORMAL_STATUS = 200;
  var TIMEOUT = 10000;
  var createRequest = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === NORMAL_STATUS) {
        onLoad(xhr.response);
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

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    createRequest(xhr, onSuccess, onError);

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
