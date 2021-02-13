import React from 'react'
import { scale, worldheight, worldwidth, screenratio } from '../../config/constants'
import '../styles.css'

function reload() {
    window.location.reload();
}

function Reload(props) {
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