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
        this.numLayers = 2
        this.colorChance = 0.9
        this.decider = shapeShapes[this.it]
        this.baseCol = shapeCols[this.it]
        this.accCol = shapeAccCols[this.it]
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
                this.col = achro[randomInt(0, achro.length-1)]
            }
        } else {
            this.val = this.bwVal
            this.alph = map(this.dis, shapeRad*0.5, radNeeded, 1, 0.25)
            this.col = chroma(this.val, this.val, this.val).alpha(this.alph).hex()
        }

            p.fill(this.col)
            if(i == 0) {
                limitedSpreader(this.pos.x, this.pos.y)
            } else {
                
            if(this.decider == 0) {
                limitedSpreader(this.pos.x, this.pos.y)
            } else if(this.decider == 1) {
                limitedFlower(this.pos.x, this.pos.y)
            } else if(this.decider == 2) {
                limitedRays(this.pos.x, this.pos.y)
            } else if( this.decider == 3) {
                p.push()
                p.stroke(this.col)
                limitedLines(this.pos.x, this.pos.y)
                p.pop()
            }
            }
            
            
        }
        removeOption(this.pos.x, this.pos.y)
    }
}

