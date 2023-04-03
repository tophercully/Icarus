w = 1600
h = 2000
marg = w*randomVal(0.05, 0.2)

willReadFrequently = true

let shade;
function preload() {
  shade = loadShader("shader.vert", "shader.frag");
}
url = new URL(window.location.href)
urlParams = new URLSearchParams(url.search)
if(url.searchParams.has('size') == true) {
  pxSize = url.searchParams.get('size')
} else {
  url.searchParams.append('size', 1);
}
pxSize = url.searchParams.get('size')


//declarations
shapesDrawn = 0
shapes = []
dists = []
shapeCols = []
shapeAccCols = []
shapeShapes = []
previewTriggered = false
textured = true

//parameters
shapeRad = w*randomVal(0.05, 0.2)
skew = randomVal(50, 150)
cableSize = randomVal(8, 20)
splitDens = randomInt(15, 50)
densScl = Math.ceil(map_range(splitDens, 15, 50, 1, 10))
centerDens = 10
numShapes = 1000
vel = randomVal(1.1, 1.3)
colorChance = 0.5
cutMode = randomInt(1, 3)
padding = 5
splitWt = 100
roundingMod = randomVal(20, 100)

for(let i = 0; i < numShapes+1; i++) {
  shapeCols[i] = randColor()
  shapeAccCols[i] = randColor()
  shapeShapes[i] = randomInt(1, 3)
}

if(dayMode == true) {
  numStars = randomInt(50, 100)
} else {
  numStars = randomInt(2000, 5000)
}

$fx.features({
  "Time": tiempo,
  "Palette": palName,
  "Density": densScl,
  "Sky Blue": skyBlue,
  "Chromatic Sky": chromaSky
})


function setup() {
  var isMobile = false; //initiate as falses
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oraßn|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|verßi|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    isMobile = true;
}
  pixelDensity(1)
  createCanvas(w, h, WEBGL);
  if(pxSize == 1) {
    pixelDensity(1)
  } else if (pxSize == 2) {
    pixelDensity(2)
  } else if (pxSize == 3) {
    pixelDensity(3)
  }

  p = createGraphics(w, h)
  c = createGraphics(w, h)
  angleMode(DEGREES)
  p.angleMode(DEGREES)
  c.angleMode(DEGREES)

  center = createVector(randomVal(marg+(shapeRad/2), (w-marg)-(shapeRad/2)), randomVal(marg+(shapeRad/2), (h-marg)-(shapeRad/2)))
  tl = createVector(0, 0)
  tr = createVector(w, 0)
  br = createVector(w, h)
  bl = createVector(0, h)
  distances = [center.dist(tl), center.dist(tr), center.dist(br), center.dist(bl),]
  radNeeded = max(distances)
  dir = angBetween(center.x, center.y, w/2, h/2)
  sourceLoc = ptFromAng(center.x, center.y, dir, h*vel)
}

seedA = randomVal(0, 10)
seedB = randomVal(0, 10)
nSeed = randomVal(0, 100000000000)

function draw() {

  if(frameCount==1){
    noiseSeed(nSeed)
    randomSeed(nSeed)
    p.noiseSeed(nSeed)
    p.randomSeed(nSeed)
    c.noiseSeed(nSeed)
    c.randomSeed(nSeed)
    background(bgc)
    c.background('black')
    p.background(bgc)
    //draw stars
    for(let i = 0; i < numStars; i++) {
    p.fill(frameCol)
    p.noStroke()
    p.circle(randomVal(0, w), randomVal(0, h), randomVal(0.5, 5))
    }
    //draw clouds
    marbled()
    //build horizon
    horizon()
    //create margin
    p.rectMode(CENTER)
    p.noFill()
    borderDens = 50
    for(let i = 0; i < borderDens; i++) {
      p.stroke(chroma(bgc).alpha((2/borderDens)+randomVal(-0.001, 0.001)).hex())
      wt = map(i, 0, borderDens, marg*2, (marg*2)-70)
      rounding = (wt*0.5)+roundingMod
      p.strokeWeight(wt)
      p.rect((w/2), (h/2), w, h, rounding, rounding, rounding, rounding)
    }

  
    //center rectangles
    c.rectMode(CENTER)
    //declare safe space
    c.fill('white')
    cables()

    //border weight
    c.stroke('black')
    c.strokeWeight(marg*0.666)
    c.noFill()
    c.rect(w/2, h/2, w-marg*0.666, h-marg*0.666)
    c.rect(w/2, h/2, w-marg*0.666, h-marg*0.666, rounding, rounding, rounding, rounding)

    //Padding weight, minimum 4
    c.strokeWeight(padding)
    for(let i = 0; i < 0; i++) {

      c.line(randomVal(0, w), randomVal(0, h), randomVal(0, w), randomVal(0, h))
      c.circle(randomVal(-w/2, w*1.5), randomVal(-h/2, h*1.5), randomVal(300, h))
    }
    if(cutMode == 1) {
      slicer()
    } else if(cutMode == 2) {
      partSlicer()
    } else {
      circleSlicer()
    }
  
    shaper(center.x, center.y, shapeRad)
    placer()
  }

  perFrame = 5
  if(frameCount < numShapes/perFrame) {
    
    for(let i = 0; i < perFrame; i++) {
      shapes[((frameCount*perFrame))+i].show()
    }
  }

  //Post processing
   bgc = color(bgc)
   shader(shade)
   shade.setUniform("u_resolution", [w, h]);
   shade.setUniform("p", p);
   shade.setUniform("c", c);
   shade.setUniform("center", [center.x/w, center.y/h])
   shade.setUniform("seed", seedA);
   shade.setUniform("textured", textured);
   shade.setUniform("seedB", seedB);
   shade.setUniform("marg", map(marg, 0, w, 0, 1));
   shade.setUniform("bgc", [
     bgc.levels[0] / 255,
     bgc.levels[1] / 255,
     bgc.levels[2] / 255,
   ]);

   rect(0, 0, w, h)
   if(frameCount > numShapes/perFrame && previewTriggered == false) {
    fxpreview()
    previewTriggered = true
   }
   
}
