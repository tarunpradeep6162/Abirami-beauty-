precision highp float;
varying vec2 vUv;
uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform sampler2D uNoise;
uniform float uMix;
uniform float uTime;
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
  float displacement = texture2D(uNoise, fract(vUv * 0.8 + uTime * 0.013)).r - 0.5;
  float strength = sin(uMix * 3.14159265) * 0.09;
  vec2 offset = vec2(displacement, sin(vUv.y * 18.0 + uTime) * 0.18) * strength;
  vec4 from = texture2D(uFrom, coverUv(vUv + offset, uFromSize));
  vec4 to = texture2D(uTo, coverUv(vUv - offset, uToSize));
  gl_FragColor = mix(from, to, uMix);
}
