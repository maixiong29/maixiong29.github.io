var startButton = document.querySelector("#start");
var startButtonDiv = document.querySelector("#startButton")
var directions = document.querySelector(".directions");
var countdown = document.querySelector(".time");
var quizQuestions = document.querySelector("#quizQuestions");
var quizChoices = document.querySelector("#quizChoices");
var selectionA = document.querySelector("#A")
var selectionB = document.querySelector("#B")
var selectionC = document.querySelector("#C")
var selectionD = document.querySelector("#D")
var resultDiv = document.querySelector("#result")
var buttonsEl = document.querySelector(".btn")
var userScore = 0
var currentQuestion = 0
var secondsLeft = 75

startButton.addEventListener("click", startQuiz);

function timer() {
  directions.style.display = "none";
  secondLeft = 75
  userScore = 0
  currentQuestion = 0
  interval = setInterval(function () {
    secondsLeft--;
    countdown.textContent = secondsLeft
  }, 1000);
}

function startQuiz() {
  timer()

  quizQuestions.innerHTML = questions[currentQuestion].title

  for (i = 0; i < 4; i++) {
    var buttons = document.createElement("button");
    buttons.innerHTML = questions[currentQuestion].choices[i];
    quizChoices.children[i].append(buttons);
    buttons.className = "btn btn-outline-dark btn-lg btn-block";
  }
}

selectionA.addEventListener("click", function () {
  if (questions[currentQuestion].choices[0] === questions[currentQuestion].answer) {
    isCorrect = true;
    result();
  }
  else {
    isCorrect = false;
    result();
  }
})

selectionB.addEventListener("click", function () {
  if (questions[currentQuestion].choices[1] === questions[currentQuestion].answer) {
    isCorrect = true;
    result();
  }
  else {
    isCorrect = false;
    result();
  }
})

selectionC.addEventListener("click", function () {
  if (questions[currentQuestion].choices[2] === questions[currentQuestion].answer) {
    isCorrect = true;
    result();
  }
  else {
    isCorrect = false;
    result();
  }
})

selectionD.addEventListener("click", function () {
  if (questions[currentQuestion].choices[3] === questions[currentQuestion].answer) {
    isCorrect = true;
    result();
  }
  else {
    isCorrect = false;
    result();
  }
})

function result() {
  if (isCorrect === true) {
    userScore += 1;
    resultDiv.innerHTML = "<hr>" + "Correct!";
    increaseQuestion();
  }
  else {
    secondsLeft -= 10;
    resultDiv.innerHTML = "<hr>" + "Incorrect!";;
    increaseQuestion();
  }
}

function increaseQuestion() {
  currentQuestion++;
  var finalScore = userScore + secondsLeft;

  if (currentQuestion === 6 || countdown < 0) {
    clearInterval(interval)
    quizQuestions.innerHTML = "You finished with " + finalScore + " points!" + "<br>"
    selectionA.style.display = "none";
    selectionB.style.display = "none";
    selectionC.style.display = "none";
    selectionD.style.display = "none";
    resultDiv.style.display = "none";
    countdown.style.display = "none";
  }
  else {
    nextQuestion();
  }
}

function nextQuestion() {
  quizQuestions.innerHTML = questions[currentQuestion].title;

  selectionA.childNodes[0].innerHTML = questions[currentQuestion].choices[0];
  selectionB.childNodes[0].innerHTML = questions[currentQuestion].choices[1];
  selectionC.childNodes[0].innerHTML = questions[currentQuestion].choices[2];
  selectionD.childNodes[0].innerHTML = questions[currentQuestion].choices[3];
}