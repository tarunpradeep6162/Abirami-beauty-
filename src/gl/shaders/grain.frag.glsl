precision highp float;
varying vec2 vUv;
uniform sampler2D uScene;
uniform float uTime;
float random(vec2 p) { return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
void main() {
  vec3 color = texture2D(uScene, vUv).rgb;
  float grain = random(gl_FragCoord.xy + floor(uTime * 12.0)) - 0.5;
  gl_FragColor = vec4(color + grain * 0.026, 1.0);
}
