class CircObjMold {
    constructor(x, y, r, decider) {
        this.pos = createVector(x, y)
        this.r = r 
        this.petals = univPetals
    }

    showCirc() {
        this.decider = shapeDecider

        stroke('black')
        strokeWeight(mmWt)
        if(this.decider == 1) {
            invFlowerMold(this.pos.x, this.pos.y, this.r, this.petals)
        } else if(this.decider == 2) {
            flowerMold(this.pos.x, this.pos.y, this.r, this.petals)
        } else if(this.decider == 3) {
            c.circle(this.pos.x, this.pos.y, this.r)
            circle(this.pos.x, this.pos.y, this.r)
        }
    }
}