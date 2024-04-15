/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    let formData = new FormData();
  
    if (options.method === "GET") {
        options.url += "?";
        for (let key in options.data) {
            options.url += `${key}=${options.data[key]}&`;
        }
    } else {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }
    }
  
    try {
        xhr.open(options.method, options.url);
        xhr.send(formData);
    } catch (error) {
        options.callback(error);
    }
  
    xhr.addEventListener("load", () => {
        options.callback(false, xhr.response);
    });
};
