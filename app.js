/*
GAME FUNCTION:
-Player must guess a number between a min and max
-Player gets a certain amount of guesses
-Notify player of guesses remaining
-notify the player of the correct answer if loose
-Let player choose to play again

*/

// Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessLeft = 3;

//UIelement
const UIgame = document.querySelector('#game'),
    UIminNumber = document.querySelector('.minNumb'),
    UImaxNumber = document.querySelector('.maxNumb'),
    UIguessInput = document.querySelector('#guessInput'),
    UIguessBtn = document.querySelector('#guessBtn'),
    UImessage = document.querySelector('.message');

//Assign UI min and max

UIminNumber.textContent = min;
UImaxNumber.textContent = max;



//Event listners
document.addEventListener('click', function (event) {

    if (event.target.matches('.play-again')) {
        window.location.reload();
    }
});


UIguessBtn.addEventListener('click', function () {

    let guess = parseInt(UIguessInput.value);
    //Vadiate
    if (isNaN(guess) || guess < min || guess > max) {

        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    //check if you have the winning number 
    if (guess === winningNum) {
        gameOver(true, `${winningNum} is correct`)
        //        //gameover Won
        //        //disable input
        //        UIguessInput.disabled = true;
        //        //make input green
        //        UIguessInput.style.background ="green" ;
        //        UIguessInput.style.color="white" ;
        //        //let user know they won
        //        setMessage(`${winningNum} is correct`, 'green');    
    } else {
        //wrong number
        guessLeft -= 1;
        if (guessLeft === 0) {
            gameOver(false, `Game over, you lost. The correct number is ${winningNum}`);
            //gameover lost
            //            //disable input
            //        UIguessInput.disabled = true;
            //        //make input green
            //        UIguessInput.style.background ="red" ;
            //        UIguessInput.style.color="white" ;
            //        //let user know they won
            //        setMessage(`Game over, you lost. The correct number is ${winningNum}`, 'red'); 
        } else {
            //clear input
            UIguessInput.value = '';
            //game contines answer wrong
            setMessage(`${guess} is not correct, You have ${guessLeft} guess left`, "red");
        }

    }

});

//Game over function
function gameOver(won, msg) {
    //gameover Won
    let color;

    won === true ? color = 'green' : color = "red";


    //disable input
    UIguessInput.disabled = true;
    //make input green
    UIguessInput.style.background = color;
    UIguessInput.style.color = "white";
    //let user know they won
    setMessage(msg, color);

    //Play again
    UIguessBtn.textContent = 'Again?';
    UIguessBtn.className += ' play-again';


}



//set message function
function setMessage(msg, change) {
    UImessage.style.color = change;
    UImessage.textContent = msg;
}

//get winning number
function getRandomNum(min, max){
    return(Math.floor(Math.random() * (max - min + 1) + min));
}