function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(fxrand() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
}
function randomVal(min, max) {
  return fxrand() * (max - min) + min;
}
function map_range(value, low1, high1, low2, high2) {
  return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

function shuff(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(fxrand() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function midpoint(xA, yA, xB, yB, int) {
  x = map_range(int, 0, 1, xA, xB)
  y = map_range(int, 0, 1, yA, yB)
  pt = createVector(x, y)
  return pt
}

const chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

function randChar() {
  x = chars[randomInt(0, chars.length-1)]
  return x
}

function keyTyped() {
  if (key === "s" || key === "S") {
    save("img.png");
  }
  if (key === "1") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "1"));
    window.location.reload();
  }
  if (key === "2") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "2"));
    window.location.reload();
  }
  if (key === "3") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "size", "3"));
    window.location.reload();
  }
}
function updateURLParameter(url, param, paramVal)
{
    var TheAnchor = null;
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";

    if (additionalURL) 
    {
        var tmpAnchor = additionalURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor = tmpAnchor[1];
        if(TheAnchor)
            additionalURL = TheParams;

        tempArray = additionalURL.split("&");

        for (var i=0; i<tempArray.length; i++)
        {
            if(tempArray[i].split('=')[0] != param)
            {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }        
    }
    else
    {
        var tmpAnchor = baseURL.split("#");
        var TheParams = tmpAnchor[0];
            TheAnchor  = tmpAnchor[1];

        if(TheParams)
            baseURL = TheParams;
    }

    if(TheAnchor)
        paramVal += "#" + TheAnchor;

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function randColor() {
  return truePal[randomInt(0, truePal.length-1)]
}

function angBetween(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

function ptFromAng(x, y, ang, dis) {
  xC = cos(ang)*dis
  yC = sin(ang)*dis

  return createVector((x+xC), (y+yC))
}

function mycomparator(a,b) {
  return parseInt(a.distFromCenter, 10) - parseInt(b.distFromCenter, 10);
}

////////////////////////////////////////


function limitOrb(x, y, r, trueR) {
  trueR /= 2
  phase = randomVal(0, 10000000)
  phaseB = randomVal(0, 10000000)

  p.push()
  p.noFill()
  col = randColor()
  p.fill(chroma(col).alpha(randomVal(0.025, 0.2)).hex())
  p.stroke(chroma(col).alpha(0.75).darken(2).hex())
  p.strokeWeight(0.3)
  p.beginShape()

  noiseMax = randomVal(5, 30)
  angNS = randomVal(0.1, 0.5)
  for(let i = 0; i < 360; i+=0.1) {
    xOff = map(cos(i), -1, 1, 0, noiseMax)
    yOff = map(sin(i), -1, 1, 0, noiseMax)
    rad = map(noise(xOff, yOff, phase), 0, 1, 0, r/2)//r/2
    angOff = map(noise(xOff*angNS, yOff*angNS, phaseB), 0, 1, -360, 360)

    here = ptFromAng(x, y, i+angOff, rad)
    dist = here.dist(center)
    tries = 0
    while(dist > trueR) {
      rad -= 1
      here = ptFromAng(x, y, i, rad)
      dist = here.dist(center)
      tries++
      if(tries > trueR) {
        return
      }
    }
    p.vertex(here.x, here.y)
  }
  p.endShape(CLOSE)
  p.pop()
}

function limitSpread(x, y, r, trueR) {
  trueR /= 2
  phase = randomVal(0, 10000000)
  phaseB = randomVal(0, 10000000)

  p.push()
  p.noFill()
  col = randColor()
  p.fill(chroma(col).alpha(randomVal(0.025, 0.2)).hex())
  p.stroke(chroma(col).alpha(0.75).darken(2).hex())
  p.strokeWeight(0.3)
  p.beginShape()

  noiseMax = randomVal(5, 30)
  angNS = randomVal(0.1, 0.5)
  for(let i = 0; i < 360; i+=0.1) {
    xOff = map(cos(i), -1, 1, 0, noiseMax)
    yOff = map(sin(i), -1, 1, 0, noiseMax)
    rad = map(noise(xOff, yOff, phase), 0, 1, 0, r/2)//r/2
    angOff = map(noise(xOff*angNS, yOff*angNS, phaseB), 0, 1, -360, 360)

    here = ptFromAng(x, y, i+angOff, rad)
    dist = here.dist(center)
    tries = 0
    while(dist > trueR) {
      rad -= 1
      here = ptFromAng(x, y, i+angOff, rad)
      dist = here.dist(center)
      tries++
      if(tries > trueR) {
        return
      }
    }
    p.vertex(here.x, here.y)
  }
  p.endShape(CLOSE)
  p.pop()
}

function spreader(x, y, r, trueR) {
  trueR /= 2
  phase = randomVal(0, 10000000)
  phaseB = randomVal(0, 10000000)

  p.push()
  p.noFill()
  col = randColor()
  alph = randomVal(0.025, 0.2)
  p.fill(chroma(col).alpha(alph).hex())
  p.stroke(chroma(col).alpha(0.75).darken(2).hex())
  p.strokeWeight(0.3)
  p.beginShape()

  noiseMax = randomVal(5, 30)
  angNS = randomVal(0.1, 0.5)
  for(let i = 0; i < 360; i+=1) {
    xOff = map(cos(i), -1, 1, 0, noiseMax)
    yOff = map(sin(i), -1, 1, 0, noiseMax)
    rad = map(noise(xOff, yOff, phase), 0, 1, 0, r/2)//r/2
    angOff = map(noise(xOff*angNS, yOff*angNS, phaseB), 0, 1, -360, 360)

    here = ptFromAng(x, y, i+angOff, rad)
    colCheckBase = p.get(here.x, here.y)
    colCheck = colCheckBase[0]
    tries = 0
    while(colCheck > 100) {
      rad += 10
      here = ptFromAng(x, y, i+angOff, rad)
      dist = here.dist(center)
      colcheckBase = c.get(here.x, here.y)
      colCheck = colCheckBase[0]
      console.log(colCheck)
      tries++
      if(colCheck == 0) {
        return
      }
    }
    p.vertex(here.x, here.y)
  }
  p.endShape(CLOSE)
  p.pop()
}

function basicSpreader(x, y, r) {
  p.strokeWeight(2)
  p.beginShape()
  p.fill(randColor())
  for(let i = 0 ; i  < 360; i++) {
    rad = 0
    tripped = false
    while(tripped == false) {
      rad += 1
      here = ptFromAng(x, y, i, rad)
      colBase = c.get(here.x, here.y)
      colCheck = colBase[0]
      if(colCheck == 0) {
        tripped = true
        rad -= 10
        here = ptFromAng(x, y, i, rad)
      }
    }

    p.vertex(here.x, here.y)
  }
  p.endShape(CLOSE)
}

function limitedSpreader(x, y) {
  p.strokeWeight(1)
  p.stroke(frameCol)
  p.noStroke()
  p.beginShape()
  noiseMax = 50
  phase = randomVal(0, 100000000)
  phaseB = randomVal(0, 100000000)
  angNS = randomVal(0.1, 0.5)

  for(let i = 0 ; i < 360; i+=20) {
    xOff = map(cos(i), -1, 1, 0, noiseMax)
    yOff = map(sin(i), -1, 1, 0, noiseMax)
    rad = 0
    radMod = constrain(map(noise(i*0.001, phase), 0, 1, 0.5, 2), 0, 1)
    edgeNoise = map(noise(i*0.05, phase), 0, 1, 0.98, 1)
    tripped = false
    while(tripped == false) {
      rad += 1
      here = ptFromAng(x, y, i, rad)
      colBase = c.get(here.x, here.y)
      colCheck = colBase[0]
      if(colCheck == 0) {
        tripped = true
        rad -= 0
        here = ptFromAng(x, y, i, rad)
      }
    }
    noiseHere = ptFromAng(x, y, i, (rad*edgeNoise))
    p.vertex(noiseHere.x, noiseHere.y)
  }
  p.endShape(CLOSE)
}

function limitedLines(x, y) {
  p.strokeWeight(3)
  p.stroke(randColor())
  p.noStroke()
  p.beginShape()
  noiseMax = 50
  phase = randomVal(0, 100000000)
  phaseB = randomVal(0, 100000000)
  angNS = randomVal(0.1, 0.5)

  for(let i = 0 ; i < 180; i+=10) {
    xOff = map(cos(i), -1, 1, 0, noiseMax)
    yOff = map(sin(i), -1, 1, 0, noiseMax)
    rad = 0
    radMod = constrain(map(noise(i*0.001, phase), 0, 1, 0.5, 2), 0, 1)
    edgeNoise = map(noise(i*0.05, phase), 0, 1, 0.98, 1)
    tripped = false
    while(tripped == false) {
      rad += 1
      here = ptFromAng(x, y, i, rad)
      colBase = c.get(here.x, here.y)
      colCheck = colBase[0]
      if(colCheck == 0) {
        tripped = true
        rad -= 0
        here = ptFromAng(x, y, i, rad)
      }
    }
    radB = 0
    tripped = false
    while(tripped == false) {
      radB += 1
      here = ptFromAng(x, y, -i, rad)
      colBase = c.get(here.x, here.y)
      colCheck = colBase[0]
      if(colCheck == 0) {
        tripped = true
        radB -= 0
        here = ptFromAng(x, y, -i, rad)
      }
    }

    noiseHere = ptFromAng(x, y, i, (rad*edgeNoise))
    noiseThere = ptFromAng(x, y, -i, (radB*edgeNoise))
    p.line(noiseHere.x, noiseHere.y, noiseThere.x, noiseThere.y)
  }
  p.endShape(CLOSE)
}

function limitedRays(x, y) {
  p.strokeWeight(1)
  p.stroke(frameCol)
  p.noStroke()
  p.beginShape()
  numRays = randomInt(3, 20)
  rayMidPt = randomVal(-1, 1)
  depth = randomVal(0, 0.9)
  noiseMax = 50
  phase = randomVal(0, 100000000)
  phaseB = randomVal(0, 100000000)
  angNS = randomVal(0.1, 0.5)
 
  for(let i = 0 ; i < 360; i+=10) {
    sine = sin(i*numRays)
    xOff = map(cos(i), -1, 1, 0, noiseMax)
    yOff = map(sin(i), -1, 1, 0, noiseMax)
    rad = 0
    radMod = constrain(map(noise(i*0.001, phase), 0, 1, 0.5, 2), 0, 1)
    edgeNoise = map(noise(i*0.05, phase), 0, 1, 0.98, 1)
    tripped = false
    while(tripped == false) {
      rad += 1
      here = ptFromAng(x, y, i, rad)
      colBase = c.get(here.x, here.y)
      colCheck = colBase[0]
      if(colCheck == 0) {
        tripped = true
        rad -= 0
        here = ptFromAng(x, y, i, rad)
      }
    }
    noiseHere = ptFromAng(x, y, i, (rad*edgeNoise))
    if(sine < rayMidPt) {
      p.vertex(noiseHere.x, noiseHere.y)
    } else {
      thisPt = midpoint(x, y, noiseHere.x, noiseHere.y, depth)
      p.vertex(thisPt.x, thisPt.y)
    }
    
  }
  p.endShape(CLOSE)
}

function limitedFlower(x, y) {
  p.strokeWeight(1)
  p.stroke(frameCol)
  p.noStroke()
  p.beginShape()
  numPetals = randomInt(3, 10)
  rayMidPt = randomVal(-1, 1)
  depth = randomVal(0, 0.9)
  noiseMax = 50
  phase = randomVal(0, 100000000)
  phaseB = randomVal(0, 100000000)
  angNS = randomVal(0.1, 0.5)
  
  for(let i = 0 ; i < 360; i+=2) {
    flowerMod = map(sin(i*numPetals), -1, 1, 0, 1)
    flowMod = map(pow(flowerMod, 0.1), 0, pow(1, 0.1), 0, 1)
    xOff = map(cos(i), -1, 1, 0, noiseMax)
    yOff = map(sin(i), -1, 1, 0, noiseMax)
    rad = 0
    radMod = constrain(map(noise(i*0.001, phase), 0, 1, 0.5, 2), 0, 1)
    edgeNoise = map(noise(i*0.05, phase), 0, 1, 0.98, 1)
    tripped = false
    while(tripped == false) {
      rad += 1
      here = ptFromAng(x, y, i, rad)
      colBase = c.get(here.x, here.y)
      colCheck = colBase[0]
      if(colCheck == 0) {
        tripped = true
        rad -= 0
        here = ptFromAng(x, y, i, rad)
      }
    }
    noiseHere = ptFromAng(x, y, i, (rad*edgeNoise)*flowMod)
    
    p.vertex(noiseHere.x, noiseHere.y)
    
    
  }
  p.endShape(CLOSE)
}

function placer() {
  numPlaced = 0
  tries = 0
  samp = []
  ang = 0
  while(numPlaced < numShapes) {
    ang+=randomVal(-50, 50)
    radNow = map(pow(numPlaced, 1.5), 0, pow(numShapes, 1.5), randomVal(0, shapeRad/2), radNeeded)
    here = ptFromAng(center.x, center.y, ang, radNow)
    samp = c.get(here.x, here.y)
    if(samp[0] == 255) {
      shapes[numPlaced] = new Shape(here.x, here.y, numPlaced)
      numPlaced++
    }
    tries++
    if(tries > 10000) {
      numShapes = numPlaced
      return
    }
  }
}

function slicer() {
  c.beginShape()
  for(let i = 0; i < splitDens; i++) {
    xVal = fxrand()
    yVal = fxrand()
    y = map(pow(yVal, 0.5), 0, pow(1, 0.5), -h*0.25, h*1.25)
    c.curveVertex(randomVal(-w*0.25, w*1.25), y)
  }
  c.endShape(CLOSE)
}

function bottomUp() {
  c.strokeWeight(splitWt)
  c.beginShape()
  for(let i = 0; i < centerDens+1; i++) {
    y = map(i, 0, centerDens, h, 0)
    c.curveVertex(randomVal(-w*0.25, w*1.25), y)
  }
  c.endShape()
}

function partSlicer() {
  for(let i = 0; i < splitDens; i++) {
    c.line(randomVal(0, w), randomVal(0, h), randomVal(0, w), randomVal(0, h))
  }
}

function concentricGuide(x, y) {
  numRings = randomInt(3, 15)
  for(let i = 0; i < numRings; i++) {
    

    rad = map(i, 0, numRings, h*1.75, 0)
    c.noFill()
    c.strokeWeight(padding)
    c.stroke('black')
    c.circle(x, y, rad)
  }
}

function circleSlicer() {
  for(let i = 0; i < splitDens; i++) {
    c.circle(randomVal(0, w), randomVal(0, h), randomVal(100, 800))
  }
}

function cSpiral(x, y, r) {
  dens = 1000
  numSegs = randomInt(5, 20)
  sz = 100
  spiralIntensity = randomVal(-180, 180)
  angOff = randomVal(0, 360)
  for(let j = 0; j < dens; j++) {
    szMod = randomVal(0.25, 1)//map(j, 0, dens, 1, 0.5)
    rad = map(j, 0, dens, 0, r/2)
    diam = TWO_PI*(rad/4)
    sz = (diam/numSegs)//*szMod
    angOff += spiralIntensity/dens
    for(let i = 0; i < 360; i+=360/numSegs) {
      here = ptFromAng(x, y, i+angOff, rad)
      c.circle(here.x, here.y, sz)
    }
  }
  
}

function randAlpha() {
  c.strokeWeight(100)
  c.stroke('black')
  c.rectMode(CENTER)
  c.textAlign(CENTER, CENTER)
  here = createVector(randomVal(0, w), randomVal(0, h))
  c.textSize(randomVal(100, 1600))
  theChar = randChar()
  console.log(theChar)
  c.text(theChar, here.x, here.y)
}

function shaper(x, y, r) {
  numSides = randomInt(3, 5)

  startAng = angBetween(w/2, h/2, center.x, center.y)//randomVal(0, 360)
  c.fill('white')
  c.noStroke()
  c.stroke('black')
  c.strokeWeight(10)
  c.beginShape()
  for(let i = 0; i < 360; i+=360/numSides) {
    here = ptFromAng(x, y, i+startAng, r/2)
    c.vertex(here.x, here.y)
  }
  c.endShape(CLOSE)
}

function shaperGrid() {
  cols = 1//randomInt(1, 10)
  rows = 1//randomInt(1, 10)
  cellW = (w-(marg*2))/cols
  cellH = (h-(marg*2))/rows
  sz = min([cellW, cellH])*0.9
  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      shaper(marg+x*cellW+cellW/2, marg+y*cellH+cellH/2, sz)
    }
  }
}

function radGrad() {
  lCol = chroma(bgc).brighten(0.).hex()
  dCol = chroma(randColor()).darken(0.).hex()
  for(let i = 0; i < w; i++) {
    r = map(i, 0, w, radNeeded*2, 0)
    num = map(i, 0, w, 0, 1)
    col = chroma.mix(dCol, lCol, num).hex()
    p.fill(col)
    p.noStroke()
    p.circle(center.x, center.y, r)
  }
}

function radialShapes(x, y) {

  for(let i = 0; i<360; i+= 360/30) {
    thisRad = randomVal(10, 300)
    here = ptFromAng(x, y, i, (randomVal(0, h)))
    there = ptFromAng(x, y, i, (randomVal(0, h)))
    val = randomVal(0, 255)
    p.stroke(chroma(val, val, val).alpha(0.1).hex())
    p.strokeWeight(randomVal(0, 10))
    p.line(here.x, here.y, there.x, there.y)
  }
}

function vGrad() {
  cellH = h-(marg*2)
  cellW = w-(marg*2)
  theCol = truePal[0]
  cols = [theCol, bgc] 
  shuffCols = shuff(cols)
  for(let i = 0; i < cellH; i++) {
    n = map(i, 0, cellH, 0, 1)
    col = chroma.mix(shuffCols[0], shuffCols[1], n).alpha(0.5).hex()
    p.stroke(col)
    p.strokeWeight(1)
    p.line(marg, marg+i, w-marg, marg+i)
  }
}

function bgRays(x, y) {
  num = randomInt(5, 20)
  startAng = randomVal(0, 360)
  rad = radNeeded
  rayMidPt = randomVal(-0.9, 0)
  val = 255
  c.fill(255)
  c.noStroke()
  c.strokeWeight(10)
  c.beginShape()
  for(let i = 0; i < 360; i++) {
    sine = sin(i*num)
    if(sine < rayMidPt) {
      here = ptFromAng(x, y, i+startAng, rad)
    } else {
      here = ptFromAng(x, y, i+startAng, 0)
    }
    c.vertex(here.x, here.y)
  }
  c.endShape(CLOSE)
}

function bgBlots() {
  p.fill(truePal[0])
  for(let i = 0; i < 10; i++) {
    p.circle(randomVal(0, w), randomVal(0, h), randomVal(200, 500))
  }
}

function cables() {
  velocity = vel//randomVal(0.5, 2)
  dir = angBetween(center.x, center.y, w/2, h/2)
  c.fill('white')
  c.noStroke()
  dens = 5000
  expo = randomVal(0.8, 1.0)
  ns = randomVal(0.0005, 0.01)//0.005
  numCables = 20//randomInt(2, 10)
  startAng = randomVal(0, 360)
  sourceLoc = ptFromAng(center.x, center.y, dir, h*velocity)
  for(let i = 0; i < dens; i++) {
    x = map(i, 0, dens, sourceLoc.x, center.x)
    y = map(i, 0, dens, sourceLoc.y, center.y)
    rad = map(pow(i, expo), 0, pow(dens, expo), h, 0)
    spin = map(noise(i*ns), 0, 1, -40, 40)
    for(let j = 0; j < 360; j+=360/numCables) {
      xMod = cos(j+startAng+spin)*rad
      yMod = sin(j+startAng+spin)*rad
      diam = TWO_PI*(rad/8)
      sz = cableSize//map(i, 0, dens, 20, 20)//(diam/numCables)
      
      c.circle(x+xMod, y+yMod, sz)
    }
  }
}

//hexagonal grid BG (honeycomb)

//square grid BG (contrast in structure)

//offset dot matrix bg (childlike)

//interlocking sine wave bg (brainwaves)

//
