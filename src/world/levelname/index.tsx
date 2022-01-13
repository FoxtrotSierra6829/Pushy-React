import { useSelector } from 'react-redux';
import { scale, screenRatio } from '../../config/constants';
import { RootState } from '../../config/store';
import '../styles.css';

const LevelName = () => {
    const levelName = useSelector((state: RootState) => state.levelName);
    return (
        <div
            style={{
                position: 'absolute',
                fontFamily: 'arial',
                color: 'white',
                top: scale * screenRatio() * 0.1 + 'vh',
                left: scale * screenRatio() * 0.2 + 'vh',
                fontSize: scale * screenRatio() * 0.4 + 'vh',
            }}

        >
            {levelName}
        </div>
    );
};

export default LevelName;
