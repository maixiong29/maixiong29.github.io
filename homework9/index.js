const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const axios = require("axios");
const pdf = require('html-pdf');


const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer
.prompt(
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
      },
  )
  
.then(function({ username }) {
  const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;


  axios.get(queryUrl).then(function(res) {
    const image = res.data.avatar_url;
    console.log(image);

    const location = res.data.location;
    console.log(location);

    const github = res.data.html_url;
    console.log(github);

    const blog = res.data.blog;
    console.log(blog);

    const publicRepos = res.data.public_repos;
    console.log(publicRepos);

    const followers = res.data.followers;
    console.log(followers);

    const following = res.data.following;
    console.log(following);
    });
   
  });
});
    

function generateHTML(answers) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name} !</h1>
    <br>
    <ul class="list-group">
      <li class="list-group-item">${answers.location}</li>
      <li class="list-group-item">GitHub<alt href=""></li>
      <li class="list-group-item">Blog<alt href=""></li>
    </ul>
    <br>
    <div class="card-columns">
    <h3><strong>Public Repositories</strong></h3>
    <div id="publicRepos"></div>

    <h3><strong>Followers</strong></h3>
    <div id="followers"></div>
    
    <h3><strong>GitHub Stars</strong></h3>
    <div id="githubStars"></div>

    <h3><strong>Following</strong></h3>
    <div id="following"></div>
    </div>
  </div>
</div>
</body>
</html>`;
};

async function init() {
  console.log("hi");
  try {
    const answers = await promptUser();

    const html = generateHTML(answers);

    await writeFileAsync("index.html", html);

    var readHtml = fs.readFileSync('index.html', 'utf8');
    var options = { format: 'Letter' };
     
    pdf.create(readHtml, options).toFile('test.pdf', function(err, res) {
      if (err) return console.log(err);
      console.log(res); 
    });

    console.log("Successfully wrote to index.html");
  } catch (err) {
    console.log(err);
  };
}
};

init();
