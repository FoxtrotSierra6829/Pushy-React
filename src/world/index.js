import React from 'react'
import { connect } from 'react-redux'
import Pushy from '../actor/pushy'
import Ground from './ground'
import Objects from './objects'
import Levelname from './levelname'
import Reload from './reload'
import Backwards from './backwards'
import Forwards from './forwards'
import Beancount from './beancount'
import Menu from './menu'
import Congrats from './congrats'
import {levels, scale, worldheight, worldwidth, maxlevel, screenratio } from '../config/constants'
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
            setCookie('mode', 'congrats', 365)
            window.location.reload()
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
                    width: scale*screenratio()*worldwidth+ 'vh',
                    height: scale*screenratio()*worldheight+ 'vh',
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
                <Beancount key={store.getState().bean.count} />
            </div>
            </div>
        )
    }
    else if (mode==='congrats') {
        return (
            <div className='frame-congrats'
                style={{
                    position: 'relative',
                    'text-align': 'center',
                    width: scale*screenratio()*worldwidth+ 'vh',
                    height: scale*screenratio()*worldheight+ 'vh',
                    border: '.1vh solid black',
                    margin: 'auto',
                }}
            > <div className='world' id = "world">
                <Congrats />
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
                    width: scale*screenratio()*worldwidth+ 'vh',
                    height: scale*screenratio()*worldheight+ 'vh',
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


  //get related level objects
  function loadlevel(level) {
    var keys = Object.keys(levels);
    const ground = levels[keys[level-1]].ground
    const objects = levels[keys[level-1]].objects
    const position = levels[keys[level-1]].initalPushyPosition
    const levelname = levels[keys[level-1]].levelname
    

    store.dispatch({type: 'ADD_GROUND', payload: {
        ground,
    }})
    store.dispatch({type: 'ADD_OBJECTS', payload: {
        objects
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