import React from 'react'
import store from '../../config/store'
import { connect } from 'react-redux'
import { scale, worldheight, worldwidth } from '../../config/constants'
import '../styles.css'


var count = 0;
var x = 0;
var y = 0;
var xleft = 0;
var xright = 0;
var yup = 0;
var ydown =0;
function getTileSprite(type) {
    x = count%(worldwidth)
    y = Math.floor(count/(worldwidth))
    if (y==0) {
        yup = 1
    } else {
        yup =y-1
    }
    if (y==worldheight-1) {
        ydown = y
    } else {
        ydown =y+1
    }
    if (x==0) {
        xleft = x
    } else {
        xleft = x-1
    }
    if (x==worldwidth-1) {
        xright = x
    } else {
        xright = x+1
    }
    
    const storedground = store.getState().ground.ground
    const groundTileAbove = storedground[yup] [x]
    const groundTileBelow = storedground[ydown] [x]
    const groundTileLeft = storedground[y] [xleft]
    const groundTileRight = storedground[y] [xright]
    count++
    switch(type) {
        case 0:
            return 'water'
        case 1:
            if (groundTileAbove === 0 && groundTileLeft === 0 || groundTileAbove === 3 && groundTileLeft === 0 || groundTileAbove === 3 && groundTileLeft === 3 || groundTileAbove === 0 && x === 0 || groundTileAbove === 3 && x === 0) {
                return 'sand-lo'
            } else if (groundTileBelow === 0 && groundTileLeft === 0 || groundTileBelow === 3 && groundTileLeft === 0 || groundTileBelow === 3 && groundTileLeft === 3 || groundTileBelow === 0 && groundTileLeft === 3 || groundTileBelow === 0 && x === 0 || groundTileBelow === 3 && x === 0) {
                    return 'sand-lu'
            } else if (groundTileBelow === 0 && groundTileRight === 0 || groundTileBelow === 3 && groundTileRight === 0 || groundTileBelow === 3 && groundTileRight === 3 ||groundTileBelow === 0 && groundTileRight === 3 || groundTileBelow === 0 && x === 19 || groundTileBelow === 3 && x === 19) {
                return 'sand-ru'
            } else if (groundTileAbove === 0 && groundTileRight === 0 || groundTileAbove === 3 && groundTileRight === 0 ||groundTileAbove === 3 && groundTileRight === 3 || groundTileAbove === 0 && groundTileRight === 3 || groundTileAbove === 0 && x === worldwidth-1 || groundTileAbove === 3 && x === worldwidth-1) {
                return 'sand-ro'
            } else {
                return 'sand'
            }
            
        case 2:
            if (groundTileAbove !== 2 && groundTileLeft !== 2) {
                return 'grass-lo'
            } else if (groundTileBelow !== 2 && groundTileLeft !== 2) {
                    return 'grass-lu'
            } else if (groundTileBelow !== 2 && groundTileRight !== 2) {
                return 'grass-ru'
            } else if (groundTileAbove !== 2 && groundTileRight !== 2) {
                return 'grass-ro'
            } else if (groundTileBelow !== 2) {
                return 'grass-down'
            } else {
                return 'grass'
            }
        case 3:
            return 'box-water'
    }
}

function MapTile(props) {
    return <div
    className={`groundtile ${getTileSprite(props.groundtile)}`}
    style={{
        width: scale+ 'vh',
        height: scale+ 'vh',
    }}
    >{props.groundtile}
    </div>
}

function MapRow(props) {
    return <div className="row">
        {
            props.ground.map(groundtile => <MapTile groundtile={groundtile} /> )
        }
    </div>
}

function Ground(props) {
    count = 0;
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
                props.ground.map(row => <MapRow ground={row} />)
            }
           
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ground: state.ground.ground,
    }
}

export default connect(mapStateToProps)(Ground)

