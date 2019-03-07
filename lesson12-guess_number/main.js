let reply = document.getElementById("myGuess");
let left = 0;
let right = 101;
let myGuess;

function guess() {
    myGuess = getRandomNumber(left, right);
    reply.textContent = myGuess;
}
function higher() {
    left = myGuess;
    guess();
}
function lower() {
    right = myGuess;
    guess();
}
function getRandomNumber(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
}
