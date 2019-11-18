export class Block {
    constructor(width = 100, height = 100, name = "unnamed", max = 5) {
        this.width = width
        this.height = height
        this.name = name
        this.max = max
    }
}

export const defaultBlocks = {
    b150x70: new Block(150, 70, undefined, 3),
    b200x100: new Block(200, 100, undefined, 9),
    b120x70: new Block(120, 70, undefined, 10),
    b100x100: new Block(undefined, undefined, "DefaultSquare", 15),
    b30x150: new Block(30, 150, undefined, 3),
    b150x190: new Block(150, 190, undefined, 4),
    b240x140: new Block(240, 140, "BigBlock"),
    b360x50: new Block(360, 50, "WideBlock", 7),
    b80x120: new Block(80, 120, undefined, 3),
    b60x190: new Block(60, 190, "TallBlock", 8)
}