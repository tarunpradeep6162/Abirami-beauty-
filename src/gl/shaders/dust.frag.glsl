precision highp float;
varying vec2 vDustUv;
varying float vGlow;
void main() {
  float circle = 1.0 - smoothstep(0.1, 0.5, length(vDustUv - 0.5));
  gl_FragColor = vec4(0.69, 0.56, 0.34, circle * vGlow);
}
