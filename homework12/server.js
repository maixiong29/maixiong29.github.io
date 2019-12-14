var express = require("express");
var mysql = require("mysql");
var table = require("console.table");
var inquirer = require("inquirer");

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
              "View All Employees By Role",
              "Add Employee",
              "Remove Employee",
              "Update Employee Role",
              //"Update Employee Manager",
          ]
      }]).then(function (answer) {
      switch (answer.selectedAnswer) {
          case "View All Employees": viewAllEmployees();
              break;
          case "View All Employees By Department": viewAllEmployeesByDepartment();
              break;
          case "View All Employees By Role": viewAllEmployeesByRole();
              break;
          case "Add Employee": addEmployee();
              break;
          case "Remove Employee": removeEmployee();
              break;
          case "Update Employee Role": updateEmployeeRole();
              break;
          //case "Update Employee Manager": updateEmployeeManager();
              //break;
      }
  })
}

  function viewAllEmployees () {
      connection.query("SELECT * FROM employee;", function(err, data) {
        if (err) {
          throw err;
        }
    
        console.table(data);
        start();
      });
    };

  function viewAllEmployeesByDepartment() {
    inquirer.prompt({
      type: "list",
      message: "Which department would you like to view?",
      name: "byDepartment",
      choices: [
        "Engineering",
        "Management",
        "Science",
        "Secret",
        "Archery",
        "Asgard"
      ]
    }).then(function(answer) {
      connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.name FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id) WHERE department.name = ?", [answer.byDepartment], function(err, res) {
        if (err) {
          throw err;
      }
      console.table(res);
      start();
    });
  });
}

  function viewAllEmployeesByRole(){
    inquirer.prompt({
      type: "list",
      message: "Choose a role to view the employees by",
      name: "byRole",
      choices: [
        "Hero",
        "Captain",
        "Nuclear Scientist",
        "Agent",
        "Archer",
        "King"
      ]
    }).then(function(answer) {
      connection.query("SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, role.salary, department.name FROM ((employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department ON role.department_id = department.id) WHERE role.title = ?", [answer.byRole], function(err, res) {
        if (err) {
          throw err;
      }
      console.table(res);
      start();
    })
  })
}

 function addEmployee() {
   inquirer.prompt([
     {
       name: "firstName",
       type: "input",
       message: "What is the employee's first name?"
     },
     {
      name: "lastName",
      type: "input",
      message: "What is the employee's last name?"
     },
      {
      name: "manager",
      type: "list",
      message: "Who is the employee's manager?",
      choices: ["Tony stark", "Steve Rodgers"]
      }, 
     {
      name: "role",
      type: "list",
      message: "What is the employee's title?",
      choices: 
      [
          "Hero",
          "Captain",
          "Nuclear Scientist",
          "Agent",
          "Archer",
          "King"
      ]
      }
   ])
   .then(function(answer) {
     var manager_id;
     if (answer.manager === "Tony Stark") {
       manager_id = 1;
     }else {manager_id = 2};

     var role_id;
     if (answer.role === "Hero") {
       role_id = 1;
     }else if (answer.role === "Captain") {
      role_id = 2;
    }else if (answer.role === "Nuclear Scientist") {
      role_id = 3;
    }else if (answer.role === "Agent") {
      role_id = 4;
    }else if (answer.role === "Archer") {
      role_id = 5;
    } else if (answer.role === "King") {
      role_id = 6;
    };
     connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
     [
       answer.firstName,
       answer.lastName,
       role_id,
       manager_id,
     ]), function(err, res) {
      if (err) {
        throw err;
    }
    console.table(res);
    start();
   }
  })
}
 
  function removeEmployee() {
    inquirer.prompt({
    type: "list",
    message: "Which employee would you like to delete?",
    name: "removeEmployee",
    choices: [
      "Iron Man",
      "Captain America",
      "The Hulk",
      "Black Widow",
      "Hawkeye",
      "Thor"
      
    ]
  }).then(function(answer) {
    connection.query("DELETE FROM employee WHERE first_name = ?", [answer.removeEmployee], function(err, res) {
      if (err) {
        throw err;
    }
    console.table(res);
    start();
  })
})
  }

 function updateEmployeeRole() {
  inquirer.prompt({
    type: "list",
    message: "Which employee's role would you like to update?",
    name: "updateEmployeeRole",
    choices: [
      "Iron Man",
      "Captain America",
      "The Hulk",
      "Black Widow",
      "Hawkeye",
      "Thor"
    ]}).then(function (answer) {
      switch (answer.updateEmployeeRole) {
          case "Iron Man": ironman();
              break;
          case "Captain America": captainamerica();
              break;
          case "The Hulk": thehulk();
              break;
          case "Black Widow": blackwidow();
              break;
          case "Hawkeye": hawkeye();
              break;
          case "Thor": thor();
      }
  });
  };

