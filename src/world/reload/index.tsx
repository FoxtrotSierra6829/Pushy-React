import { scale, worldWidth, screenRatio } from '../../config/constants';
import '../styles.css';

const reload = () => {
    window.location.reload();
};

const Reload = () => {
    return (
        <div className="reload" onClick={() => reload()}
            style={{
                width: scale * screenRatio() * 0.45 + 'vh',
                height: scale * screenRatio() * 0.45 + 'vh',
                top: scale * screenRatio() * 0.1 + 'vh',
                color: 'transparent',
                left: scale * screenRatio() * (worldWidth - 1) + scale * screenRatio() * 0.4 + 'vh',
            }}

        >
            {'R'}
        </div>
    );
};

export default Reload;
