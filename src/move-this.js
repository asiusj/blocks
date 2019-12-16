export default class MoveThis {
    constructor(target, left, top) {
        this.mf = this.moveThis.bind(this, target, left, top)
        this.gf = this.grabThis.bind(this, target, left, top)
        document.addEventListener("mousemove", this.mf)
        document.addEventListener("touchmove", this.gf)
    }

    moveThis(target, left, top, e) {
        target.style.left = e.clientX - left/2 + 'px';
        target.style.top = e.clientY - top/2 + 'px';
    }

    grabThis(target, left, top, e) {
        target.style.left = e.touches[e.touches.length - 1].clientX - left/2 + 'px';
        target.style.top = e.touches[e.touches.length - 1].clientY - top/2 + 'px';
    }

    cancelListener() {
        document.removeEventListener("mousemove", this.mf)
        
    }
    cancelTouchListener() {
        document.removeEventListener("touchmove", this.gf)
    }
}