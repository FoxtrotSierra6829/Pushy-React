import React from 'react'
import { connect } from 'react-redux'
import Pushy from '../actor/pushy'
import Ground from './ground'
import Objects from './objects'
import { scale, worldheight, worldwidth } from '../config/constants'

import {ground,objects } from '../levels/PushyIsland/1'
import store from '../config/store'

function World(props) {
    store.dispatch({type: 'ADD_GROUND', payload: {
        ground,
    }})
    store.dispatch({type: 'ADD_OBJECTS', payload: {
        objects,
    }})
    return (
        <div
            style={{
                position: 'relative',
                'text-align': 'center',
                width: scale*worldwidth+ 'vw',
                height: scale*worldheight+ 'vw',
                border: '.1vw solid black',
                margin: 'auto',
            }}
        >
            <Ground />
            <Objects />
            <Pushy />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.world,
    }
}
export default connect(mapStateToProps)(World)