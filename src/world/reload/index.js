import React from 'react'
import { scale, worldheight, worldwidth } from '../../config/constants'
import '../styles.css'

function reload() {
    window.location.reload();
}

function Reload(props) {
    return (
        <div className="reload" onClick={() => reload()}
            style={{
                width: scale*0.5+ 'vh',
                height: scale*0.5+ 'vh',
                top: scale*0.1+ 'vh',
                color: 'transparent',
                left: scale*(worldwidth-1)+scale*0.4+'vh',
                }}
        
        >
            {'R'}
        </div>
    )
}

export default Reload