"use strict";

let colorNitive = {r:255, g:0, b:0};
let serverNames = 'DEVELOPMENT OF WORLDAGE.NET';

mp.events.add('playerReady', () => {
  // Замените цвет вкладок и прогрес баров
  mp.game.invoke('0xF314CF4F0211894E', 143, colorNitive.r, colorNitive.g, colorNitive.b, 255); 
  // Заменяет заголовок над картой
  mp.game.gxt.set('PM_PAUSE_HDR', serverNames); 
});