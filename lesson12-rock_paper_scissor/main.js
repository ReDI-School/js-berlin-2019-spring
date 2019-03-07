let resultElement = document.getElementById("result");

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
    if (myMove === cMove)
        resultElement.textContent = "Tie";
    else if (myMove === winningMoveFor(cMove))
        resultElement.textContent = "You Won";
    else
        resultElement.textContent = "You Lost";
}
