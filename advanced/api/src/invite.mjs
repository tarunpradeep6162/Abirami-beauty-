import { randomBytes,randomUUID } from 'node:crypto';
import { z } from 'zod';
import { transaction,pool } from './db.mjs';
import { digest } from './security.mjs';
const name=z.string().trim().min(2).max(80).parse(process.argv[2]);
const bride=process.argv[3]?z.uuid().parse(process.argv[3]):randomUUID();
const code=randomBytes(32).toString('hex');
try{await transaction(async client=>{
 await client.query('INSERT INTO brides(id,name) VALUES($1,$2) ON CONFLICT(id) DO NOTHING',[bride,name]);
 await client.query('DELETE FROM invitations WHERE bride_id=$1',[bride]);
 await client.query('DELETE FROM portal_sessions WHERE bride_id=$1',[bride]);
 await client.query("INSERT INTO invitations(token_hash,bride_id,expires_at) VALUES($1,$2,now()+interval '30 minutes')",[digest(code),bride]);
});console.log(`Bride ID: ${bride}\nOne-use code (30 minutes; share privately): ${code}`);}finally{await pool.end();}
