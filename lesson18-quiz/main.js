let quizButtons = [];

for (let i = 0; i < 4; ++i) {
    quizButtons.push(document.getElementById("b" + i));
}

let questionElement = document.getElementById("question");
let resultElement = document.getElementById("result");

let url = "https://opentdb.com/api.php?amount=1&category=18&type=multiple";

let correctAnswers = 0;
let wrongAnswers = 0;

function getScore() {
    return "Score: " + correctAnswers + " correct and " + wrongAnswers + " wrong";
}

function correctAnswer() {
    correctAnswers++;
    resultElement.textContent = "correct! " + getScore();
}

function wrongAnswer() {
    wrongAnswers++;
    resultElement.textContent = "wrong! " + getScore();
}

async function newRound() {
    resultElement.textContent = getScore();

    let response = await fetch(url);
    let reply = await response.json();

    let question = reply.results[0];
    questionElement.innerHTML = question.question;

    let correctIndex = Math.floor(Math.random() * 4);
    for (let i = 0; i < 4; ++i) {
        if (i === correctIndex) {
            quizButtons[i].innerHTML = question.correct_answer;
            quizButtons[i].onclick = function() { correctAnswer(); }
        } else {
            quizButtons[i].innerHTML = question.incorrect_answers.pop();
            quizButtons[i].onclick = function() { wrongAnswer(); }
        }
    }
}

newRound();
