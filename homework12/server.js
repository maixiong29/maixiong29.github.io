var express = require("express");
var mysql = require("mysql");
var table = require("console.table");

var app = express();


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "word",
  database: "employee_tracker_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

function start() {
  return inquirer.prompt([{
          type: "list",
          message: "What would you like to do?",
          name: "selectedAnswer",
          choices: [
              "View All Employees",
              "View All Employees By Department",
              "View All Employees By Manager",
              "Add Employee",
              "Remove Employee",
              "Update Employee Role",
              "Update Employee Manager",
          ]
      }]).then(function (answer) {
      switch (answer.selectedAnswer) {
          case "View All Employees": viewAllEmployees();
              break;
          case "View All Employees By Department": viewAllEmployeesByDepartment();
              break;
          case "View All Employees By Manager": viewAllEmployeesByManager();
              break;
          case "Add Employee": addEmployee();
              break;
          case "Remove Employee": removeEmployee();
              break;
          case "Update Employee Role": updateEmployeeRole();
              break;
          case "Update Employee Manager": updateEmployeeManager();
              break;
      }
  })
}

  function viewAllEmployees () {
    app.get("/", function(req, res) {
      connection.query("SELECT * FROM employee_tracker_db.employee;", function(err, data) {
        if (err) {
          throw err;
        }
    
        console.table(res);
        start();
      });
    });
  }

  function viewAllEmployeesByDepartment()

  // function viewAllEmployeesByManager()

  // function addEmployee()

  // function removeEmployee()

  // function updateEmployeeRole()

  // function updateEmployeeManager()

start();
