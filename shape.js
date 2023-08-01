class Shape {
    constructor(x, y, colNum, valA, valB, valC, valD) {
        shapesDrawn++
        this.pos = createVector(x, y)
        this.colNum = colNum
        this.valA = valA 
        this.valB = valB
        this.valC = valC
        this.valD = valD
    }

    show() {
        setPen(plotPal[this.colNum])
        slinkyFill(this.pos.x, this.pos.y, this.valA, this.valB, this.valC, this.valD)
    }
}

