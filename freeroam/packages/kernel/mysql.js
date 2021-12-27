"use strict"; // Модуль работы с базой данных

const Sequelize = require('sequelize');
global.Op = Sequelize.Op;

module.exports = {
  sequelize: null,
  Models: {},
  // Подключение к Базе Данных
  connect: function(callback) {
    this.sequelize = new Sequelize(mp.config.mysql.dbname, mp.config.mysql.dbuser, mp.config.mysql.dbpass, {
      host: mp.config.mysql.dbhost,
      dialect: 'mysql',
      port: mp.config.mysql.dbport || 3306,
      logging: false,
      dialectOptions: { 
        connectTimeout: 360000 
      },
      pool: {
        max: 100,
        min: 2,
        acquire: 30000,
        idle: 10000,
        evict: 50000,
        acquTimeout: 3000
      },
      define: {
        timestamps: false
      }
    });
    this.loadModels();
    callback();
  },
  loadModels: function() {
    fs.readdirSync(path.dirname(__dirname)).forEach(dir => {
      if (dir != 'base' && !ignoreModules.includes(dir) && fs.existsSync(path.dirname(__dirname)+ "\\" + dir + '\\base')) {
        serverDebug(`Plugin "${dir}" has been successfully initialized.`);
        fs.readdirSync(path.dirname(__dirname)+ "\\" + dir + '\\base').forEach(file => {
          let pathModules = path.dirname(__dirname) + "\\" + dir + '\\base\\' + file;
          let model = require(pathModules)(this.sequelize, Sequelize.DataTypes);
          this.Models[model.name] = model;
        });
      }
    });
    for (var name in this.Models) {
      var model = this.Models[name];
      if (model.associate) {
        model.associate(this.Models);
      }
    }
    this.sequelize.sync();
  } 
};
