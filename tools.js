
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
  if (key === "v" || key === "V") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "renderType", "2"));
    window.location.reload();
  }
  if (key === "p" || key === "P") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "renderType", "1"));
    window.location.reload();
  }
  if (key === "w" || key === "W") {
    window.history.replaceState('', '', updateURLParameter(window.location.href, "penSize", "35"));
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
  return plotPal[randomInt(0, plotPal.length-1)]
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

function setPen(pen) {
  stroke(pen.hex)
  if(url.searchParams.has('penSize') == true) {
    penSize = (url.searchParams.get('penSize'))/100
  } else {
    mmWt = mmToPx(pen.sz)
  }
  strokeWeight(mmWt)
  slinkyGap = mmToPx(pen.sz*0.5)
}

////////////////////////////////////////

function slinkyFill(x, y, valA) {
  ptsA = []
  ptsB = []
  startAng = map(valA, 0, 1, 0, 360)
  numLines = 180/200
  cancelled = false
  totalSz = 0

  //left space
  tries = 0
  trippedLeft = false
  nowPos = createVector(x, y)
  colCheck = c.get(nowPos.x, nowPos.y)[0]
  rad = 0
  while(trippedLeft == false) {
    rad+=2
    nowPos = ptFromAng(x, y, -180, rad)
    colCheck = c.get(nowPos.x, nowPos.y)[0]
    if(colCheck != 255) {
      trippedLeft = true
      leftPt = nowPos
    }
  }
  //right space
  tries = 0
  trippedRight = false
  nowPos = createVector(x, y)
  rad = 0
  while(trippedRight == false) {
    rad+=2
    nowPos = ptFromAng(x, y, 0, rad)
    colCheck = c.get(nowPos.x, nowPos.y)[0]
    colCheck = c.get(nowPos.x, nowPos.y)[0]
    if(colCheck != 255) {
      trippedRight = true
      rightPt = nowPos
    }
  }
  //top space
  tries = 0
  trippedTop = false
  nowPos = createVector(x, y)
  colCheck = c.get(nowPos.x, nowPos.y)[0]
  rad = 0
  while(trippedTop == false) {
    rad+=2
    nowPos = ptFromAng(x, y, -90, rad)
    colCheck = c.get(nowPos.x, nowPos.y)[0]
    if(colCheck != 255) {
      trippedTop = true
      topPt = nowPos
    }
  }
  //bottom space
  tries = 0
  trippedBot = false
  nowPos = createVector(x, y)
  colCheck = c.get(nowPos.x, nowPos.y)[0]
  rad = 0
  while(trippedBot == false) {
    rad+=2
    nowPos = ptFromAng(x, y, 90, rad)
    colCheck = c.get(nowPos.x, nowPos.y)[0]
    if(colCheck != 255) {
      trippedBot = true
      botPt = nowPos
    }
  }

  centX = ptBetween(leftPt.x, leftPt.y, rightPt.x, rightPt.y, 0.5).x
  centY = ptBetween(topPt.x, topPt.y, botPt.x, botPt.y, 0.5).y
  x = centX 
  y = centY
  
  for(let i = 0 ; i < 180; i+=numLines) {
    rad = 0
    tripped = false
    while(tripped == false) {
      rad += 2
      here = ptFromAng(x, y, startAng+i, rad)
      colBase = c.get(here.x, here.y)
      colCheck = colBase[0]
      if(colCheck != 255) {
        tripped = true
        rad -= 0
        here = ptFromAng(x, y, startAng+i, rad)
      }
    }
    totalSz += rad
    noiseHere = ptFromAng(x, y, startAng+i, rad)
    ptsA[i] = here
  }

  for(let i = 0 ; i < 180; i+=numLines) {
    rad = 0
    tripped = false
    while(tripped == false) {
      rad += 2
      here = ptFromAng(x, y, startAng-i, rad)
      colBase = c.get(here.x, here.y)
      colCheck = colBase[0]
      if(colCheck != 255) {
        tripped = true
        rad -= 0
        here = ptFromAng(x, y, startAng-i, rad)
      }
    }
    totalSz += rad
    noiseHere = ptFromAng(x, y, startAng-i, rad)
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
    curveTightness(0.9)
    for(let i = 0; i < 180; i+=numLines) {
      distA = distBetween(ptsA[i].x, ptsA[i].y, lastPtA.x, lastPtA.y)
      distB = distBetween(ptsB[i].x, ptsB[i].y, lastPtB.x, lastPtB.y)
      drawing = true
      lineCheck(ptsA[i].x, ptsA[i].y, ptsB[i].x, ptsB[i].y)
      if(distA > slinkyGap && drawing != false) {
        curveVertex(ptsA[i].x, ptsA[i].y)
        lastPtA = ptsA[i]
      }

      if(distB > slinkyGap && drawing != false) {
        curveVertex(ptsB[i].x, ptsB[i].y)
        lastPtB = ptsB[i]
      }
      
    }
    endShape()
    removeOption(x, y)
  }
  
  
}



function lineCheck(xA, yA, xB, yB) {
  length = Math.round(dist(xA, yA, xB, yB))
  drawing = true
  inTheWay = 0
  for(let i = 0; i < length/2; i++) {
    perc = map(i, 0, length/2, 0, 1)
    checkPos = ptBetween(xA, yA, xB, yB, perc)
    col = c.get(checkPos.x, checkPos.y)
    if(col[0] == 0 && drawing == true) {
      
      inTheWay++
    } 
    tolerance = 1
    if(inTheWay > tolerance) {
      drawing = false
    }


  }
}



function removeOption(x, y) {
  c.strokeWeight(1)
  c.fill(0)
  c.noStroke()
  c.beginShape()

  for(let i = 0 ; i < 360; i+=1) {
    rad = 0
    tripped = false
    while(tripped == false) {
      rad += 1
      here = ptFromAng(x, y, i, rad)
      colBase = c.get(here.x, here.y)
      colCheck = colBase[0]
      if(colCheck != 255) {
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
  cols = splitDens
  rows = splitDens
  cellH = (h-(marg*2))/rows
  cellW = (w-(marg*2))/cols
  for(let y = 0; y < cols; y++) {
    for(let x = 0; x < rows; x++) {
      colNum = randomInt(0, 1)
      valA = fxrand()
      here = createVector(Math.floor(marg+x*cellW+(cellW/2)), Math.floor(marg+y*cellH+(cellH/2)))
      if(c.get(here.x, here.y)[0] == 255) {
        thisShape = new Shape(here.x, here.y, colNum, valA)
        shapes.push(thisShape)
      }
      numPlaced++
    }
  }
  numShapes = shapes.length-1
}

function slicer() {
  noFill()
  setPen(black)
  c.strokeWeight(padding)

  points = []
  xPts = shuff([0, w])
  yPts = shuff([0, h])
  expoX = randomVal(minExpo, maxExpo)
  expoY = randomVal(minExpo, maxExpo)
  for(let i = 0; i < splitDens*3; i++) {
    points[i] = createVector(map(pow(fxrand(), expoX), 0, pow(1, expoX), 0, w), map(pow(fxrand(), expoY), 0, pow(1, expoY), 0, h))
  }

  for(let i = 0; i < splitDens*2; i++) {
    pos = points[i]
    c.vertex(pos.x, pos.y)
    if(i != 0) {
      plotLine(pos.x, pos.y, points[i-1].x, points[i-1].y, 255)
      c.line(pos.x, pos.y, points[i-1].x, points[i-1].y)
    }
    
  }

}

function slicerSym() {
  noFill()
  setPen(black)
  c.strokeWeight(padding)
  
  points = []
  symPoints = []
  xPts = shuff([0, w])
  yPts = shuff([0, h])
  expoX = randomVal(0.333, 3)
  expoY = randomVal(0.333, 3)
  for(let i = 0; i < splitDens*1.5; i++) {
    points[i] = createVector(map(pow(fxrand(), expoX), 0, pow(1, expoX), xPts[0], xPts[1]), map(pow(fxrand(), expoY), 0, pow(1, expoY), yPts[0], yPts[1]))
  }
  

  for(let i = 0; i < splitDens; i++) {
    pos = points[i]

    if(i != 0) {
      plotLine(pos.x, pos.y, points[i-1].x, points[i-1].y, 255)
      plotLine(w-pos.x, pos.y, w-points[i-1].x, points[i-1].y, 255)

      c.line(pos.x, pos.y, points[i-1].x, points[i-1].y)
      c.line(w-pos.x, pos.y, w-points[i-1].x, points[i-1].y)
    }

    if(i != 0) {
      
    }
    
  }
}

function circleSlicer() {
  xPts = shuff([0, w])
  yPts = shuff([0, h])
  expoX = randomVal(minExpo, maxExpo)
  expoY = randomVal(minExpo, maxExpo)
  for(let i = 0; i < splitDens*2; i++) {
    x = map(pow(fxrand(), expoX), 0, pow(1, expoX), xPts[0], xPts[1])
    y = map(pow(fxrand(), expoY), 0, pow(1, expoY), yPts[0], yPts[1])
    r = randomVal(100, 1000)
    expoR = map(pow(fxrand(), expoX), 0, pow(1, expoX), 0, w)

    noFill()
    setPen(black)
    plotCirc(x, y, r, 255)
    c.strokeWeight(padding)
    c.circle(x, y, r)
  }

}

function circleSlicerSym() {
  xPts = shuff([0, w])
  yPts = shuff([0, h])
  expoX = randomVal(minExpo, maxExpo)
  expoY = randomVal(minExpo, maxExpo)
  for(let i = 0; i < splitDens; i++) {
    x = map(pow(fxrand(), expoX), 0, pow(1, expoX), xPts[0], xPts[1])
    y = map(pow(fxrand(), expoY), 0, pow(1, expoY), yPts[0], yPts[1])
    r = randomVal(100, 1000)
    expoR = map(pow(fxrand(), expoX), 0, pow(1, expoX), 0, w)

    
    noFill()
    setPen(black)
    plotCirc(x, y, r, 255)
    plotCirc(w-x, y, r, 255)
    c.noFill()
    c.strokeWeight(padding)
    c.circle(x, y, r)
    c.circle(w-x, y, r)

  }

}

function squareSlicer() {
  xPts = shuff([0, w])
  yPts = shuff([0, h])
  expoX = randomVal(minExpo, maxExpo)
  expoY = randomVal(minExpo, maxExpo)
  
  for(let i = 0; i < splitDens*2; i++) {
    x = map(pow(fxrand(), expoX), 0, pow(1, expoX), xPts[0], xPts[1])
    y = map(pow(fxrand(), expoY), 0, pow(1, expoY), yPts[0], yPts[1])
    r = randomVal(100, 1000)
    expoR = map(pow(fxrand(), expoX), 0, pow(1, expoX), 0, w)


    noFill()
    setPen(black)
    c.strokeWeight(padding)
    plotRect(x, y, r, r, 255)
    c.square(x, y, r)
  }
  

}

function diamondSlicer() {
  xPts = shuff([0, w])
  yPts = shuff([0, h])
  expoX = randomVal(minExpo, maxExpo)
  expoY = randomVal(minExpo, maxExpo)
  for(let i = 0; i < splitDens*2; i++) {
    x = map(pow(fxrand(), expoX), 0, pow(1, expoX), xPts[0], xPts[1])
    y = map(pow(fxrand(), expoY), 0, pow(1, expoY), yPts[0], yPts[1])
    r = randomVal(100, 1000)
    expoR = map(pow(fxrand(), expoX), 0, pow(1, expoX), 0, w)


    noFill()
    setPen(black)
    c.strokeWeight(padding)
    plotDiamond(x, y, r, r, 255)
    c.push()
    c.translate(x, y)
    c.rotate(45)
    c.square(0, 0, r)
    c.pop()
  }
  

}

function diamondSlicerSym() {
  xPts = shuff([0, w])
  yPts = shuff([0, h])
  expoX = randomVal(minExpo, maxExpo)
  expoY = randomVal(minExpo, maxExpo)
  for(let i = 0; i < splitDens; i++) {
    x = map(pow(fxrand(), expoX), 0, pow(1, expoX), xPts[0], xPts[1])
    y = map(pow(fxrand(), expoY), 0, pow(1, expoY), yPts[0], yPts[1])
    r = randomVal(100, 1000)
    expoR = map(pow(fxrand(), expoX), 0, pow(1, expoX), 0, w)

   
    noFill()
    setPen(black)
    c.strokeWeight(padding)
    plotDiamond(x, y, r, r, 255)
    plotDiamond(w-x, y, r, r, 255)
    c.push()
    c.translate(x, y)
    c.rotate(45)
    c.square(0, 0, r)
    c.pop()
    c.push()
    c.translate(w-x, y)
    c.rotate(45)
    c.square(0, 0, r)
    c.pop()
  }
  

}

function squareSlicerSym() {
  xPts = shuff([0, w])
  yPts = shuff([0, h])
  expoX = randomVal(minExpo, maxExpo)
  expoY = randomVal(minExpo, maxExpo)
  
  for(let i = 0; i < splitDens; i++) {
    x = map(pow(fxrand(), expoX), 0, pow(1, expoX), xPts[0], xPts[1])
    y = map(pow(fxrand(), expoY), 0, pow(1, expoY), yPts[0], yPts[1])
    
    r = randomVal(100, 1000)
    expoR = map(pow(fxrand(), expoX), 0, pow(1, expoX), 0, w)

  
    setPen(black)
    strokeWeight(mmWt)
    c.strokeWeight(padding)
    plotRect(x, y, r, r, 255)
    plotRect(w-x, y, r, r, 255)
    c.square(x, y, r)
    c.square(w-x, y, r)
  }
}

function cPlotRect(x, y, wid, hei, val) {
  drawing = false
  for(let i = 0; i < 360*1.5; i++) {
    squareMod = min(1 / abs(cos(i)), 1 / abs(sin(i)))

    xPos = (cos(i)*wid/2)*squareMod
    yPos = (sin(i)*hei/2)*squareMod

    pos = createVector(x+xPos, y+yPos)
    col = c.get(pos.x, pos.y)
    if(pos.x > marg && pos.x < w-marg && pos.y > marg && pos.y < h-marg) {
      inBounds = true
    } else {
      inBounds = false
    }

    if(col[0] == val && drawing == false && inBounds == true) {
      c.beginShape()
      c.vertex(pos.x, pos.y)
      drawing = true
    } else if(col[0] == val && drawing == true && inBounds == true) {
      c.vertex(pos.x, pos.y)
    } else if(col[0] != val && drawing == true) {
      c.endShape()
      drawing = false
    } else if(i == 360 && drawing == true) {
      c.vertex(pos.x, pos.y)
      c.endShape()
      drawing = false
    }
  }
  endShape()
}



function pack() {
  circs = []
  pad = 15
  num = 50
  numFound = 0
  tries = 0
  while(numFound < num) {
    r = randomVal(100, 800)
    x = randomVal(marg+r/2, w-(marg+r/2))
    y = randomVal(marg+r/2, h-(marg+r/2))
    here = new CircObjMold(x, y, r)
    if(numFound == 0) {
      circs.push(here)
      numFound++
    } else {
      safe = true
      for(let i = 0; i < circs.length; i++) {
        other = circs[i]
        thisDist = distBetween(here.pos.x, here.pos.y, other.pos.x, other.pos.y)
        minDis = ((here.r+other.r)/2)

        if(thisDist-pad < minDis && safe == true) {
          safe = false
        } 
      }
  
      if(safe == true) {
        circs.push(here)
        console.log('found one')
        numFound++
      } else {
        tries++
        if(tries > 1000) {
          num = numFound
        }
      }
    }
  }

  for(let i = 0; i < circs.length-1; i++) {
    circs[i].showCirc()
  }
  console.log(circs.length)
}



function cPlotLine(xA, yA, xB, yB, val) {
  length = Math.round(dist(xA, yA, xB, yB))
  drawing = false
  for(let i = 0; i < length; i++) {
    perc = map(i, 0, length, 0, 1)
    checkPos = ptBetween(xA, yA, xB, yB, perc)
    col = c.get(checkPos.x, checkPos.y)
    if(col[0] == val && drawing == false) {
      c.beginShape()
      c.vertex(checkPos.x, checkPos.y)
      drawing = true
    } else if(col[0] != val && drawing == true) {
      c.vertex(checkPos.x, checkPos.y)
      c.endShape()
      drawing = false
    } if(i == length) {
      c.vertex(checkPos.x, checkPos.y)
      c.endShape()
    }
  }
}

function cGrid() {
  c.noStroke()
  c.fill('white')
  pad = 0
  cols = randomInt(3, 12)
  rows = randomInt(3, 12)
  cellH = (h-(marg*2))/rows
  cellW = (w-(marg*2))/cols
  gridRatio = randomVal(0.333, 0.666)
  cornerRound = min([cellW, cellH])*randomVal(0.0, 0.3)
  deciders = []
  
  chance = 0.5
  blankChance = 0.333
  ns = randomVal(4, 10)
  nsB = 4
  phaseB = randomInt(0, 100000000000)

  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      xNormal = map(x, 0, cols, 0, 1)
      yNormal = map(y, 0, rows, 0, 1)
      n = noise(xNormal*ns, yNormal*ns)
      nB = noise(xNormal*nsB, yNormal*nsB, phaseB)
      index = (y*cols)+x
      if(n < chance) {
        c.rect(marg+cellW*x+(cellW/2), marg+cellH*y+(cellH/2), cellW-pad, cellH-pad, cornerRound)
      }

      if(nB < blankChance) {
        c.push()
        c.fill('gray')
        c.rect(marg+cellW*x+(cellW/2), marg+cellH*y+(cellH/2), cellW, cellH)
        c.pop()
      }
    }
  }
}

function plusMin(x, y, r) {
  decider = fxrand()
  offAng = 0
  if(decider > 0.875) {
    offAng = 45
  }
  left = ptFromAng(x, y, 180+offAng, r*0.35)
  right = ptFromAng(x, y, 0+offAng, r*0.35)
  up = ptFromAng(x, y, -90+offAng, r*0.35)
  down = ptFromAng(x, y, 90+offAng, r*0.35)
  setPen(black)
  
  if(decider > 0.5) {
    plotLine(left.x, left.y, right.x, right.y, 0)
  }
  if(decider > 0.75) {
    plotLine(up.x, up.y, down.x, down.y, 0)
  }
  
  plotRing(x, y, r, r*0.95, false, 0)
  
}

function bgConcentric() {
  numLayers = randomInt(50, 80)
  accent = randomInt(0, 19)
  expoType = fxrand()
  if(expoType > 0.5) {
    expo = randomVal(3, 6)
  } else {
    expo = randomVal(0.5, 0.75)
  }
  endPos = createVector(randomVal(marg, w-marg), randomVal(marg, h-marg))
  for(let i = 0; i < numLayers; i++) {

    mod = map(pow(i, expo), 0, pow(numLayers, expo), 0, 1)
    pos = createVector(map(mod, 0, 1, w/2, endPos.x), map(mod, 0, 1, h/2, endPos.y))
    
    if(fxrand() < 0.25) {
      setPen(plotPal[randomInt(0, plotPal.length-1)])
    } else {
      setPen(black)
    }
    plotCirc(pos.x, pos.y, (h)*(1-mod), 0)
  }
}

function bgConcentricOval() {
  numLayers = randomInt(50, 80)
  accent = randomInt(0, 19)
  expoType = fxrand()
  if(expoType > 0.5) {
    expo = randomVal(4, 8)
  } else {
    expo = randomVal(0.25, 0.5)
  }
  endPos = createVector(randomVal(marg, w-marg), randomVal(marg, h-marg))

  for(let i = 0; i < numLayers; i++) {

    mod = map(pow(i, expo), 0, pow(numLayers, expo), 0, 1)
    pos = createVector(map(mod, 0, 1, w/2, endPos.x), map(mod, 0, 1, h/2, endPos.y))
    
    if(fxrand() < 0.25) {
      setPen(plotPal[randomInt(0, plotPal.length-1)])
    } else {
      setPen(black)
    }
    plotOval(pos.x, pos.y, (w*1.25)*(1-mod), (h*1.25)*(1-mod), 0)
  }
}

function bgConcentricRect() {
  numLayers = randomInt(50, 80)
  accent = randomInt(0, 19)
  expoType = fxrand()
  if(expoType > 0.5) {
    expo = randomVal(4, 8)
  } else {
    expo = randomVal(0.25, 0.5)
  }
  endPos = createVector(randomVal(marg, w-marg), randomVal(marg, h-marg))

  for(let i = 0; i < numLayers; i++) {

    mod = map(pow(i, expo), 0, pow(numLayers, expo), 0, 1)
    pos = createVector(map(mod, 0, 1, w/2, endPos.x), map(mod, 0, 1, h/2, endPos.y))
    
    if(fxrand() < 0.25) {
      setPen(plotPal[randomInt(0, plotPal.length-1)])
    } else {
      setPen(black)
    }
    plotRect(pos.x, pos.y, (w)*(1-mod), (h)*(1-mod), 0)
  }
}

function bgGrid(dens) {
  
  xPos = randomVal(marg, w-marg)
  yPos = randomVal(marg, h-marg)
  cols = randomInt(10, 25)
  rows = randomInt(10, 25)
  
  cellW = (w-(marg*2))/cols
  cellH = (h-(marg*2))/rows
  pad = min([cellW, cellH])*dens
  numMissed = (cols*rows)*randomVal(0.75, 0.85)
  misses = []
  ns = randomVal(1, 5)
  accentNum = randomInt(0, cols*rows)
  for(let i = 0; i < numMissed; i++) {
    misses[i] = randomInt(0, cols*rows)
  }
  
  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      xNormal = map(x, 0, cols, 0, 1)
      yNormal = map(y, 0, rows, 0, 1)
      n = noise(xNormal*ns, yNormal*ns)
      index = (y*cols)+x
      missed = false
      for(let i = 0; i < misses.length-1; i++) {
        if(misses[i] == index) {
          missed = true
        }
      }
      if(fxrand() < 0.25) {
        setPen(plotPal[randomInt(0, plotPal.length-1)])
      } else {
        setPen(black)
      }

      if(n > 0.5) {
        if(fxrand() < 0.5) {
          plotRectFill((marg)+x*cellW+(cellW/2), (marg)+y*cellH+(cellH/2), cellW-pad, cellH-pad, 0)
        } else {
          plotRect((marg)+x*cellW+(cellW/2), (marg)+y*cellH+(cellH/2), cellW-pad, cellH-pad, 0)
        }
      }
    }
  }
}

