'use strict';

(function () {
  window.connection = {};

  const NORMAL_RESPONSE_CODE = 200;
  const TIMEOUT = 10000;
  let Url = {
    DOWNLOAD: `https://api.jsonbin.io/b/5ea591d698b3d5375234d447`,
    UPLOAD: `https://js.dump.academy/kekstagram`
  };
  let Request = {
    DOWNLOAD: `GET`,
    UPLOAD: `POST`
  };
  let ErrorText = {
    RESPONSE_STATUS: `Cтатус ответа: `,
    CONNECTION_ERROR: `Произошла ошибка соединения`,
    TIMEOUT_TEXT: `Запрос не успел выполниться за `
  };

  let createRequest = function (xhr, onSuccess, onError) {
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === NORMAL_RESPONSE_CODE) {
        onSuccess(xhr.response);
      } else {
        onError(ErrorText.RESPONSE_STATUS + xhr.status + ` ` + xhr.statusText);
      }
    });

    xhr.addEventListener(`error`, function () {
      onError(ErrorText.CONNECTION_ERROR);
    });

    xhr.addEventListener(`timeout`, function () {
      onError(ErrorText.TIMEOUT_TEXT + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT;
  };

  // Загрузка данных
  window.connection.load = function (onLoadSuccess, onLoadError) {
    const xhr = new XMLHttpRequest();
    createRequest(xhr, onLoadSuccess, onLoadError);

    xhr.open(Request.DOWNLOAD, Url.DOWNLOAD, true);
    xhr.setRequestHeader(`secret-key`, `$2b$10$PS0nZIm.5ROxD8Ej721Gv.da8Rf3ipG8fbYuGvHEvcadpEp03XYHC`);
    xhr.send();
  };

  // Отправка данных
  window.connection.upload = function (data, onUploadSuccess, onUploadError) {
    const xhr = new XMLHttpRequest();
    createRequest(xhr, onUploadSuccess, onUploadError);

    xhr.open(Request.UPLOAD, Url.UPLOAD);
    xhr.send(data);
  };
})();
