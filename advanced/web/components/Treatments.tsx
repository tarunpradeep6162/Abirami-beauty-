import Image from 'next/image';
const rituals=[
 {name:'Bridal makeup',detail:'Makeup, saree draping and flower hair styling for your wedding day.',image:'06',price:'₹8,500+'},
 {name:'Facials',detail:'Ask us about our facials. We’ll help you choose one for your skin.',image:'03',price:'₹1,800+'},
 {name:'Hair spa & scalp care',detail:'Hair oil treatments, hair masks and scalp care. Tell us about any recent hair colouring or treatments.',image:'05',price:'₹1,500+'}
];
export function Treatments(){return <section id="treatments" className="treatments" data-reveal><div className="section-title"><p className="eyebrow" data-reveal-item>Our beauty services</p><h2 data-reveal-item>Care for<br/><em>every day.</em></h2></div>{rituals.map((ritual,i)=><article className="treatment" key={ritual.name} data-reveal><figure data-reveal-item><Image data-parallax src={`/assets/img/salon-maps/listing-${ritual.image}-960.webp`} alt={i===0?'Bridal styling collage from Abirami’s published gallery':i===1?'Treatment chair inside Abirami salon':'Hair colour photograph from Abirami’s salon gallery'} fill sizes="(max-width:767px) 100vw, 45vw"/></figure><div data-reveal-item><p className="eyebrow">{ritual.price} · Ask us for the final price</p><h3>{ritual.name}</h3><p>{ritual.detail}</p><a className="text-link" href="/book">Book this service ↗</a></div></article>)}</section>}