function bgSquareGrid(dens) {
  
  xPos = randomVal(marg, w-marg)
  yPos = randomVal(marg, h-marg)
  cols = randomInt(10, 25)
  rows = Math.floor(cols*ratio)
  
  cellW = (w-(marg*2))/cols
  cellH = (h-(marg*2))/rows
  pad = min([cellW, cellH])*dens
  numMissed = (cols*rows)*randomVal(0.75, 0.85)
  misses = []
  ns = randomVal(1, 5)
  accentNum = randomInt(0, cols*rows)
  for(let i = 0; i < numMissed; i++) {
    misses[i] = randomInt(0, cols*rows)
  }
  
  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      xNormal = map(x, 0, cols, 0, 1)
      yNormal = map(y, 0, rows, 0, 1)
      n = noise(xNormal*ns, yNormal*ns)
      index = (y*cols)+x
      missed = false
      for(let i = 0; i < misses.length-1; i++) {
        if(misses[i] == index) {
          missed = true
        }
      }
      if(fxrand() < 0.25) {
        setPen(plotPal[randomInt(0, plotPal.length-1)])
      } else {
        setPen(black)
      }

      if(n > 0.5) {
        if(fxrand() < 0.5) {
          plotRectFill((marg)+x*cellW+(cellW/2), (marg)+y*cellH+(cellH/2), cellW-pad, cellH-pad, 0)
        } else {
          plotRect((marg)+x*cellW+(cellW/2), (marg)+y*cellH+(cellH/2), cellW-pad, cellH-pad, 0)
        }
      }
    }
  }
}

