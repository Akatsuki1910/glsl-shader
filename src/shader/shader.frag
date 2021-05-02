// #define time t
// #define resolution r
// #define mouse m
precision mediump float;

uniform vec2  mouse;       // mouse
uniform float time;       // time
uniform vec2  resolution;       // resolution
uniform sampler2D smp; // prev scene
const float PI = 3.1415926;
varying vec2 vUv;

vec3 hsv(float h, float s, float v){
	vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
	vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));
	return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);
}

void main(){
	vec2 fuv = resolution * vUv;
	vec2 p = (fuv.st * 2.0 - resolution) / resolution;
	vec3 line = vec3(0.0);
	for(float fi = 0.0; fi <10.0; ++fi){
		float timer = time * fi * 0.1;
		vec3  color = hsv((fi + time) * 0.1, 1.0, 1.);
		line += 0.005 / abs(p.y + sin(p.x + timer)) * color;
	}
	gl_FragColor = vec4(line, 1.0);
}