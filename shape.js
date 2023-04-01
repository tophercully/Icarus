class Shape {
    constructor(x, y) {
        this.x = x
        this.y = y 
        this.distFromCenter = center.dist(createVector(this.x, this.y))

    }
    show(colorChance) {
        this.colorChance = 0.9
        this.colCheck = randomVal(0, 1)
        this.center = createVector(center.x, center.y)
        this.here = createVector(this.x, this.y)
        this.dis = this.here.dist(this.center)
        this.sourceDis = this.here.dist(sourceLoc)        

        //draw the layers
        this.numLayers = randomInt(3, 5)
        for(let i = 0; i < this.numLayers; i++) {
        if(this.sourceDis > startSz-200) {            
            this.val = randomVal(0, 150)
            if(this.colCheck < this.colorChance) {
                this.col = randColor()
            } else {
                this.col = achro[randomInt(0, achro.length-1)]
            }
        } else {
            this.val = randomVal(0, 255)
            this.alph = map(this.dis, shapeRad*0.5, radNeeded, 1, 0.25)
            this.col = chroma(this.val, this.val, this.val).alpha(this.alph).hex()
        }

            p.fill(this.col)
            this.decider = randomInt(0, 3)
            if(this.decider == 0) {
                limitedSpreader(this.x, this.y)
            } else if(this.decider == 1) {
                limitedFlower(this.x, this.y)
            } else if(this.decider == 2) {
                limitedRays(this.x, this.y)
            } else if( this.decider == 3) {
                p.push()
                p.stroke(this.col)
                limitedLines(this.x, this.y)
                p.pop()
            }
        }
        removeOption(this.x, this.y)
    }
}

