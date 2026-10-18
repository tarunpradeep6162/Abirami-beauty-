import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { MotionShell } from '../components/MotionShell';
const display = localFont({ src: [ { path: '../public/assets/fonts/display-regular.woff2', weight: '400' }, { path: '../public/assets/fonts/display-italic.woff2', weight: '400', style: 'italic' } ], variable: '--font-display', display: 'swap' });
const body = localFont({ src: '../public/assets/fonts/body-regular.woff2', variable: '--font-body', display: 'swap' });
export const dynamic='force-dynamic';
export const metadata: Metadata = { title: 'Abirami | Beauty & Bridal Artistry in Medavakkam', description: 'Bridal makeup, skin care and hair care at Abirami Natural Beauty Parlour, Jalladiampet, Medavakkam, Chennai.', robots: { index: false, follow: false } };
export default function Layout({ children }: { children: React.ReactNode }) {
 return <html lang="en"><body className={`${display.variable} ${body.variable}`}><a className="skip" href="#main">Skip to content</a><header className="header"><a className="wordmark" href="/">ABIRAMI<small>NATURAL BEAUTY PARLOUR</small></a><nav aria-label="Main"><a href="/#treatments">Services</a><a href="/bridal">Photos</a><a href="/book">Book an appointment ↗</a></nav></header><MotionShell>{children}</MotionShell><footer><span>Abirami Natural Beauty Parlour</span><p>No. 1/11, Rice Mill Rd, Jalladiampet, Medavakkam, Chennai, Tamil Nadu 600100</p><a href="tel:+919840638981">+91 98406 38981</a><p>Monday–Saturday 10 AM–8:30 PM · Sunday 10 AM–4:30 PM</p></footer></body></html>;
}
