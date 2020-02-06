const express = require("express");
const mongoose = require("mongoose");


const app = express();
const PORT = process.env.PORT || 3000;
var db = require("./models");


app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true
});

app.listen(PORT, function() {
    console.log(`Now listening on port: ${PORT}`);
});