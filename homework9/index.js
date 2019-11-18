const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");
const pdf = require('html-pdf');


const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer
  .prompt([
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
      type: "input",
      name: "location",
      message: "Where are you from?"
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

.then(function({ username }) {
  const queryUrl = `https://api.github.com/users/${username}`;


  axios.get(queryUrl).then(function(res) {
 
    function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>GitHub Profile PDF Generator</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid;" style="background-color: ${color}>
  <div class="container">
    <h1 class="display-4">Hi! My name is ${name} !</h1>
    <div class="col-4"><img class="center-block" src="${answers.data.avatar_url}"></div>
    <br>
    <ul class="list-group">
      <li class="list-group-item">${location}</li>
      <li class="list-group-item">GitHub<a href="https://github.com/${username}"></li>
      <li class="list-group-item">Blog<a href="${answers.data.blog}"></li>
    </ul>
    <br>
    <h2 style="text-align:center;">${answers.data.bio}</h2>
    <br>
    <div class="card-columns" style="background-color: ${color}>
    <h3><strong>Public Repositories</strong></h3>
    <div id="publicRepos">${answers.data.public_repos}</div>

    <div class="card-columns" style="background-color: ${color}>
    <h3><strong>Followers</strong></h3>
    <div id="followers">${answers.data.followers}</div>
    
    <div class="card-columns" style="background-color: ${color}>
    <h3><strong>GitHub Stars</strong></h3>
    <div id="githubStars">${answers.data.public_gists}</div>

    <div class="card-columns" style="background-color: ${color}>
    <h3><strong>Following</strong></h3>
    <div id="following">${answers.data.following}</div>
    </div>
  </div>
</div>
</body>
</html>`;
    
    
}});
});
};


async function init() {
  console.log("Hi");
  try {
    const answers = await promptUser();

    const html = generateHTML(answers);

    await writeFileAsync("index.html", html);

    var readHtml = fs.readFileSync('index.html', 'utf8');
    var options = { format: 'Letter' };
     
    await pdf.create(readHtml, options).toFile('test.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); 
    });

    console.log("Successfully wrote to index.html");
  } catch (err) {
    console.log(err);
  };
};


init();
