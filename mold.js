class Mold {
    constructor(xNormal, yNormal, wid, hei) {
        this.xNormal = xNormal
        this.yNormal = yNormal
        
        this.wid = wid
        this.hei = hei
    }

    showRect() {
        this.x = map(this.xNormal, min(moldMeasX), max(moldMeasX), marg+this.wid/2, (w-marg)-this.wid/2)
        this.y = map(this.yNormal, min(moldMeasY), max(moldMeasY), marg+this.hei/2, (h-marg)-this.hei/2)
        c.rect(this.x, this.y, this.wid, this.hei, 100)
    }

    showTri() {
        this.sz = min([this.wid, this.hei])
        this.x = map(this.xNormal, min(moldMeasX), max(moldMeasX), marg+this.sz/2, (w-marg)-this.sz/2)
        this.y = map(this.yNormal, min(moldMeasY), max(moldMeasY), marg+this.sz/2, (h-marg)-this.sz/2)
        cTri(this.x, this.y, this.sz)
    }

    showCirc() {
        this.sz = min([this.wid, this.hei])
        this.x = map(this.xNormal, min(moldMeasX), max(moldMeasX), marg+this.sz/2, (w-marg)-this.sz/2)
        this.y = map(this.yNormal, min(moldMeasY), max(moldMeasY), marg+this.sz/2, (h-marg)-this.sz/2)
        c.circle(this.x, this.y, this.sz)
    }

    dropVertex() {
        this.sz = min([this.wid, this.hei])
        this.x = map(this.xNormal, min(moldMeasX), max(moldMeasX), marg+this.sz/2, (w-marg)-this.sz/2)
        this.y = map(this.yNormal, min(moldMeasY), max(moldMeasY), marg+this.sz/2, (h-marg)-this.sz/2)
        c.curveVertex(this.x, this.y, this.sz)
    }
}

