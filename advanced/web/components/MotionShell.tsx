'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
export function MotionShell({ children }: { children: ReactNode }) {
 const root = useRef<HTMLDivElement>(null);
 const cursor = useRef<HTMLDivElement>(null);
 useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);
  const media=gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
   const touch=matchMedia('(pointer: coarse)').matches;
   const lenis=touch ? null : new Lenis({ duration:1.35, smoothWheel:true, anchors:true });
   const tick=(time:number)=>lenis?.raf(time*1000);
   if (lenis) { gsap.ticker.add(tick); lenis.on('scroll',ScrollTrigger.update); }
   const context=gsap.context(() => {
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(section => {
     gsap.from(section.querySelectorAll('[data-reveal-item]'), { y:36, opacity:0, duration:1.3, stagger:.16, ease:'power4.out', scrollTrigger:{ trigger:section,start:'top 85%',once:true } });
    });
    gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(image => gsap.fromTo(image,{yPercent:-5},{ yPercent:5,ease:'none',scrollTrigger:{trigger:image.parentElement,start:'top bottom',end:'bottom top',scrub:1.4} }));
   }, root);
   const buttons=[...document.querySelectorAll<HTMLElement>('[data-magnetic]')];
   const move=(event:PointerEvent)=>{ if (!touch && cursor.current) gsap.to(cursor.current,{x:event.clientX,y:event.clientY,duration:.45,ease:'power3.out'}); };
   const handlers=buttons.map(button=>{
    const hover=(event:PointerEvent)=>{if(touch)return; const r=button.getBoundingClientRect();gsap.to(button,{x:(event.clientX-r.left-r.width/2)*.12,y:(event.clientY-r.top-r.height/2)*.12,duration:1.1,ease:'power4.out'});};
    const reset=()=>gsap.to(button,{x:0,y:0,duration:1.2,ease:'power4.out'});
    button.addEventListener('pointermove',hover);button.addEventListener('pointerleave',reset);
    return ()=>{button.removeEventListener('pointermove',hover);button.removeEventListener('pointerleave',reset);gsap.set(button,{clearProps:'transform'});};
   });
   window.addEventListener('pointermove',move,{passive:true});
   return ()=>{handlers.forEach(clean=>clean());window.removeEventListener('pointermove',move);context.revert();gsap.ticker.remove(tick);lenis?.destroy();};
  });
  return ()=>media.revert();
 }, []);
 return <div ref={root}>{children}<div ref={cursor} className="cursor" aria-hidden="true"/></div>;
}
