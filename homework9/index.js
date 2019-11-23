const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");
const pdf = require('html-pdf');


function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?"
    },
    {
      type: "input",
      name: "username",
      message: "Enter your GitHub Username"
    },
    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: [
          "Red",
          "Blue",
          "Green",
          "Pink",
        ],
      }
  ])

.then(function({ name, username, color }) {
  const queryUrl = `https://api.github.com/users/${username}`;


  axios.get(queryUrl).then(function(response) {
  fs.writeFile("./index.html",
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css">
  <title>GitHub Profile PDF Generator</title>
</head>
<body style="background-color:purple>

<div class="container">

<div class="row">
  <div class="col-12" style="text-align: center; background-color: ${color};"><h1>Hi! My name is ${name} !</h1></div>
  </div>

  <div class="jumbotron jumbotron-fluid;" style="margin: 0 auto; background-color: white;">
  <div class="row">
  <div class="col-4"></div>
    <div class="col-4"><img class="center-block" src="${response.data.avatar_url}"></div>
    <div class="col-4"></div>
  </div>

<br />

  <div class="row">
  <div class="col-4" style="text-align: center; font-size: 24px;"><i class="fas fa-location-arrow"></i>${response.data.location}</div>
  <div class="col-4"><h4><i class="fab fa-github-square"></i><a href="https://github.com/${username}">GitHub</a></h4></div>
  <div class="col-4"><h4><i class="fab fa-linkedin"></i><a href="${response.data.blog}">LinkedIn</a></h4></div>
  </div>

<br />

  <h2 style="text-align:center;">${response.data.bio}</h2>
    
<br />

<div class="row">
    <div class="col-1"></div>
    <div class="col-4 card" style="background-color: ${color}; font-size: 26px; text-align: center; padding: 15px;">Public Repositories:  ${response.data.public_repos}</div>
    <div class="col-2"></div>
    <div class="col-4 card" style="background-color: ${color}; font-size: 26px; text-align: center; padding: 15px;">Followers:  ${response.data.followers}</div>
    <div class="col-1"></div>
    </div>
  
<br />

<div class="row">
    <div class="col-1"></div>
    <div class="col-4 card" style="background-color: ${color}; font-size: 26px; text-align: center; padding: 15px;">GitHub Stars: ${response.data.public_gists}</div>
    <div class="col-2"></div>
    <div class="col-4 card" style="background-color: ${color}; font-size: 26px; text-align: center; padding: 15px;">Following:  ${response.data.following}</div>
    <div class="col-1"></div>
    </div>

  </div>
</div>
</body>
</html>`,
(err) => {
  if (err)
      throw err;

      console.log("Successfully created an HTML file!");
    
}
  );
  });
});
};


async function init() {
  console.log("Hi");
  try {
    const answers = await promptUser();

    var options = { 
    format: 'Letter',
    height: "17500px",
    width: "1750px",  
  };
     
    await pdf.create(fs.readFileSync('./index.html', 'utf8'), options).toFile('./ghprofile.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); 
    });

    console.log("Successfully wrote to index.html!");
  } 
  catch (err) {
    console.log(err);}
};


init();
