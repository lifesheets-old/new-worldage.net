"use strict"; // Дебаг модуль

// Для северной части
global.serverDebug = (message, ...args) => {
  try {
    if (mp.config.debug.server) {
      console.log(`[DEBUG-SERVER][${getTime()}]: ${message}`);
    } else {
      saveFile('server', `[DEBUG-SERVER][${getTime()}]: ${message}`);
    }
  } catch (worldage) {
    console.log(worldage)
  }
};