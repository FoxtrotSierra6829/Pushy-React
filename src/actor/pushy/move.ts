import store from '../../config/store';
import { groundType, objectType, worldHeight } from '../../config/constants';
import { worldWidth } from '../../config/constants';
import { actionTypes } from '../../config/types';

const handleMovement = (player: any) => {

    const getNewPosition = (direction: string) => {
        const oldPosition = store.getState().pushy.position;
        switch (direction) {
            case 'left':
                if (oldPosition[0] - 1 >= 1) {
                    return [oldPosition[0] - 1, oldPosition[1]];
                } else {
                    return [oldPosition[0], oldPosition[1]];
                }
            case 'right':
                if (oldPosition[0] + 1 <= worldWidth) {
                    return [oldPosition[0] + 1, oldPosition[1]];
                } else {
                    return [oldPosition[0], oldPosition[1]];
                }
            case 'up':
                if (oldPosition[1] - 1 >= 1) {
                    return [oldPosition[0], oldPosition[1] - 1];
                } else {
                    return [oldPosition[0], oldPosition[1]];
                }
            case 'down':
                if (oldPosition[1] + 1 <= worldHeight) {
                    return [oldPosition[0], oldPosition[1] + 1];
                } else {
                    return [oldPosition[0], oldPosition[1]];
                }
            default:
                return [oldPosition[0], oldPosition[1]];
        }
    };

    const isObstacleAhead = (newPos: number[], direction: string) => {
        const oldPosition = store.getState().pushy.position;
        const rotation = getRotation(direction);
        const gnd = store.getState().ground;
        const obj = store.getState().objects;
        const yto = newPos[1] - 1;
        const xto = newPos[0] - 1;
        let ystep2 = 0;
        if (yto === worldHeight - 1 || yto === 0) {
            ystep2 = yto;
        } else {
            ystep2 = oldPosition[1] + (oldPosition[1] - newPos[1]) * (-2) - 1;
        }
        let xstep2 = 0;
        if (xto === worldWidth - 1 || xto === 0) {
            xstep2 = xto;
        } else {
            xstep2 = oldPosition[0] + (oldPosition[0] - newPos[0]) * (-2) - 1;
        }
        const yfrom = oldPosition[1] - 1;
        const xfrom = oldPosition[0] - 1;
        const nextGroundTile = gnd[yto][xto];
        const nextObjectsTile = obj[yto][xto];
        const step2ObjectsTile = obj[ystep2][xstep2];
        const step2GroundTile = gnd[ystep2][xstep2];
        const currentGroundTile = gnd[yfrom][xfrom];
        const currentObjectsTile = obj[yfrom][xfrom];
        //Bean ahead
        if (nextObjectsTile === objectType.bean) {
            const objects = obj.slice(); //copy the array
            objects[yto][xto] = objectType.none; //remove at old position
            store.dispatch({ type: actionTypes.moveObjects, payload: objects });
            store.dispatch({ type: actionTypes.updateBeanCount, payload: {
                count: store.getState().bean.count + 1,
            } });
        }
        if (nextGroundTile === groundType.sandHole) {
            if (store.getState().bean.count > 0) {
                const ground = gnd.slice(); //copy the array
                ground[yto][xto] = groundType.sandHoleWithBean; //add at new position
                store.dispatch({ type: actionTypes.updateGround, payload: ground });
                store.dispatch({ type: actionTypes.updateBeanCount, payload: {
                    count: store.getState().bean.count - 1,
                } });
            }
        }
        //In House
        if (nextObjectsTile === objectType.house && rotation === 0) {
            const objects = obj.slice(); //copy the array
            const ground = gnd.slice(); //copy the array
            for (let y = 0; y < worldHeight; y++) { //scroll through world y
                for (let x = 0; x < worldWidth; x++) { //scroll through world x
                    if (objects[y][x] === objectType.figureRed && ground[y][x] !== groundType.crossRed) { // when figure red and not red cross below
                        return false;
                    }
                    if (objects[y][x] === objectType.figureBlue && ground[y][x] !== groundType.crossBlue) { // when figure blue and not blue cross below
                        return false;
                    }
                    if (objects[y][x] === objectType.figureGreen && ground[y][x] !== groundType.crossGreen) { // when figure green and not green cross below
                        return false;
                    }
                }
            }
            const obj2 = [] as number[][];
            obj2.concat(...objects);
            const countInArray = (array: any, value: number) => {
                return array.reduce((n: any, x: number) => n + (x === value), 0);
            };
            if (countInArray(obj2, objectType.seastar) === 0) { //if no Seastars
                const level = parseInt(getCookie('level'));
                const highscore = parseInt(getCookie('highscorelevel'));
                setCookie('level', level + 1, 365);
                if (level > highscore) {
                    setCookie('highscorelevel', level, 365);
                }
                turnHome(newPos);
                return false;
            }
            return false;

        //Spring
        } else if (nextGroundTile === groundType.spring) {
            dispatchMove(direction);
            if (step2GroundTile === groundType.water || step2ObjectsTile !== objectType.none) {
                return true;
            } else {
                return false;
            }

        //Box to Box_water
        } else if (nextObjectsTile === objectType.box && step2ObjectsTile === objectType.none && step2GroundTile === groundType.water && !(currentGroundTile === groundType.grass && nextGroundTile !== groundType.grass)) {
            const objects = obj.slice(); //copy the array
            objects[yto][xto] = objectType.none; //remove at old position
            store.dispatch({ type: actionTypes.moveObjects, payload: objects });
            const ground = gnd.slice(); //copy the array
            ground[ystep2][xstep2] = groundType.boxInWater; //add at new position
            store.dispatch({ type: actionTypes.updateGround, payload: ground });
            return false;

        //Seastar already in water
        } else if (nextObjectsTile === objectType.seastar && nextGroundTile === groundType.water) {
            return true;

        //Throw Seastar in Water
        } else if (nextObjectsTile === objectType.seastar && obj[ystep2][xstep2] === objectType.none && step2GroundTile === groundType.water && !(currentGroundTile === groundType.grass && nextGroundTile !== groundType.grass)) {
            const objects = obj.slice(); //copy the array
            objects[yto][xto] = objectType.none; //remove at old position
            objects[ystep2][xstep2] = objectType.seastar; //add at new position
            store.dispatch({ type: actionTypes.moveObjects, payload: objects });
            removeseastar(obj,yto,xto,ystep2,xstep2);
            return false;

        //move Box
        } else if (nextObjectsTile === objectType.box && step2GroundTile !== groundType.spring && !(step2GroundTile === groundType.grass && nextGroundTile !== groundType.grass) && !(nextGroundTile === groundType.grass && currentGroundTile !== groundType.grass) && !(nextGroundTile !== groundType.grass && currentGroundTile === groundType.grass) && obj[ystep2][xstep2] === objectType.none) {
            const objects = obj.slice(); //copy the array
            objects[yto][xto] = objectType.none; //remove at old position
            objects[ystep2][xstep2] = objectType.box; //add at new position
            store.dispatch({ type: actionTypes.moveObjects, payload: objects });
            return false;

        //move Seastar
        } else if (nextObjectsTile === objectType.seastar && step2GroundTile !== objectType.seastar && !(step2GroundTile === groundType.grass && nextGroundTile !== groundType.grass) && !(nextGroundTile === groundType.grass && currentGroundTile !== groundType.grass) && !(nextGroundTile !== groundType.grass && currentGroundTile === groundType.grass) && obj[ystep2][xstep2] === objectType.none) {
            const objects = obj.slice(); //copy the array
            objects[yto][xto] = objectType.none; //remove at old position
            objects[ystep2][xstep2] = objectType.seastar; //add at new position
            store.dispatch({ type: actionTypes.moveObjects, payload: objects });
            return false;

        //Bottle to Bottle water
        } else if (nextObjectsTile === objectType.bottle && step2GroundTile === groundType.waterHole && !(step2GroundTile === groundType.grass && nextGroundTile !== groundType.grass) && !(nextGroundTile === groundType.grass && currentGroundTile !== groundType.grass) && !(nextGroundTile !== groundType.grass && currentGroundTile === groundType.grass) && obj[ystep2][xstep2] === objectType.none) {
            const objects = obj.slice(); //copy the array
            objects[yto][xto] = objectType.none; //remove at old position
            objects[ystep2][xstep2] = objectType.bottleWater; //add at new position
            store.dispatch({ type: actionTypes.moveObjects, payload: objects });
            return false;

        //move Bottle
        } else if (nextObjectsTile === objectType.bottle && step2GroundTile !== groundType.spring && step2GroundTile !== groundType.water && !(step2GroundTile === groundType.grass && nextGroundTile !== groundType.grass) && !(nextGroundTile === groundType.grass && currentGroundTile !== groundType.grass) && !(nextGroundTile !== groundType.grass && currentGroundTile === groundType.grass) && obj[ystep2][xstep2] === objectType.none) {
            const objects = obj.slice(); //copy the array
            objects[yto][xto] = 0; //remove at old position
            objects[ystep2][xstep2] = 8; //add at new position
            store.dispatch({ type: actionTypes.moveObjects, payload: objects });
            return false;

        //Create Spring
        } else if (nextObjectsTile === objectType.bottleWater && step2GroundTile === groundType.sandHoleWithBean && !(step2GroundTile === groundType.grass && nextGroundTile !== groundType.grass) && !(nextGroundTile === groundType.grass && currentGroundTile !== groundType.grass) && !(nextGroundTile !== groundType.grass && currentGroundTile === groundType.grass) && obj[ystep2][xstep2] === objectType.none) {
            const objects = obj.slice(); //copy the array
            objects[yto][xto] = 0; //remove at old position
            store.dispatch({ type: actionTypes.moveObjects, payload: objects });
            const ground = gnd.slice(); //copy the array
            ground[ystep2][xstep2] = 7; //add at new position
            store.dispatch({ type: actionTypes.updateGround, payload: ground });
            return false;

        //move Bottle with water
        } else if (nextObjectsTile === objectType.bottleWater && step2GroundTile !== groundType.spring && step2GroundTile !== groundType.water && !(step2GroundTile === groundType.grass && nextGroundTile !== groundType.grass) && !(nextGroundTile === groundType.grass && currentGroundTile !== groundType.grass) && !(nextGroundTile !== groundType.grass && currentGroundTile === groundType.grass) && obj[ystep2][xstep2] === objectType.none) {
            const objects = obj.slice(); //copy the array
            objects[yto][xto] = objectType.none; //remove at old position
            objects[ystep2][xstep2] = objectType.bottleWater; //add at new position
            store.dispatch({ type: actionTypes.moveObjects, payload: objects });
            return false;

        //move Figure(s)
        } else if (nextObjectsTile === objectType.figureRed || nextObjectsTile === objectType.figureBlue || nextObjectsTile === objectType.figureGreen) {
            const checkmovefigure = (figuretype: number) => {
                if (step2GroundTile !== groundType.spring && step2GroundTile !== groundType.water && !(step2GroundTile === groundType.grass && nextGroundTile !== groundType.grass) && !(nextGroundTile === groundType.grass && currentGroundTile !== groundType.grass) && !(nextGroundTile !== groundType.grass && currentGroundTile === groundType.grass) && obj[ystep2][xstep2] === objectType.none) {
                    const objects = obj.slice(); //copy the array
                    const objarr: any[] = [];
                    let i = 0;
                    for (let y = 0; y < worldHeight; y++) { //scroll through world y
                        for (let x = 0; x < worldWidth; x++) { //scroll through world x
                            let yobjto = y + ystep2 - yto;
                            let xobjto = x + xstep2 - xto;
                            let yobjstep2 = y + (ystep2 - yto) * 2;
                            let xobjstep2 = x + (xstep2 - xto) * 2;

                            // prevent bugs for y
                            if (yobjto > worldHeight - 1 || yobjto < 0) {
                                yobjto = y;
                                yobjstep2 = y;
                            } else if (yobjto > worldHeight - 2 || yobjto < 1) {
                                yobjto = y;
                                yobjstep2 = y;
                            }

                            // prevent bugs for x
                            if (xobjto > worldWidth - 1 || xobjto < 0) {
                                xobjto = x;
                                xobjstep2 = x;
                            } else if (xobjto > worldWidth - 2 || xobjto < 1) {
                                xobjto = x;
                                xobjstep2 = x;
                            }

                            const objarr2: any[] = [].concat(...objarr); //check for value in Array
                            const countInArray = (array: any, value: string) => {
                                return array.reduce((n: any, x: string) => n + (x === value), 0);
                            };

                            if (objects[y][x] === figuretype // figure of same type found
                            && !(x === xto && y === yto) // not the object that I am directly moving
                            && countInArray(objarr2, x + ',' + y) === 0 // not already moved
                            && (gnd[yobjto][xobjto] === gnd[y][x] || (gnd[yobjto][xobjto] !== groundType.grass && gnd[yobjto][xobjto] !== groundType.water && gnd[yobjto][xobjto] !== groundType.spring))) { // appropriate ground
                                if (objects[yobjto][xobjto] === objectType.none) { // no object in way
                                    objects[y][x] = objectType.none;
                                    i++;
                                    objarr[i] = xobjto + ',' + yobjto;
                                    objects[yobjto][xobjto] = figuretype;
                                } else if ((objects[yobjto][xobjto] === figuretype) && objects[yobjstep2][xobjstep2] === objectType.none && (gnd[yobjstep2][xobjstep2] === gnd[y][x] || (gnd[yobjstep2][xobjstep2] !== groundType.grass && gnd[yobjstep2][xobjstep2] !== groundType.water && gnd[yobjstep2][xobjstep2] !== groundType.spring))) {// another figure of same type in way but that can move
                                    objects[y][x] = objectType.none;
                                    i++;
                                    objarr[i] = xobjto + ',' + yobjto;
                                    i++;
                                    objarr[i] = xobjstep2 + ',' + yobjstep2;
                                    objects[yobjstep2][xobjstep2] = figuretype;
                                }

                            }
                        }
                    }
                    objects[yto][xto] = objectType.none; //remove at old position
                    objects[ystep2][xstep2] = figuretype; //add at new position
                    store.dispatch({ type: actionTypes.moveObjects, payload: objects });
                    return false;

                }
                return true;
            };
            if (nextObjectsTile === objectType.figureRed && !checkmovefigure(objectType.figureRed)) {
                return false;
            }
            if (nextObjectsTile === objectType.figureBlue && !checkmovefigure(objectType.figureBlue)) {
                return false;
            }
            if (nextObjectsTile === objectType.figureGreen && !checkmovefigure(objectType.figureGreen)) {
                return false;
            }
            return true;

        //move Bomb
        } else if (nextObjectsTile === objectType.bomb && step2GroundTile !== groundType.water && step2GroundTile !== groundType.spring && !(step2GroundTile === groundType.grass && nextGroundTile !== groundType.grass) && !(nextGroundTile === groundType.grass && currentGroundTile !== groundType.grass) && !(nextGroundTile !== groundType.grass && currentGroundTile === groundType.grass) && obj[ystep2][xstep2] === objectType.none) {
            const objects = obj.slice(); //copy the array
            objects[yto][xto] = objectType.none; //remove at old position
            objects[ystep2][xstep2] = objectType.bomb; //add at new position
            store.dispatch({ type: actionTypes.moveObjects, payload: objects });
            return false;

        //trigger explosion
        } else if (nextGroundTile === groundType.bombTrigger && obj[yto][xto] === objectType.none) {
            const ground = gnd.slice(); //copy the array
            ground[yto][xto] = groundType.sand; //remove at old position
            store.dispatch({ type: actionTypes.updateGround, payload: ground });
            explode(obj);
            return false;

        //Box | seastar | bottle | bomb: cannot go
        } else if (nextObjectsTile === objectType.box || nextObjectsTile === objectType.seastar || nextObjectsTile === objectType.bottle || nextObjectsTile === objectType.bottleWater || nextObjectsTile === objectType.bomb) {
            return true;

        //Static element: cannot go
        } else if (nextGroundTile === groundType.water || ((nextGroundTile === groundType.grass && currentGroundTile !== groundType.grass) || (nextObjectsTile === objectType.house && rotation !== 0) || (currentObjectsTile === objectType.house && rotation !== 180) || nextObjectsTile === objectType.stone || nextObjectsTile === objectType.palmLeft || nextObjectsTile === objectType.palmRight)) {
            return true;
        } else { // can go
            return false;
        }

    };
    const getCookie = (cookieName: string) => {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    };

    const setCookie = (cookieName: string, cvalue: number | string, exdays: number) => {
        const date = new Date();
        date.setTime(date.getTime() + (exdays * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = cookieName + "=" + cvalue + ";" + expires + ";path=/";
    };

    const removeseastar = (obj: number[][],yto: number,xto: number,ystep2: number,xstep2: number) => {
        setTimeout(() => {
            const objects = obj.slice(); //copy the array
            objects[yto][xto] = 0; //remove at old position
            objects[ystep2][xstep2] = 0; //remove at old position
            store.dispatch({ type: actionTypes.moveObjects, payload: objects });
        }, 100);

    };

    const explode = (obj: number[][]) => {
        const objects = obj.slice();
        for (let y = 0; y < worldHeight; y++) { //scroll through world y
            for (let x = 0; x < worldWidth; x++) { //scroll through world x
                if (objects[y][x] === 14) {
                    setTimeout(() => {
                        const objects = obj.slice(); //copy the array
                        objects[y][x] = 15; //remove at old position
                        store.dispatch({ type: actionTypes.moveObjects, payload: objects });
                    }, 50);
                    setTimeout(() => {
                        const objects = obj.slice(); //copy the array
                        objects[y][x] = 0; //remove at old position
                        store.dispatch({ type: actionTypes.moveObjects, payload: objects });
                    }, 250);
                    if (y > 0) {
                        if (objects[y - 1][x] === 0 || objects[y - 1][x] === 4) {
                            setTimeout(() => {
                                const objects = obj.slice(); //copy the array
                                objects[y - 1][x] = 15; //remove at old position
                                store.dispatch({ type: actionTypes.moveObjects, payload: objects });
                            }, 300);
                            setTimeout(() => {
                                const objects = obj.slice(); //copy the array
                                objects[y - 1][x] = 0; //remove at old position
                                store.dispatch({ type: actionTypes.moveObjects, payload: objects });
                            }, 400);
                        }
                    }
                    if (x < worldWidth) {
                        if (objects[y][x + 1] === 0 || objects[y][x + 1] === 4) {
                            setTimeout(() => {
                                const objects = obj.slice(); //copy the array
                                objects[y][x + 1] = 15; //remove at old position
                                store.dispatch({ type: actionTypes.moveObjects, payload: objects });
                            }, 450);
                            setTimeout(() => {
                                const objects = obj.slice(); //copy the array
                                objects[y][x + 1] = 0; //remove at old position
                                store.dispatch({ type: actionTypes.moveObjects, payload: objects });
                            }, 650);
                        }
                    }
                    if (y < worldHeight - 1) {
                        if (objects[y + 1][x] === 0 || objects[y + 1][x] === 4) {
                            setTimeout(() => {
                                const objects = obj.slice(); //copy the array
                                objects[y + 1][x] = 15; //remove at old position
                                store.dispatch({ type: actionTypes.moveObjects, payload: objects });
                            }, 700);
                            setTimeout(() => {
                                const objects = obj.slice(); //copy the array
                                objects[y + 1][x] = 0; //remove at old position
                                store.dispatch({ type: actionTypes.moveObjects, payload: objects });
                            }, 900);
                        }
                    }
                    if (x > 0) {
                        if (objects[y][x - 1] === 0 || objects[y][x - 1] === 4) {
                            setTimeout(() => {
                                const objects = obj.slice(); //copy the array
                                objects[y][x - 1] = 15; //remove at old position
                                store.dispatch({ type: actionTypes.moveObjects, payload: objects });
                            }, 950);
                            setTimeout(() => {
                                const objects = obj.slice(); //copy the array
                                objects[y][x - 1] = 0; //remove at old position
                                store.dispatch({ type: actionTypes.moveObjects, payload: objects });
                            }, 1150);
                        }
                    }
                }

            }
        }

    };

    const turnHome = (newPos: number[]) => {
        const rotation = 0;
        for (let i = 0; i < 1440; i++) { //two turns
            setTimeout(() => {
                const newrotation = rotation + i * 0.5;
                store.dispatch({
                    type: actionTypes.movePushy,
                    payload: {
                        position: newPos,
                        rotation: newrotation,
                    }
                });
            }, i / 1.44);
        }
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };
    const getRotation = (rotation: string) => {
        switch (rotation) {
            case 'left':
                return -90;
            case 'right':
                return 90;
            case 'up':
                return 0;
            case 'down':
                return 180;
            default:
                return 0;
        }

    };
    const tryMove = (direction: string) => {
        const newPos = getNewPosition(direction);
        const obstacle = isObstacleAhead(newPos, direction);
        if (obstacle === false) {
            dispatchMove(direction);
        } else {
            doNotDispatchMove(direction);
        }

    };
    const dispatchMove = (direction: string) => {
        store.dispatch({
            type: actionTypes.movePushy,
            payload: {
                position: getNewPosition(direction),
                rotation: getRotation(direction),
            }
        });
    };

    const doNotDispatchMove = (direction: string) => {
        store.dispatch({
            type: actionTypes.movePushy,
            payload: {
                position: store.getState().pushy.position,
                rotation: getRotation(direction),
            }
        });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key !== 'F11' && e.key !== 'F12') {
            e.preventDefault();
        }
        switch (e.key) {
            case 'Escape':
                setCookie('mode', 'menu', 365);
                window.location.reload();
                return;
            case 'ArrowLeft':
            case 'A':
            case 'a':
                return tryMove('left');
            case 'ArrowUp':
            case 'W':
            case 'w':
                return tryMove('up');
            case 'ArrowRight':
            case 'D':
            case 'd':
                return tryMove('right');
            case 'ArrowDown':
            case 'S':
            case 's':
                return tryMove('down');

            default:
                console.log(e.key + ' key pressed');
        }
    };
    // Swipe Up / Down / Left / Right
    let initialX: number | null = null;
    let initialY: number | null = null;

    const startTouch = (e: any) => {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
    };

    const moveTouch = (e: any) => {
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
                tryMove('left');
            } else if (diffX < -5) {
                // swiped right
                e.preventDefault();
                tryMove('right');
            }
        } else {
            // sliding vertically
            if (diffY > 5) {
                // swiped up
                e.preventDefault();
                tryMove('up');
            } else if (diffY < -5) {
                // swiped down
                e.preventDefault();
                tryMove('down');
            }
        }

        initialX = null;
        initialY = null;
    };

    // keyboard moves
    window.addEventListener('keydown', (e) => {
        handleKeyDown(e);
    });

    // touch moves
    window.addEventListener("touchstart", startTouch, false);
    document.addEventListener("touchmove", moveTouch, false);

    return player;
};
export default handleMovement;
