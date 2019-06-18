let resultElement = document.getElementById("result");
let statisticsElement = document.getElementById("statistics");

let gamesWon = 0;
let gamesLost = 0;
let gamesTie = 0;

// this function returns the complementary winning
// move for a given move
function winningMoveFor(move) {
    switch (move) {
        case "rock":
            return "paper";
        case "paper":
            return "scissor";
        case "scissor":
            return "rock";
    }
}

// this chooses a move by random
function computerMove() {
    let randomNumber = Math.random();
    if (randomNumber < 1/3) {
        return "rock";
    }
    if (randomNumber < 2/3) {
        return "paper";
    }
    return "scissor";
}

function play(myMove) {
    let cMove = computerMove();
    let result;

    if (myMove === cMove) {
        // both chose the same - it's a tie
        result = "Tie";
        gamesTie++;
    } else if (myMove === winningMoveFor(cMove)) {
        // my move beats the computer - it's a win
        result = "You Won";
        gamesWon++;
    } else {
        // everything else is a loss
        result = "You Lost";
        gamesLost++;
    }

    // update our web page
    renderResult(myMove, cMove, result);
    renderStatistics();
}

// shows the result of the last game
function renderResult(myMove, cMove, result) {
    let message = "You chose " + myMove
        + ", computer chose " + cMove
        + ": " + result;
    resultElement.textContent = message;
}

// updates the game statistics
function renderStatistics() {
    let message = "Games won: " + gamesWon
       + ", games lost: " + gamesLost
       + ", ties: " + gamesTie;
    statisticsElement.textContent = message;
}

// resets everything
function reset() {
    gamesWon = 0;
    gamesLost = 0;
    gamesTie = 0;
    resultElement.textContent = "";
    renderStatistics();
}
