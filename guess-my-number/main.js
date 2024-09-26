// game configuration
const gameCofig = {

    // game parameters
    maxScore: 20,                                       // maximum score
    loseScore: 0,                                       // the minimum score can be reached
    nothing: '',                                        // nothing
    lowerBound: 1,                                      // lower bound number
    upperBound: 20,                                     // upper bound number
    secretNumber: 0,                                    // secret number
    highScore: 0,                                       // high score
    currentScore: 20,                                   // current score
    delayTime: 2500,                                    // delay time in game

    // notification
    nothingNoti: "you didn't enter anything, again",    // nothing happen notification
    winNoti: 'you win the game',                        // winning notification   
    loseNoti: 'you lose the game',                      // losing notification
    hintMessage_High: 'too high',                       // hint message: too high
    hintMessage_Low: 'too low',                         // hint message: too low
    guessingWaitNoti: 'Start guessing...',              // the notification for wating guessing

    // backgroud setting
    mainBg: '#222',                                     // the main backgroud
    warnBg: '#FF885B',                                  // nothing backgroud
    winBg: 'green',                                     // winning backgroud
    loseBg: 'gray',                                     // losing backgroud
    hintBg_High: 'orange',                              // hint backgroud: too high
    hintBg_Low: 'blue',                                 // hint backroud: too low    
}


// generate random number 
// Input: no arguments
// Output: a secret key
// Process: return the secret number through the random method in Math object

const randomNewSecretNumber = () => {
    return Math.trunc (Math.random () * gameCofig.upperBound) + gameCofig.lowerBound
}


// Display the message on the screen
// Input: message: String
//        color: string, express the hexa code of color
// Output: None
// Process: display the message on screen (on the message cell) 
//          and set the game's backgroud with given color

const displayNotiAndBg = (message, color) => {
    
    // the message when playing the game, including (winning game, guessing lower, higher, and losing game, ...)
    document.querySelector ('.generalNotification').innerHTML = message

    // the background of game
    const backgroud = document.querySelector ('body')
    backgroud.style.backgroundColor = color
}

// Input: None
// Output: none
// Process: reset the current score, the backgroud, the notification, secret number cell, secret number
const resetGame = () => {
    
    gameCofig.currentScore = gameCofig.maxScore // reset the current score
    document.querySelector ('.secretNumber').innerHTML = '?' // hide the secret number cell
    gameCofig.secretNumber = randomNewSecretNumber () // create new secret number
    document.querySelector ('.currentScore').innerHTML = gameCofig.maxScore // dispaly the score
    // reset the notification and the backgroud
    displayNotiAndBg (gameCofig.guessingWaitNoti, gameCofig.mainBg)
    
}


// the initial secret number
gameCofig.secretNumber = randomNewSecretNumber ()


// handle the click event when player send the guessing number
document.querySelector ('.checkResultBtn').addEventListener ('click', () => {
    // update and display high score
    // Input: none
    // Output: none
    // Process: display current score and high score on the screen and
    //          re-assign the last high score if current is greater than it
    const updateAndDisplayScore = () => {

        // display current score
        document.querySelector ('.currentScore').innerHTML = gameCofig.currentScore

        // re-assign if current score is greater than the last high score
        if (gameCofig.currentScore >= gameCofig.highScore) {
            gameCofig.highScore = gameCofig.currentScore
        }

        // make the secret number visible
        document.querySelector ('.secretNumber').innerHTML = gameCofig.secretNumber

        // display high score in the screen
        document.querySelector ('.highScore').innerHTML = gameCofig.highScore
    }


    // get the guessing number
    let guessingNumber = document.querySelector ('.guessingNumber').value.trim ()

     // process if player enter nothing
    if (guessingNumber === gameCofig.nothing) {
        // set the warning status when nothing entered
        displayNotiAndBg (gameCofig.nothingNoti, gameCofig.warnBg)
    } 
    // process if something is entered
    else {

        // set the data type of guessing number again to avoid error
        guessingNumber = Number (guessingNumber)

        // process if player win the game
        if (guessingNumber === gameCofig.secretNumber) {
            
            displayNotiAndBg (gameCofig.winNoti,gameCofig.winBg) // set the winning status

            updateAndDisplayScore () // update high score and dislay
        }


        // process if player enter guessing number greater than secret number
        if (guessingNumber > gameCofig.secretNumber) {
            // set the hint status: too high
            displayNotiAndBg (gameCofig.hintMessage_High, gameCofig.hintBg_High)

            // display score then decrease current score
            document.querySelector ('.currentScore').innerHTML = gameCofig.currentScore --

        }


        // process if player enter guessing number lower than secret number
        if (guessingNumber < gameCofig.secretNumber) {
            // set the hint status: too low
            displayNotiAndBg (gameCofig.hintMessage_Low, gameCofig.hintBg_Low)

            // display score then decrease current score
            document.querySelector ('.currentScore').innerHTML = gameCofig.currentScore --
        }

    }

    // process if player lose the game: when the current score under 1
    if (gameCofig.currentScore === gameCofig.loseScore) {
        // display the lost status
        displayNotiAndBg (gameCofig.loseNoti, gameCofig.loseBg)

        // make the secret visible
        document.querySelector ('.secretNumber').innerHTML = gameCofig.secretNumber

        // reset the game after 2.5s
        setTimeout(() => {
            resetGame ()
        }, gameCofig.delayTime);
    }
})

// handle the event when player wanna play again or cancel the current roud
document.querySelector ('.playAgainBtn').addEventListener ('click', () => {
    resetGame ()
})