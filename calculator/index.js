// set the default mode alway is dark theme
localStorage.setItem ('mode', 'dark')

// handle the change mode button
document.querySelector ('.theme-toggler').addEventListener ('click', () => {

    // if the current mode is light, change it into dark-mode
    if (localStorage.getItem ('mode') === 'light') {
        // add the dark mode to the calculator
        document.querySelector ('.calculator').classList.add ('dark')
        // change the active mode button
        document.querySelector ('.theme-toggler').classList.add ('active')
        // set the current mode into dark
        localStorage.setItem ('mode', 'dark')
    }else {
        // remove the dark mode from calculator
        document.querySelector ('.calculator').classList.remove ('dark')
        // change the active mode button
        document.querySelector ('.theme-toggler').classList.remove ('active')
        // set the current mode into light
        localStorage.setItem ('mode', 'light')
    }
}) 

// regular expression: to validate the entered input
const calculatorRegex = /^\s*([-+]?\d*\.?\d+|\(\s*([-+]?\d*\.?\d+)\s*\))\s*([+\-*/]\s*([-+]?\d*\.?\d+|\(\s*([-+]?\d*\.?\d+)\s*\))\s*)*$/;


// function: validate input
// Input: entered input (arg: input)
// Process: using test methoa to check the entered input
// Ouput: true (if match)
//        false (if not match)
const validateInput = (input) => {
    return calculatorRegex.test (input)
}

// function get input from screen
// Input: none
// Process: get input through element with id 'display'
// Output: the entered input
const getInput = () => {
    const inputString = document.querySelector ('#display').innerHTML
    return inputString
}

// handle to get input whenever button is clicked
document.querySelectorAll ('.btn').forEach ((button) => {
    button.addEventListener ('click', () => {
        document.querySelector ('#display').innerHTML += button.innerHTML
    })
})

// handle the clear button, clear the current display on screen
document.querySelector ('#clear').addEventListener ('click', () => {
    document.querySelector ('#display').innerHTML = ''
})

// handle to remove the last character of the entered input
document.querySelector ('#backspace').addEventListener ('click', () => {
    // get entered input
    let epxression = document.querySelector ('#display').innerHTML
    // remove the last character
    epxression = epxression.substring (0, epxression.length - 1)
    // assign it to the entered input again, then display it on screen
    document.querySelector ('#display').innerHTML = epxression
})

// handle when equal button is clicked
// process:
//          validate the input
//          if true: calculate it
//          if false: make the error notification appears on screen
document.querySelector ('#equal').addEventListener ('click', () => {
    // get the entered input
    let expression = getInput ()

    // if entered input is valid
    if (validateInput (expression)) {
         // using eval method to parse the expresssion then return the result of it
        let result = eval (expression)

        // display result
        document.querySelector ('#display').innerHTML = result
    }
    // if entered input is invalid
    else {
        // annouce the syntax error notification
        document.querySelector ('#display').innerHTML = 'syntax error'

        // clear the screen after 1s
        setTimeout(() => {
            document.querySelector ('#display').innerHTML = ''
        }, 1000);
    }
})
