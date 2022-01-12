import { connect } from 'react-redux';
import { scale, screenRatio } from '../../config/constants';
import { RootState } from '../../config/store';
import '../styles.css';

const levelName = (props: {levelName: string}) => {
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
const mapStateToProps = (state: RootState) => {
    return {
        levelName: state.levelName,
    };
};

export default connect(mapStateToProps)(levelName);
