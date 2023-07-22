class Shape {
    constructor(x, y) {
        shapesDrawn ++
        
        this.it = shapesDrawn
        this.pos = createVector(x, y)
        this.colCheck = fxrand()
        this.val = randomVal(0, 150)
        this.bwVal = randomVal(0, 255)
    }

    show() {
        this.numLayers = 1
        this.colorChance = 0.9
        this.decider = 3//shapeShapes[this.it]
        this.baseCol = plotPal[randomInt(0, plotPal.length-1)]//shapeCols[this.it]
        this.accCol = plotPal[randomInt(0, plotPal.length-1)]//shapeAccCols[this.it]
        this.center = center
        this.dis = this.pos.dist(this.center)
        this.sourceDis = this.pos.dist(sourceLoc)
        for(let i = 0; i < this.numLayers; i++) {
        if(this.sourceDis > startSz-skew) {      
            if(i == 0) {
                this.thisCol = this.baseCol
            } else {
                this.thisCol = this.accCol
            }
            
            if(this.colCheck < this.colorChance) {
                this.col = this.thisCol
            } else {
                this.col = this.thisCol//achro[randomInt(0, achro.length-1)]
            }
        } else {
            this.val = this.bwVal
            this.alph = map(this.dis, shapeRad*0.5, radNeeded, 1, 0.25)
            this.col = this.baseCol//chroma(this.val, this.val, this.val).alpha(this.alph).hex()
        }
            this.col = plotPal[randomInt(0, plotPal.length-1)]
            fill(this.col)
            stroke(this.col)
            if(i == -1) {
                limitedSpreader(this.pos.x, this.pos.y)
            } else {
                
            if(this.decider == 0) {
                limitedSpreader(this.pos.x, this.pos.y)
            } else if(this.decider == 1) {
                limitedFlower(this.pos.x, this.pos.y)
            } else if(this.decider == 2) {
                limitedRays(this.pos.x, this.pos.y)
            } else if( this.decider == 3) {
                // noFill()
                // limitedSpreader(this.pos.x, this.pos.y)
                push()
                stroke(this.col)
                limitedLinesFill(this.pos.x, this.pos.y)
                pop()
            }
            }
            
            
        }
        if(c.get(this.pos.x, this.pos.y)[0] !=0) {
            removeOption(this.pos.x, this.pos.y)
        }
    }
}

