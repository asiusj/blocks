export default class MoveThis {
    constructor(target, left, top) {
        this.mf = this.moveThis.bind(this, target, left, top)
        document.addEventListener("mousemove", this.mf)
    }

    moveThis(target, left, top, e) {
        target.style.left = e.clientX - left/2 + 'px';
        target.style.top = e.clientY - top/2 + 'px';
    }

    cancelListener() {
        document.removeEventListener("mousemove", this.mf)
    }
}