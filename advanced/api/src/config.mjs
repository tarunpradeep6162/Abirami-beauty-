import { z } from 'zod';
const httpsOrLocal=z.string().url().refine(value=>value.startsWith('https://') || (process.env.NODE_ENV!=='production' && /^http:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/.test(value)),'Use HTTPS in production');
export const config=z.object({
 DATABASE_URL:z.string().min(1), APP_ORIGIN:httpsOrLocal.transform(value=>new URL(value).origin),
 STRIPE_SECRET_KEY:z.string().regex(/^sk_(test|live)_/), STRIPE_WEBHOOK_SECRET:z.string().startsWith('whsec_'),
 PRIVATE_UPLOAD_DIR:z.string().min(1), PORT:z.coerce.number().int().min(1024).default(4000),
 BOOKING_ENABLED:z.enum(['true','false']).default('false'), DEPOSIT_POLICY:z.string().default(''),
 TRUST_PROXY_HOPS:z.coerce.number().int().min(0).max(3).default(0)
}).parse(process.env);
if(config.BOOKING_ENABLED==='true' && config.DEPOSIT_POLICY.trim().length<60)throw new Error('Set the owner-approved deposit/cancellation policy before enabling bookings.');
