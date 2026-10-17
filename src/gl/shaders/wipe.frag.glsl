precision highp float;
varying vec2 vUv;
uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform float uMix;
uniform vec2 uFrame;
uniform vec2 uFromSize;
uniform vec2 uToSize;
vec2 coverUv(vec2 uv, vec2 imageSize) {
  float imageRatio = imageSize.x / imageSize.y;
  float frameRatio = uFrame.x / uFrame.y;
  vec2 fit = imageRatio > frameRatio ? vec2(frameRatio / imageRatio, 1.0) : vec2(1.0, imageRatio / frameRatio);
  return (uv - 0.5) * fit + 0.5;
}
void main() {
  float reveal = step(vUv.x, uMix);
  gl_FragColor = mix(texture2D(uFrom, coverUv(vUv, uFromSize)), texture2D(uTo, coverUv(vUv, uToSize)), reveal);
}
