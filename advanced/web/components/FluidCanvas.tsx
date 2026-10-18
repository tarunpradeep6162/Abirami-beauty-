'use client';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader, Vector2, ShaderMaterial } from 'three';
import { Suspense, useEffect, useMemo, useRef } from 'react';
const vertex = `varying vec2 vUv; void main(){vUv=uv; gl_Position=vec4(position.xy,0.,1.);}`;
const fragment = `precision highp float;
 uniform sampler2D uPhoto; uniform vec2 uMouse; uniform vec2 uSize; uniform float uTime;
 varying vec2 vUv;
 void main(){
  vec2 p=vUv; float distanceToCursor=distance(p,uMouse);
  float wave=sin(distanceToCursor*24.-uTime*.8)*exp(-distanceToCursor*5.)*.006;
  p+=normalize(p-uMouse+vec2(.0001))*wave;
  float aspect=uSize.x/uSize.y; float sourceAspect=796./448.;
  vec2 cover=vec2(min(1.,aspect/sourceAspect),min(1.,sourceAspect/aspect));
  vec2 uv=(p-.5)*cover+vec2(.42,.5);
  vec3 colour=texture2D(uPhoto,uv).rgb;
  float grain=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233))+floor(uTime*12.))*43758.5453);
  float vignette=1.-smoothstep(.2,.8,length(vUv-.5));
  gl_FragColor=vec4(colour*(.75+.12*vignette)+(grain-.5)*.018,1.);
 }`;
function Silk() {
 const texture = useLoader(TextureLoader, '/assets/img/salon-maps/listing-10-960.webp');
 const material = useRef<ShaderMaterial>(null);
 const { size, gl } = useThree();
 const target = useRef(new Vector2(.5,.5));
 const uniforms = useMemo(() => ({ uPhoto: { value: texture }, uMouse: { value: new Vector2(.5,.5) }, uTime: { value: 0 }, uSize: { value: new Vector2(1,1) } }), [texture]);
 useEffect(() => {
  const canvas = gl.domElement;
  const move = (event: PointerEvent) => { const r=canvas.getBoundingClientRect(); target.current.set((event.clientX-r.left)/r.width,1-(event.clientY-r.top)/r.height); };
  window.addEventListener('pointermove', move, { passive: true });
  return () => window.removeEventListener('pointermove', move);
 }, [gl]);
 useFrame((_, delta) => {
  if (!material.current) return;
  uniforms.uTime.value += Math.min(delta,.05);
  uniforms.uSize.value.set(size.width,size.height);
  uniforms.uMouse.value.lerp(target.current,1-Math.exp(-delta*3));
 });
 return <mesh frustumCulled={false}><planeGeometry args={[2,2]}/><shaderMaterial ref={material} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} depthTest={false} depthWrite={false}/></mesh>;
}
export default function FluidCanvas({ active }: { active: boolean }) {
 return <div className="fluid" aria-hidden="true"><Canvas dpr={[1,1.5]} frameloop={active ? 'always' : 'never'} gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}><Suspense fallback={null}><Silk/></Suspense></Canvas></div>;
}