function ironman() {
  inquirer.prompt({
      name: "updateIronMan",
      type: "list",
      message: "Which role would like for this employee",
      choices: 
      [
          "Captain",
          "Nuclear Scientist",
          "Agent",
          "Archer",
          "King"
      ]
}).then(function (answer) {
  connection.query("UPDATE role SET title = ? WHERE id = ?", [answer.updateIronMan, 1], function(err, res) {
    if (err) {
      throw err;
  }
  console.table(res);
  start();

  });
  
})
};

function captainamerica() {
  inquirer.prompt({
      name: "updateCaptainAmerica",
      type: "list",
      message: "Which role would like for this employee",
      choices: 
      [
          "Hero",
          "Nuclear Scientist",
          "Agent",
          "Archer",
          "King"
      ]
}).then(function (answer) {
  connection.query("UPDATE role SET title = ? WHERE id = ?", [answer.updateCaptainAmerica, 2], function(err, res) {
    if (err) {
      throw err;
  }
  console.table(res);
  start();
  });
})
};

function thehulk() {
  inquirer.prompt({
      name: "updateTheHulk",
      type: "list",
      message: "Which role would like for this employee",
      choices: 
      [
          "Hero",
          "Captain",
          "Agent",
          "Archer",
          "King"
      ]
}).then(function (answer) {
  connection.query("UPDATE role SET title = ? WHERE id = ?", [answer.updateTheHulk, 3], function(err, res) {
    if (err) {
      throw err;
  }
  console.table(res);
  start();

  });
})
};

function blackwidow() {
  inquirer.prompt({
      name: "updateBlackWidow",
      type: "list",
      message: "Which role would like for this employee",
      choices: 
      [
          "Hero",
          "Captain",
          "Nuclear Scientist",
          "Archer",
          "King"
      ]
}).then(function (answer) {
  connection.query("UPDATE role SET title = ? WHERE id = ?", [answer.updateBlackWidow, 4], function(err, res) {
    if (err) {
      throw err;
  }
  console.table(res);
  start();
  });
})
};

function hawkeye() {
  inquirer.prompt({
      name: "updateHawkEye",
      type: "list",
      message: "Which role would like for this employee",
      choices: 
      [
        "Hero",  
        "Captain",
          "Nuclear Scientist",
          "Agent",
          "King"
      ]
}).then(function (answer) {
  connection.query("UPDATE role SET title = ? WHERE id = ? ", [answer.Hawkeye, 5], function(err, res) {
    if (err) {
      throw err;
  }
  console.table(res);
  start();

  });
})
};

function thor() {
  inquirer.prompt({
      name: "updateThor",
      type: "list",
      message: "Which role would like for this employee",
      choices: 
      [
        "Hero",  
        "Captain",
          "Nuclear Scientist",
          "Agent",
          "Archer",
          
      ]
}).then(function (answer) {
  connection.query("UPDATE role SET title = ? WHERE id = ? ", [answer.updateThor, 6], function(err, res) {
    if (err) {
      throw err;
  }
  console.table(res);
  start();

  });
})
};

  // function updateEmployeeManager()

start();
