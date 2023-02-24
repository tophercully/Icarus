#ifdef GL_ES
precision highp float;
#endif

// grab texcoords from vert shader
varying vec2 vTexCoord;

//textures and uniforms from p5
uniform sampler2D p;
uniform vec2 u_resolution;
uniform float seed;
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
  vec2 stB = vTexCoord;
  vec2 stPaper = vTexCoord;

  //flip the upside down image
  st.y = 1.0 - st.y;

  //form noise
  // st.xy += (random(st.xy)*0.001)-0.0005;
  float warp = map(noise(seed+st.xy*5.0), 0.0, 1.0, -0.05, 0.05);
  // st.xy += warp;

  vec4 texP = texture2D(p, st);
  vec4 texPMap = texture2D(p, st);

  

  //color noise
  float noiseGray = map(random(stB.xy), 0.0, 1.0, -0.05, 0.05);

  vec3 color = vec3(0.0);
  vec3 mapCol = texPMap.rgb;
  vec3 final = vec3(0.0);
  color = vec3(texP.r, texP.g, texP.b);

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
    color = adjustExposure(color, -0.05*noise(st.xy*100.0));
  } else if( sine+sinOff+randOff < -0.75) {
    color = adjustExposure(color, 0.05*noise(st.xy*100.0));
  }
  color += noiseGray;
  gl_FragColor = vec4(color, 1.0);
}
