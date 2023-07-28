//Changing size with url params
url = new URL(window.location.href)
urlParams = new URLSearchParams(url.search)
//to change size of the pen, press 'w' and edit the penSize variable in url, in mm in tenths '35' for 0.35
if(url.searchParams.has('penSize') == true) {
  penSize = (url.searchParams.get('penSize'))/100
} else {
  penSize = 0.35
}
//to change size of the canvas, add "&?canvasSize=3" to the url, declare in inches
if(url.searchParams.has('canvasSize') == true) {
  canvasSize = url.searchParams.get('canvasSize')
} else {
  canvasWidth = 11
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
marg = mmToPx(1*25.4)//randomVal(0.05, 0.2)

mm = penSize
mmWt = ((mm/25.4)/pageHeight)*h

minLines = 100
maxLines = 200

moldMeasX = []
moldMeasY = []

willReadFrequently = true

//color
allInks = [
  red,
  orange,
  pink,
  yellow,
  emerald,
  sapGreen,
  cyan,
  ultramarine,
  burntUmber,
  black
  ]
shuffInks = shuff(allInks)
console.log(shuffInks[0].name, 'black')

// black = shuffInks[0]
plotPal = [shuffInks[0], black]
colBalance = randomVal(0.15, 0.75)

//declarations
shapesDrawn = 0
shapes = []
dists = []
previewTriggered = false

//main controllers
splitDens = randomInt(10, 20)
moldMode = 1//randomInt(1, 3)
cutMode = randomInt(1, 3)
if(fxrand() < 0.25) {
  sym = true
} else {
  sym = false
}


//parameters
sym = false
if(sym == true) {
  numShapes = 1250
} else {
  numShapes = 2500
}
cutMode = randomInt(1, 3)
padding = mmToPx(2)
shapeDecider = randomInt(1, 3)
univPetals = randomInt(4, 10)
rounding = 150//200
numGrids = 3

if(cutMode == 1) {
  patType = "One-Liner"
} else if(cutMode == 2) {
  patType = "Circular"
} else if(cutMode == 3) {
  patType = "Box"
} 


//param translations
densScl = Math.ceil(map_range(splitDens, 10, 20, 1, 10))
$fx.features({
  "Mosaic Pattern": patType,

  "Density": densScl,


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
  blendMode(DARKEST)
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

    if(moldMode == 1) {
      cGrid()
    } else if(moldMode == 2) {
      flowerGrid()
    } else if(moldMode == 3) {
      pack()
    } 
    

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
  
    // bgConcentricRect()
    // bgConcentricRect()
    // c.save()

  
   
    //prep cut mode
    c.noFill()
    c.stroke('black')
    c.strokeWeight(padding)
    //cut mode
    if(cutMode == 1) {
      if(sym == true) {
        slicerSym()
      } else {
        slicer()
      }
    } else if(cutMode == 2) {
      if(sym == true) {
        circleSlicerSym()
      } else {
        circleSlicer()
      }
    } else if(cutMode == 3) {
      if(sym == true) {
        squareSlicerSym()
      } else {
        squareSlicer()
      }
    } else if(cutMode == 4) {
      if(sym == true) {
        diamondSlicerSym()
      } else {
        diamondSlicer()
      }
    } 

    


    placer()
    // rect(w/2, h/2, w-(marg*2)+mmWt, h-(marg*2)+mmWt, rounding*0.6)
    rect(w/2, h/2, w-(marg*1.5)+mmWt, h-(marg*1.5)+mmWt, rounding*0.8)
    setPen(black)
    num = 30/mmWt
    
    for(let i = 0; i < num; i++) {

    }

    
  }
  

  perFrame = 10
  if(frameCount < numShapes/perFrame) {
    
    for(let i = 0; i < perFrame; i++) {
      shapes[((frameCount*perFrame))+i].show()
    }
    
  }

   if(frameCount > numShapes/perFrame && previewTriggered == false) {
    fxpreview()
    previewTriggered = true
    // save()
    console.log('done')
   }

   
   
}
