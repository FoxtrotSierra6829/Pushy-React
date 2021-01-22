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
        const gnd = store.getState().ground.ground
        const obj = store.getState().objects.objects
        const yto = newPos[1]-1
        const xto = newPos[0]-1
        var ystep2 = 0
        if (yto==worldheight-1 || yto==0) {
            ystep2 = yto
        }
        else {
            ystep2 = oldPos[1]+(oldPos[1]-newPos[1])*(-2)-1
        }
        var xstep2 = 0
        if (xto==worldwidth-1 || xto==0) {
            xstep2 = xto
        }
        else {
            xstep2 = oldPos[0]+(oldPos[0]-newPos[0])*(-2)-1
        }
        const yfrom = oldPos[1]-1
        const xfrom = oldPos[0]-1
        const nextGroundTile = gnd[yto] [xto]
        const nextObjectsTile = obj[yto] [xto]
        const step2ObjectsTile = obj[ystep2] [xstep2]
        const step2GroundTile = gnd[ystep2] [xstep2]
        const currentGroundTile = gnd[yfrom] [xfrom]
        const currentObjectsTile = obj[yfrom] [xfrom]
        console.log(obj[ystep2] [xstep2])


        if (nextObjectsTile===2 && rotation === 0) {
            const level = parseInt(getCookie('level'))+1
            setCookie('level', level, 365)
            setCookie('highscorelevel', level-1, 365)
            window.location.reload();
            return false
        }
        else if (nextObjectsTile===3 && obj[ystep2] [xstep2] === 0 && step2GroundTile===0) {
            const objects = obj.slice() //copy the array
            objects[yto] [xto] = 0 //execute the manipulations
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects,
            }})
            const ground = gnd.slice() //copy the array
            ground[ystep2] [xstep2] = 3 //execute the manipulations
            store.dispatch({type: 'UPDATE_GROUND', payload: {
                ground,
            }})
            return false

        }
        else if (nextObjectsTile===3 && !(step2GroundTile === 2 && nextGroundTile=== 1) && !(nextGroundTile === 2 && currentGroundTile=== 1) && !(nextGroundTile === 1 && currentGroundTile=== 2) && obj[ystep2] [xstep2] === 0) {
            const objects = obj.slice() //copy the array
            objects[yto] [xto] = 0 //execute the manipulations
            objects[ystep2] [xstep2] = 3 //execute the manipulations
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects,
            }})
            return false

        }
        else if (nextObjectsTile===3) {
            return true

        }
        else if (nextGroundTile === 0 || (nextGroundTile=== 2 && currentGroundTile=== 1) || (nextObjectsTile=== 2 && rotation!== 0) || (currentObjectsTile=== 2 && rotation!== 180) || nextObjectsTile===4 || nextObjectsTile===5 || nextObjectsTile===6 ) {
            return true;
        } else {
            return false;
        }

        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
              var c = ca[i];
              while (c.charAt(0) == ' ') {
                c = c.substring(1);
              }
              if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
              }
            }
            return "";
          }

        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
        if (e.keyCode!=122 && e.keyCode!=123) {
            e.preventDefault()
        }
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