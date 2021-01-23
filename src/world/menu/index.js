import React from 'react'
import store from '../../config/store'
import { connect } from 'react-redux'
import { maxlevel, scale, worldheight, worldwidth } from '../../config/constants'
import '../styles.css'

function levelbutton(i) {
        let highscore = parseInt(getCookie('highscorelevel'))
        let current = parseInt(getCookie('level'))
        if (i===current) {
            return (
                <div value={i} key={i} onClick={() => loadlevel(i)} style={{
                    position: 'absolute',
                    textAlign: 'center',
                    top: scale*4+ 'vh',
                    left: scale*(i-0.5)+ 'vh',
                    width: scale+ 'vh',
                    height: scale+ 'vh',
                    margin: 'auto',
                    fontFamily: 'arial',
                    fontSize: scale*0.4+'vh',
                    color: 'red'
                }} >{i}</div>
            )
        }
        else if (i>highscore) {
            return (
                <div value={i} key={i} onClick={() => loadlevel(i)} style={{
                    position: 'absolute',
                    textAlign: 'center',
                    top: scale*4+ 'vh',
                    left: scale*(i-0.5)+ 'vh',
                    width: scale+ 'vh',
                    height: scale+ 'vh',
                    margin: 'auto',
                    fontFamily: 'arial',
                    fontSize: scale*0.4+'vh',
                    color: '#aaaaaa'
                }} >{i}</div>
            )
        }
        else {
            return (
                <div value={i} key={i} onClick={() => loadlevel(i)} style={{
                    position: 'absolute',
                    textAlign: 'center',
                    top: scale*4+ 'vh',
                    left: scale*(i-0.5)+ 'vh',
                    width: scale+ 'vh',
                    height: scale+ 'vh',
                    margin: 'auto',
                    fontFamily: 'arial',
                    fontSize: scale*0.4+'vh',
                    color: 'black',
                }} >{i}</div>
            )
        }
    }

function handleKeyDown(e) {
    if (e.keyCode!=122 && e.keyCode!=123) {
        e.preventDefault()
    }
    switch(e.keyCode) {
        case 13:
            setCookie('mode', 'pushyisland', 365);
            window.location.reload();
        
        default:
            console.log(e.keyCode)
    }
}
function loadlevel(i) {
    setCookie('level', i, 365)
    setCookie('mode', 'pushyisland', 365)
    window.location.reload();

}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

function Menu(props) {
    var rows = [];
    let displaylevel = parseInt(getCookie('highscorelevel'))+1
    if (displaylevel>maxlevel) {
        displaylevel = maxlevel
    }
    for (var i = 1; i < displaylevel+1; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    rows.push(levelbutton(i));
}
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })
    return ( <div>{rows}</div>
    )
}

export default Menu