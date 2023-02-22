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