function bgOvalGrid(dens) {
  
  xPos = randomVal(marg, w-marg)
  yPos = randomVal(marg, h-marg)
  cols = randomInt(10, 25)
  rows = randomInt(10, 25)
  
  cellW = (w-(marg*2))/cols
  cellH = (h-(marg*2))/rows
  pad = min([cellW, cellH])*dens
  numMissed = (cols*rows)*randomVal(0.75, 0.85)
  misses = []
  accentNum = randomInt(0, cols*rows)
  for(let i = 0; i < numMissed; i++) {
    misses[i] = randomInt(0, cols*rows)
  }
  ns = randomVal(1, 5)
  
  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      xNormal = map(x, 0, cols, 0, 1)
      yNormal = map(y, 0, rows, 0, 1)
      n = noise(xNormal*ns, yNormal*ns)
      index = (y*cols)+x
      missed = false
      for(let i = 0; i < misses.length-1; i++) {
        if(misses[i] == index) {
          missed = true
        }
      }
      if(fxrand() < 0.25) {
        setPen(plotPal[randomInt(0, plotPal.length-1)])
      } else {
        setPen(black)
      }

      if(n > 0.5) {
        plotOval((marg)+x*cellW+(cellW/2), (marg)+y*cellH+(cellH/2), cellW-pad, cellH-pad, 0)
      }
    }
  }
}

