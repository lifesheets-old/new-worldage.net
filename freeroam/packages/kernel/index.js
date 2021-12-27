"use strict"; // Базовый модуль, отвечающий за загрузку модулей

// Глобальные переменные
global.fs = require('fs');
global.path = require('path');
global.mysql = require('./mysql');
global.ignoreModules = [];
global.activeModules = [];

// Внутренние переменные
let loadModules = [];
let initModules = false;

// Подключение всех служебных модулей
require ('./times');
require ('./files');
require ('./debug');

// Подключение функций любого существующего модуля
global.call = (moduleDirName) => {
  if (!fs.existsSync(path.dirname(__dirname)+ "\\" + moduleDirName + "\\index.js")) return {
    isEmpty: true // Флаг, который означает, что модуль отключен или не существует.
  };
  if (ignoreModules.includes(moduleDirName)) {
    let addObject = require(fs.existsSync(path.dirName(__dirname) + "\\" + moduleDirName + "\\index.js"));
    let newObject = {
      isEmpty: true // Флаг, который означает, что модуль отключен или не существует.
    };
    for (const key in addObject) {
      const element = addObject[key];
      if (typeof element === "function") {
        newObject[key] = () => {};
      } else {
        newObject[key] = {};
      }
    }
    return newObject;
  }
  return require(path.dirname(__dirname)+ "\\" + moduleDirName + "\\index.js");
};

// Функция, которая вызывается модулем, инициализация
global.initModule = (dirName) => {
  let path = dirName.split("\\");
  let moduleName = path[path.length - 1];
  loadModules.splice(loadModules.findIndex(x => x === moduleName), 1);
  if (loadModules.length == 0) {
    if (initModules) {
      // Ошибка инициализации модуля 
      throw new Error(`The server has already been initialized. Attempt to reinitialize from a module ${moduleName}`);
    }
    initModules = true; // Инициализация модуля включена
    serverDebug('All modules loaded');
  }
}

// Вызов подключения к БД, подключение всех модулей и вызов их инициализации
mysql.connect(function() {
  fs.readdirSync(path.dirname(__dirname)).forEach(file => {
    if (!ignoreModules.includes(file) && fs.existsSync(path.dirname(__dirname)+ "\\" + file + "\\events.js")) {
      let events = require('..\\' + file + '\\events');
      mp.events.add(events);
      activeModules.push(file);
      if (events["init"] != null) {
        loadModules.push(file);
      }
    }
  });
  mp.events.call('init');
});