"use strict";

// Путь к нашему CEF/Browser интерфейса
let browser = mp.browsers.new("package://game_resources/interface/index.html");

// Передача значений в браузер на VUE
mp.browserValuesVue = function (text) {
  browser.execute(text);
}

// Передача значений в VUE в виде объекта
mp.browserObjectVue = function (object) {
  for (let objectKey in object) {
    browser.execute(`${objectKey} = ${JSON.stringify(object[objectKey])}`);
  }
}
