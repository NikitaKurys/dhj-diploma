/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  function getOptionsData(obj) {
    let str = "";
      for (let key in obj) {
        if (str != "") {
            str += "&";
        }
        str += key + "=" + obj[key];
      }
    return str
  }

  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  
  try {
    if (options.method === 'GET') {
      xhr.open(options.method, `${options.url}?${getOptionsData(options.data)}`);
      xhr.send();
    } else {
      let formData = new FormData;
      for (key in options.data) {
        formData.append(key, options.data[key]);
      }
      xhr.open(options.method, options.url);
      xhr.send(formData);
    }
  }
  catch ( e ) {
    console.log( e );
    options.callback(xhr.response.error);
  }
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === xhr.DONE && xhr.status === 200) {
      options.callback(xhr.response.error, xhr.response);
    } 
  }
};
