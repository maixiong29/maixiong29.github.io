$(document).ready(function() {
    var startButton = document.getElementById("start-btn");
    var questionContainerElement = document.getElementById("question-container");
    var questionElement =  document.getElementById("question");
    var answerButtonsElement = document.getElementById("answer-buttons");

    startButton.addEventListener("click", startGame);
    
    
    function startGame() {
        console.log("Started");
        startButton.classList.add("hide");
        $("h3").hide();
        $("p").hide();
        shuffledQuestions = questions.sort(() => Math.random() - .5);
        currentQuestionIndex = 0;
        
    };

    var questions = [
        {
            question: "Which one is not an Infinity Stone?",
            choiceA: "Infinity",
            choiceB: "Space",
            choiceC: "Power",
            choiceD: "Soul",
            correct: "A"
        },
        {
            question: "Where is Thor from?",
            choiceA: "Asgard",
            choiceB: "Earth",
            choiceC: "Mordor",
            choiceD: "Knowhere",
            correct: "A"
        },
        {
            question: "Who is Gamora's sister?",
            choiceA: "Natalie",
            choiceB: "Mantis",
            choiceC: "Nebula",
            choiceD: "Jane",
            correct: "C"
        },
        {
            question: "Name the actor that plays Thanos?",
            choiceA: "Chris Hemsworth",
            choiceB: "Josh Brolin",
            choiceC: "Tom Cruise",
            choiceD: "Ryan Gosling",
            correct: "B"
        },
    ];

    var score = 0;

    for(var i = 0; i < questions.length; i++){
        var answer = document.getElementById("answer-buttons");
        if(answer == questions[i].correct){
            score++;
            $("#correct").text("Correct!");
        }
    }
   
});