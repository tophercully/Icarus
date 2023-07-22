
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
    save(pageWidth+'x'+pageHeight+fxhash);
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

function diff (num1, num2) {
  if (num1 > num2) {
    return (num1 - num2);
  } else {
    return (num2 - num1);
  }
};

function distBetween (x1, y1, x2, y2) {
  var deltaX = diff(x1, x2);
  var deltaY = diff(y1, y2);
  var distan = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  return (distan);
};

function ptFromAng(x, y, ang, dis) {
  xC = cos(ang)*dis
  yC = sin(ang)*dis

  return createVector((x+xC), (y+yC))
}

function mycomparator(a,b) {
  return parseInt(a.distFromCenter, 10) - parseInt(b.distFromCenter, 10);
}

function ptBetween(xA, yA, xB, yB, amt) {
  xBetween = map(amt, 0, 1, xA, xB)
  yBetween = map(amt, 0, 1, yA, yB)
  betweenPos = createVector(xBetween, yBetween)
  return betweenPos
}


function pxToInch(meas) {
  return (meas/h)*pageHeight
}

function mmToPx(mm) {
  toInch = mm/25.4
  toPx = wt = (toInch/pageHeight)*h
  return toPx
}

function setStrokeMM(mm) {
  weightNow = mmToPx(mm) 
  strokeWeight(weightNow)
}

////////////////////////////////////////

function limitedSpreader(x, y) {
  // strokeWeight(1)
  strokeWeight(mmWt)
  // stroke(frameCol)
  // noStroke()
  beginShape()
  noiseMax = 50
  phase = randomVal(0, 100000000)
  phaseB = randomVal(0, 100000000)
  angNS = randomVal(0.1, 0.5)
  cancelled = false
  totalSz = 0
  inc = 360/100

  for(let i = 0 ; i < 360; i+=inc) {
    xOff = map(cos(i), -1, 1, 0, noiseMax)
    yOff = map(sin(i), -1, 1, 0, noiseMax)
    rad = 0
    radMod = constrain(map(noise(i*0.001, phase), 0, 1, 0.5, 2), 0, 1)
    edgeNoise = 1//map(noise(i*0.05, phase), 0, 1, 0.98, 1)
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
    noiseHere = ptFromAng(x, y, i, (rad*edgeNoise))
    vertex(noiseHere.x, noiseHere.y)
    totalSz += rad
  }
  if(totalSz/(360/inc) < 10) {
    cancelled = true
  }
  
  if(cancelled == false) {
    endShape(CLOSE)
  }
  
}

function limitedLines(x, y) {
  ptsA = []
  ptsB = []
  numLines = 180/randomInt(minLines, maxLines)
  startAng = randomInt(0, 360)
  // strokeCap(SQUARE)
  strokeWeight(1)
  strokeWeight(mmWt)
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
    edgeNoise = 1//map(noise(i*0.05, phase), 0, 1, 0.98, 1)
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
      line(ptsA[i].x, ptsA[i].y, ptsB[i].x, ptsB[i].y)
    }
  }
  

}

function limitedLinesFill(x, y) {
  ptsA = []
  ptsB = []
  strokeJoin(ROUND)
  numLines = 180/randomInt(minLines, maxLines)
  startAng = randomInt(0, 360)
  // strokeCap(SQUARE)
  strokeWeight(1)
  strokeWeight(mmWt)
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
    edgeNoise = 1//map(noise(i*0.05, phase), 0, 1, 0.98, 1)
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
    noFill()
    beginShape()
    lastPtA = createVector(0, 0)
    lastPtB = createVector(0, 0)
    for(let i = 0; i < 180; i+=numLines) {
      distA = distBetween(ptsA[i].x, ptsA[i].y, lastPtA.x, lastPtA.y)
      distB = distBetween(ptsB[i].x, ptsB[i].y, lastPtB.x, lastPtB.y)
      drawing = true
      lineCheck(ptsA[i].x, ptsA[i].y, ptsB[i].x, ptsB[i].y)
      if(distA > slinkyGap && drawing != false) {
        vertex(ptsA[i].x, ptsA[i].y)
        lastPtA = ptsA[i]
      }

      if(distB > slinkyGap && drawing != false) {
        vertex(ptsB[i].x, ptsB[i].y)
        lastPtB = ptsB[i]
      }
      
    }
    endShape()
  }
  
  
}

