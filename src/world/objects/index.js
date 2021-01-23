import React from 'react'
import store from '../../config/store'
import { connect } from 'react-redux'
import { scale, worldheight, worldwidth } from '../../config/constants'
import '../styles.css'


function getTileType(type) {
    switch(type) {
        case 2:
            return 'house'
        case 3:
            return 'box'
        case 4:
            return 'stone'
        case 5:
            return 'palm-left'
        case 6:
            return 'palm-right'
        case 7:
            return 'seastar'
        case 8:
            return 'water-hole'
        case 9:
            return 'sand-hole'
        case 10:
            return 'bottle'
        case 11:
            return 'bean'
    }
}

function MapTile(props) {
    return <div
    className={`objectstile ${getTileType(props.objectstile)}`}
    style={{
        width: scale+ 'vh',
        height: scale+ 'vh',
    }}
    >{props.objectstile}
    </div>
}

function MapRow(props) {
    return <div className="row">
        {
            props.objects.map(objectstile => <MapTile objectstile={objectstile} /> )
        }
    </div>
}

function Objects(props) {
    return (
        <div 
            style={{
                position: 'absolute',
                textAlign: 'center',
                width: scale*worldwidth+ 'vh',
                height: scale*worldheight+ 'vh',
                margin: 'auto',
            }}
        >
            {
                props.objects.map(row => <MapRow objects={row} />)
            }
           
        </div>
    )
}

function mapStateToProps(state) {
    return {
        objects: state.objects.objects,
    }
}

export default connect(mapStateToProps)(Objects)

