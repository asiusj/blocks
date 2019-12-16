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
            this.active = true;
        }, true)
        target.addEventListener("mouseout", () => {
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

        //touch
        target.addEventListener("touchstart", (event) => {
            event.preventDefault()
            this.targetScrollStartPoint = this.target.scrollLeft
            this.mouseDownPoint = event.touches[event.touches.length - 1].clientX
            this.bindTouchMoveListener()
        })
        target.addEventListener("touchend", (event) => {
            event.preventDefault()
            this.unbindTouchMoveListener()
        })
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
    mouseDownScroll(ctx) {
        if (ctx.active) {
            ctx.target.scrollLeft = ctx.targetScrollStartPoint - event.clientX + ctx.mouseDownPoint
        }
    }
    touchScroll(ctx) {
        ctx.target.scrollLeft = ctx.targetScrollStartPoint - event.touches[event.touches.length - 1].clientX + ctx.mouseDownPoint
    }
    mdScr = this.mouseDownScroll.bind(event, this)
    tScr = this.touchScroll.bind(event, this)
    bindMouseMoveListener() {
        document.addEventListener("mousemove", this.mdScr, true)
    }
    unbindMouseMoveListener() {
        document.removeEventListener("mousemove", this.mdScr, true)
    }
    bindTouchMoveListener() {
        document.addEventListener("touchmove", this.tScr, true)
    }
    unbindTouchMoveListener() {
        document.removeEventListener("touchmove", this.tScr, true)
    }
}