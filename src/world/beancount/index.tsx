import { useSelector } from 'react-redux';
import { scale, worldHeight, worldWidth, screenRatio } from '../../config/constants';
import { RootState } from '../../config/store';
import '../styles.css';

const Beancount = () => {
    const beancount = useSelector((state: RootState) => state.bean.count);
    return (
        <div className={'beancount-' + beancount}
            style={{
                width: scale * screenRatio() + 'vh',
                height: scale * screenRatio() + 'vh',
                top: scale * screenRatio() * (worldHeight - 2) + scale * screenRatio() + 'vh',
                color: 'transparent',
                left: scale * screenRatio() * ((worldWidth - 4) / 2) + scale * screenRatio() + 'vh',
            }}

        > {'B'}
        </div>
    );
};

export default Beancount;