function lineCheck(xA, yA, xB, yB) {
  length = Math.round(dist(xA, yA, xB, yB))
  // console.log(length)
  drawing = true
  inTheWay = 0
  for(let i = 0; i < length/2; i++) {
    perc = map(i, 0, length/2, 0, 1)
    checkPos = ptBetween(xA, yA, xB, yB, perc)
    col = c.get(checkPos.x, checkPos.y)
    if(col[0] == 0 && drawing == true) {
      // vertex(checkPos.x, checkPos.y)
      // endShape()
      inTheWay++
    } 
    tolerance = 1
    if(inTheWay > tolerance) {
      drawing = false
    }


  }
}

function limitedRays(x, y) {
  strokeWeight(1)
  // stroke(frameCol)
  // noStroke()
  beginShape()
  numRays = randomInt(3, 20)
  rayMidPt = randomVal(-1, 1)
  depth = 0//randomVal(0, 0.9)
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
    edgeNoise = 1//map(noise(i*0.05, phase), 0, 1, 0.98, 1)
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
      vertex(noiseHere.x, noiseHere.y)
    } else {
      thisPt = midpoint(x, y, noiseHere.x, noiseHere.y, depth)
      vertex(thisPt.x, thisPt.y)
    }
    
  }
  if(totalSz/(360/10) < 2) {
    cancelled = true
  }
  if(cancelled == false) {
    endShape(CLOSE)
  }
  
}

function limitedFlower(x, y) {
  strokeWeight(1)
  // stroke(frameCol)
  // noStroke()
  beginShape()
  numPetals = randomInt(3, 15)
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
    edgeNoise = 1//map(noise(i*0.05, phase), 0, 1, 0.98, 1)
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
    
    vertex(noiseHere.x, noiseHere.y)
  }
  if(totalSz/(360/2) < 2) {
    cancelled = true
  }
  if(cancelled == false) {
    endShape(CLOSE)
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

  for(let i = 0 ; i < 360; i+=1) {
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
    noiseHere = ptFromAng(x, y, i, (rad+padding))
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
    ang = randomInt(0, 360)
    radNow = map(i, 0, numShapes, randomVal(0, shapeRad/2), radNeeded)
    here = createVector(randomVal(0, w), randomVal(0, h))//ptFromAng(center.x, center.y, ang, radNow)
      shapes[i] = new Shape(Math.floor(here.x), Math.floor(here.y), numPlaced)
      numPlaced++
  }
}

function slicer() {
  noFill()
  stroke('black')
  strokeWeight(mmWt)
  c.strokeWeight(padding)
  // c.beginShape()
  points = []
  for(let i = 0; i < splitDens*3; i++) {
    points[i] = createVector(randomVal(-w*0.25, w*1.25), randomVal(-h*0.25, h*1.25))
  }
  // beginShape()
  for(let i = 0; i < splitDens*2; i++) {
    pos = points[i]
    c.vertex(pos.x, pos.y)
    if(i != 0) {
      sometimesLine(pos.x, pos.y, points[i-1].x, points[i-1].y)
      c.line(pos.x, pos.y, points[i-1].x, points[i-1].y)
    }
    // vertex(pos.x, pos.y)
    
  }
  // c.endShape(CLOSE)
  // endShape(CLOSE)
}

function partSlicer() {
  c.strokeCap(SQUARE)
  for(let i = 0; i < splitDens*3; i++) {
    posA = createVector(randomVal(0, w), randomVal(0, h))
    posB = createVector(randomVal(0, w), randomVal(0, h))
    noFill()
    stroke('black')
    strokeWeight(mmWt)
    sometimesLine(posA.x, posA.y, posB.x, posB.y)
    c.line(posA.x, posA.y, posB.x, posB.y)
    
    // line(posA.x, posA.y, posB.x, posB.y)
  }
  
}

