"use strict"; // Дебаг модуль

// Для северной части
global.serverDebug = (message, ...args) => {
    try {
      if (mp.config.debug.server) {
        console.log(`[${getTime()}] [DEBUG-SERVER]: ${message}`, args);
      } else {
        saveFile('server', `[${getTime()}] [DEBUG-SERVER]: ${message} | ${JSON.stringify(args)}`);
      }
    } catch (worldage) {
      console.log(worldage)
    }
  };