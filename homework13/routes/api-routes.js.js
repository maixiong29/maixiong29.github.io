var db = require("../models/burgers.js");

module.exports = function(app) {

  app.get("/api/burgers", function(req, res) {
    db.Burgers.findAll({}).then(function(results) {
      res.json(results);
    });
});

app.post("/api/new", function(req, res) {
  db.Burgers.create({
    burger_name: req.body.burger_name,
    devour: req.body.devour,
  }).then(function(results) {
    res.json(results);
  });
});

 app.put("/api/burgers", function (req, res) {
   db.Burgers.update({
     burger_name: req.body.burger_name,
     devour: req.body.devour
   }, {
     where: {
       id: req.body.id
     }
   }).then(function (dbBurger) {
     res.json(dbBurger);
   }).catch(function (err) {
     res.json(err);
   });
 });
 
 app.delete("/api/burgers/:id", function (req, res) {
   db.Burgers.destroy({
     where: {
       id: req.params.id
     }
   }).then(function (dbBurger) {
     res.json(dbBurger);
   });
 });
};