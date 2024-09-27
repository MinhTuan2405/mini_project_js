// camera constraints
const cameraConstraints  =  {
    video: true
}

// set camera status
localStorage.setItem ('camera status', 'off')


// turn the camera on
// Input: none
// Process: + get the user camera then assign it into video element
// Output: none
const turnOnCamera = () => {

    // get the user camera
    navigator.mediaDevices.getUserMedia (cameraConstraints)
    .then ((stream) => {
        // assign the stream to video element
        document.querySelector ('video').srcObject = stream
    })
    .catch ((error) => {
        // log the error if meet error
        console.log (error)
    })
}

// turn the camera on
// Input: none
// Process: turn off the camera by assign the video element to null
// Output: none
const turnOffCamera = () => {
    // assign the video element to null
    document.querySelector ('video').srcObject = null
}

// confirm action
document.querySelector ('.confirm-action').addEventListener ('click', () => {
    // make the video handler appear
    document.querySelector ('.video').classList.remove ('hidden')

    // handle the video button on or off 
    document.querySelector ('.video-switch-btn').addEventListener ('click', () => {
        // get the status of camera
        const cameraStatus = localStorage.getItem ('camera status')

        // if camera is off now, enable it on
        if (cameraStatus === 'off') {
            document.querySelector ('.video-switch-btn').innerHTML = 'Turn off camera' // the the button notification
            turnOnCamera () // turn camera on
            localStorage.setItem ('camera status', 'on') // set the curren status of camera to on in local storage
        }

        // if camera is on now, turn it off
        else if (cameraStatus === 'on') {
            document.querySelector ('.video-switch-btn').innerHTML = 'Turn on camera' // the the button notification
            turnOffCamera () // turn camera off
            localStorage.setItem ('camera status', 'off') // set the curren status off camera to on in local storage
        }
        
    })

    turnOnCamera () // set the camera always on by default
})


// handle if user want to exit the camera window
document.querySelector ('.exit').addEventListener ('click', () => {
    // hidden the camera, return the confirm area
    document.querySelector ('.video').classList.add ('hidden')
})






