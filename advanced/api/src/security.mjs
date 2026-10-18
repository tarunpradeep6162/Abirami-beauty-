import { createHash } from 'node:crypto';
import { pool } from './db.mjs';
import { config } from './config.mjs';
export const digest=value=>createHash('sha256').update(value).digest('hex');
export function originGuard(req,res,next){if(['GET','HEAD','OPTIONS'].includes(req.method)||req.get('origin')===config.APP_ORIGIN)return next();res.status(403).json({error:'Request origin is not allowed.'});}
export async function databaseLimit(req,res,next){
 const bucket=digest(`${req.ip}:${Math.floor(Date.now()/60000)}`);
 const result=await pool.query("INSERT INTO request_limits(key,expires_at) VALUES($1,now()+interval '2 minutes') ON CONFLICT(key) DO UPDATE SET hits=request_limits.hits+1 RETURNING hits",[bucket]);
 if(result.rows[0].hits>25)return res.status(429).json({error:'Please wait a minute before trying again.'});next();
}
export async function authenticated(req,res,next){
 const cookie=req.get('cookie')||'';const token=cookie.split(';').map(part=>part.trim()).find(part=>part.startsWith('abirami_session='))?.slice('abirami_session='.length);
 if(!token||!/^[a-f0-9]{64}$/.test(token))return res.status(401).json({error:'Please open your private invitation.'});
 const result=await pool.query('SELECT bride_id FROM portal_sessions WHERE token_hash=$1 AND expires_at>now()',[digest(token)]);
 if(!result.rowCount)return res.status(401).json({error:'Your session has ended. Ask the salon for a new invitation.'});
 req.brideId=result.rows[0].bride_id;next();
}
export const cookieOptions={httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/api',maxAge:8*3600000};
