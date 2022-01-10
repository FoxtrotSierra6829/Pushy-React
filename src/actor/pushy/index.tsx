import { connect } from 'react-redux'
import pushyImage from '../../images/pushy.webp'
import handleMovement from './move'
import { scale, screenRatio } from '../../config/constants'

const Pushy = (props: any) => {
    return (
        <div
            style={{
                position: 'absolute',
                top: (props.position[1]-1)*scale*screenRatio()+'vh',
                left: (props.position[0]-1)*scale*screenRatio()+'vh',
                transform: `rotate(${props.rotation}deg)`,
                backgroundImage: `url('${pushyImage}')`,
                backgroundPosition: '0 0',
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                width: scale*screenRatio()+ 'vh',
                height: scale*screenRatio()+ 'vh',
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