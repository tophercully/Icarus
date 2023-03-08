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
  vec2 stB = vTexCoord;
  vec2 stPaper = vTexCoord;

  //flip the upside down image
  st.y = 1.0 - st.y;
  st1.y = 1.0 - st1.y;
  st2.y = 1.0 - st2.y;
  st3.y = 1.0 - st3.y;

  //get rotation value from ro
  vec4 texRo = texture2D(p, st);
  float rot = texRo.r;
  //form noise
  // st.xy += (random(st.xy)*0.001)-0.0005;
  float dis = 0.02;
  float ns = 5.0;
  float warp1 = map(noise(seed+st.xy*ns), 0.0, 1.0, -dis, dis);
  float warp2 = map(noise(seedB+st.xy*ns), 0.0, 1.0, -dis, dis);
  float warp3 = map(noise(seed+st.xy*ns), 0.0, 1.0, -dis*4.0, dis*4.0);
  // st1.xy += warp1;
  st2.xy += warp2;
  st3.xy += warp3;

  vec4 texP = texture2D(p, st);
  vec4 texSpreadA = texture2D(p, st1);
  vec4 texSpreadB = texture2D(p, st2);
  vec4 texSpreadC = texture2D(p, st3);
  vec4 texC = texture2D(c, st);

  if(texP.r > 0.5) {
    
  }

  

  //color noise
  float noiseGray = map(random(stB.xy), 0.0, 1.0, -0.075, 0.075);

  vec3 color = vec3(0.0);
  vec3 colorA = vec3(0.0);
  vec3 colorB = vec3(0.0);
  // vec3 mapCol = texPMap.rgb;
  vec3 final = vec3(0.0);
  float cLum = texC.r;
  if(cLum > 0.5) {
    vec3 lighter = texSpreadA.rgb;
    lighter = adjustExposure(lighter, 0.4);
    vec3 darker = texSpreadB.rgb;
    darker = adjustExposure(darker, -0.4);
    colorA = mix(texP.rgb, texSpreadA.rgb, 0.4);
    colorB = mix(texP.rgb, texSpreadB.rgb, 0.4);
    color = mix(colorA.rgb, colorB.rgb, 0.5);
  } else {
    color = texP.rgb;
  }
  
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
  color += noiseGray;
  gl_FragColor = vec4(color, 1.0);
}
