import { connect } from 'react-redux'
import { scale, worldheight, worldwidth, screenratio, objectType } from '../../config/constants'
import '../styles.css'


const getTileType = (type: number) => {
    switch(type) {
        case objectType.house:
            return 'house'
        case objectType.box:
            return 'box'
        case objectType.stone:
            return 'stone'
        case objectType.palmLeft:
            return 'palm-left'
        case objectType.palmRight:
            return 'palm-right'
        case objectType.seastar:
            return 'seastar'
        case objectType.bottle:
            return 'bottle'
        case objectType.bean:
            return 'bean'
        case objectType.bottleWater:
            return 'bottle-water'
        case objectType.figureRed:
            return 'figure-red'
        case objectType.figureBlue:
            return 'figure-blue'
        case objectType.figureGreen:
            return 'figure-green'
        case objectType.bomb:
            return 'bomb'
        case objectType.explosion:
            return 'explosion'
        default:
            return
    }
}

const MapTile = (props: any) => {
    return <div
    className={`objectstile ${getTileType(props.objectstile)}`}
    style={{
        width: scale*screenratio()+ 'vh',
        height: scale*screenratio()+ 'vh',
    }}
    >{props.objectstile}
    </div>
}

const MapRow = (props: any) => {
    return <div className="row">
        {
            props.objects.map((objectstile: any) => <MapTile objectstile={objectstile} /> )
        }
    </div>
}

const Objects = (props: any) => {
    return (
        <div 
            style={{
                position: 'absolute',
                textAlign: 'center',
                width: scale*screenratio()*worldwidth+ 'vh',
                height: scale*screenratio()*worldheight+ 'vh',
                margin: 'auto',
                fontSize: 0,
            }}
        >
            {
                props.objects.map((row: any) => <MapRow objects={row} />)
            }
           
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        objects: state.objects.objects,
    }
}

export default connect(mapStateToProps)(Objects)

