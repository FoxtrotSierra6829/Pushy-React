import React from 'react'
import store from '../../config/store'
import { connect } from 'react-redux'
import { scale, worldheight, worldwidth } from '../../config/constants'
import '../styles.css'

function backwards() {
    let level = parseInt(getCookie('level'))-1
    if (level<=0) {
        level=1
    }
    setCookie('level', level, 365)
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

function Backwards(props) {
    return (
        <div className="backwards" onClick={() => backwards()}
            style={{
                width: scale*0.5+ 'vh',
                height: scale*0.5+ 'vh',
                top: scale*(worldheight-1)+scale*0.4+ 'vh',
                color: 'transparent',
                left: scale*0.1+'vh',
                }}
        
        >
            {'B'}
        </div>
    )
}

export default Backwards