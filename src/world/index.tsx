import { connect } from 'react-redux';
import Pushy from '../actor/pushy';
import Ground from './ground';
import Objects from './objects';
import LevelName from './levelname';
import Reload from './reload';
import Backwards from './backwards';
import Forwards from './forwards';
import Beancount from './beancount';
import Menu from './menu';
import Congrats from './congrats';
import { levels, scale, worldHeight, worldWidth, maxLevel, screenRatio, setCookie, getCookie } from '../config/constants';
import store, { RootState } from '../config/store';
import BackArrow from './backarrow';
import { actionTypes } from '../config/types';

const World = () => {

    let level = 1;
    store.dispatch({ type: actionTypes.changeLevel, payload: {
        maxlevel: maxLevel,
    } });
    let mode = getCookie('mode');
    let levelcookie: string | number = getCookie('level');
    const highscorelevel = parseInt(getCookie('highscorelevel'));
    if (levelcookie !== "") {
        levelcookie = parseInt(levelcookie);
        if (levelcookie > maxLevel) {
            level = levelcookie - 1;
            setCookie('level', level, 365);
            setCookie('mode', 'congrats', 365);
            window.location.reload();
        } else {
            level = levelcookie;
        }
    } else {
        window.alert('Diese Webseite verwendet Cookies um den Spielstand zu speichern.\n\nThis website uses cookies to be able to save your progress in game.');
        window.alert('Controls:\n   W   |     ▲\nA S D|◀ ▼ ▶\n\nMenu: ESC\nContinue: Enter');
        setCookie('mode', 'menu', 365);
        mode = 'menu';
        setCookie('level', level, 365);
        setCookie('highscorelevel', 0, 365);
    }
    if (level > (highscorelevel + 1)) {
        level = highscorelevel + 1;
        setCookie('level', level, 365);
    } else {
        loadlevel(level);
    }
    if (mode === "pushyisland") {
        return (
            <div className='frame'
                style={{
                    position: 'relative',
                    textAlign: 'center',
                    width: scale * screenRatio() * worldWidth + 'vh',
                    height: scale * screenRatio() * worldHeight + 'vh',
                    border: '.1vh solid black',
                    margin: 'auto',
                }}
            > <div className='world' id = "world">
                    <Ground />
                    <Objects />
                    <Pushy />
                    <LevelName />
                    <BackArrow />
                    <Reload />
                    <Backwards />
                    <Forwards />
                    <Beancount key={store.getState().bean.count} />
                </div>
            </div>
        );
    } else if (mode === 'congrats') {
        return (
            <div className='frame-congrats' onClick={() => {
                setCookie('mode', 'menu', 365);
                window.location.reload();
            }}
            style={{
                position: 'relative',
                textAlign: 'center',
                width: scale * screenRatio() * worldWidth + 'vh',
                height: scale * screenRatio() * worldHeight + 'vh',
                border: '.1vh solid black',
                margin: 'auto',
            }}
            > <div className='world' id = "world">
                    <Congrats />
                </div>
            </div>
        );
    } else {
        return (
            <div className='frame-menu'
                style={{
                    position: 'relative',
                    textAlign: 'center',
                    width: scale * screenRatio() * worldWidth + 'vh',
                    height: scale * screenRatio() * worldHeight + 'vh',
                    border: '.1vh solid black',
                    margin: 'auto',
                }}
            > <div className='world' id = "world">
                    <Menu />
                </div>
            </div>
        );
    }
};

//get related level objects
const loadlevel = (level: number) => {
    const keys = Object.keys(levels);
    const ground = levels[keys[level - 1]].ground;
    const objects = levels[keys[level - 1]].objects;
    const position = levels[keys[level - 1]].initalPushyPosition;
    const levelName = levels[keys[level - 1]].levelName;

    store.dispatch({ type: actionTypes.addGround, payload: {
        ground,
    } });
    store.dispatch({ type: actionTypes.addObjects, payload: {
        objects
    } });
    store.dispatch({ type: actionTypes.movePushy, payload: {
        position,
    } });
    store.dispatch({ type: actionTypes.addLevelName, payload: {
        levelName: levelName,
    } });
};

const mapStateToProps = (state: RootState) => {
    return {
        ...state.world,
    };
};
export default connect(mapStateToProps)(World);
