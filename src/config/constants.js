export const scale = 7.5
export const worldheight = 12
export const worldwidth = 20
export const maxlevel = 21

// level imports
export const levels = {
    level1 : require('../levels/PushyIsland/1'),
    level2 : require('../levels/PushyIsland/2'),
    level3 : require('../levels/PushyIsland/3'),
    level4 : require('../levels/PushyIsland/4'),
    level5 : require('../levels/PushyIsland/5'),
    level6 : require('../levels/PushyIsland/6'),
    level7 : require('../levels/PushyIsland/7'),
    level8 : require('../levels/PushyIsland/8'),
    level9 : require('../levels/PushyIsland/9'),
    level10 : require('../levels/PushyIsland/10'),
    level11 : require('../levels/PushyIsland/11'),
    level12 : require('../levels/PushyIsland/12'),
    level13 : require('../levels/PushyIsland/13'),
    level14 : require('../levels/PushyIsland/14'),
    level15 : require('../levels/PushyIsland/15'),
    level16 : require('../levels/PushyIsland/16'),
    level17 : require('../levels/PushyIsland/17'),
    level18 : require('../levels/PushyIsland/18'),
    level19 : require('../levels/PushyIsland/19'),
    level20 : require('../levels/PushyIsland/20'),
    level21 : require('../levels/PushyIsland/21')
}

export function screenratio() {
    let mobileAdapt = 1
    let mobileAdaptSmall = 1
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        mobileAdapt = 0.8
        mobileAdaptSmall = 0.7
       }
    if (window.innerWidth/window.innerHeight<0.63) {
        return 0.3*mobileAdapt
    }
    else if (window.innerWidth/window.innerHeight<0.77) {
        return 0.4*mobileAdapt
    }
    else if (window.innerWidth/window.innerHeight<0.91) {
        return 0.5*mobileAdapt
    }
    else if (window.innerWidth/window.innerHeight<1.06) {
        return 0.6*mobileAdapt
    }
    else if (window.innerWidth/window.innerHeight<1.2) {
        return 0.7*mobileAdapt
    }
    else if (window.innerWidth/window.innerHeight<1.35) {
        return 0.8*mobileAdaptSmall
    }
    else if (window.innerWidth/window.innerHeight<1.5) {
        return 0.9*mobileAdaptSmall
    }
    else {
        return 1*mobileAdapt
    }
}
export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

export function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }