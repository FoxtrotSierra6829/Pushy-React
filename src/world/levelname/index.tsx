import { connect } from 'react-redux';
import { scale, screenRatio } from '../../config/constants';
import '../styles.css';

const levelName = (props: any) => {
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
            {props.levelName}
        </div>
    );
};
const mapStateToProps = (state: any) => {
    return {
        ...state.levelName,
    };
};

export default connect(mapStateToProps)(levelName);
