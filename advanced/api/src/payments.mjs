import Stripe from 'stripe';
import { config } from './config.mjs';
import { pool,transaction } from './db.mjs';
import { treatments,sessionOutcome } from './rules.mjs';
export const stripe=new Stripe(config.STRIPE_SECRET_KEY,{maxNetworkRetries:2,timeout:15000});
export async function checkout(booking){
 if(booking.checkout_id)return stripe.checkout.sessions.retrieve(booking.checkout_id);
 // Keep the request deterministic so a timeout can be retried safely.
 if(Date.now()-new Date(booking.created_at).getTime()>23*3600000){await pool.query("UPDATE bookings SET state='review' WHERE id=$1 AND state='pending'",[booking.id]);throw Object.assign(new Error('This reservation needs salon review. Please contact us.'),{status:409});}
 const session=await stripe.checkout.sessions.create({mode:'payment',payment_method_types:['card'],line_items:[{quantity:1,price_data:{currency:'inr',unit_amount:100000,product_data:{name:`Abirami · ${treatments[booking.treatment].name} deposit`}}}],client_reference_id:booking.id,metadata:{bookingId:booking.id},payment_intent_data:{metadata:{bookingId:booking.id}},success_url:`${config.APP_ORIGIN}/book?payment=processing`,cancel_url:`${config.APP_ORIGIN}/book?payment=cancelled`,custom_text:{submit:{message:config.DEPOSIT_POLICY.slice(0,1000)}}},{idempotencyKey:`booking:${booking.id}`});
 await pool.query('UPDATE bookings SET checkout_id=$2 WHERE id=$1 AND (checkout_id IS NULL OR checkout_id=$2)',[booking.id,session.id]);
 return session;
}
export async function reconcileSession(session,eventId){
 const outcome=sessionOutcome(session);if(!outcome)return;
 if(session.amount_total!==100000 || session.currency!=='inr' || !session.metadata?.bookingId)throw new Error('Payment metadata or amount mismatch');
 await transaction(async client=>{
  if(eventId){const event=await client.query('INSERT INTO payment_events(id) VALUES($1) ON CONFLICT DO NOTHING RETURNING id',[eventId]);if(!event.rowCount)return;}
  const result=await client.query('SELECT * FROM bookings WHERE id=$1 FOR UPDATE',[session.metadata.bookingId]);
  const booking=result.rows[0];if(!booking)throw new Error('Payment has no durable reservation');
  if(booking.checkout_id && booking.checkout_id!==session.id)throw new Error('Checkout does not belong to reservation');
  if(outcome==='confirmed' && booking.state==='expired')throw new Error('Late payment needs manual reconciliation');
  if(booking.state!=='confirmed')await client.query('UPDATE bookings SET state=$2,checkout_id=$3 WHERE id=$1',[booking.id,outcome,session.id]);
 });
}
export async function webhook(req,res){
 let event;try{event=stripe.webhooks.constructEvent(req.body,req.get('stripe-signature'),config.STRIPE_WEBHOOK_SECRET);}catch{return res.status(400).json({error:'Invalid webhook signature.'});}
 if(['checkout.session.completed','checkout.session.expired','checkout.session.async_payment_succeeded'].includes(event.type)){
  const session=await stripe.checkout.sessions.retrieve(event.data.object.id);
  await reconcileSession(session,event.id);
 }
 res.json({received:true});
}
