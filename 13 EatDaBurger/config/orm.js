var connection = require("./connection");

var orm = {
    selectAll: function (cb) {
        var query = "SELECT * FROM burgers";
        connection.query(query, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function (name, cb) {
        var query = "INSERT INTO burgers (burger_name) VALUE ( ? )";
        connection.query(query, name ,function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function(column, newValue, id, cb ){
        var query = "UPDATE burgers SET ?? = ? WHERE id = ?";
        connection.query(query,[column, newValue, id], function (err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};

module.exports = orm;