function bgDotGrid(dens) {
  
  xPos = randomVal(marg, w-marg)
  yPos = randomVal(marg, h-marg)
  cols = randomInt(5, 25)
  rows = randomInt(5, 25)
  accentNum = randomInt(0, cols*rows)
  cellW = (w-(marg*2))/cols
  cellH = (h-(marg*2))/rows
  pad = min([cellW, cellH])*(dens/2)
  numMissed = (cols*rows)*randomVal(0.75, 0.85)
  misses = []
  for(let i = 0; i < numMissed; i++) {
    misses[i] = randomInt(0, cols*rows)
  }
  ns = randomVal(1, 5)
  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      xNormal = map(x, 0, cols, 0, 1)
      yNormal = map(y, 0, rows, 0, 1)
      n = noise(xNormal*ns, yNormal*ns)
      index = (y*cols)+x
      missed = false
      for(let i = 0; i < misses.length-1; i++) {
        if(misses[i] == index) {
          missed = true
        }
      }
      if(fxrand() < 0.25) {
        setPen(plotPal[0])
      } else {
        setPen(black)
      }

      if(n > 0.5) {
        if(fxrand() > 0.5) {
          plotSpiral(xPos+(marg)+x*cellW+(cellW/2), yPos+(marg)+y*cellH+(cellH/2), min([cellH, cellW])-pad, min([cellH, cellW])-pad, false, 0)
        } else {  
          plotRing(xPos+(marg)+x*cellW+(cellW/2), yPos+(marg)+y*cellH+(cellH/2), min([cellH, cellW])-pad, min([cellH, cellW])-pad, false, 0)
        }

      }
    }
  }
}

