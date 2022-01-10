import { maxLevel, scale, worldWidth, screenRatio, getCookie, setCookie } from '../../config/constants'
import '../styles.css'

const levelbutton = (i: number) => {
        let highscore = parseInt(getCookie('highscorelevel'))
        let current = parseInt(getCookie('level'))
        if (i===current) {
            if (i<worldWidth) {
                return (
                    <div key={i} onClick={() => loadlevel(i)} style={{
                        position: 'absolute',
                        textAlign: 'center',
                        top: scale*screenRatio()*4+ 'vh',
                        left: scale*screenRatio()*(i-0.5)+ 'vh',
                        width: scale*screenRatio()+ 'vh',
                        height: scale*screenRatio()+ 'vh',
                        margin: 'auto',
                        fontFamily: 'arial',
                        fontSize: scale*screenRatio()*0.4+'vh',
                        color: 'red',
                        fontWeight: 'bold',  
                        cursor: 'pointer',
                    }} >{i}</div>
                )
            }
            if (i<worldWidth*2) {
                return (
                    <div key={i} onClick={() => loadlevel(i)} style={{
                        position: 'absolute',
                        textAlign: 'center',
                        top: scale*screenRatio()*4.75+ 'vh',
                        left: scale*screenRatio()*(i-worldWidth+1-0.5)+ 'vh',
                        width: scale*screenRatio()+ 'vh',
                        height: scale*screenRatio()+ 'vh',
                        margin: 'auto',
                        fontFamily: 'arial',
                        fontSize: scale*screenRatio()*0.4+'vh',
                        color: 'red',
                        fontWeight: 'bold',  
                        cursor: 'pointer',
                    }} >{i}</div>
                )
            }
        }
        else if (i>highscore) {
            if (i<worldWidth) {
                return (
                    <div key={i} onClick={() => loadlevel(i)} style={{
                        position: 'absolute',
                        textAlign: 'center',
                        top: scale*screenRatio()*4+ 'vh',
                        left: scale*screenRatio()*(i-0.5)+ 'vh',
                        width: scale*screenRatio()+ 'vh',
                        height: scale*screenRatio()+ 'vh',
                        margin: 'auto',
                        fontFamily: 'arial',
                        fontSize: scale*screenRatio()*0.4+'vh',
                        color: '#aaaaaa',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }} >{i}</div>
                )
            }
        if (i<worldWidth*2) {
            return (
                <div key={i} onClick={() => loadlevel(i)} style={{
                    position: 'absolute',
                    textAlign: 'center',
                    top: scale*screenRatio()*4.75+ 'vh',
                    left: scale*screenRatio()*(i-worldWidth+1-0.5)+ 'vh',
                    width: scale*screenRatio()+ 'vh',
                    height: scale*screenRatio()+ 'vh',
                    margin: 'auto',
                    fontFamily: 'arial',
                    fontSize: scale*screenRatio()*0.4+'vh',
                    color: '#aaaaaa',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }} >{i}</div>
            )
        }
        }
        else {
            if (i<worldWidth) {
                return (
                    <div key={i} onClick={() => loadlevel(i)} style={{
                        position: 'absolute',
                        textAlign: 'center',
                        top: scale*screenRatio()*4+ 'vh',
                        left: scale*screenRatio()*(i-0.5)+ 'vh',
                        width: scale*screenRatio()+ 'vh',
                        height: scale*screenRatio()+ 'vh',
                        margin: 'auto',
                        fontFamily: 'arial',
                        fontSize: scale*screenRatio()*0.4+'vh',
                        color: 'black',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }} >{i}</div>
                )
            }
            if (i<worldWidth*2) {
                return (
                    <div key={i} onClick={() => loadlevel(i)} style={{
                        position: 'absolute',
                        textAlign: 'center',
                        top: scale*screenRatio()*4.75+ 'vh',
                        left: scale*screenRatio()*(i-worldWidth+1-0.5)+ 'vh',
                        width: scale*screenRatio()+ 'vh',
                        height: scale*screenRatio()+ 'vh',
                        margin: 'auto',
                        fontFamily: 'arial',
                        fontSize: scale*screenRatio()*0.4+'vh',
                        color: 'black',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }} >{i}</div>
                )
            }
        }
    }

const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key!=='F11' && e.key!=='F12') {
        e.preventDefault()
    }
    switch(e.key) {
        case 'Enter':
            setCookie('mode', 'pushyisland', 365);
            window.location.reload();
            break
        default:
            console.log(e.key + ' key pressed')
    }
}
const loadlevel = (i: number) => {
    setCookie('level', i, 365)
    setCookie('mode', 'pushyisland', 365)
    window.location.reload();

}

const Menu = () => {
    let rows = [];
    let displaylevel = parseInt(getCookie('highscorelevel'))+1
    if (displaylevel>maxLevel) {
        displaylevel = maxLevel
    }
    for (let i = 1; i < displaylevel+1; i++) {
    rows.push(levelbutton(i));
}
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })
    return ( <div>{rows}</div>
    )
}

export default Menu