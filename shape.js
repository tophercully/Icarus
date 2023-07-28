class Shape {
    constructor(x, y) {
        shapesDrawn++
        this.pos = createVector(x, y)
    }

    show() {
        this.skip = fxrand()
        if(this.skip < 0.1) {
            removeOption(this.pos.x, this.pos.y)
        } else {
            if(c.get(this.pos.x, this.pos.y)[0] == 255) {
                if(fxrand() < colBalance) {
                    setPen(plotPal[0])
                } else {
                    setPen(plotPal[1])
                }
                
                slinkyFill(this.pos.x, this.pos.y)
                if(sym == true) {
                    slinkyFill(w-this.pos.x, this.pos.y)
                }
            }
        }
        
    }
}

