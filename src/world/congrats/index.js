import React from 'react'
import { setCookie } from '../../config/constants';
import '../styles.css'

function handleKeyDown(e) {
    if (e.keyCode!=122 && e.keyCode!=123) {
        e.preventDefault()
    }
    switch(e.keyCode) {
        case 13:
            gotomenu()
        case 27:
            gotomenu()
        
        default:
            console.log(e.keyCode)
    }
}
function gotomenu() {
    setCookie('mode', 'menu', 365);
    window.location.reload();
}

function Congrats() {
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })
    return ( <div></div>
    )
}

export default Congrats