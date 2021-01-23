import React from 'react'
import { connect } from 'react-redux'
import Pushy from '../actor/pushy'
import Ground from './ground'
import Objects from './objects'
import Levelname from './levelname'
import Reload from './reload'
import Backwards from './backwards'
import Forwards from './forwards'
import Menu from './menu'
import { scale, worldheight, worldwidth, maxlevel } from '../config/constants'

import {levelname as levelname1, ground as ground1,objects as objects1, initalPushyPosition as position1 } from '../levels/PushyIsland/1'
import {levelname as levelname2, ground as ground2,objects as objects2, initalPushyPosition as position2 } from '../levels/PushyIsland/2'
import {levelname as levelname3, ground as ground3,objects as objects3, initalPushyPosition as position3 } from '../levels/PushyIsland/3'
import {levelname as levelname4, ground as ground4,objects as objects4, initalPushyPosition as position4 } from '../levels/PushyIsland/4'
import {levelname as levelname5, ground as ground5,objects as objects5, initalPushyPosition as position5 } from '../levels/PushyIsland/5'
import {levelname as levelname6, ground as ground6,objects as objects6, initalPushyPosition as position6 } from '../levels/PushyIsland/6'
import store from '../config/store'

function World(props) {
      
        var level =1
        store.dispatch({type: 'CHANGE_LEVEL', payload: {
            maxlevel,
         }})
        let mode = getCookie('mode')
        let levelcookie = getCookie('level')
        const highscorelevel = parseInt(getCookie('highscorelevel'))
        if (levelcookie!=="") {
            levelcookie = parseInt(levelcookie)
        if (levelcookie>maxlevel) {
            level = levelcookie-1
            setCookie('level', level, 365)
        }
        else {
            level = levelcookie
        }} else {
            window.alert('Diese Webseite verwendet Cookies um den Spielstand zu speichern.\n\nThis website uses cookies to be able to save your progress in game.')
            window.alert('Controls:\n   W   |     ▲\nA S D|◀ ▼ ▶\n\nMenu: ESC\nContinue: Enter')
            setCookie('mode', 'menu', 365)
            mode = 'menu'
            setCookie('level', level, 365)
            setCookie('highscorelevel', 0, 365)
        }
        if(level>(highscorelevel+1)) {
            level = highscorelevel+1
            setCookie('level', level, 365)
            }
            else {     
        loadlevel(level)
            }
    if (mode==="pushyisland") {
        return (
            <div className='frame'
                style={{
                    position: 'relative',
                    'text-align': 'center',
                    width: scale*worldwidth+ 'vh',
                    height: scale*worldheight+ 'vh',
                    border: '.1vh solid black',
                    margin: 'auto',
                }}
            > <div className='world' id = "world">
                <Ground />
                <Objects />
                <Pushy />
                <Levelname />
                <Reload />
                <Backwards />
                <Forwards />
            </div>
            </div>
        )
    }
    else {
        return (
            <div className='frame-menu'
                style={{
                    position: 'relative',
                    'text-align': 'center',
                    width: scale*worldwidth+ 'vh',
                    height: scale*worldheight+ 'vh',
                    border: '.1vh solid black',
                    margin: 'auto',
                }}
            > <div className='world' id = "world">
                <Menu />
            </div>
            </div>
        )
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
  function loadlevel(level) {
    let ground = ground1
    let objects = objects1
    let position = position1
    let levelname = levelname1
    if (level==1) {
        ground = ground1
        objects = objects1
        position = position1
        levelname = levelname1
    }
    else if (level==2) {
        ground = ground2
        objects = objects2
        position = position2
        levelname = levelname2
    }
    else if (level==3) {
        ground = ground3
        objects = objects3
        position = position3
        levelname = levelname3
    }
    else if (level==4) {
        ground = ground4
        objects = objects4
        position = position4
        levelname = levelname4
    }
    else if (level==5) {
        ground = ground5
        objects = objects5
        position = position5
        levelname = levelname5
    }
    else if (level==6) {
        ground = ground6
        objects = objects6
        position = position6
        levelname = levelname6
    }
    

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
}

function mapStateToProps(state) {
    return {
        ...state.world,
    }
}
export default connect(mapStateToProps)(World)