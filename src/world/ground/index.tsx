import store from '../../config/store';
import { connect } from 'react-redux';
import { scale, screenRatio, worldHeight, worldWidth, groundType } from '../../config/constants';
import '../styles.css';
import { ReactChild, ReactFragment, ReactPortal } from 'react';

let count = 0;
let x = 0;
let y = 0;
let xleft = 0;
let xright = 0;
let yup = 0;
let ydown = 0;
const getTileSprite = (type: any) => {
    x = count % (worldWidth);
    y = Math.floor(count / (worldWidth));
    if (y === 0) {
        yup = 1;
    } else {
        yup = y - 1;
    }
    if (y === worldHeight - 1) {
        ydown = y;
    } else {
        ydown = y + 1;
    }
    if (x === 0) {
        xleft = x;
    } else {
        xleft = x - 1;
    }
    if (x === worldWidth - 1) {
        xright = x;
    } else {
        xright = x + 1;
    }

    const storedground = store.getState().ground.ground;
    const groundTileAbove = storedground[yup][x];
    const groundTileBelow = storedground[ydown][x];
    const groundTileLeft = storedground[y][xleft];
    const groundTileRight = storedground[y][xright];
    count++;
    switch (type) {
        case groundType.water:
            return 'water';
        case groundType.sand:
            if ((groundTileAbove === groundType.water && groundTileLeft === groundType.water) || (groundTileAbove === 3 && groundTileLeft === groundType.water) || (groundTileAbove === 3 && groundTileLeft === 3) || (groundTileAbove === groundType.water && groundTileLeft === 3) || (groundTileAbove === groundType.water && x === 0) || (groundTileAbove === 3 && x === 0) || (groundTileLeft === groundType.water && y === 0)) {
                return 'sand-lo';
            } else if ((groundTileBelow === groundType.water && groundTileLeft === groundType.water) || (groundTileBelow === 3 && groundTileLeft === groundType.water) || (groundTileBelow === 3 && groundTileLeft === 3) || (groundTileBelow === groundType.water && groundTileLeft === 3) || (groundTileBelow === groundType.water && x === 0) || (groundTileBelow === 3 && x === 0) || (groundTileLeft === groundType.water && y === worldHeight - 1)) {
                return 'sand-lu';
            } else if ((groundTileBelow === groundType.water && groundTileRight === groundType.water) || (groundTileBelow === 3 && groundTileRight === groundType.water) || (groundTileBelow === 3 && groundTileRight === 3) || (groundTileBelow === groundType.water && groundTileRight === 3) || (groundTileBelow === groundType.water && x === 19) || (groundTileBelow === 3 && x === 19) || (groundTileRight === groundType.water && y === worldHeight - 1)) {
                return 'sand-ru';
            } else if ((groundTileAbove === groundType.water && groundTileRight === groundType.water) || (groundTileAbove === 3 && groundTileRight === groundType.water) || (groundTileAbove === 3 && groundTileRight === 3) || (groundTileAbove === groundType.water && groundTileRight === 3) || (groundTileAbove === groundType.water && x === worldWidth - 1) || (groundTileAbove === 3 && x === worldWidth - 1) || (groundTileRight === groundType.water && y === 0)) {
                return 'sand-ro';
            } else {
                return 'sand';
            }

        case groundType.grass:
            if (groundTileAbove !== groundType.grass && groundTileLeft !== groundType.grass) {
                return 'grass-lo';
            } else if (groundTileBelow !== groundType.grass && groundTileLeft !== groundType.grass) {
                return 'grass-lu';
            } else if (groundTileBelow !== groundType.grass && groundTileRight !== groundType.grass) {
                return 'grass-ru';
            } else if (groundTileAbove !== groundType.grass && groundTileRight !== groundType.grass) {
                return 'grass-ro';
            } else if (groundTileBelow !== groundType.grass) {
                return 'grass-down';
            } else {
                return 'grass';
            }
        case groundType.boxInWater:
            return 'box-water';
        case groundType.waterHole:
            return 'water-hole';
        case groundType.sandHole:
            return 'sand-hole';
        case groundType.sandHoleWithBean:
            return 'sand-hole-bean';
        case groundType.spring:
            return 'spring';
        case groundType.crossRed:
            return 'cross-red';
        case groundType.crossBlue:
            return 'cross-blue';
        case groundType.crossGreen:
            return 'cross-green';
        case groundType.bombTrigger:
            return 'bomb-trigger';
        default:
            return 'water';
    }
};

const MapTile = (props: { groundtile: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => {
    return <div
        className={`groundtile ${getTileSprite(props.groundtile)}`}
        style={{
            width: scale * screenRatio() + 'vh',
            height: scale * screenRatio() + 'vh',
        }}
    >{props.groundtile}
    </div>;
};

const MapRow = (props: { ground: any[]; }) => {
    return <div className="row">
        {
            props.ground.map((groundtile: any) => <MapTile groundtile={groundtile} />)
        }
    </div>;
};

const Ground = (props: any) => {
    count = 0;
    return (
        <div
            style={{
                position: 'absolute',
                textAlign: 'center',
                width: scale * screenRatio() * worldWidth + 'vh',
                height: scale * screenRatio() * worldHeight + 'vh',
                margin: 'auto',
                fontSize: 0,
            }}
        >
            {
                props.ground.map((row: any) => <MapRow ground={row} />)
            }

        </div>
    );
};

const mapStateToProps = (state: any) => {
    return {
        ground: state.ground.ground,
    };
};

export default connect(mapStateToProps)(Ground);
