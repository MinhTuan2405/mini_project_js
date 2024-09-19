//Get elements to make logic for the game

// the secret number: to display on screen
const secret = document.querySelector ('.number')

// the play button again: when the player wants to player again or reset the game
const playAgainButton = document.querySelector ('.again')

// the checking result button: send the guess number to process
const checkButton = document.querySelector ('.check')

// the guess number: contain the guess number
const guessCell = document.querySelector ('.guess')

// the current score
const currentScore = document.querySelector ('.score')

// the current high score
const highScore = document.querySelector ('.highscore')

// the message when playing the game, including (winning game, guessing lower, higher, and losing game)
const messages = document.querySelector ('.message')

// the background of game
const backgroud = document.querySelector ('body')

// list constant of game
const NOTHING = 0

// random a secret key 
// Input: no arguments
// Output: a secret key
const randomNewSecret = () => {
    return Math.trunc (Math.random () * 20) + 1
}

// Create an initial secret
let secretNumber = randomNewSecret ()

// Display the message on the screen
// Input: message: String
//        color: string, express the hexa code of color
// Output: None
const displayMessage = (message, color) => {
    messages.innerHTML = message
    backgroud.style.backgroundColor = color
}

// Reset the game, ignore the high score
// Input: none
// Output: None
const reset = () => {
    // reset all the element of game, ignore the high score information
    displayMessage ('Start guessing...', 'black')
    secretNumber = randomNewSecret ()
    console.log (secretNumber)
    currentScore.innerHTML = 20
    score = 20
    secret.innerHTML = '?'
    guess.innerHTML = ''
}

// set first high score
let highestScore = 0
//Set current score for every new game
let score = 20

// handle the click event when the player clicks the checkButton
checkButton.addEventListener ('click', () => {
    // get the input number
    const guessNumber = Number (guessCell.value)

    // process if player any enter anything
    if (guessNumber === NOTHING) {
        displayMessage ('you did not type any number', 'gray')
    }else {
        // process if the player wins the game
        if (guessNumber === secretNumber) {
            displayMessage ('u r win the game 🎉🎉🎉', 'green')
            secret.innerHTML = secretNumber
            //Update the high score
            if (highestScore < score) {
                highScore.innerHTML = score
            }
        // process if the player guesses an incorrect answer 
        } else {
            if (guessNumber > secretNumber) {
                displayMessage ('too high', 'orange')
                --score
                currentScore.innerHTML = score
            }else {
                displayMessage ('too low', 'blue')
                --score
                currentScore.innerHTML = score
            }
        }
    }
    // process if the player loses the game
    if (score < 1) {
        displayMessage(`you loose game, secret is ${secretNumber}`, 'gray')
        secret.innerHTML = secretNumber
        // reset game and start a new roud
        setTimeout(reset, 2500);
    }
    
})

// handle the click event for the playButton when player wanna play again or cancel the current roud
playAgainButton.addEventListener ('click', () => {
    reset ()
})
