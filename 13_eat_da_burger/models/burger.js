// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  all: function(cb) {
    orm.selectAll(function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(name, cb) {
    orm.insertOne(name, function(res) {
      cb(res);
    });
  },
  update: function(column, newValue, id, cb) {
    orm.updateOne(column, newValue, id, function(res) {
      cb(res);
    });
  }
};
module.exports = burger;