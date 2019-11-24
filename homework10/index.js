const inquirer = require("inquirer");
const fs = require("fs");

function generateTeam() {
    return inquirer.prompt([{
            type: "list",
            message: "Select the following to add?",
            name: "employeeType",
            choices: [
                "Engineer",
                "Employee",
                "Intern",
                "No More Additions"
            ]
        }]).then(function (answer) {
        switch (answer.employeeType) {
            case "Engineer": generateEngineer();
                break;
            case "Employee": generateEmployee();
                break;
            case "Intern": generateIntern();
                break;
            default:
                console.log("Your team is complete.  A 'team.html' has been generated for you");
                fs.appendFile("output/./team.html", "</div></div></body></html>", 
                    (err) => {
                        if (err) 
                            throw err;
                });
        }
    })
}

function generateManager() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the manager's name?",
            name: "managerName"
        }, {
            type: "input",
            message: "What is the manager's employee ID?",
            name: "managerId"
        }, {
            type: "input",
            message: "What is the manager's email address?",
            name: "managerEmail"
        }, {
            type: "input",
            message: "What is the manager's office number?",
            name: "managerOffice"
        }
    ]).then(function ({managerName, managerId, managerEmail, managerOffice}) {
        generateTeam();
        fs.writeFile("output/./team.html", `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Team Profile</title>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        </head>
        <body>
        <style>
        
        body {
            font-family: 'Helvetica', sans-serif;
            background: url("../images/email-pattern/email-pattern.png");
        }
        header {
            background-color: purple;
            color: white;
            text-align: center;
            padding: 20px;
        }
        .card-body {
            font-size: 26px;
        }
        .card-title {
            font-size: 28px;
        }
        .card {
            margin: 25px;
            border: ridge;
            color: purple;
        }
        
        </style>
        <header>
            <h1>Team Profile</h1>
        </header>
 <br />
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                        <div class="card-body" style="background-color: Tomato;">
                          <h5 class="card-title">${managerName}</h5>
                          <p class="card-text"><i class="far fa-gem"></i> Manager</p>
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item"><strong>ID</strong>: ${managerId}</li>
                          <li class="list-group-item"><strong>Email</strong>: ${managerEmail}</li>
                          <li class="list-group-item"><strong>Office Number</strong>: ${managerOffice}</li>
                        </ul>
    </div>
        </div>`, 
                
        (err) => {
            if (err) 
                throw err;
            })
    })
}

function generateEngineer() {
    console.log("Enter your engineer's information")
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your engineer's name?",
            name: "engineerName"
        }, {
            type: "input",
            message: "What is your engineer's employee ID?",
            name: "engineerId"
        }, {
            type: "input",
            message: "What is your engineer's email address?",
            name: "engineerEmail"
        }, {
            type: "input",
            message: "What is your engineer's GitHub username?",
            name: "engineerGithub"
        }
    ]).then(function ({engineerName, engineerId, engineerEmail, engineerGithub}) {
        generateTeam();
        fs.appendFile("output/./team.html", `
        <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                        <div class="card-body" style="background-color: MediumSeaGreen;">
                          <h5 class="card-title">${engineerName}</h5>
                          <p class="card-text"><i class="fas fa-cogs"></i> Engineer</p>
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item"><strong>ID</strong>: ${engineerId}</li>
                          <li class="list-group-item"><strong>Email</strong>: ${engineerEmail}</li>
                          <li class="list-group-item"><strong>GitHub</strong>: <a href="https://github.com/${engineerGithub}">${engineerGithub}</a></li>
                        </ul>
            </div>
                </div>`, 
                (err) => {
                    if (err) 
                        throw err;
            })
    })
}

function generateIntern() {
    console.log("Enter intern's information")
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your intern's name?",
            name: "internName"
        }, {
            type: "input",
            message: "What is your intern's employee ID?",
            name: "internId"
        }, {
            type: "input",
            message: "What is your intern's email address?",
            name: "internEmail"
        }, {
            type: "input",
            message: "What is your intern's school?",
            name: "internSchool"
        }
    ]).then(function ({internName, internId, internEmail, internSchool}) {
        generateTeam();
        fs.appendFile("output/./team.html", `
            <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                        <div class="card-body" style="background-color: yellow;">
                          <h5 class="card-title">${internName}</h5>
                          <p class="card-text"><i class="fas fa-glasses"></i> Intern</p>
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item"><strong>ID</strong>: ${internId}</li>
                          <li class="list-group-item"><strong>Email</strong>: ${internEmail}</li>
                          <li class="list-group-item"><strong>School</strong>: ${internSchool}</li>
                        </ul>
                </div>
            </div>`, 
                (err) => {
                    if (err) 
                        throw err;
            })
    })
}


function generateEmployee() {
    console.log("Enter employee's information")
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your employee's name?",
            name: "employeeName"
        }, {
            type: "input",
            message: "What is your employee's ID?",
            name: "employeeId"
        },{
            type: "input",
            message: "What is your title?",
            name: "employeeTitle"
        }, {
            type: "input",
            message: "What is your employee's email address?",
            name: "employeeEmail"
        }, {
            type: "input",
            message: "What is your employee's role?",
            name: "employeeRole"
        }
    ]).then(function ({employeeName, employeeId, employeeTitle, employeeEmail, employeeRole}) {
        generateTeam();
        fs.appendFile("output/./team.html", `
            <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                        <div class="card-body" style="background-color: DodgerBlue;">
                          <h5 class="card-title">${employeeName}</h5>
                          <p class="card-text"><i class="fas fa-user"></i> Employee</p>
                        </div>
                        <ul class="list-group list-group-flush">
                          <li class="list-group-item"><strong>ID</strong>: ${employeeId}</li>
                          <li class="list-group-item"><strong>Title</strong>: ${employeeTitle}</li>
                          <li class="list-group-item"><strong>Email</strong>: ${employeeEmail}</li>
                          <li class="list-group-item"><strong>Role</strong>: ${employeeRole}</li>
                        </ul>
                </div>
            </div>`, 
                (err) => {
                    if (err) 
                        throw err;
            })
    })
}



generateManager();
