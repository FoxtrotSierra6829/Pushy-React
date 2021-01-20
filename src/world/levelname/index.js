import React from 'react'
import store from '../../config/store'
import { connect } from 'react-redux'
import { scale, worldheight, worldwidth } from '../../config/constants'
import '../styles.css'

function Levelname(props) {
    return (
        <div
            style={{
                position: 'absolute',
                fontFamily: 'arial',
                color: 'white',
                top: scale*0.1+'vh',
                left: scale*0.2+'vh',
                fontSize: scale*0.4+'vh',
                }}
        
        >
            {props.levelname}
        </div>
    )
}
function mapStateToProps(state) {
    return {
        ...state.levelname,
    }
}

export default connect(mapStateToProps)(Levelname)