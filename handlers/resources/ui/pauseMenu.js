"use strict";

// Настраиваем custom pause menu
mp.events.add('playerReady', () => {
  // Замените цвет вкладок и прогрес баров
  mp.game.invoke('0xF314CF4F0211894E', 143, 255, 0, 0, 255); 
  // Заменяет заголовок над картой
  mp.game.gxt.set('PM_PAUSE_HDR', 'DEVELOPMENT OF WORLDAGE.NET'); 
});
