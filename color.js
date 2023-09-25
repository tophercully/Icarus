timeMode = fxrand()
if(timeMode < 0.5) {
  dayMode = true
} else {
  dayMode = false
}

if(dayMode == true) {
  bgc = 'white'
  tiempo = "Day"
} else {
  bgc = 'black'
  tiempo = "Night"
}

//Make a color that always contrasts bgc
calcBgLum = chroma(bgc).luminance();
if (calcBgLum > 0.5) {
  frameCol = 'black'; 
} else if( calcBgLum < 0.5) {
  frameCol = 'white';
}

//Palettes
const source = [
  "#A6C8CA",
  "#097857",
  "#F1E8D9",
  "#E3CE61",
  "#E35A7E",
  frameCol,
  "#EE692A",
  "#BFCCD4",
  "#217F96",
  "#EBD5D7",
];

const shepard = ["#3D5A80", "#98C1D9", "#E0FBFC", "#FF4D21", "#293241", frameCol];

const bau = [
  "#1267b7",
  "#ec3e2b",
  "#f6b81a",
  "#E4D6C2",
  "#1D1F22",
]

const elliot = [
  "#E73542",
  "#F6A026",
  "#2CA8C4",
  "#EE7140",
  "#289C5B",
  "#F5E2CC",
  "#161117"
]
const vint = [
  'black',
  '#FDDEBD',
  '#3255A4',
  '#62A8E5',
  '#FF8E91'
]
const wildberry = [
  'black',
  '#62A8E5',
  '#BB76CF',
  '#407060',
  '#FF6C2F',
  '#fff0e0',
]

const block = ["#1F1E23","#0068C1","#E7CF63","#F3669A","#D6D8D5"]

const burn = ["#00b4e2","#fd4f92","#ff7b89","#ffa070","#ffd403"]

const scifi = ["#4ea459","#47bc89","#38928a","#e2a48e","#c35548","#33778a","#8bd6e8","#11120a","#f8ddc3","#a7d0c0"]

const yeller = ["#29221c","#8e3b2d","#b27469","#f49f10","#fedb49","#e7d0c0","#ceb29a","#c9ced1","#b0b8bb","#646d4e"]

const overlook = ["#3d4d20","#ad0b08","#1d5473","#798b97","#edd2b7","#b76439","#d2955f","#282723"]

const helmetFace = ["#617a5c","#a3ab86","#accbf9","#f3c9f4","#030305","#cfd9e3","#e3e4e8"]

const achro = [
  'black',
  'white'
]
const pals = [source, shepard, bau, elliot, vint, wildberry, burn, scifi, yeller, helmetFace, block];

const palNames = [
  "Source",
  "Commander Shepard",
  "Bau",
  "Elliot",
  "Vint",
  "Wildberry",
  "Burn",
  "SciFi",
  "Yeller",
  "HelmetFace",
  "Block"
];

//Palette parameters
palNum = randomInt(0, pals.length-1);
pal = pals[palNum];
palName = palNames[palNum];


truePal = shuff(pal, achro);

skyDecider = fxrand()
skyBlue = false 
chromaSky = false

if(skyDecider < 0.2) {
  skyCol = "#8cbedc"
  skyBlue = true
} else if(skyDecider > 0.9) {
  palPicked = false 
  tries = 0
  while (palPicked == false) {
    skyPalCol = randColor()
    dif = chroma.contrast(bgc, skyPalCol)
    tries++
    if(dif > 7) {
      palPicked = true
    }
    if(tries > 100) {
      skyPalCol = frameCol
      palPicked = true
    }
  }
  skyCol = skyPalCol
  chromaSky = true
} else {
  skyCol = frameCol
}

//Pass our palette back to the CSS spinner
let root = document.documentElement;
root.style.setProperty("--c1", truePal[0]);
root.style.setProperty("--c2", truePal[1]);
root.style.setProperty("--c3", truePal[2]);
root.style.setProperty("--c4", truePal[3]);