function bgParticleGrid(dens) {
  
  xPos = randomVal(marg, w-marg)
  yPos = randomVal(marg, h-marg)
  cols = randomInt(10, 20)
  rows = randomInt(10, 20)
  accentNum = randomInt(0, cols*rows)
  cellW = (w-(marg*2))/cols
  cellH = (h-(marg*2))/rows
  pad = min([cellW, cellH])*(dens/2)
  numMissed = (cols*rows)*randomVal(0.75, 0.85)
  misses = []
  ns = randomVal(1, 5)
  for(let i = 0; i < numMissed; i++) {
    misses[i] = randomInt(0, cols*rows)
  }
  
  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      xNormal = map(x, 0, cols, 0, 1)
      yNormal = map(y, 0, rows, 0, 1)
      n = noise(xNormal*ns, yNormal*ns)
      index = (y*cols)+x
      missed = false
      if(fxrand() < 0.25) {
        setPen(plotPal[randomInt(0, plotPal.length-1)])
      } else {
        setPen(black)
      }
      for(let i = 0; i < misses.length-1; i++) {
        if(misses[i] == index) {
          missed = true
        }
      }

      if(n>0.5) {
        plusMin(xPos+(marg)+x*cellW+(cellW/2), yPos+(marg)+y*cellH+(cellH/2), min([cellH, cellW])-pad)

      }
    }
  }
}

