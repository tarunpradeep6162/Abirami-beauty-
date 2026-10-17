precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uScroll;
uniform vec2 uPointer;
uniform vec2 uResolution;
uniform sampler2D uNoise;
void main() {
  vec2 p = vUv;
  p.x *= uResolution.x / max(uResolution.y, 1.0);
  float field = texture2D(uNoise, fract(vUv * 0.7 + uTime * 0.004)).r;
  float touch = exp(-5.0 * distance(vUv, uPointer));
  float wave = sin(p.x * 5.8 + sin(p.y * 3.0 + uTime * 0.15) * 1.2 + field * 0.6 + touch * 0.45 + uScroll * 0.8);
  float silk = pow(0.5 + 0.5 * wave, 7.0);
  float seam = pow(0.5 + 0.5 * sin(p.x * 9.0 - p.y * 1.8 + uTime * 0.12), 22.0);
  vec3 moss = vec3(0.13, 0.24, 0.19);
  vec3 brass = vec3(0.61, 0.49, 0.29);
  vec3 color = mix(moss, brass, silk * 0.44 + seam * 0.09);
  gl_FragColor = vec4(color, 1.0);
}
