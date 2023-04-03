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
    save("Icarus.png");
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
  if (key === "t" || key === "T") {
    if(textured == true) {
      textured = false
    } else if( textured == false) {
      textured = true
    }
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

function limitedSpreader(x, y) {
  p.strokeWeight(1)
  p.stroke(frameCol)
  p.noStroke()
  p.beginShape()
  noiseMax = 50
  phase = randomVal(0, 100000000)
  phaseB = randomVal(0, 100000000)
  angNS = randomVal(0.1, 0.5)
  cancelled = false
  totalSz = 0
  inc = 360/20

  for(let i = 0 ; i < 360; i+=inc) {
    xOff = map(cos(i), -1, 1, 0, noiseMax)
    yOff = map(sin(i), -1, 1, 0, noiseMax)
    rad = 0
    radMod = constrain(map(noise(i*0.001, phase), 0, 1, 0.5, 2), 0, 1)
    edgeNoise = map(noise(i*0.05, phase), 0, 1, 0.98, 1)
    tripped = false
    while(tripped == false) {
      rad += 1
      here = ptFromAng(x, y, i, rad)
      colBase = c.get((here.x), here.y)
      colCheck = colBase[0]
      if(colCheck == 0) {
        tripped = true
        rad -= 0
        here = ptFromAng(x, y, i, rad)
        
      }
    }
    noiseHere = ptFromAng(x, y, i, (rad*edgeNoise)+padding)
    p.vertex(noiseHere.x, noiseHere.y)
    totalSz += rad
  }
  if(totalSz/(360/inc) < 10) {
    cancelled = true
  }
  
  if(cancelled == false) {
    p.endShape(CLOSE)
  }
  
}

function limitedLines(x, y) {
  ptsA = []
  ptsB = []
  numLines = 180/randomInt(5, 20)
  startAng = randomInt(0, 360)
  p.strokeCap(SQUARE)
  p.strokeWeight(randomVal(1, 5))
  noiseMax = 50
  phase = randomVal(0, 100000000)
  phaseB = randomVal(0, 100000000)
  angNS = randomVal(0.1, 0.5)
  cancelled = false
  totalSz = 0

  for(let i = 0 ; i < 180; i+=numLines) {
    xOff = map(cos(i), -1, 1, 0, noiseMax)
    yOff = map(sin(i), -1, 1, 0, noiseMax)
    rad = 0
    rad2 = 0
    radMod = constrain(map(noise(i*0.001, phase), 0, 1, 0.5, 2), 0, 1)
    edgeNoise = map(noise(i*0.05, phase), 0, 1, 0.98, 1)
    tripped = false
    tripped2 = false
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
    totalSz += rad
    noiseHere = ptFromAng(x, y, i, (rad*edgeNoise))
    ptsA[i] = here
  }

  for(let i = 0 ; i < 180; i+=numLines) {
    xOff = map(cos(i), -1, 1, 0, noiseMax)
    yOff = map(sin(i), -1, 1, 0, noiseMax)
    rad = 0
    rad2 = 0
    radMod = constrain(map(noise(i*0.001, phase), 0, 1, 0.5, 2), 0, 1)
    edgeNoise = map(noise(i*0.05, phase), 0, 1, 0.98, 1)
    tripped = false
    tripped2 = false
    while(tripped == false) {
      rad += 1
      here = ptFromAng(x, y, -i, rad)
      colBase = c.get(here.x, here.y)
      colCheck = colBase[0]
      if(colCheck == 0) {
        tripped = true
        rad -= 0
        here = ptFromAng(x, y, -i, rad)
        
      }
    }
    totalSz += rad
    noiseHere = ptFromAng(x, y, -i, (rad*edgeNoise))
    ptsB[i] = here
  }

  if(totalSz/(180/numLines) < 10) {
    cancelled = true
  }
  if(cancelled == false) {
    for(let i = 0; i < 180; i+=numLines) {
      p.line(ptsA[i].x, ptsA[i].y, ptsB[i].x, ptsB[i].y)
    }
  }
  

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
  cancelled = false
  totalSz = 0
 
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
    totalSz += rad
    noiseHere = ptFromAng(x, y, i, (rad*edgeNoise))
    if(sine < rayMidPt) {
      p.vertex(noiseHere.x, noiseHere.y)
    } else {
      thisPt = midpoint(x, y, noiseHere.x, noiseHere.y, depth)
      p.vertex(thisPt.x, thisPt.y)
    }
    
  }
  if(totalSz/(360/10) < 2) {
    cancelled = true
  }
  if(cancelled == false) {
    p.endShape(CLOSE)
  }
  
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
  cancelled = false
  totalSz = 0
  
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
    totalSz += rad
    noiseHere = ptFromAng(x, y, i, (rad*edgeNoise)*flowMod)
    
    p.vertex(noiseHere.x, noiseHere.y)
  }
  if(totalSz/(360/2) < 2) {
    cancelled = true
  }
  if(cancelled == false) {
    p.endShape(CLOSE)
  }
}