function bgTriGrid(dens) {
  
  xPos = randomVal(marg, w-marg)
  yPos = randomVal(marg, h-marg)
  cols = randomInt(5, 20)
  rows = randomInt(5, 20)
  accentNum = randomInt(0, cols*rows)
  cellW = (w-(marg*2))/cols
  cellH = (h-(marg*2))/rows
  pad = min([cellW, cellH])*dens
  numMissed = (cols*rows)*randomVal(0.75, 0.85)
  misses = []
  for(let i = 0; i < numMissed; i++) {
    misses[i] = randomInt(0, cols*rows)
  }
  ns = randomVal(1, 5)
  for(let y = 0; y < rows; y++) {
    for(let x = 0; x < cols; x++) {
      xNormal = map(x, 0, cols, 0, 1)
      yNormal = map(y, 0, rows, 0, 1)
      n = noise(xNormal*ns, yNormal*ns)
      index = (y*cols)+x
      missed = false
      if(fxrand() < 0.25) {
        setPen(plotPal[randomInt(0, plotPal.length-1)])
      } else {
        setPen(black)
      }
      for(let i = 0; i < misses.length-1; i++) {
        if(misses[i] == index) {
          missed = true
        }
      }

      if(n>0.5) {
        plotTriFill(xPos+(marg)+x*cellW+(cellW/2), yPos+(marg)+y*cellH+(cellH/2), min([cellH, cellW])-pad, false, 0)

      }
    }
  }
}

