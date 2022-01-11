import { maxLevel, scale, worldHeight, worldWidth, screenRatio, setCookie, getCookie } from '../../config/constants';
import '../styles.css';

const forwards = () => {
    let level = parseInt(getCookie('level')) + 1;
    const highscorelevel = parseInt(getCookie('highscorelevel'));
    if (level >= maxLevel) {
        level = maxLevel;
    } else if (level >= highscorelevel + 1) {
        level = highscorelevel + 1;
    }
    setCookie('level', level, 365);
    window.location.reload();
};

const Forwards = () => {
    return (
        <div className="forwards" onClick={() => forwards()}
            style={{
                width: scale * screenRatio() * 0.3 + 'vh',
                height: scale * screenRatio() * 0.3 + 'vh',
                top: scale * screenRatio() * (worldHeight - 1) + scale * screenRatio() * 0.4 + 'vh',
                color: 'transparent',
                left: scale * screenRatio() * (worldWidth - 1) + scale * screenRatio() * 0.4 + 'vh',
            }}

        >
            {'F'}
        </div>
    );
};

export default Forwards;
