export const scale = 7.5
export const worldheight = 12
export const worldwidth = 20
export const maxlevel = 12

export function screenratio() {
    if (window.innerWidth/window.innerHeight<0.63) {
        return 0.3
    }
    else if (window.innerWidth/window.innerHeight<0.77) {
        return 0.4
    }
    else if (window.innerWidth/window.innerHeight<0.91) {
        return 0.5
    }
    else if (window.innerWidth/window.innerHeight<1.06) {
        return 0.6
    }
    else if (window.innerWidth/window.innerHeight<1.2) {
        return 0.7
    }
    else if (window.innerWidth/window.innerHeight<1.35) {
        return 0.8
    }
    else if (window.innerWidth/window.innerHeight<1.5) {
        return 0.9
    }
    else {
        return 1
    }
}