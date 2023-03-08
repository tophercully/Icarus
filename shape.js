class Shape {
    constructor(x, y, numPlaced) {
        this.x = x
        this.y = y 
        this.numPlaced = numPlaced
    }
    show(colorChance) {
        this.colorchance = 1
        this.colCheck = randomVal(0, 1)
        this.center = createVector(center.x, center.y)
        this.here = createVector(this.x, this.y)
        this.dis = this.here.dist(this.center)
        // console.log(this.dis, shapeRad)
        if(this.dis < shapeRad/2) {
            // this.col = randColor()
            if(this.colCheck < this.colorChance) {
                this.col = randColor()
            } else {
                this.col = achro[randomInt(0, achro.length-1)]
            }
        } else {
            
            this.alph = map(this.dis, shapeRad/2, radNeeded, 0.75, 0.5)
            this.col = chroma(randColor()).alpha(this.alph).desaturate((1-this.alph)*3).hex()
        }
        
        
        p.fill(this.col)
        this.decider = Math.floor(fxrand()*3)
        if(this.decider == 0) {
            limitedSpreader(this.x, this.y)
        } else if(this.decider == 1) {
            limitedFlower(this.x, this.y)
        } else if(this.decider == 2) {
            limitedRays(this.x, this.y)
        }
    }
}

