import { connect } from 'react-redux'
import { scale, screenratio } from '../../config/constants'
import '../styles.css'

const Levelname = (props: any) => {
    return (
        <div
            style={{
                position: 'absolute',
                fontFamily: 'arial',
                color: 'white',
                top: scale*screenratio()*0.1+'vh',
                left: scale*screenratio()*0.2+'vh',
                fontSize: scale*screenratio()*0.4+'vh',
                }}
        
        >
            {props.levelname}
        </div>
    )
}
const mapStateToProps = (state: any) => {
    return {
        ...state.levelname,
    }
}

export default connect(mapStateToProps)(Levelname)