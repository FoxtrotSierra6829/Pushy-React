import React from 'react'
import '../styles.css'

function handleKeyDown(e) {
    if (e.keyCode!=122 && e.keyCode!=123) {
        e.preventDefault()
    }
    switch(e.keyCode) {
        case 13:
            setCookie('mode', 'menu', 365);
            window.location.reload();
        case 27:
            setCookie('mode', 'menu', 365);
            window.location.reload();
        
        default:
            console.log(e.keyCode)
    }
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function Congrats() {
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })
    return ( <div></div>
    )
}

export default Congrats