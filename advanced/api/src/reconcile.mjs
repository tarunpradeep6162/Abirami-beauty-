import { pool } from './db.mjs';
import { checkout,reconcileSession } from './payments.mjs';
try{
 const result=await pool.query("SELECT * FROM bookings WHERE state='pending' ORDER BY created_at LIMIT 100");
 for(const booking of result.rows){try{const session=await checkout(booking);await reconcileSession(session);}catch{console.error('Reservation needs retry or review:',booking.id);}}
 await pool.query('DELETE FROM request_limits WHERE expires_at<now()');
 await pool.query('DELETE FROM portal_sessions WHERE expires_at<now()');
 await pool.query('DELETE FROM invitations WHERE expires_at<now()');
}finally{await pool.end();}
