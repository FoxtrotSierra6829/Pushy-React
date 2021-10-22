import { scale, worldwidth, screenratio } from '../../config/constants'
import '../styles.css'

const reload = () => {
    window.location.reload();
}

const Reload = () => {
    return (
        <div className="reload" onClick={() => reload()}
            style={{
                width: scale*screenratio()*0.45+ 'vh',
                height: scale*screenratio()*0.45+ 'vh',
                top: scale*screenratio()*0.1+ 'vh',
                color: 'transparent',
                left: scale*screenratio()*(worldwidth-1)+scale*screenratio()*0.4+'vh',
                }}
        
        >
            {'R'}
        </div>
    )
}

export default Reload