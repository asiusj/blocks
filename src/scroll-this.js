export default class ScrollThis {
    constructor(target, body) {
        this.target = target
        this.body = body
        this.active = false
        this.init(this.target)
        this.target.style.left = '0px'
        this.mouseDownPoint = null
        this.targetScrollStartPoint = null
    }

    init(target) {
        target.addEventListener("mouseover", () => {
            var e = event.toElement || event.relatedTarget;
            if (e.parentNode == this.target || e == this.target) {
                return;
            }
            this.active = true;
        }, true)
        target.addEventListener("mouseout", () => {
            var e = event.toElement || event.relatedTarget;
            if (e.parentNode == this.target || e == this.target) {
                return;
            }
            this.active = false;
        }, true)
        target.addEventListener("wheel", (event) => {
            this.scrollThis(event)
        }, true)
        target.addEventListener("mousedown", (event) => {
            this.targetScrollStartPoint = this.target.scrollLeft
            this.mouseDownPoint = event.clientX
            this.bindMouseMoveListener()
        }, true)
        document.addEventListener("mouseup", () => {
            this.unbindMouseMoveListener()
        }, true)
        target.addEventListener("mouseup", () => {
            this.unbindMouseMoveListener()
        }, true)
    }
    scrollThis(event) {
        if (this.active) {
            if (event.deltaY > 0) {
                this.target.scrollLeft += 100;
            } else {
                this.target.scrollLeft -= 100;
            }
        }
    }
    touchScroll(ctx) {
        if (ctx.active) {
            ctx.target.scrollLeft = ctx.targetScrollStartPoint - event.clientX + ctx.mouseDownPoint
        }
    }
    tScr = this.touchScroll.bind(event, this)
    bindMouseMoveListener() {
        document.addEventListener("mousemove", this.tScr, true)
    }
    unbindMouseMoveListener() {
        document.removeEventListener("mousemove", this.tScr, true)
    }
}