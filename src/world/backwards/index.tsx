import { scale, worldHeight, screenRatio, getCookie, setCookie } from '../../config/constants';
import '../styles.css';

const backwards = () => {
    let level = parseInt(getCookie('level')) - 1;
    if (level <= 0) {
        level = 1;
    }
    setCookie('level', level, 365);
    window.location.reload();
};

const Backwards = () => {
    return (
        <div className="backwards" onClick={() => backwards()}
            style={{
                width: scale * screenRatio() * 0.3 + 'vh',
                height: scale * screenRatio() * 0.3 + 'vh',
                top: scale * screenRatio() * (worldHeight - 1) + scale * screenRatio() * 0.4 + 'vh',
                color: 'transparent',
                left: scale * screenRatio() * 0.3 + 'vh',
            }}

        >
            {'B'}
        </div>
    );
};

export default Backwards;
