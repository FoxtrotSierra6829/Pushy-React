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
            default:
                return [oldPos[0], oldPos[1]]
        }
    }

    function isObstacleAhead(newPos, direction) {
        const oldPos = store.getState().pushy.position
        const rotation = getRotation(direction)
        const gnd = store.getState().ground.ground
        const obj = store.getState().objects.objects
        const yto = newPos[1]-1
        const xto = newPos[0]-1
        let ystep2 = 0
        if (yto===worldheight-1 || yto===0) {
            ystep2 = yto
        }
        else {
            ystep2 = oldPos[1]+(oldPos[1]-newPos[1])*(-2)-1
        }
        let xstep2 = 0
        if (xto===worldwidth-1 || xto===0) {
            xstep2 = xto
        }
        else {
            xstep2 = oldPos[0]+(oldPos[0]-newPos[0])*(-2)-1
        }
        const yfrom = oldPos[1]-1
        const xfrom = oldPos[0]-1
        const nextGroundTile = gnd[yto][xto]
        const nextObjectsTile = obj[yto][xto]
        const step2ObjectsTile = obj[ystep2][xstep2]
        const step2GroundTile = gnd[ystep2][xstep2]
        const currentGroundTile = gnd[yfrom][xfrom]
        const currentObjectsTile = obj[yfrom][xfrom]
        //Bean ahead
        if (nextObjectsTile===9) {
            const objects = obj.slice() //copy the array
            objects[yto][xto] = 0 //remove at old position
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects
            }})
            store.dispatch({type: 'BEAN', payload: {
                count: store.getState().bean.count+1,
            }})
        }
        if (nextGroundTile===5) {
            if (store.getState().bean.count>0) {
                const ground = gnd.slice() //copy the array
                ground[yto][xto] = 6 //add at new position
                store.dispatch({type: 'UPDATE_GROUND', payload: {
                    ground
                }})
                store.dispatch({type: 'BEAN', payload: {
                    count: store.getState().bean.count-1,
                }})
            }
        }
        //In House
        if (nextObjectsTile===2 && rotation === 0) {
            const objects = obj.slice() //copy the array
            const ground = gnd.slice() //copy the array
            for (let y = 0; y < worldheight; y++) { //scroll through world y
                for (let x = 0; x < worldwidth; x++) { //scroll through world x
                    if (objects[y][x]===11 && ground[y][x] !== 8) { // when figure red and not red cross below
                        return false
                    }
                    if (objects[y][x]===12 && ground[y][x] !== 9) { // when figure red and not red cross below
                        return false
                    }
                    if (objects[y][x]===13 && ground[y][x] !== 10) { // when figure red and not red cross below
                        return false
                    }
                }}
            const obj2 = [].concat(...objects);
            function countInArray(array, value) {
                return array.reduce((n, x) => n + (x === value), 0);
              }
            if (countInArray(obj2, 7)===0) { //if no Seastars
            const level = parseInt(getCookie('level'))
            const highscore = parseInt(getCookie('highscorelevel'))
            setCookie('level', level+1, 365)
            if (level>highscore) {
            setCookie('highscorelevel', level, 365)
            }
            turnhome(newPos)
            return false
                  }
            return false
        }
        //Spring
        else if (nextGroundTile===7) {
            dispatchMove(direction)
            if (step2GroundTile===0 || step2ObjectsTile===2 || step2ObjectsTile===3 || step2ObjectsTile===4 || step2ObjectsTile===5 || step2ObjectsTile===6 || step2ObjectsTile===7 || step2ObjectsTile===8 || step2ObjectsTile===9 || step2ObjectsTile===10 || step2ObjectsTile===11 || step2ObjectsTile===12 || step2ObjectsTile===12 || step2ObjectsTile===13 || step2ObjectsTile===14 ) {
                return true
            } else {
                return false
            }

        }
        //Box to Box_water
        else if (nextObjectsTile===3 && step2ObjectsTile === 0 && step2GroundTile===0 && !(currentGroundTile === 2 && nextGroundTile!== 2)) {
            const objects = obj.slice() //copy the array
            objects[yto][xto] = 0 //remove at old position
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects
            }})
            const ground = gnd.slice() //copy the array
            ground[ystep2][xstep2] = 3 //add at new position
            store.dispatch({type: 'UPDATE_GROUND', payload: {
                ground,
            }})
            return false

        }
        //Seastar already in water
        else if (nextObjectsTile===7 &&  nextGroundTile===0) {
            return true
        }
        //Throw Seastar in Water
        else if (nextObjectsTile===7 && obj[ystep2][xstep2] === 0 && step2GroundTile===0 && !(currentGroundTile === 2 && nextGroundTile!== 2)) {
            const objects = obj.slice() //copy the array
            objects[yto][xto] = 0 //remove at old position
            objects[ystep2][xstep2] = 7 //add at new position
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects
            }})
            removeseastar(obj,yto,xto,ystep2,xstep2)
            return false

        }
        //move Box
        else if (nextObjectsTile===3 && step2GroundTile!==7 && !(step2GroundTile === 2 && nextGroundTile!== 2) && !(nextGroundTile === 2 && currentGroundTile!== 2) && !(nextGroundTile !== 2 && currentGroundTile=== 2) && obj[ystep2][xstep2] === 0) {
            const objects = obj.slice() //copy the array
            objects[yto][xto] = 0 //remove at old position
            objects[ystep2][xstep2] = 3 //add at new position
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects
            }})
            return false

        }
        //move Seastar
        else if (nextObjectsTile===7 && step2GroundTile!==7  && !(step2GroundTile === 2 && nextGroundTile!== 2) && !(nextGroundTile === 2 && currentGroundTile!== 2) && !(nextGroundTile !== 2 && currentGroundTile=== 2) && obj[ystep2][xstep2] === 0) {
            const objects = obj.slice() //copy the array
            objects[yto][xto] = 0 //remove at old position
            objects[ystep2][xstep2] = 7 //add at new position
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects
            }})
            return false

        }
        //Bottle to Bottle water
        else if (nextObjectsTile===8 && step2GroundTile===4 && !(step2GroundTile === 2 && nextGroundTile!== 2) && !(nextGroundTile === 2 && currentGroundTile!== 2) && !(nextGroundTile !== 2 && currentGroundTile=== 2) && obj[ystep2][xstep2] === 0) {
            const objects = obj.slice() //copy the array
            objects[yto][xto] = 0 //remove at old position
            objects[ystep2][xstep2] = 10 //add at new position
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects
            }})
            return false

        }
        //move Bottle
        else if (nextObjectsTile===8 && step2GroundTile!==7  &&  step2GroundTile!==0 && !(step2GroundTile === 2 && nextGroundTile!== 2) && !(nextGroundTile === 2 && currentGroundTile!== 2) && !(nextGroundTile !== 2 && currentGroundTile=== 2) && obj[ystep2][xstep2] === 0) {
            const objects = obj.slice() //copy the array
            objects[yto][xto] = 0 //remove at old position
            objects[ystep2][xstep2] = 8 //add at new position
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects
            }})
            return false

        }
        //Create Spring
        else if (nextObjectsTile===10 &&  step2GroundTile===6 && !(step2GroundTile === 2 && nextGroundTile!== 2) && !(nextGroundTile === 2 && currentGroundTile!== 2) && !(nextGroundTile !== 2 && currentGroundTile=== 2) && obj[ystep2][xstep2] === 0) {
            const objects = obj.slice() //copy the array
            objects[yto][xto] = 0 //remove at old position
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects
            }})
            const ground = gnd.slice() //copy the array
                    ground[ystep2][xstep2] = 7 //add at new position
                    store.dispatch({type: 'UPDATE_GROUND', payload: {
                        ground
                    }})
            return false

        }
        //move Bottle with water
        else if (nextObjectsTile===10 && step2GroundTile!==7  &&  step2GroundTile!==0 && !(step2GroundTile === 2 && nextGroundTile!== 2) && !(nextGroundTile === 2 && currentGroundTile!== 2) && !(nextGroundTile !== 2 && currentGroundTile=== 2) && obj[ystep2][xstep2] === 0) {
            const objects = obj.slice() //copy the array
            objects[yto][xto] = 0 //remove at old position
            objects[ystep2][xstep2] = 10 //add at new position
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects
            }})
            return false

        }
        //move Figure(s)
        else if (nextObjectsTile===11 || nextObjectsTile===12 || nextObjectsTile===13) {
            if (nextObjectsTile===11 && !checkmovefigure(11)) {
                return false
            }
            if (nextObjectsTile===12 && !checkmovefigure(12)) {
                return false
            }
            if (nextObjectsTile===13 && !checkmovefigure(13)) {
                return false
            }
            return true

        function checkmovefigure(figuretype) {
         if (step2GroundTile!==7  &&  step2GroundTile!==0 && !(step2GroundTile === 2 && nextGroundTile!== 2) && !(nextGroundTile === 2 && currentGroundTile!== 2) && !(nextGroundTile !== 2 && currentGroundTile=== 2) && obj[ystep2][xstep2] === 0) {
            const objects = obj.slice() //copy the array
            let objarr = []
            let i = 0
            for (let y = 0; y < worldheight; y++) { //scroll through world y
                for (let x = 0; x < worldwidth; x++) { //scroll through world x
                    let yobjto= y+ystep2-yto;
                    let xobjto= x+xstep2-xto;
                    let yobjstep2= y+(ystep2-yto)*2;
                    let xobjstep2= x+(xstep2-xto)*2;

                    // prevent bugs for y
                    if (yobjto>worldheight-1 || yobjto<0) {
                        yobjto = y
                        yobjstep2 = y
                    }
                    else if (yobjto>worldheight-2 || yobjto<1) {
                        yobjto = y
                        yobjstep2 = y
                    }

                    // prevent bugs for x
                    if (xobjto>worldwidth-1 || xobjto<0) {
                        xobjto = x
                        xobjstep2 = x
                    }
                    else if (xobjto>worldwidth-2 || xobjto<1) {
                        xobjto = x
                        xobjstep2 = x
                    }

                    const objarr2 = [].concat(...objarr); //check for value in Array
                    function countInArray(array, value) {
                        return array.reduce((n, x) => n + (x === value), 0);
                    }

                    if (objects[y][x] === figuretype // figure of same type found
                        && !(x===xto && y===yto) // not the object that I am directly moving
                        && countInArray(objarr2, x+','+y)===0 // not already moved
                        && (gnd[yobjto][xobjto] === gnd[y][x] || (gnd[yobjto][xobjto] !== 2 && gnd[yobjto][xobjto] !== 0 && gnd[yobjto][xobjto] !==7))) { // appropriate ground
                        if (objects[yobjto][xobjto] === 0) { // no object in way
                            objects[y][x] = 0
                            i++
                            objarr[i] = xobjto+','+yobjto
                            objects[yobjto][xobjto] = figuretype
                        }
                        else if ((objects[yobjto][xobjto] === figuretype) && objects[yobjstep2][xobjstep2] === 0 && (gnd[yobjstep2][xobjstep2] === gnd[y][x] || (gnd[yobjstep2][xobjstep2] !== 2 && gnd[yobjstep2][xobjstep2] !== 0 && gnd[yobjstep2][xobjstep2] !== 7))) {// another figure of same type in way but that can move
                            objects[y][x] = 0
                            i++
                            objarr[i] = xobjto+','+yobjto
                            i++
                            objarr[i] = xobjstep2+','+yobjstep2
                            objects[yobjstep2][xobjstep2] = figuretype
                        }
                            
                    }
                }
            }
            objects[yto][xto] = 0 //remove at old position
            objects[ystep2][xstep2] = figuretype //add at new position
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects
            }})
            return false

            }
            return true
            }
        }

        //move Bomb
        else if (nextObjectsTile===14 && step2GroundTile!==0 && step2GroundTile!==7 && !(step2GroundTile === 2 && nextGroundTile!== 2) && !(nextGroundTile === 2 && currentGroundTile!== 2) && !(nextGroundTile !== 2 && currentGroundTile=== 2) && obj[ystep2][xstep2] === 0) {
            const objects = obj.slice() //copy the array
            objects[yto][xto] = 0 //remove at old position
            objects[ystep2][xstep2] = 14 //add at new position
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects
            }})
            return false

        }
        //trigger explosion
        else if (nextGroundTile===11 && obj[yto][xto] === 0) {
            const ground = gnd.slice() //copy the array
            ground[yto][xto] = 1 //remove at old position
            store.dispatch({type: 'UPDATE_GROUND', payload: {
                ground
            }})
            explode(obj)
            return false

        }
        
        //Box | seastar | bottle | bomb: cannot go
        else if (nextObjectsTile===3 || nextObjectsTile===7 || nextObjectsTile===8 || nextObjectsTile===10 || nextObjectsTile===14) {
            return true

        }
        //Static element: cannot go
        else if (nextGroundTile === 0 || ((nextGroundTile=== 2 && currentGroundTile!== 2) || (nextObjectsTile=== 2 && rotation!== 0) || (currentObjectsTile=== 2 && rotation!== 180) || nextObjectsTile===4 || nextObjectsTile===5 || nextObjectsTile===6 )) {
            return true;
        } else { // can go
            return false;
        }
        

    }
    function getCookie(cookieName) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for(let i = 0; i <cookieArray.length; i++) {
          let cookie = cookieArray[i];
          while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
          }
          if (cookie.indexOf(name) === 0) {
            return cookie.substring(name.length, cookie.length);
          }
        }
        return "";
      }

    function setCookie(cookieName, cvalue, exdays) {
        let date = new Date();
        date.setTime(date.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ date.toUTCString();
        document.cookie = cookieName + "=" + cvalue + ";" + expires + ";path=/";
      }

    function removeseastar(obj,yto,xto,ystep2,xstep2) {
        setTimeout(() => {  const objects = obj.slice() //copy the array
            objects[yto][xto] = 0 //remove at old position
            objects[ystep2][xstep2] = 0 //remove at old position
            store.dispatch({type: 'MOVE_OBJECTS', payload: {
                objects
            }})
         }, 100);
        
    }

    function explode(obj) {
        const objects = obj.slice()
        for (let y = 0; y < worldheight; y++) { //scroll through world y
            for (let x = 0; x < worldwidth; x++) { //scroll through world x
                if (objects[y][x]===14) {
                    setTimeout(() => {  const objects = obj.slice() //copy the array
                        objects[y][x] = 15 //remove at old position
                        store.dispatch({type: 'MOVE_OBJECTS', payload: {
                            objects
                        }})
                     }, 50);
                     setTimeout(() => {  const objects = obj.slice() //copy the array
                        objects[y][x] = 0 //remove at old position
                        store.dispatch({type: 'MOVE_OBJECTS', payload: {
                            objects
                        }})
                     }, 250);
                     if (y>0) {
                         if (objects[y-1][x]===0 || objects[y-1][x]===4) {
                            setTimeout(() => {  const objects = obj.slice() //copy the array
                                objects[y-1][x] = 15 //remove at old position
                                store.dispatch({type: 'MOVE_OBJECTS', payload: {
                                    objects
                                }})
                             }, 300);
                            setTimeout(() => {  const objects = obj.slice() //copy the array
                                objects[y-1][x] = 0 //remove at old position
                                store.dispatch({type: 'MOVE_OBJECTS', payload: {
                                    objects
                                }})
                             }, 400);
                            }
                        }
                    if (x<worldwidth) {
                        if (objects[y][x+1]===0 || objects[y][x+1]===4) {
                            setTimeout(() => {  const objects = obj.slice() //copy the array
                                objects[y][x+1] = 15 //remove at old position
                                store.dispatch({type: 'MOVE_OBJECTS', payload: {
                                    objects
                                }})
                             }, 450);
                            setTimeout(() => {  const objects = obj.slice() //copy the array
                                objects[y][x+1] = 0 //remove at old position
                                store.dispatch({type: 'MOVE_OBJECTS', payload: {
                                    objects
                                }})
                             }, 650);
                         }
                     }
                     if (y<worldheight-1) {
                        if (objects[y+1][x]===0 || objects[y+1][x]===4) {
                            setTimeout(() => {  const objects = obj.slice() //copy the array
                                objects[y+1][x] = 15 //remove at old position
                                store.dispatch({type: 'MOVE_OBJECTS', payload: {
                                    objects
                                }})
                             }, 700);
                            setTimeout(() => {  const objects = obj.slice() //copy the array
                                objects[y+1][x] = 0 //remove at old position
                                store.dispatch({type: 'MOVE_OBJECTS', payload: {
                                    objects
                                }})
                             }, 900);
                         }
                     }
                     if (x>0) {
                        if (objects[y][x-1]===0 || objects[y][x-1]===4) {
                            setTimeout(() => {  const objects = obj.slice() //copy the array
                                objects[y][x-1] = 15 //remove at old position
                                store.dispatch({type: 'MOVE_OBJECTS', payload: {
                                    objects
                                }})
                             }, 950);
                            setTimeout(() => {  const objects = obj.slice() //copy the array
                                objects[y][x-1] = 0 //remove at old position
                                store.dispatch({type: 'MOVE_OBJECTS', payload: {
                                    objects
                                }})
                             }, 1150);
                         }
                     }
                }


            }
        }
        
    }

    function turnhome(newPos) {
        let rotation = 0
        for (let i = 0; i < 1440; i++) { //two turns
            setTimeout(() => {
                let newrotation = rotation+i*0.5;
                store.dispatch({
                type: 'MOVE_PUSHY',
                payload: {
                    position: newPos,
                    rotation: newrotation,
                }
            });
             }, i/1.44);
          }
          setTimeout(() => { window.location.reload()
         }, 1000);
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
            default:
                return 0
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
        if (e.keyCode!==122 && e.keyCode!==123) {
            e.preventDefault()
        }
        switch(e.keyCode) {
            case 27:
                setCookie('mode', 'menu', 365);
                window.location.reload();
                return
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

    // keyboard moves
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })

    // touch moves
    window.addEventListener("touchstart", startTouch, false)
        document.addEventListener("touchmove", moveTouch, false);

    // Swipe Up / Down / Left / Right
  let initialX = null;
  let initialY = null;

  function startTouch(e) {
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  };

  function moveTouch(e) {
    if (initialX === null) {
      return;
    }

    if (initialY === null) {
      return;
    }

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    const diffX = initialX - currentX;
    const diffY = initialY - currentY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      // sliding horizontally
      if (diffX > 5) {
        // swiped left
        e.preventDefault();
        tryMove('left')
      } else if (diffX < -5) {
        // swiped right
        e.preventDefault();
        tryMove('right')
      }  
    } else {
      // sliding vertically
      if (diffY > 5) {
        // swiped up
        e.preventDefault();
        tryMove('up')
      } else if (diffY < -5) {
        // swiped down
        e.preventDefault();
        tryMove('down')
      }  
    }

    initialX = null;
    initialY = null;
  };
    

    return player
}