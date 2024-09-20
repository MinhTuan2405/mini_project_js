alert ("The game is being fixed, please visit later")

// Display the message on the screen
// Input: message: String
//        color: string, express the hexa code of color
// Output: None
// Process: display the message on screen (on the message cell) and set the game's backgroud with given color

const displayMessageAndBackgroud = (message, color) => {
    
    // the message when playing the game, including (winning game, guessing lower, higher, and losing game)
    const messages = document.querySelector ('.message')
    messages.innerHTML = message

    // the background of game
    const backgroud = document.querySelector ('body')
    backgroud.style.backgroundColor = color
}

// random a secret key 
// Input: no arguments
// Output: a secret key
// Process: return the secret number through the random method in Math object

const randomNewSecretNumber = () => {
    return Math.trunc (Math.random () * 20) + 1
}

// Reset the game, ignore the high score
// Input: none
// Output: None
// Process: reset all the element of game, ignore the high score information

const resetGame = () => {
   // display the starting game screen
    displayMessageAndBackgroud ('Start guessing...', 'black')

    // create new secret number for the next round
    secretNumber = randomNewSecretNumber ()

    // reset the score 
    currentScore.innerHTML = 20
    score = 20

    // hide the secret number and input cell
    secret.innerHTML = '?'
    guess.innerHTML = ''
}

// define some parameter for starting first game
// set first high score
let highestScore = 0

//Set current score for every new game
let score = 20

// Create an initial secret
let secretNumber = randomNewSecretNumber ()

// nothing happen status
const NOTHING = 0

// minimum score player can reach
const minimum = 1

// the secret number: to display on screen
const secret = document.querySelector ('.secretnumber')

// handle the click event when the player clicks the checkButton
document.querySelector ('.check').addEventListener ('click', () => {
    
    // get the input number
    const guessNumber = Number (document.querySelector ('.guess').value)

    // process if player any enter anything
    if (guessNumber === NOTHING) {
        displayMessageAndBackgroud ('you did not type any number', 'gray')
    }
        
    // process if the player wins the game
    if (guessNumber === secretNumber) {
        // display the winning notification 
        displayMessageAndBackgroud ('u r win the game 🎉🎉🎉', 'green')

        // make the secret number visiable 
        secret.innerHTML = secretNumber
        
        //Update the highest score
        if (highestScore < score) {
            document.querySelector ('.highscore').innerHTML = score
        } else {
            highestScore = score
        }
    }
    
    // process if the player give an incorrect answer
    // the current score
    const currentScore = document.querySelector ('.score')
    if (guessNumber > secretNumber) {
        displayMessageAndBackgroud ('too high', 'orange')
        currentScore.innerHTML = score--
    }else {
        displayMessageAndBackgroud ('too low', 'blue')
        currentScore.innerHTML = score--
    }
                                                    
    // process if the player loses the game 
    if (score < minimum) {
        // display if had lost the game
        displayMessageAndBackgroud(`you loose game, secret is ${secretNumber}`, 'gray')
        secret.innerHTML = secretNumber
    
        // reset game and start a new roud after 2.5s
        setTimeout(resetGame, 2500);
    }
})

// handle the click event for the playButton when player wanna play again or cancel the current roud
document.querySelector ('.again').addEventListener ('click', resetGame ())

