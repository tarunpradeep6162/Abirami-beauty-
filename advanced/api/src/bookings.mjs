import { createHash,randomUUID } from 'node:crypto';
import { z } from 'zod';
import { transaction } from './db.mjs';
import { bookingInput,appointment } from './rules.mjs';
import { checkout,reconcileSession } from './payments.mjs';
import { digest } from './security.mjs';
import { config } from './config.mjs';
export async function createBooking(req,res){
 if(config.BOOKING_ENABLED!=='true')return res.status(503).json({error:'Online deposits are not enabled. Please book on WhatsApp.'});
 const key=z.uuid().parse(req.get('Idempotency-Key'));
 const input=bookingInput.parse(req.body);
 const hash=createHash('sha256').update(JSON.stringify(input)).digest('hex');
 let booking;
 try{booking=await transaction(async client=>{
  await client.query('SELECT pg_advisory_xact_lock(hashtextextended($1,0))',[key]);
  const previous=await client.query('SELECT * FROM bookings WHERE request_key=$1',[key]);
  if(previous.rowCount){if(previous.rows[0].request_hash!==hash)throw Object.assign(new Error('Use a new request key when changing appointment details.'),{status:409});return previous.rows[0];}
  const limitKey=`booking:${digest(`${req.ip}:${Math.floor(Date.now()/3600000)}`)}`;
  const attempts=await client.query("INSERT INTO request_limits(key,expires_at) VALUES($1,now()+interval '1 hour') ON CONFLICT(key) DO UPDATE SET hits=request_limits.hits+1 RETURNING hits",[limitKey]);
  if(attempts.rows[0].hits>5)throw Object.assign(new Error('Please contact the salon before making another reservation.'),{status:429});
  const {starts,ends}=appointment(input);
  const result=await client.query('INSERT INTO bookings(id,request_key,request_hash,client_name,treatment,starts_at,ends_at) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *',[randomUUID(),key,hash,input.name,input.treatment,starts,ends]);
  return result.rows[0];
 });}catch(error){if(error.code==='23P01')return res.status(409).json({error:'That time overlaps another appointment. Please choose a different time.'});throw error;}
 if(booking.state!=='pending')return res.status(409).json({error:booking.state==='confirmed'?'This appointment is already paid. Please contact the salon.':'Please choose a new appointment.'});
 const session=await checkout(booking);
 await reconcileSession(session);
 if(session.status!=='open' || !session.url)return res.status(409).json({error:'This checkout is closed. Please contact the salon or choose a new time.'});
 res.status(201).json({bookingId:booking.id,checkoutUrl:session.url,deposit:100000,currency:'INR'});
}
