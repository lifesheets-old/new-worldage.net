"use strict"; // Модуль для работы с файлами

global.saveFile = function (name, log) {
  fs.appendFile("./debug/" + name + ".log", `${log}\n`, function (err) {
    if(err) {
      createFile(name);
      return console.log(err);
    }
  });
};

global.createFile = function (filename) {
  fs.open(filename, 'r', function(err) {
    if (err) {
      fs.writeFile(filename, '', function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("The file was saved!");
        }  
      });
    } else {
      console.log("The file exists!");
    }
  });
};
