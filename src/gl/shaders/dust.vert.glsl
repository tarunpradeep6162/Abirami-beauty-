precision highp float;
attribute vec3 aSeed;
varying vec2 vDustUv;
varying float vGlow;
uniform float uTime;
uniform sampler2D uNoise;
void main() {
  vDustUv = uv;
  float flow = texture2D(uNoise, fract(aSeed.xy + uTime * 0.002)).r;
  vec2 center = vec2(aSeed.x, fract(aSeed.y + uTime * 0.005 * (0.4 + aSeed.z)));
  center.x += sin(uTime * 0.12 + aSeed.z * 40.0) * 0.018 + (flow - 0.5) * 0.025;
  vGlow = 0.12 + aSeed.z * 0.18;
  vec2 point = center * 2.0 - 1.0 + position.xy * (0.0015 + aSeed.z * 0.002);
  gl_Position = vec4(point, 0.0, 1.0);
}
