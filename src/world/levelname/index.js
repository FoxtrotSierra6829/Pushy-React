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
                top: '.2vw',
                left: '.3vw',
                fontSize: '1.5vw',
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