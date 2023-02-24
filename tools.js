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
  return chroma(truePal[randomInt(0, truePal.length-1)]).hex()
}

function angBetween(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

function ptFromAng(x, y, ang, dis) {
  xC = cos(ang)*dis
  yC = sin(ang)*dis

  return createVector((x+xC), (y+yC))
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
  p.strokeWeight(randomVal(0, 1))
  p.stroke(randColor())
  p.beginShape()
  noiseMax = 50
  phase = randomVal(0, 100000000)
  phaseB = randomVal(0, 100000000)
  angNS = randomVal(0.1, 0.5)
  p.fill(chroma(randColor()).alpha(1).hex())
  for(let i = 0 ; i < 360; i+=5) {
    xOff = map(cos(i), -1, 1, 0, noiseMax)
    yOff = map(sin(i), -1, 1, 0, noiseMax)
    rad = 0
    radMod = map(noise(i*0.05, phase), 0, 1, 0.95, 1)
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
    noiseHere = ptFromAng(x, y, i, rad*radMod)
    p.vertex(noiseHere.x, noiseHere.y)
  }
  p.endShape(CLOSE)
}

function placer() {
  numPlaced = 0
  tries = 0
  while(numPlaced < numShapes) {
    here = createVector(Math.round(randomVal(0, w)), Math.round(randomVal(0, h)))
    samp = c.get(here.x, here.y)
    if(samp[0] == 255) {
      shapes[numPlaced] = new Shape(here.x, here.y)
      numPlaced++
    }
    tries++
    if(tries > 1000) {
      return
    }
  }
}

function concentricGuide(x, y) {
  numRings = 5//randomInt(3, 15)
  for(let i = 0; i < numRings; i++) {
    if(i%2 == 0) {
      col = 'white'
    } else {
      col = 'black'
    }

    rad = map(i, 0, numRings, h*1.75, 0)
    c.fill(col)
    c.noStroke()
    c.circle(x, y, rad)
  }
}