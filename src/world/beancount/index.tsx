import { connect } from 'react-redux';
import { scale, worldHeight, worldWidth, screenRatio } from '../../config/constants';
import { RootState } from '../../config/store';
import '../styles.css';

const Beancount = (props: {beancount: number}) => {
    return (
        <div className={'beancount-' + props.beancount}
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

const mapStateToProps = (state: RootState) => {
    return {
        beancount: state.bean.count,
    };
};

export default connect(mapStateToProps)(Beancount);
