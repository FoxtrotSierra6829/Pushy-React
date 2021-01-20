import React from 'react'
import { connect } from 'react-redux'
import Pushy from '../actor/pushy'
import Ground from './ground'
import Objects from './objects'
import Levelname from './levelname'
import { scale, worldheight, worldwidth, maxlevel } from '../config/constants'

import {levelname as levelname1, ground as ground1,objects as objects1, initalPushyPosition as position1 } from '../levels/PushyIsland/1'
import {levelname as levelname2, ground as ground2,objects as objects2, initalPushyPosition as position2 } from '../levels/PushyIsland/2'
import {levelname as levelname3, ground as ground3,objects as objects3, initalPushyPosition as position3 } from '../levels/PushyIsland/3'
import store from '../config/store'

function World(props) {
        var level =1
        store.dispatch({type: 'CHANGE_LEVEL', payload: {
            maxlevel,
         }})
        const levelcookie = getCookie('level')
        if (levelcookie!=="") {
        if (parseInt(levelcookie)>maxlevel) {
            level = 1
            setCookie('level', level, 365)
        }
        else {
            level = levelcookie
        }} else {
            window.alert('Diese Webseite verwendet Cookies um den Spielstand zu speichern.\n\nThis website uses cookies to be able to save your progress in game.')
            setCookie('level', level, 365)
        }
        const ground = getground(level)
        const objects = getobjects(level)
        const position = getposition(level)
        const levelname = getlevelname(level)
    store.dispatch({type: 'ADD_GROUND', payload: {
        ground,
    }})
    store.dispatch({type: 'ADD_OBJECTS', payload: {
        objects,
    }})
    store.dispatch({type: 'MOVE_PUSHY', payload: {
        position,
    }})
    store.dispatch({type: 'ADD_LEVELNAME', payload: {
        levelname,
    }})
    return (
        <div
            style={{
                position: 'relative',
                'text-align': 'center',
                width: scale*worldwidth+ 'vh',
                height: scale*worldheight+ 'vh',
                border: '.1vh solid black',
                margin: 'auto',
            }}
        >
            <Ground />
            <Objects />
            <Pushy />
            <Levelname />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.world,
    }
}

function getground(level) {
    if (level==1) {
        return ground1
    }
    else if (level==2) {
        return ground2
    }
    else if (level==3) {
        return ground3
    }
}
function getobjects(level) {
    if (level==1) {
        return objects1
    }
    else if (level==2) {
        return objects2
    }
    else if (level==3) {
        return objects3
    }
}
function getposition(level) {
    if (level==1) {
        return position1
    }
    else if (level==2) {
        return position2
    }
    else if (level==3) {
        return position3
    }
}
function getlevelname(level) {
    if (level==1) {
        return levelname1
    }
    else if (level==2) {
        return levelname2
    }
    else if (level==3) {
        return levelname3
    }
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
export default connect(mapStateToProps)(World)