import { scale, worldwidth, screenratio, setCookie } from '../../config/constants'
import '../styles.css'

const back = () => {
    setCookie('mode', 'menu', 365);
    window.location.reload();
}

const BackArrow = () => {
    return (
        <div className="back-arrow" onClick={() => back()}
            style={{
                width: scale*screenratio()*0.5+ 'vh',
                height: scale*screenratio()*0.48+ 'vh',
                top: scale*screenratio()*0.1+ 'vh',
                color: 'transparent',
                left: scale*screenratio()*(worldwidth-2)+scale*screenratio()*0.7+'vh',
                }}
        
        >
            {'R'}
        </div>
    )
}

export default BackArrow