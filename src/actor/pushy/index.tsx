import { connect } from 'react-redux'
import pushyimg from '../../images/pushy.png'
import handleMovement from './move'
import { scale, screenratio } from '../../config/constants'

const Pushy = (props: any) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: (props.position[1]-1)*scale*screenratio()+'vh',
                left: (props.position[0]-1)*scale*screenratio()+'vh',
                transform: `rotate(${props.rotation}deg)`,
                backgroundImage: `url('${pushyimg}')`,
                backgroundPosition: '0 0',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                width: scale*screenratio()+ 'vh',
                height: scale*screenratio()+ 'vh',
                zIndex: 3,

            }}
        
        />
    )
}

const mapStateToProps = (state: any) => {
    return {
        ...state.pushy,
    }
}

export default connect(mapStateToProps)(handleMovement(Pushy))