precision mediump float;
#define R_LUMINANCE 0.298912
#define G_LUMINANCE 0.586611
#define B_LUMINANCE 0.114478
varying vec2 vTextureCoord;
uniform sampler2D uTex;
uniform float time;
uniform float rand;

float random (vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

void main(void) {
  vec2 vtc = vTextureCoord;
  float ran = rand;

  if(ran > 0.06) ran = 0.0;
  float rr = smoothstep(0.0, 0.06, ran);
  if(rr != 0.0) {
    rr -= 0.5;
    rr += rand;
  }
  // float r = texture2D(uTex, vtc + 0.3 * vec2(sin(rr))).r;
  // float g = texture2D(uTex, vtc + 0.3 * vec2(0,sin(rr))).g;
  // float b = texture2D(uTex, vtc + 0.3 * vec2(cos(rr) - 1.,sin(rr))).b;
  float r = texture2D(uTex, vtc + 0.1 * vec2(sin(rr))).r;
  float g = texture2D(uTex, vtc + 0.2 * vec2(sin(rr))).g;
  float b = texture2D(uTex, vtc + 0.3 * vec2(sin(rr))).b;
  
  gl_FragColor = vec4(r, g, b, 0.5);
}