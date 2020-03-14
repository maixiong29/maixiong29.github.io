var path = require("path");
var public = require("../public");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {

        res.sendFile(path.join(__dirname, "../public/index.html"));

    });
    app.get("/stats", function(req, res) {

        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });
    app.get("/exercise", function(req, res) {

        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });
}