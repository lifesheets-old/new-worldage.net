"use strict";

// Подключение всех служебных модулей
import './browser';

// Внутренние переменные
let LoadBrowser = false;
let initModules = false;

// Сообщения об загрузки сервера
mp.events.add('render', () => {
  if (!LoadBrowser || !initModules) {
      mp.game.graphics.drawText("Сервер загружается, подождите ...", [0.5, 0.5], {
          font: 0,
          color: [255, 0, 0, 0],
          scale: [0.5, 0.5],
          outline: true
      });
  }
});

// Подключение всех модулей сервера
mp.events.add('init', () => {

  import './player/auth';
  import './player/camera';
  import './ui/pauseMenu';

  if (LoadBrowser) {
    mp.events.callRemote('player::joined');
  }
  initModules = true;
});

// Доменное пространство браузера CEF
mp.events.add('browserDomReady', () => {
  if (initModules) {
    mp.events.callRemote('player::joined');
  }
  LoadBrowser = true;
});

// Подключаем пользователя
mp.events.callRemote('player::join');