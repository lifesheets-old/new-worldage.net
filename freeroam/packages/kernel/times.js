"use strict"; // Модуль для работы с временем

let digitFormat = function(number) {
  return ("0" + number).slice(-2);
};

global.getTime = function() {
  let dateTime = new Date();
  return `${digitFormat(dateTime.getHours())}:${digitFormat(dateTime.getMinutes())}:${digitFormat(dateTime.getSeconds())}`;
};
