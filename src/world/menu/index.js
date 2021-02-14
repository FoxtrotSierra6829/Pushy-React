import React from 'react'
import { maxlevel, scale, worldwidth, screenratio, getCookie, setCookie } from '../../config/constants'
import '../styles.css'

function levelbutton(i) {
        let highscore = parseInt(getCookie('highscorelevel'))
        let current = parseInt(getCookie('level'))
        if (i===current) {
            if (i<worldwidth) {
                return (
                    <div value={i} key={i} onClick={() => loadlevel(i)} style={{
                        position: 'absolute',
                        textAlign: 'center',
                        top: scale*screenratio()*4+ 'vh',
                        left: scale*screenratio()*(i-0.5)+ 'vh',
                        width: scale*screenratio()+ 'vh',
                        height: scale*screenratio()+ 'vh',
                        margin: 'auto',
                        fontFamily: 'arial',
                        fontSize: scale*screenratio()*0.4+'vh',
                        color: 'red',
                        fontWeight: 'bold',  
                        cursor: 'pointer',
                    }} >{i}</div>
                )
            }
            if (i<worldwidth*2) {
                return (
                    <div value={i} key={i} onClick={() => loadlevel(i)} style={{
                        position: 'absolute',
                        textAlign: 'center',
                        top: scale*screenratio()*4.75+ 'vh',
                        left: scale*screenratio()*(i-worldwidth+1-0.5)+ 'vh',
                        width: scale*screenratio()+ 'vh',
                        height: scale*screenratio()+ 'vh',
                        margin: 'auto',
                        fontFamily: 'arial',
                        fontSize: scale*screenratio()*0.4+'vh',
                        color: 'red',
                        fontWeight: 'bold',  
                        cursor: 'pointer',
                    }} >{i}</div>
                )
            }
        }
        else if (i>highscore) {
            if (i<worldwidth) {
                return (
                    <div value={i} key={i} onClick={() => loadlevel(i)} style={{
                        position: 'absolute',
                        textAlign: 'center',
                        top: scale*screenratio()*4+ 'vh',
                        left: scale*screenratio()*(i-0.5)+ 'vh',
                        width: scale*screenratio()+ 'vh',
                        height: scale*screenratio()+ 'vh',
                        margin: 'auto',
                        fontFamily: 'arial',
                        fontSize: scale*screenratio()*0.4+'vh',
                        color: '#aaaaaa',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }} >{i}</div>
                )
            }
        if (i<worldwidth*2) {
            return (
                <div value={i} key={i} onClick={() => loadlevel(i)} style={{
                    position: 'absolute',
                    textAlign: 'center',
                    top: scale*screenratio()*4.75+ 'vh',
                    left: scale*screenratio()*(i-worldwidth+1-0.5)+ 'vh',
                    width: scale*screenratio()+ 'vh',
                    height: scale*screenratio()+ 'vh',
                    margin: 'auto',
                    fontFamily: 'arial',
                    fontSize: scale*screenratio()*0.4+'vh',
                    color: '#aaaaaa',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }} >{i}</div>
            )
        }
        }
        else {
            if (i<worldwidth) {
                return (
                    <div value={i} key={i} onClick={() => loadlevel(i)} style={{
                        position: 'absolute',
                        textAlign: 'center',
                        top: scale*screenratio()*4+ 'vh',
                        left: scale*screenratio()*(i-0.5)+ 'vh',
                        width: scale*screenratio()+ 'vh',
                        height: scale*screenratio()+ 'vh',
                        margin: 'auto',
                        fontFamily: 'arial',
                        fontSize: scale*screenratio()*0.4+'vh',
                        color: 'black',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }} >{i}</div>
                )
            }
            if (i<worldwidth*2) {
                return (
                    <div value={i} key={i} onClick={() => loadlevel(i)} style={{
                        position: 'absolute',
                        textAlign: 'center',
                        top: scale*screenratio()*4.75+ 'vh',
                        left: scale*screenratio()*(i-worldwidth+1-0.5)+ 'vh',
                        width: scale*screenratio()+ 'vh',
                        height: scale*screenratio()+ 'vh',
                        margin: 'auto',
                        fontFamily: 'arial',
                        fontSize: scale*screenratio()*0.4+'vh',
                        color: 'black',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }} >{i}</div>
                )
            }
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

function Menu(props) {
    var rows = [];
    let displaylevel = parseInt(getCookie('highscorelevel'))+1
    if (displaylevel>maxlevel) {
        displaylevel = maxlevel
    }
    for (var i = 1; i < displaylevel+1; i++) {
    rows.push(levelbutton(i));
}
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })
    return ( <div>{rows}</div>
    )
}

export default Menu