function circleSlicer() {
  for(let i = 0; i < splitDens*2; i++) {
    x = randomVal(0, w)
    y = randomVal(0, h)
    r = randomVal(100, 2000)//randomVal(100, 800)
    noFill()
    stroke('black')
    strokeWeight(mmWt)
    sometimesCirc(x, y, r)
    c.strokeWeight(padding)
    c.circle(x, y, r)
  }

}
function triSlicer() {

}
function rectSlicer() {
  for(let i = 0; i < splitDens; i++) {
    c.rect(randomVal(0, w), randomVal(0, h), randomVal(100, 800), randomVal(100, 800))

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


function sometimesCirc(x, y, r) {
  drawing = false
  for(let i = 0; i < 360; i++) {
    
    xPos = cos(i)*r/2
    yPos = sin(i)*r/2

    pos = createVector(x+xPos, y+yPos)
    col = c.get(pos.x, pos.y)
    // console.log(col[0])
    if(col[0] != 0 && drawing == false) {
      beginShape()
      vertex(pos.x, pos.y)
      drawing = true
    } else if(col[0] != 0 && drawing == true) {
      vertex(pos.x, pos.y)
    } else if(col[0] == 0 && drawing == true) {
      endShape()
      drawing = false
    } else if(i == 360) {
      endShape()
    }
  }
}

function sometimesLine(xA, yA, xB, yB) {
  length = Math.round(dist(xA, yA, xB, yB))
  console.log(length)
  drawing = false
  for(let i = 0; i < length/2; i++) {
    perc = map(i, 0, length/2, 0, 1)
    checkPos = ptBetween(xA, yA, xB, yB, perc)
    col = c.get(checkPos.x, checkPos.y)
    if(col[0] != 0 && drawing == false) {
      beginShape()
      vertex(checkPos.x, checkPos.y)
      drawing = true
    } else if(col[0] == 0 && drawing == true) {
      vertex(checkPos.x, checkPos.y)
      endShape()
      drawing = false
    } if(i == length) {
      // vertex(checkPos.x, checkPos.y)
      // endShape()
    }
  }
}

function cGrid() {
  c.noStroke()
  c.fill('white')
  pad = 0//mmToPx(2)
  cols = 4//randomInt(3, 10)
  rows = 6//randomInt(3, 10)
  cellH = (h-(marg*2))/rows
  cellW = (w-(marg*2))/cols
  gridRatio = randomVal(0.4, 0.6)
  deciders = []
  for(let i = 0; i < cols*rows; i++) {
    if(i < (cols*rows)*gridRatio) {
      deciders[i] = 0
    } else {
      deciders[i] = 1
    }
  }

  shuffDeciders = shuff(deciders)
  for(let y = 0; y < rows; y++) {
    chance = map(pow(y, 10), 0, pow(rows, 10), 1, 0)
    for(let x = 0; x < cols; x++) {
      index = (y*cols)+x
      decider = shuffDeciders[index]
      // decider = fxrand()
      if(decider < chance) {
        c.rect(marg+cellW*x+(cellW/2), marg+cellH*y+(cellH/2), cellW-pad, cellH-pad, 20)
      }
    }
  }
}

function rectMold() {
  // for(let i = 0; i < 10; i++) {
  //   c.noStroke()
  //   c.fill('white')
  //   wid = randomVal(400, w/2)
  //   hei = randomVal(400, h/2)
  //   here = createVector(randomVal(marg+wid/2, (w-marg)-wid/2), randomVal(marg+hei/2, (h-marg)-hei/2))
  //   c.rect(here.x, here.y, wid, hei, 100)
  // }
  
  molds = []
  for(let i = 0; i < numMolds; i++) {
    xPos = randomVal(0, 1)
    yPos = randomVal(0, 1)
    moldMeasX.push(xPos)
    moldMeasY.push(yPos)
    molds[i] = new Mold(xPos, yPos, randomVal(200, (w-(marg*2))/2), randomVal(200, (h-(marg*2))/2))
  }

  for(let i = 0; i < numMolds; i++) {
    c.noStroke()
    c.fill('white')
    molds[i].showRect()
  }
}

function circMold() {
  // for(let i = 0; i < 10; i++) {
  //   c.noStroke()
  //   c.fill('white')
  //   wid = randomVal(400, w/2)
  //   hei = randomVal(400, h/2)
  //   here = createVector(randomVal(marg+wid/2, (w-marg)-wid/2), randomVal(marg+hei/2, (h-marg)-hei/2))
  //   c.circle(here.x, here.y, min([wid, hei]))
  // }

  molds = []
  for(let i = 0; i < numMolds; i++) {
    xPos = randomVal(0, 1)
    yPos = randomVal(0, 1)
    moldMeasX.push(xPos)
    moldMeasY.push(yPos)
    sz = randomVal(400, (w-(marg*2))/2)
    molds[i] = new Mold(xPos, yPos, sz, sz)
  }

  for(let i = 0; i < numMolds; i++) {
    c.noStroke()
    c.fill('white')
    molds[i].showCirc()
  }
}

function triMold() {
  // for(let i = 0; i < 10; i++) {
  //   c.noStroke()
  //   c.fill('white')
  //   wid = randomVal(400, w/2)
  //   hei = randomVal(400, h/2)
  //   here = createVector(randomVal(marg+wid/2, (w-marg)-wid/2), randomVal(marg+hei/2, (h-marg)-hei/2))
  //   cTri(here.x, here.y, min([wid, hei]))
  // }
  
  molds = []
  for(let i = 0; i < numMolds; i++) {
    xPos = randomVal(0, 1)
    yPos = randomVal(0, 1)
    moldMeasX.push(xPos)
    moldMeasY.push(yPos)
    sz = randomVal(400, (w-(marg*2))/2)
    molds[i] = new Mold(xPos, yPos, sz, sz)
  }

  for(let i = 0; i < numMolds; i++) {
    c.noStroke()
    c.fill('white')
    molds[i].showTri()
  }
}

function cTri(x, y, r) {
  orient = (180*randomInt(0, 3))+90
  c.beginShape()
  for(let i = -orient; i < orient; i+=360/3) {
    xPos = cos(i)*r/2
    yPos = sin(i)*r/2
    nextXPos = cos(i+120)*r
    nextYPos = sin(i+120)*r
    c.vertex(x+xPos, y+yPos)
    // sometimesLine(x+xPos, y+yPos, x+nextXPos, y+nextYPos)
  }
  c.endShape()
}

function flowerMold() {
  c.noStroke()
  c.fill('white')
  x = w/2
  y = h/2
  r = w/2
  numPetals = randomInt(3, 10)
  expo = randomVal(0.75, 0.1)
  startAng = randomVal(0, 360)
  cent = randomVal(0, 0.5)
  c.beginShape()
  for(let i = 0; i < 360; i++) {
    flowMod = map(sin(i*numPetals), -1, 1, 0, 1)
    expoFlow = map(pow(flowMod, expo), 0, pow(1, expo), cent, 1)
    xPos = cos(i+startAng)*r*expoFlow
    yPos = sin(i+startAng)*r*expoFlow
    c.vertex(x+xPos, y+yPos)
  }
  c.endShape()
}

function invFlowerMold() {
  c.noStroke()
  c.fill('white')
  x = w/2//randomVal(0, w)
  y = h/2//randomVal(0, h)
  r = w/2
  wid = w/2
  hei = h/2
  numPetals = randomInt(3, 30)
  expo = 10//randomVal(0.75, 0.1)
  cent = randomVal(0, 0.5)
  startAng = randomVal(0, 360)
  c.beginShape()
  for(let i = 0; i < 360; i++) {
    flowMod = map(sin(i*numPetals), -1, 1, 1, 0)
    expoFlow = map(pow(flowMod, expo), 0, pow(1, expo), 1, cent)
    xPos = cos(i+startAng)*wid*expoFlow
    yPos = sin(i+startAng)*hei*expoFlow
    c.vertex(x+xPos, y+yPos)
  }
  c.endShape()
}