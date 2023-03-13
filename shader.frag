#ifdef GL_ES
precision highp float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

//textures and uniforms from p5
uniform sampler2D p;
uniform sampler2D c;
uniform sampler2D ro;
uniform vec2 u_resolution;
uniform vec2 center;
uniform float seed;
uniform float seedB;
uniform vec3 bgc;
uniform float marg;

float map(float value, float inMin, float inMax, float outMin, float outMax) {
  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);
}

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

vec3 adjustContrast(vec3 color, float value) {
  return 0.5 + (1.0 + value) * (color - 0.5);
}
vec3 adjustExposure(vec3 color, float value) {
  return (1.0 + value) * color;
}
vec3 adjustSaturation(vec3 color, float value) {
  const vec3 luminosityFactor = vec3(0.2126, 0.7152, 0.0722);
  vec3 grayscale = vec3(dot(color, luminosityFactor));

  return mix(grayscale, color, 1.0 + value);
}
vec3 adjustBrightness(vec3 color, float value) {
  return color + value;
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {
  vec2 uv = vTexCoord*u_resolution;
  vec2 st = vTexCoord;
  vec2 st1 = vTexCoord;
  vec2 st2 = vTexCoord;
  vec2 st3 = vTexCoord;
  vec2 st4 = vTexCoord;
  vec2 st5 = vTexCoord;
  vec2 st6 = vTexCoord;
  vec2 st7 = vTexCoord;
  vec2 st8 = vTexCoord;
  vec2 st9 = vTexCoord;
  vec2 st10 = vTexCoord;
  vec2 st11 = vTexCoord;
  vec2 st12 = vTexCoord;
  vec2 stB = vTexCoord;
  vec2 stExpand = vTexCoord;
  vec2 stPaper = vTexCoord;

  //flip the upside down image
  st.y = 1.0 - st.y;
  st1.y = 1.0 - st1.y;
  st2.y = 1.0 - st2.y;
  st3.y = 1.0 - st3.y;
  st4.y = 1.0 - st4.y;
  st5.y = 1.0 - st5.y;
  st6.y = 1.0 - st6.y;
  st7.y = 1.0 - st7.y;
  st8.y = 1.0 - st8.y;
  st9.y = 1.0 - st9.y;
  st10.y = 1.0 - st10.y;
  st11.y = 1.0 - st11.y;
  st12.y = 1.0 - st12.y;
  
  stExpand.y = 1.0 - stExpand.y;

  //Image Expansion
  // //get angle between center and current px
  // float ang = (acos(dot([stExpand.x], center.xy)));
  // //get distance between center and current px
  // float pxDis = distance(stExpand.xy, center.xy);
  // //find how far to push this px
  // float pushDis = map(pxDis, 0.0, 1.0, 0.0, 0.1);
  // //move px by angle and pushDis
  // stExpand.x += cos(ang)*pushDis;
  // stExpand.y += sin(ang)*pushDis;
  float zoom = 0.8;
  float pxDis = distance(stExpand.xy, center.xy);
  float pushMult = map(pxDis, 0.0, 1.0, 0.0, 0.1);
  float spreadDis = map(pxDis, 0.0, 1.0, 0.02, 0.4);
  float spreadInc = spreadDis/12.0;
  st = (st1 - center) * (1.0+spreadInc) + center;
  st1 = (st1 - center) * (1.0+(spreadInc*2.0)) + center;
  st2 = (st2 - center) * (1.0+(spreadInc*3.0)) + center;
  st3 = (st3 - center) * (1.0+(spreadInc*4.0)) + center;
  st4 = (st4 - center) * (1.0+(spreadInc*5.0)) + center;
  st5 = (st5 - center) * (1.0+(spreadInc*6.0)) + center;
  st6 = (st6 - center) * (1.0+(spreadInc*7.0)) + center;
  st7 = (st7 - center) * (1.0+(spreadInc*8.0)) + center;
  st8 = (st8 - center) * (1.0+(spreadInc*9.0)) + center;
  st9 = (st9 - center) * (1.0+(spreadInc*10.0)) + center;
  st10 = (st10 - center) * (1.0+(spreadInc*11.0)) + center;
  st11 = (st11 - center) * (1.0+(spreadInc*12.0)) + center;
  st12 = (st12 - center) * (1.0+(spreadInc*13.0)) + center;
  


  //get rotation value from ro
  vec4 texRo = texture2D(p, st);
  float rot = texRo.r;
  //form noise
  // st.xy += (random(st.xy)*0.001)-0.0005;
  float dis = 0.0025;
  float ns = 3.0;
  float warp1 = map(noise(seed+st.xy*ns), 0.0, 1.0, -dis, dis);
  float warp2 = map(noise(seedB+st.xy*ns), 0.0, 1.0, -dis, dis);
  float warp3 = map(noise(seed+st.xy*ns), 0.0, 1.0, -dis*4.0, dis*4.0);
  // st1.xy += warp1;
  // st2.xy += warp2;
  // st3.xy += warp3;

  vec4 texP = texture2D(p, stExpand);
  vec4 texSpreadA = texture2D(p, st1);
  vec4 texSpreadB = texture2D(p, st2);
  vec4 texSpreadC = texture2D(p, st3);
  vec4 texSpreadD = texture2D(p, st4);
  vec4 texSpreadE = texture2D(p, st5);
  vec4 texSpreadF = texture2D(p, st6);
  vec4 texSpreadG = texture2D(p, st7);
  vec4 texSpreadH = texture2D(p, st8);
  vec4 texSpreadI = texture2D(p, st9);
  vec4 texSpreadJ = texture2D(p, st10);
  vec4 texSpreadK = texture2D(p, st11);
  vec4 texSpreadL = texture2D(p, st12);
  vec4 texC = texture2D(c, st);


  //color noise
  float noiseGray = map(random(stB.xy), 0.0, 1.0, -0.075, 0.075);

  vec3 color = vec3(0.0);
  vec3 colorA = vec3(0.0);
  vec3 colorB = vec3(0.0);
  // vec3 mapCol = texPMap.rgb;
  vec3 final = vec3(0.0);
  float cLum = texC.r;
  if(cLum > -0.1) {
    vec3 lighter = texSpreadA.rgb;
    lighter = adjustExposure(lighter, 0.4);
    vec3 darker = texSpreadB.rgb;
    darker = adjustExposure(darker, -0.4);
    float mixAmt = 0.1;
    
    colorA = mix(texP.rgb, texSpreadA.rgb, mixAmt);
    colorA = mix(colorA.rgb, texSpreadB.rgb, mixAmt);
    colorA = mix(colorA.rgb, texSpreadC.rgb, mixAmt);
    colorA = mix(colorA.rgb, texSpreadD.rgb, mixAmt);
    colorA = mix(colorA.rgb, texSpreadE.rgb, mixAmt);
    colorA = mix(colorA.rgb, texSpreadF.rgb, mixAmt);
    colorA = mix(colorA.rgb, texSpreadG.rgb, mixAmt);
    colorA = mix(colorA.rgb, texSpreadH.rgb, mixAmt);
    colorA = mix(colorA.rgb, texSpreadI.rgb, mixAmt);
    colorA = mix(colorA.rgb, texSpreadJ.rgb, mixAmt);
    colorA = mix(colorA.rgb, texSpreadK.rgb, mixAmt);
    colorA = mix(colorA.rgb, texSpreadL.rgb, mixAmt);
    colorA = mix(colorA.rgb, texP.rgb, 0.2);
    color = mix(colorA.rgb, vec3(1.0, 1.0, 1.0), 0.2);
    // color = colorA;
  } else {
    color = texP.rgb;
  }

  // color = texP.rgb;
  
  // color = mix(color.rgb, texSpreadA.rgb, 0.05);
  // color = mix(color.rgb, texSpreadA.rgb, 0.01);

  //Draw margin
  // float margX = marg;
  // float margY = margX*0.8;
  // if(stB.x < margX || stB.x > 1.0-margX || stB.y < margY || stB.y > 1.0-margY) {
  //   color = vec3(bgc.r, bgc.g, bgc.b);
  // }
  stPaper.y *= 3.0;
  float sine = sin(st.y*1200.0);
  float sinOff = map(noise(stPaper.xy*100.0), 0.0, 1.0, -0.6, 0.6);
  float randOff = map(random(st.xy), 0.0, 1.0, -0.5, 0.5);
  if(sine+sinOff+randOff > 0.75) {
    // color = adjustExposure(color, -0.05*noise(st.xy*100.0));
  } else if( sine+sinOff+randOff < -0.75) {
    color = adjustExposure(color, 0.05*noise(st.xy*100.0));
  }

  // sampler2D newLayer = color;

  color += noiseGray;
  gl_FragColor = vec4(color, 1.0);
}
