var db = require("../models");
module.exports = function(app) {

  app.get("/api/workouts", function(req, res) {
        db.Workout.find({}).then(function(dbWorkouts) {
            res.json(dbWorkouts);
        });
    });
    app.get("/api/workouts/range", function(req, res) {
        db.Workout.find({}).then(function(dbWorkouts) {
            res.json(dbWorkouts);
        });
    });

    app.post("/api/workouts/", function(req, res) {
        db.Workout.create({
            day: new Date().setDate(new Date().getDate()),
            exercises: []
          }).then(function(response) {
            res.json(response);
        });
    });
    
    app.put("/api/workouts/:id", function(req, res) {
        let updateWorkout = req.body;
        db.Workout.updateOne({ _id: req.params.id }, {$push: {exercises: updateWorkout}}).then(function(result) {
            return res.json(result);
        });
    })
};