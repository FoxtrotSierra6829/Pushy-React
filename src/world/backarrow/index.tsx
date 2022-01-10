import { scale, worldWidth, screenRatio, setCookie } from '../../config/constants'
import '../styles.css'

const back = () => {
    setCookie('mode', 'menu', 365);
    window.location.reload();
}

const BackArrow = () => {
    return (
        <div className="back-arrow" onClick={() => back()}
            style={{
                width: scale*screenRatio()*0.5+ 'vh',
                height: scale*screenRatio()*0.48+ 'vh',
                top: scale*screenRatio()*0.1+ 'vh',
                color: 'transparent',
                left: scale*screenRatio()*(worldWidth-2)+scale*screenRatio()*0.7+'vh',
                }}
        
        >
            {'R'}
        </div>
    )
}

export default BackArrow