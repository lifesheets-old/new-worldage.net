"use strict";

// Отключаем АФК камеру после 30 сек.
mp.events.add('render', () => {
  setInterval(() => { 
    mp.game.invoke('0x9E4CFFF989258472');
    mp.game.invoke('0xF4F2C0D4EE209E20');
  }, 25000);
});
