'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
const FluidCanvas = dynamic(() => import('./FluidCanvas'), { ssr: false });
class CanvasBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
 state = { failed: false };
 static getDerivedStateFromError() { return { failed: true }; }
 render() { return this.state.failed ? null : this.props.children; }
}
export function Hero() {
 const host = useRef<HTMLElement>(null);
 const [eligible, setEligible] = useState(false);
 const [active, setActive] = useState(false);
 useEffect(() => {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const capability = () => {
   const device = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
   const test = document.createElement('canvas');
   const gl = test.getContext('webgl2');
   const supported = !!gl && !motion.matches && !device.connection?.saveData && (device.deviceMemory ?? 8) >= 4;
   gl?.getExtension('WEBGL_lose_context')?.loseContext();
   setEligible(supported);
  };
  const timer = setTimeout(capability, 1100);
  motion.addEventListener('change', capability);
  let visible = true;
  const update = () => setActive(visible && !document.hidden);
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
  if (host.current) observer.observe(host.current);
  document.addEventListener('visibilitychange', update);
  return () => { clearTimeout(timer); observer.disconnect(); motion.removeEventListener('change', capability); document.removeEventListener('visibilitychange', update); };
 }, []);
 return <section ref={host} className="hero" aria-labelledby="hero-heading"><div className="hero-photo"><Image src="/assets/img/salon-maps/listing-10-960.webp" alt="Bridal makeup inspiration from Abirami’s salon gallery" fill priority sizes="(max-width: 767px) 100vw, 55vw"/>{eligible ? <CanvasBoundary><FluidCanvas active={active}/></CanvasBoundary> : null}</div><div className="hero-copy"><p className="eyebrow">Medavakkam, Chennai · Beauty & bridal artistry</p><h1 id="hero-heading"><span>Beauty,</span><span>in your</span><span><em>own light.</em></span></h1><p>The Art of Natural Radiance<br/>& Bespoke Bridal Artistry</p><a className="button" data-magnetic href="/book">Reserve your consultation ↗</a></div><p className="hero-caption">Bridal inspiration · From our salon journal</p></section>;
}
