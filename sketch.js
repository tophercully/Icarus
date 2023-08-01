url = new URL(window.location.href)
urlParams = new URLSearchParams(url.search)
//to change size of the pen, press 'w' and edit the penSize variable in url, in mm in tenths '35' for 0.35
if(url.searchParams.has('penSize') == true) {
  penSize = (url.searchParams.get('penSize'))/100
} else {
  penSize = 0.5
}
//changing render type
if(url.searchParams.has('renderType') == true) {
  renderMode = url.searchParams.get('renderType')
} else {
  renderMode = 1
}
//get pixel density for standard runtime
if(url.searchParams.has('size') == true) {
  pxSize = url.searchParams.get('size')
} else {
  url.searchParams.append('size', 1);
}
pxSize = url.searchParams.get('size')



pageWidth = 11
pageHeight = 15

ratio = pageHeight/pageWidth
w= 1600
h = w*ratio
marg = mmToPx(1.25*25.4)
mm = penSize
mmWt = ((mm/25.4)/pageHeight)*h

minLines = 100
maxLines = 200



willReadFrequently = true

//color
allInks = [
  red,
  burntSienna,
  orange,
  pink,
  yellow,
  emerald,
  sapGreen,
  cyan,
  ultramarine,
  black,
]
shuffInks = shuff(allInks)

plotPal = [shuffInks[0], black]

//declarations
shapesDrawn = 0
shapes = []
dists = []
previewTriggered = false

//main controllers
splitDens = randomInt(20, 40)
minExpo = map_range(splitDens, 20, 40, 1.5, 3)
maxExpo = map_range(splitDens, 20, 40, 1.5, 3)
if(fxrand() < 0.25) {
  sym = true
} else {
  sym = false
}


//parameters
cutMode = randomInt(1, 4)
maxPad = randomInt(8, 12)
minPad = randomInt(4, 6)
padding = map_range(splitDens, 20, 40, mmToPx(maxPad), mmToPx(minPad))
rounding = 150
numGrids = 3
perFrame = 1

if(cutMode == 1) {
  patType = "One-Liner"
} else if(cutMode == 2) {
  patType = "Circular"
} else if(cutMode == 3) {
  patType = "Box"
} else if(cutMode == 4) {
  patType = "Diamond"
} 


//param translations
densScl = Math.ceil(map_range(splitDens, 20, 40, 1, 10))
$fx.features({
  "Cut Pattern": patType,
  "Density": densScl,
  "Symmetrical": sym,
  "Color": plotPal[0].name,
})


function setup() {
  pixelDensity(1)
  if(renderMode == 2) {
    createCanvas(w, h, SVG);
    console.log('svg runtime')
  } else {
    createCanvas(w, h);
    console.log('standard runtime')
  }
  c = createGraphics(w, h)
  angleMode(DEGREES)
  c.angleMode(DEGREES)
}

seedA = randomVal(0, 10)
seedB = randomVal(0, 10)
nSeed = randomVal(0, 100000000000)

function draw() {
  if(frameCount==1){
    noiseSeed(nSeed)
    randomSeed(nSeed)
    c.noiseSeed(nSeed)
    c.randomSeed(nSeed)
    background(250)
    c.background('black')
    
    //create margin
    rectMode(CENTER)
    noFill()
    

  
    //center rectangles
    c.rectMode(CENTER)
    //declare safe space
    c.fill('white')
    startSz = h*randomVal(0.75, 1.5)

   

    cGrid()
    
  

    //border weight but backwards
    c.stroke('gray')
    c.strokeWeight(marg)
    c.noFill()
    //outer margin
    c.rect(w/2, h/2, w-marg, h-marg)
    //corner rounding margin
    c.rect(w/2, h/2, w-marg, h-marg, rounding, rounding, rounding, rounding)
    
    

    numDots = randomVal(3, 10)
    setPen(black)
    for(let i = 0 ; i < numDots; i++) {
      r = randomVal(30, 80)
      drawAShape()
      drawAShape(randomVal(marg+r/2, w-marg-r/2), randomVal(marg+r/2, h-marg-r/2), r, r, true, 0)
    }

    for(let i = 0; i < numGrids; i++) {
      initDens = 0.5
      dens = map(i, 0, numGrids, initDens, 0.9)
      drawAGrid(dens)
    }

    drawConcentric()

    //prep cut mode
    c.noFill()
    c.stroke('black')
    c.strokeWeight(padding)
    //cut mode
    if(sym == true) {
      if(cutMode == 1) {
        slicerSym()
      } else if(cutMode == 2) {
        circleSlicerSym()
      } else if(cutMode == 3) {
        squareSlicerSym()
      } else if(cutMode == 4) {
        diamondSlicerSym()
      }
    } else if(sym == false) {
      if(cutMode == 1) {
        slicer()
      } else if(cutMode == 2) {
        circleSlicer()
      } else if(cutMode == 3) {
        squareSlicer()
      } else if(cutMode == 4) {
        diamondSlicer()
      }
    }

    placer()    
    setPen(plotPal[0])
    rect(w/2, h/2, w-(marg)+mmWt, h-(marg)+mmWt, rounding*0.8)
  }
  
  if(frameCount < numShapes) {
    shapes[frameCount].show()
    
  }

   if(frameCount > numShapes/perFrame && previewTriggered == false) {
    fxpreview()
    previewTriggered = true
   }

   
   
}
