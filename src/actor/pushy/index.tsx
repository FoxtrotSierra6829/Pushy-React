import { useSelector } from 'react-redux';
import pushyImage from '../../images/pushy.webp';
import { scale, screenRatio } from '../../config/constants';
import { RootState } from '../../config/store';
import handleMovement from './move';

const Pushy = () => {
    const pushy = useSelector((state: RootState) => state.pushy);
    return (
        <div
            style={{
                position: 'absolute',
                top: (pushy.position[1] - 1) * scale * screenRatio() + 'vh',
                left: (pushy.position[0] - 1) * scale * screenRatio() + 'vh',
                transform: `rotate(${pushy.rotation}deg)`,
                backgroundImage: `url('${pushyImage}')`,
                backgroundPosition: '0 0',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                width: scale * screenRatio() + 'vh',
                height: scale * screenRatio() + 'vh',
                zIndex: 3,

            }}

        />
    );
};
export default handleMovement(Pushy);