function removeOption(x, y) {
  c.strokeWeight(1)
  c.fill('black')
  c.noStroke()
  c.beginShape()
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
    noiseHere = ptFromAng(x, y, i, (rad+10))
    c.vertex(noiseHere.x, noiseHere.y)
  }
  c.endShape(CLOSE)
}

function placer() {
  numPlaced = 0
  tries = 0
  samp = []
  ang = 0
  foundPt = false
  for(let i = 0 ; i < numShapes; i++) {
    ang = randomInt(dir+55, dir-55)
    radNow = map(i, 0, numShapes, randomVal(0, shapeRad/2), radNeeded)
    here = ptFromAng(center.x, center.y, ang, radNow)
      shapes[i] = new Shape(Math.floor(here.x), Math.floor(here.y), numPlaced)
      numPlaced++
  }
}

function slicer() {
  c.beginShape()
  for(let i = 0; i < splitDens; i++) {
    c.curveVertex(randomVal(-w*0.25, w*1.25), randomVal(-h*0.25, h*1.25))
  }
  c.endShape(CLOSE)
}

function partSlicer() {
  for(let i = 0; i < splitDens; i++) {
    c.line(randomVal(0, w), randomVal(0, h), randomVal(0, w), randomVal(0, h))
  }
}

function circleSlicer() {
  for(let i = 0; i < splitDens; i++) {
    c.circle(randomVal(0, w), randomVal(0, h), randomVal(100, 800))
  }
}

function shaper(x, y, r) {
  numSides = randomInt(3, 5)
  startAng = angBetween(w/2, h/2, center.x, center.y)
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

function cables() {
  velocity = vel
  startSz = h*randomVal(0.75, 1.5)
  c.fill('white')
  c.noStroke()
  dens = 5000
  expo = randomVal(0.775, 1.0)
  ns = randomVal(0.0005, 0.01)
  numCables = randomInt(8, 30)
  startAng = randomInt(0, 360)
  sourceLoc = ptFromAng(center.x, center.y, dir, startSz*velocity)
  for(let i = 0; i < dens; i++) {
    x = map(i, 0, dens, sourceLoc.x, center.x)
    y = map(i, 0, dens, sourceLoc.y, center.y)
    rad = map(pow(i, expo), 0, pow(dens, expo), startSz, 0)
    spin = map(noise(i*ns), 0, 1, -40, 40)
    if(i == Math.round(dens*0.75)) {
      c.push()
      port = ptFromAng(x, y, dir-90, rad*2)
      starboard = ptFromAng(x, y, dir+90, rad*2)
      front = ptFromAng(center.x, center.y, dir, 100)
      back = ptFromAng(center.x, center.y, dir, startSz*randomVal(0.15, 0.25))
      c.quad(front.x, front.y, starboard.x, starboard.y, back.x, back.y, port.x, port.y)
      c.pop()
    }
    for(let j = 0; j < 360; j+=360/numCables) {
      xMod = cos(j+startAng+spin)*rad
      yMod = sin(j+startAng+spin)*rad
      diam = TWO_PI*(rad/8)
      sz = cableSize
      
      c.circle(x+xMod, y+yMod, sz)
    }
  }
}

function marbled() {
  dens = 4000
  col = skyCol
  p.fill(chroma(col).alpha((0.025)+randomVal(0.0001, -0.0001)).hex())
  p.noStroke()
  for(let i = 0; i < dens; i++) {
    here = createVector(randomVal(0, w), randomVal(0, h))
    p.circle(here.x, here.y, randomVal(100, 400))
  }
}

//show a bit of the horizon with some curvature
function horizon() {
  p.fill(chroma('black').alpha(0.05).hex())
  horiz = h*randomVal(0.5, 0.85)
  p.beginShape()
  p.vertex(0, horiz)
  p.curveVertex(0, horiz)
  p.curveVertex(w/2, horiz-30)
  p.curveVertex(w, horiz)
  p.curveVertex(w, horiz)
  p.vertex(w, h)
  p.vertex(0, h)
  p.vertex(0, horiz)

  p.endShape(CLOSE)
}