import store from '../../config/store'
import { worldheight } from '../../config/constants'
import { worldwidth } from '../../config/constants'


export default function handleMovement(player) {

    function getNewPosition(direction) {
        const oldPos = store.getState().pushy.position
        switch(direction) {
            case 'left':
                if (oldPos[0]-1>=1) {
                    return [oldPos[0]-1, oldPos[1]]
                }
                else {
                    return [oldPos[0], oldPos[1]]
                }
            case 'right':
                if (oldPos[0]+1<=worldwidth) {
                    return [oldPos[0]+1, oldPos[1]]
                }
                else {
                    return [oldPos[0], oldPos[1]]
                }
            case 'up':
                if (oldPos[1]-1>=1) {
                    return [oldPos[0], oldPos[1]-1]
                }
                else {
                    return [oldPos[0], oldPos[1]]
                }
            case 'down':
                if (oldPos[1]+1<=worldheight) {
                    return [oldPos[0], oldPos[1]+1]
                }
                else {
                    return [oldPos[0], oldPos[1]]
                }
        }
    }

    function isObstacleAhead(newPos, direction) {
        const oldPos = store.getState().pushy.position
        const rotation = getRotation(direction)
        const ground = store.getState().ground.ground
        const objects = store.getState().objects.objects
        const yto = newPos[1]-1
        const xto = newPos[0]-1
        const yfrom = oldPos[1]-1
        const xfrom = oldPos[0]-1
        const nextGroundTile = ground[yto] [xto]
        const nextObjectsTile = objects[yto] [xto]
        const currentGroundTile = ground[yfrom] [xfrom]
        const currentObjectsTile = objects[yfrom] [xfrom]
        if (nextGroundTile === 0 || (nextGroundTile=== 2 && currentGroundTile=== 1) || (nextObjectsTile=== 2 && rotation!== 0) || (currentObjectsTile=== 2 && rotation!== 180) || nextObjectsTile===4 || nextObjectsTile===5 || nextObjectsTile===6 ) {
            return true;
        } else {
            return false;
        }
        

    }
    function getRotation(rotation) {
        switch(rotation) {
            case 'left':
                return -90
            case 'right':
                return 90
            case 'up':
                return 0
            case 'down':
                return 180
        }
        
    }
    function tryMove(direction) {
        const newPos = getNewPosition(direction)
        const obstacle = isObstacleAhead(newPos, direction)
        if (obstacle===false) {
            dispatchMove(direction)
        } else {
            doNotDispatchMove(direction)
        }

    }
    function dispatchMove(direction) {
        store.dispatch({
            type: 'MOVE_PUSHY',
            payload: {
                position: getNewPosition(direction),
                rotation: getRotation(direction),
            }
        })
    }
    
    function doNotDispatchMove(direction) {
        store.dispatch({
            type: 'MOVE_PUSHY',
            payload: {
                position: store.getState().pushy.position,
                rotation: getRotation(direction),
            }
        })
    }

    function handleKeyDown(e) {
        e.preventDefault()
        switch(e.keyCode) {
            case 37:
                return tryMove('left')
            case 65:
                return tryMove('left')
            case 38:
                return tryMove('up')
            case 87:
                return tryMove('up')
            case 39:
                return tryMove('right')
            case 68:
                return tryMove('right')
            case 40:
                return tryMove('down')
            case 83:
                return tryMove('down')
            
            default:
                console.log(e.keyCode)
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    return player
}