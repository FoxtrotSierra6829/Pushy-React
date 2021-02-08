import React from 'react'
import { connect } from 'react-redux'
import { scale, worldheight, worldwidth, screenratio } from '../../config/constants'
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
            return 'bottle'
        case 9:
            return 'bean'
        case 10:
            return 'bottle-water'
    }
}

function MapTile(props) {
    return <div
    className={`objectstile ${getTileType(props.objectstile)}`}
    style={{
        width: scale*screenratio()+ 'vh',
        height: scale*screenratio()+ 'vh',
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
                width: scale*screenratio()*worldwidth+ 'vh',
                height: scale*screenratio()*worldheight+ 'vh',
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

