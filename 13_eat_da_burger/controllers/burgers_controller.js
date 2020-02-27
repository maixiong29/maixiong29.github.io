var express = require("express");
var burger = require("../models/burger.js");
var router = express.Router();

// mainpage
router.get("/", function(req,res){
    res.render("index");
});
// add new burger to the database
router.post("/api/burger", function(req, res){
    burger.create(req.body.name, function(result){
        res.send(result);
    });
});
// getting information from the database
router.get("/api/burger", function(req, res){
    burger.all(function(result){
        res.json(result);
    });
});
// updating the burger to true in Devoure column
router.put("/api/burger/:id", function(req, res){
    burger.update("devoured", true, req.params.id, function(result){
        res.json(result);
    })
});


module.exports = router;