import React from 'react'
import store from '../../config/store'
import { connect } from 'react-redux'
import { maxlevel, scale, worldheight, worldwidth, screenratio } from '../../config/constants'
import '../styles.css'

function forwards() {
    let level = parseInt(getCookie('level'))+1
    let highscorelevel = parseInt(getCookie('highscorelevel'))
    if (level>=maxlevel) {
      level=maxlevel
  }
    else if (level>=highscorelevel+1) {
        level=highscorelevel+1
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

function Forwards(props) {
    return (
        <div className="forwards" onClick={() => forwards()}
            style={{
                width: scale*screenratio()*0.5+ 'vh',
                height: scale*screenratio()*0.5+ 'vh',
                top: scale*screenratio()*(worldheight-1)+scale*0.4+ 'vh',
                color: 'transparent',
                left: scale*screenratio()*(worldwidth-1)+scale*0.4+'vh',
                }}
        
        >
            {'F'}
        </div>
    )
}

export default Forwards