class BlockManager {
    desktopTree = null
    cont = []
    phantomDesktopTree = null
    phantomCont = []
    phantomCheckResult = false
    tempNodeLink = null
    constructor(gap = 0, sort = 'desc', autosize = false) {
        this.gap = gap
        this.sort = sort
        this.autosize = autosize
    }
    spreadThis(desktop) {
        this.cont = []
        this.desktopTree = this.initiateDesktop(desktop)

        setTimeout(() => {
            this.prepareItems(desktop)
            if (this.sort == 'desc') {
                this.cont = this.sordBA(this.cont)
            } else if (this.sort == 'asc') {
                this.cont = this.sortAB(this.cont)
            }
            this.cont.forEach((item) => {
                this.computePosition(this.desktopTree, item)
            })
        }, 300)
    }

    initiateDesktop(desktop) {
        var styles = getComputedStyle(desktop)
        return new DesktopNode(
            this,
            parseInt(styles.width) - 2 * this.gap,
            parseInt(styles.height) - 2 * this.gap,
            this.gap,
            this.gap
        )
    }

    checkNewStatePossible(item, desktop) {
        this.phantomCont = []
        this.phantomDesktopTree = this.initiateDesktop(desktop)
        this.phantomCheckResult = true

        this.phantomCont.push(...this.cont)
        this.phantomCont.push(new PhantomItem(item))
        if (this.sort == 'desc') {
            this.phantomCont = this.sordBA(this.phantomCont)
        } else if (this.sort == 'asc') {
            this.phantomCont = this.sortAB(this.phantomCont)
        }

        this.phantomCont.forEach((item) => {
            if (!this.computePosition(this.phantomDesktopTree, item, true))
                this.phantomCheckResult = false
        })

        return this.phantomCheckResult
    }

    prepareItems(desktop) {
        desktop.querySelectorAll("div").forEach((item) => {
            this.cont.push(new Item(item))
        })
    }
    computePosition(node, item, background = false) {
        if (!node) return
        if (node.checkPossibilityMountItem(item)) {
            node.mountItem(item, background)
            return true
        } else {
            node.findSuitableChildNode(item)
            if (this.tempNodeLink) {
                this.tempNodeLink.mountItem(item, background)
                return true
            } else {
                return false
            }

        }
    }

    sortAB(arr) {
        arr.sort((a, b) => {
            return a.width > a.height ? a.width - (b.width > b.height ? b.width : b.height) : a.height - (b.width > b.height ? b.width : b.height)
        })
        return arr
    }

    sordBA(arr) {
        arr.sort((b, a) => {
            return a.width > a.height ? a.width - (b.width > b.height ? b.width : b.height) : a.height - (b.width > b.height ? b.width : b.height)
        })
        return arr
    }

}

const bm = {
    install(Vue, options) {
        Vue.prototype.$bm = new BlockManager(options.gap, options.sort)
    }
}

export default bm

class Item {
    constructor(element) {
        this.element = element
        this.element.style.marginBottom = this.element.style.marginTop = this.element.style.marginLeft = this.element.style.marginRight = 0
        this.width = element.offsetWidth;
        this.height = element.offsetHeight;
    }
}

class PhantomItem {
    constructor(element) {
        this.width = element.width;
        this.height = element.height;
    }
}

class DesktopNode {
    constructor(
        engine,
        width = 0,
        height = 0,
        shiftTop = 0,
        shiftLeft = 0,
        p = null,
        type = '',
        item = null,
        v1 = null,
        v2 = null,
        h1 = null,
        h2 = null
    ) {
        this.engine = engine
        this.width = width
        this.height = height
        this.shiftTop = shiftTop
        this.shiftLeft = shiftLeft
        this.item = item
        this.vertChildNode1 = v1
        this.vertChildNode2 = v2
        this.horChildNode1 = h1
        this.horChildNode2 = h2
        this.parentNode = p
        this.filled = false
        this.type = type
    }

    checkPossibilityMountItem(item) {
        return item.width <= this.width && item.height <= this.height && !this.item
    }

    mountItem(item, background = false) {
        this.item = item
        if (!background) {
            this.setItemPostition()
        }
        this.createChildNodes(item)
        this.filled = true
        if (this.type.includes('vert')) {
            this.parentNode.horChildNode1 = null
            this.parentNode.horChildNode2 = null
        } else if (this.type.includes('hor')) {
            this.parentNode.vertChildNode1 = null
            this.parentNode.vertChildNode2 = null
        }
        this.engine.tempNodeLink = null
    }

    setItemPostition() {
        this.item.element.style.top = this.shiftTop + 'px'
        this.item.element.style.left = this.shiftLeft + 'px'
    }

    createChildNodes(item) {
        const FHorTopShift = this.shiftTop + this.engine.gap
        const FHorLeftShift = this.shiftLeft + item.width + this.engine.gap
        const FHorWidth = this.width - item.width - this.engine.gap
        const FHorHeight = item.height

        const SHorTopShift = this.shiftTop + item.height + this.engine.gap
        const SHorLeftShift = this.shiftLeft
        const SHorWidth = this.width
        const SHorHeight = this.height - item.height - this.engine.gap

        this.horChildNode1 = new DesktopNode(this.engine, FHorWidth, FHorHeight, FHorTopShift, FHorLeftShift, this, 'horChildNode1')
        this.horChildNode2 = new DesktopNode(this.engine, SHorWidth, SHorHeight, SHorTopShift, SHorLeftShift, this, 'horChildNode2')

        const FVertTopShift = this.shiftTop + item.height + this.engine.gap
        const FVertLeftShift = this.shiftLeft
        const FVertWidth = item.width
        const FVertHeight = this.height - item.height - this.engine.gap

        const SVertTopShift = this.shiftTop
        const SVertLeftShift = this.shiftLeft + item.width + this.engine.gap
        const SVertWidth = this.width - item.width - this.engine.gap
        const SVertHeight = this.height

        this.vertChildNode1 = new DesktopNode(this.engine, FVertWidth, FVertHeight, FVertTopShift, FVertLeftShift, this, 'vertChildNode1')
        this.vertChildNode2 = new DesktopNode(this.engine, SVertWidth, SVertHeight, SVertTopShift, SVertLeftShift, this, 'vertChildNode2')

    }

    findSuitableChildNode(item) {
        if (this.checkPossibilityMountItem(item)) {
            this.engine.tempNodeLink = this
        } else if (this.vertChildNode1) {
            this.vertChildNode1.findSuitableChildNode(item)
            this.vertChildNode2.findSuitableChildNode(item)
        } else if (this.horChildNode1) {
            this.horChildNode1.findSuitableChildNode(item)
            this.horChildNode2.findSuitableChildNode(item)
        }

    }

}