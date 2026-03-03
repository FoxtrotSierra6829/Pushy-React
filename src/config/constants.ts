import { levelType } from "./types";

// Level imports
import * as level1 from '../levels/PushyIsland/1';
import * as level2 from '../levels/PushyIsland/2';
import * as level3 from '../levels/PushyIsland/3';
import * as level4 from '../levels/PushyIsland/4';
import * as level5 from '../levels/PushyIsland/5';
import * as level6 from '../levels/PushyIsland/6';
import * as level7 from '../levels/PushyIsland/7';
import * as level8 from '../levels/PushyIsland/8';
import * as level9 from '../levels/PushyIsland/9';
import * as level10 from '../levels/PushyIsland/10';
import * as level11 from '../levels/PushyIsland/11';
import * as level12 from '../levels/PushyIsland/12';
import * as level13 from '../levels/PushyIsland/13';
import * as level14 from '../levels/PushyIsland/14';
import * as level15 from '../levels/PushyIsland/15';
import * as level16 from '../levels/PushyIsland/16';
import * as level17 from '../levels/PushyIsland/17';
import * as level18 from '../levels/PushyIsland/18';
import * as level19 from '../levels/PushyIsland/19';
import * as level20 from '../levels/PushyIsland/20';
import * as level21 from '../levels/PushyIsland/21';

export const scale = 7.5;
export const worldHeight = 12;
export const worldWidth = 20;

// level imports
export const levels: Record<string,levelType> = {
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7,
    level8,
    level9,
    level10,
    level11,
    level12,
    level13,
    level14,
    level15,
    level16,
    level17,
    level18,
    level19,
    level20,
    level21
};

export const maxLevel = Object.keys(levels).length;

export const screenRatio = () => {
    let mobileAdapt = 1;
    let mobileAdaptSmall = 1;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        mobileAdapt = 0.8;
        mobileAdaptSmall = 0.7;
    }
    if (window.innerWidth / window.innerHeight < 0.63) {
        return 0.3 * mobileAdapt;
    } else if (window.innerWidth / window.innerHeight < 0.77) {
        return 0.4 * mobileAdapt;
    } else if (window.innerWidth / window.innerHeight < 0.91) {
        return 0.5 * mobileAdapt;
    } else if (window.innerWidth / window.innerHeight < 1.06) {
        return 0.6 * mobileAdapt;
    } else if (window.innerWidth / window.innerHeight < 1.2) {
        return 0.7 * mobileAdapt;
    } else if (window.innerWidth / window.innerHeight < 1.35) {
        return 0.8 * mobileAdaptSmall;
    } else if (window.innerWidth / window.innerHeight < 1.5) {
        return 0.9 * mobileAdaptSmall;
    } else {
        return 1 * mobileAdapt;
    }
};
export const getCookie = (cookieName: string) => {
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

export const setCookie = (cookieName: string, cookieValue: string | number, expiryDays: number) => {
    const date = new Date();
    date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
};

export enum groundType {
    water,
    sand,
    grass,
    boxInWater,
    waterHole,
    sandHole,
    sandHoleWithBean,
    spring,
    crossRed,
    crossBlue,
    crossGreen,
    bombTrigger,
}

export enum objectType {
    none,
    pushy,
    house,
    box,
    stone,
    palmLeft,
    palmRight,
    seastar,
    bottle,
    bean,
    bottleWater,
    figureRed,
    figureBlue,
    figureGreen,
    bomb,
    explosion,
}