function horizLines() {
  setPen(black)
  numLines = randomInt(50, 80)
  expoType = fxrand()
  if(expoType > 0.5) {
    expo = randomVal(4, 8)
  } else {
    expo = randomVal(0.25, 0.5)
  }
  
  for(let i = 0; i < numLines; i++) {
    y = map(pow(i, expo), 0, pow(numLines-1, expo), marg, h-(marg))
    plotLine(0, y, w, y, 0)
  }
}

function vertLines() {
  setPen(black)
  numLines = randomInt(50, 80)
  expoType = fxrand()
  if(expoType > 0.5) {
    expo = randomVal(4, 8)
  } else {
    expo = randomVal(0.25, 0.5)
  }
  
  for(let i = 0; i < numLines; i++) {
    x = map(pow(i, expo), 0, pow(numLines-1, expo), marg, w-(marg))
    plotLine(x, 0, x, h, 0)
  }
}

function drawAGrid(dens) {
  gridType = randomInt(1, 5) 
  if(gridType == 1) {
    bgGrid(dens)
  } else if( gridType == 2) {
    bgDotGrid(dens)
  } else if( gridType == 3) {
    bgParticleGrid(dens)
  } else if( gridType == 4) {
    bgTriGrid(dens)
  } else if(gridType == 5) {
    bgSquareGrid(dens)
  }
}

function drawAShape(x, y, wid, hei, isolated, val) {
  r = min([wid, hei])

  shapeNum = randomInt(1, 4)
  if(shapeNum == 1) {
    plotRectFill(x, y, wid, hei, val)
  } else if(shapeNum == 2) {
    plotSpiral(x, y, r, isolated, 0)
  } else if(shapeNum == 3) {
    plusMin(x, y, r)
  } else if(shapeNum == 4) {
    plotTriFill(x, y, r, isolated, 0)
  }

}

function drawConcentric() {
  concentricType = randomInt(1, 5)
    if(concentricType == 1) {
      bgConcentric()
    } else if(concentricType == 2) {
      bgConcentricOval()
    } else if(concentricType == 3) {
      bgConcentricRect()
    } else if(concentricType == 4) {
      vertLines()
    } else if(concentricType == 5) {
      horizLines()
    } 

}

