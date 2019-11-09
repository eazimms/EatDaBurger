var orm = require("../config/orm.js"); 

var burger = {
  selectAll: function(cb){
    orm.selectAll("burgers", function(res){
      cb(res);
    }); 
  }, 

  insertOne: function(cols, vals, cb){
    orm.create("burgers", cols, vals, function(res){
      cb(res);
    });
  },
  delete: function(condition, cb){
    orm.delete("burgers", condition, function(res){
      cb(res);
    });
  }
}; 

module.exports = burger; 