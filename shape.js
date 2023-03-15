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
        
        // console.log(this.dis, shapeRad)
        if(this.sourceDis > h*0.9) {
            // this.col = randColor()
            this.val = randomVal(0, 150)
            if(this.colCheck < this.colorChance) {
                this.col = randColor()
            } else {
                this.col = achro[randomInt(0, achro.length-1)]
            }
        } else {
            this.val = randomVal(0, 255)
            this.alph = map(this.dis, shapeRad*0.5, radNeeded, 1, 0.25)
            this.col = chroma(randColor()).alpha(this.alph).desaturate(210).hex()
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

