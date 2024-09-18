const secret = document.querySelector ('.number')
const playAgainButton = document.querySelector ('.again')
const checkButton = document.querySelector ('.check')
const guess = document.querySelector ('.guess')
const currentScore = document.querySelector ('.score')
const highScore = document.querySelector ('.highscore')
const messages = document.querySelector ('.message')
const backgroud = document.querySelector ('body')

const randomNewSecret = () => {
    return Math.trunc (Math.random () * 20) + 1
}

let secretNumber = randomNewSecret ()
console.log (secretNumber)

const displayMessage = (message, color) => {
    messages.innerHTML = message
    backgroud.style.backgroundColor = color
}

const reset = () => {
    displayMessage ('Start guessing...', 'black')
    secretNumber = randomNewSecret ()
    console.log (secretNumber)
    currentScore.innerHTML = 20
    score = 20
    secret.innerHTML = '?'
    guess.innerHTML = ''
}

let highestScore = 0
let score = 20


checkButton.addEventListener ('click', () => {
    const guessNumber = Number (guess.value)
    console.log (guessNumber, typeof guessNumber)
    
    if (guessNumber === 0) {
        displayMessage ('you did not type any number', 'gray')
    }else {
        if (guessNumber === secretNumber) {
            displayMessage ('u r win the game 🎉🎉🎉', 'green')
            secret.innerHTML = secretNumber
            if (highestScore < score) {
                highScore.innerHTML = score
            }
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

    if (score < 1) {
        displayMessage(`you loose game, secret is ${secretNumber}`, 'gray')
        secret.innerHTML = secretNumber
        
        setTimeout(reset, 2500);
    }
    
})

playAgainButton.addEventListener ('click', () => {
    reset ()
})
